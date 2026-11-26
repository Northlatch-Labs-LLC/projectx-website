/* Northlatch Labs — page behaviour: the bundle verifier on /verify and
   the inquiry form on /contact (query-param topic prefill, live character count,
   and first-party submission to /api/contact). */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  /* ------------------------------------------------ command-line tabs */
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
        else if (claimed === d) setStatus("ok", "match \u00b7 bundle integrity verified");
        else setStatus("bad", "mismatch \u00b7 bundle was modified after signing");
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
      if (f.size > 2e6) { setStatus("err", "file exceeds 2 MB limit"); return; }
      f.text().then(function (txt) { ta.value = txt; run(); });
    });
    (function ready(n) { if (grid.__grid || n > 40) run(); else setTimeout(function () { ready(n + 1); }, 50); })(0);
  }

  /* ---------------------------------------------------------- contact */
  var FORM = "/api/contact";
  function contact() {
    var f = $("[data-contact]"); if (!f) return;
    var btn = $("button[type=submit]", f), msg = $("[data-form-status]", f);
    var select = $("[data-topic-select]", f);
    var ta = $("textarea[name='message']", f);
    var counter = $("[data-char-count]", f);

    /* Pre-select topic from ?topic=... query parameter or #topic-... hash */
    if (select) {
      var hashTopic = (window.location.hash || "").indexOf("#topic-") === 0
        ? window.location.hash.slice("#topic-".length)
        : "";
      var queryTopic = window.URLSearchParams
        ? (new URLSearchParams(window.location.search).get("topic") || "")
        : "";
      var chosen = queryTopic || hashTopic;
      if (chosen) {
        for (var i = 0; i < select.options.length; i++) {
          if (select.options[i].value === chosen) {
            select.value = chosen;
            break;
          }
        }
      }
    }

    /* Live character counter */
    if (ta && counter) {
      var updateCount = function () {
        counter.textContent = ta.value.length.toLocaleString("en-US") + " / 2,000 characters";
      };
      ta.addEventListener("input", updateCount);
      updateCount();
    }

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(f);
      data.delete("company_alt");
      var body = new URLSearchParams();
      data.forEach(function (v, k) { body.append(k, String(v)); });
      btn.disabled = true; btn.textContent = "Sending\u2026"; msg.textContent = "";
      fetch(FORM, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(body))
      })
        .then(function (r) {
          return r.text().then(function (t) {
            var j = {};
            try { j = JSON.parse(t); } catch (x) { /* not JSON */ }
            return { r: r, j: j };
          });
        })
        .then(function (x) {
          if (x.r.ok && x.j && x.j.ok) {
            f.reset();
            if (ta && counter) counter.textContent = "0 / 2,000 characters";
            msg.className = "pass small"; msg.style.color = "";
            msg.textContent = "Inquiry received — we will reply within 1 business day.";
          } else {
            msg.className = "small"; msg.style.color = "var(--fail)";
            msg.textContent = ((x.j && x.j.error) || ("Submission failed (" + x.r.status + ")")) + " — you can also email hello@projectxprotocol.dev directly.";
          }
        }, function (err) {
          msg.className = "small"; msg.style.color = "var(--fail)";
          msg.textContent = (err && err.message || "Network error") + " — please email hello@projectxprotocol.dev directly.";
        })
        .then(function () {
          btn.disabled = false; btn.textContent = "Send Inquiry \u2192";
        });
    });
  }

  function boot() { tabs(); verifier(); contact(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
