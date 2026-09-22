/* ProjectX - page behaviour: the command-line tabs, the bundle verifier and
   the contact form. Everything else (reveal, copy, menu) is in site.js, and
   every moving block is in blocks.js. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  /* ------------------------------------------------ command-line tabs */
  /* transcripts, not recordings: each line is real text you can select */
  function tabs() {
    var root = $("[data-tabs]"); if (!root) return;
    var data; try { data = JSON.parse($("script[type='application/json']", root).textContent); } catch (e) { return; }
    var bar = $(".tabbar", root), body = $(".term-body", root), cur = 0, timer = 0, started = false;
    data.forEach(function (t, i) {
      var b = el("button", "", t.label);
      b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", String(i === 0));
      b.addEventListener("click", function () { show(i); });
      bar.appendChild(b);
    });
    var rp = el("button", "replay", "replay"); rp.type = "button";
    rp.addEventListener("click", function () { show(cur); });
    bar.appendChild(rp);
    function line(l) {
      var d = el("div", "tl " + (l.tone || "out"));
      d.appendChild(el("span", "s", l.sign)); d.appendChild(document.createTextNode(l.text));
      return d;
    }
    function show(i) {
      cur = i; clearInterval(timer);
      $$("[role=tab]", bar).forEach(function (b, k) { b.setAttribute("aria-selected", String(k === i)); });
      body.innerHTML = "";
      var lines = data[i].lines, n = 0;
      if (reduce.matches) { lines.forEach(function (l) { body.appendChild(line(l)); }); return; }
      timer = setInterval(function () {
        if (n >= lines.length) { clearInterval(timer); body.appendChild(el("div", "c cur", "")); return; }
        body.appendChild(line(lines[n++]));
      }, 260);
    }
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting && !started) { started = true; io.disconnect(); show(0); }
    }, { threshold: 0.3 });
    io.observe(root);
  }

  /* --------------------------------------------------------- verifier */
  function verifier() {
    var box = $("[data-verify]"); if (!box || !window.XLcanon) return;
    var ta = $("textarea", box), grid = $("[data-digestgrid]", box), out = $("[data-computed]", box),
        claim = $("[data-claimed]", box), status = $("[data-status]", box), count = $("[data-count]", box),
        editor = $(".editor", box), sample = ta.value, t = 0, seq = 0;
    function setStatus(kind, text) { status.className = "vstatus " + kind; status.textContent = text; }
    function run() {
      var src = ta.value, my = ++seq;
      count.textContent = src.length + " chars";
      var claimed = null;
      try { claimed = window.XLcanon.claimed(src); } catch (e) {
        out.textContent = "\u2014"; claim.textContent = "\u2014";
        if (grid.__grid) grid.__grid.set("", true);
        setStatus("err", "not a bundle: " + e.message); return;
      }
      claim.textContent = typeof claimed === "string" ? claimed : "none in this file";
      window.XLcanon.digest(src).then(function (d) {
        if (my !== seq) return;
        out.textContent = d;
        if (grid.__grid) grid.__grid.set(d);
        if (typeof claimed !== "string") setStatus("err", "digest computed \u00b7 no bundleDigest to compare");
        else if (claimed === d) setStatus("ok", "match \u00b7 this bundle is what it says");
        else setStatus("bad", "mismatch \u00b7 the bundle was changed after it was signed");
      }, function (e) { setStatus("err", "could not hash: " + e.message); });
    }
    function soon() { clearTimeout(t); t = setTimeout(run, 280); }
    ta.addEventListener("input", soon);
    $("[data-run]", box).addEventListener("click", run);
    $("[data-reset]", box).addEventListener("click", function () { ta.value = sample; run(); });
    ["dragenter", "dragover"].forEach(function (ev) { editor.addEventListener(ev, function (e) { e.preventDefault(); editor.classList.add("drag"); }); });
    ["dragleave", "drop"].forEach(function (ev) { editor.addEventListener(ev, function (e) { e.preventDefault(); editor.classList.remove("drag"); }); });
    editor.addEventListener("drop", function (e) {
      var f = e.dataTransfer && e.dataTransfer.files[0]; if (!f) return;
      if (f.size > 2e6) { setStatus("err", "that file is over 2 MB; a bundle is a few KB"); return; }
      f.text().then(function (txt) { ta.value = txt; run(); });
    });
    /* the grid mounts after this script on a slow device; wait for it */
    (function ready(n) { if (grid.__grid || n > 40) run(); else setTimeout(function () { ready(n + 1); }, 50); })(0);
  }

  /* ---------------------------------------------------------- contact */
  /* the same form endpoint the current site posts to; the honeypot field
     is dropped before sending and a filled one is treated as sent */
  var FORM = "https://readdy.ai/api/form/daj07qjp14a1h3mr7aog";
  function contact() {
    var f = $("[data-contact]"); if (!f) return;
    var btn = $("button[type=submit]", f), msg = $("[data-form-status]", f);
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(f);
      if (String(data.get("company_alt") || "").trim()) { f.reset(); msg.className = "pass small"; msg.textContent = "[ ok ] message received"; return; }
      data.delete("company_alt");
      var body = new URLSearchParams(); data.forEach(function (v, k) { body.append(k, String(v)); });
      btn.disabled = true; btn.textContent = "sending\u2026"; msg.textContent = "";
      fetch(FORM, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() })
        .then(function (r) { return r.text().then(function (t) { var j = {}; try { j = JSON.parse(t); } catch (x) { /* plain text */ } return { r: r, j: j, t: t }; }); })
        .then(function (x) {
          var m = (x.j && x.j.meta && (x.j.meta.message || x.j.meta.detail)) || x.t || "";
          if (x.r.ok && x.j && x.j.code === "OK" && !/spam/i.test(m)) { f.reset(); msg.className = "pass small"; msg.textContent = "[ ok ] message received \u00b7 reply within 1 business day"; }
          else { msg.className = "small"; msg.style.color = "var(--fail)"; msg.textContent = "[ err ] " + (m || "submission failed"); }
        }, function (err) { msg.className = "small"; msg.style.color = "var(--fail)"; msg.textContent = "[ err ] " + (err && err.message || "network error"); })
        .then(function () { btn.disabled = false; btn.textContent = "\u2192 send"; });
    });
  }

  function boot() { tabs(); verifier(); contact(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
