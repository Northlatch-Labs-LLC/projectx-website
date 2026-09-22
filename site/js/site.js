/* Xlaunch - page behaviour for the marketing page.
   Reveal on scroll, copy buttons, the mobile menu, the product-window replay,
   the typed terminal, and the parts that depend on runtime config: the
   download buttons, the install line and the signed-in state. */
(function () {
  "use strict";
  var XL = window.XL || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.documentElement.classList.add("js");

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  /* ------------------------------------------------------------ reveal */
  function reveal() {
    var items = $$("[data-reveal]");
    if (reduce.matches || !("IntersectionObserver" in window)) { items.forEach(function (i) { i.classList.add("is-in"); }); return; }
    /* siblings that arrive together are staggered */
    items.forEach(function (i) {
      var p = i.parentElement, n = 0;
      $$(":scope > [data-reveal]", p).forEach(function (s, k) { if (s === i) n = k; });
      i.style.setProperty("--i", Math.min(n, 6));
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (i) { io.observe(i); });
  }

  /* -------------------------------------------------------------- copy */
  function copyButtons(root) {
    $$("[data-copy]", root).forEach(function (b) {
      if (b.__copy) return; b.__copy = true;
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-copy"), label = b.querySelector("[data-copy-label]");
        function done(ok) {
          if (label) label.textContent = ok ? "copied" : "select it";
          if (ok) b.setAttribute("data-done", "");
          setTimeout(function () { if (label) label.textContent = "copy"; b.removeAttribute("data-done"); }, 1600);
        }
        if (navigator.clipboard) navigator.clipboard.writeText(v).then(function () { done(true); }, function () { done(false); });
        else done(false);
      });
    });
  }
  window.XLcopy = copyButtons;

  /* --------------------------------------------------------------- nav */
  function nav() {
    var t = $("#nav-toggle"), p = $("#nav-panel");
    if (t && p) {
      t.addEventListener("click", function () {
        var open = t.getAttribute("aria-expanded") !== "true";
        t.setAttribute("aria-expanded", String(open)); p.setAttribute("data-open", String(open));
      });
      $$("a", p).forEach(function (a) { a.addEventListener("click", function () { t.setAttribute("aria-expanded", "false"); p.setAttribute("data-open", "false"); }); });
    }
    /* signed in: the call to action becomes the account */
    var s = XL.session && XL.session.get();
    if (s) {
      $$("[data-when-signed-out]").forEach(function (e) { e.hidden = true; });
      $$("[data-when-signed-in]").forEach(function (e) { e.hidden = false; });
    }
  }

  /* ------------------------------------------- downloads + install line */
  var ICON_DL = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"><path d="M8 2v8M4.5 6.5 8 10l3.5-3.5M2.5 13.5h11"/></svg>';
  function installs() {
    var dl = XL.downloads || {}, plat = XL.platform || "macos", name = (XL.platformName || {})[plat] || "your machine";
    var anyDl = dl.macos || dl.windows || dl.linux;

    /* hero primary: the one download for this machine when it exists,
       otherwise the account, which works today */
    $$("[data-primary-download]").forEach(function (a) {
      if (dl[plat]) { a.href = dl[plat]; a.innerHTML = ICON_DL + "<span>Download for " + name + "</span>"; }
    });

    /* the install line only appears when the package is published */
    $$("[data-install]").forEach(function (box) {
      if (XL.installCommand) {
        $("code", box).textContent = XL.installCommand;
        $("[data-copy]", box).setAttribute("data-copy", XL.installCommand);
        box.hidden = false;
      } else box.hidden = true;
    });
    $$("[data-install-pending]").forEach(function (n) { n.hidden = !!XL.installCommand; });

    /* the three download cards */
    $$("[data-download]").forEach(function (card) {
      var id = card.getAttribute("data-download"), btn = $(".btn", card), url = dl[id];
      if (id === plat) { card.classList.add("mine"); var tag = $("[data-mine]", card); if (tag) tag.hidden = false; }
      if (url) { btn.href = url; btn.removeAttribute("aria-disabled"); btn.innerHTML = ICON_DL + "<span>Download</span>"; }
      else { btn.removeAttribute("href"); btn.setAttribute("aria-disabled", "true"); btn.innerHTML = "<span>Opens soon</span>"; }
    });
    $$("[data-downloads-pending]").forEach(function (n) { n.hidden = !!anyDl; });
  }

  /* ------------------------------------------------ pricing buttons */
  /* A paid plan is bought on the account page for a signed-in customer. The
     button only says which plan: through sign-up when needed. */
  function plans() {
    var signed = XL.session && XL.session.get();
    $$("[data-plan]").forEach(function (b) {
      var id = b.getAttribute("data-plan");
      if (id === "free") { b.href = signed ? "/account" : "/signup"; return; }
      var dest = "/account?plan=" + id;
      b.href = signed ? dest : "/signup?next=" + encodeURIComponent(dest);
    });
  }

  /* ------------------------------------------- product window replay */
  /* A drawn replica of the Xlaunch Agent window playing one example task.
     Every element exists in the harness; the task is an example. */
  var STEPS = [
    { k: "user", t: "The checkout page 500s on submit. Find it, fix it, and show me it works.", page: "blank", hold: 1500 },
    { k: "think", t: "Reproduce first, then read the handler.", hold: 1100 },
    { k: "tool", l: "Browser", t: "open localhost:3000/checkout \u00b7 click \u201cPay\u201d", page: "failing", hold: 1500 },
    { k: "tool", l: "Bash", t: "pnpm test checkout \u2192 1 failed \u00b7 total is NaN", hold: 1400 },
    { k: "tool", l: "Edit", t: "src/checkout/total.ts  +4 \u22122", hold: 1300 },
    { k: "tool", l: "Bash", t: "pnpm test checkout \u2192 12 passed", hold: 1300 },
    { k: "tool", l: "Browser", t: "reload \u00b7 click \u201cPay\u201d \u00b7 order confirmed", page: "passing", hold: 1500 },
    { k: "answer", t: "Fixed. A missing quantity made the total NaN; it now defaults to 1 and the form validates it. Tests pass and the page confirms the order.", hold: 4200 }
  ];
  function productWindow() {
    var root = $("[data-pw]"); if (!root) return;
    var log = $(".pw-log", root), page = $(".page", root), status = $("[data-pw-status]", root);
    var i = 0, timer = 0, visible = false;
    function setPage(s) {
      page.setAttribute("data-state", s);
      var tot = $(".tot", page), ban = $(".banner", page), url = $("[data-pw-url]", root);
      if (s === "blank") { url.textContent = "about:blank"; return; }
      url.textContent = "localhost:3000/checkout";
      tot.textContent = s === "failing" ? "NaN" : "$48.00";
      ban.textContent = s === "failing" ? "500 \u00b7 Internal Server Error" : "Order #1042 confirmed";
    }
    function render(st) {
      var n;
      if (st.k === "user") n = el("div", "msg-user", st.t);
      else if (st.k === "answer") n = el("div", "msg-answer", st.t);
      else {
        n = el("div", "msg-step");
        var b = el("b", st.k === "think" ? "" : "k", st.k === "think" ? "Think" : st.l);
        n.appendChild(b); n.appendChild(el("span", "", st.t));
      }
      log.appendChild(n);
      while (log.children.length > 7) log.removeChild(log.firstChild);
      if (st.page) setPage(st.page);
      status.textContent = st.k === "answer" ? "done" : "working";
    }
    function tick() {
      timer = 0;
      if (!visible || document.hidden) return;
      if (i === 0) { log.innerHTML = ""; setPage("blank"); }
      var st = STEPS[i]; render(st);
      i = (i + 1) % STEPS.length;
      timer = setTimeout(tick, st.hold);
    }
    if (reduce.matches) { log.innerHTML = ""; STEPS.forEach(render); setPage("passing"); return; }
    STEPS.slice(0, 3).forEach(render); i = 3;
    var io = new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible && !timer) timer = setTimeout(tick, 600);
    }, { threshold: 0.2 });
    io.observe(root);
    document.addEventListener("visibilitychange", function () { if (!document.hidden && visible && !timer) timer = setTimeout(tick, 400); });
  }

  /* --------------------------------------------------- typed terminal */
  function typed() {
    $$("[data-typed]").forEach(function (box) {
      var data, src = box.closest("section").querySelector('script[type="application/json"]');
      try { data = JSON.parse(src.textContent); } catch (e) { return; }
      var body = box, started = false;
      function line(l) { var d = el("div", l.k === "hi" ? "hi" : l.k, l.t || "\u00a0"); body.appendChild(d); return d; }
      function finish() { body.innerHTML = ""; data.forEach(line); body.appendChild(el("div", "c cur", "")); }
      if (reduce.matches) { finish(); return; }
      function run() {
        body.innerHTML = "";
        var i = 0;
        (function next() {
          if (i >= data.length) { body.appendChild(el("div", "c cur", "")); return; }
          var l = data[i++];
          if (l.k !== "c") { line(l); setTimeout(next, l.t ? 230 : 120); return; }
          var d = line({ k: "c cur", t: "" }), n = 0;
          (function type() {
            d.textContent = l.t.slice(0, ++n);
            if (n < l.t.length) setTimeout(type, 22 + Math.random() * 30);
            else { d.className = "c"; setTimeout(next, 420); }
          })();
        })();
      }
      var io = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting && !started) { started = true; io.disconnect(); run(); }
      }, { threshold: 0.3 });
      io.observe(box);
    });
  }

  function year() { $$("[data-year]").forEach(function (y) { y.textContent = String(new Date().getFullYear()); }); }

  function boot() { reveal(); copyButtons(); nav(); installs(); plans(); productWindow(); typed(); year(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
