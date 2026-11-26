/* Northlatch Labs — client-side UX enhancements.
   Scroll reveals, copy buttons, mobile menu, solution matcher tabs,
   ProtocolX fee estimator, and contact topic query pre-selection. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.documentElement.classList.add("js");

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ------------------------------------------------------------ reveal */
  function reveal() {
    var items = $$("[data-reveal]");
    if (reduce.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("is-in"); });
      return;
    }
    items.forEach(function (i) {
      var p = i.parentElement, n = 0;
      $$(":scope > [data-reveal]", p).forEach(function (s, k) { if (s === i) n = k; });
      i.style.setProperty("--i", Math.min(n, 5));
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -4% 0px", threshold: 0.05 });
    items.forEach(function (i) { io.observe(i); });
  }

  /* -------------------------------------------------------------- copy */
  function copyButtons(root) {
    $$("[data-copy]", root).forEach(function (b) {
      if (b.__copy) return;
      b.__copy = true;
      b.addEventListener("click", function () {
        var v = b.getAttribute("data-copy");
        var label = b.querySelector("[data-copy-label]");
        function done(ok) {
          if (label) label.textContent = ok ? "copied" : "select it";
          if (ok) b.setAttribute("data-done", "");
          setTimeout(function () {
            if (label) label.textContent = "copy";
            b.removeAttribute("data-done");
          }, 1600);
        }
        if (navigator.clipboard) {
          navigator.clipboard.writeText(v).then(function () { done(true); }, function () { done(false); });
        } else {
          done(false);
        }
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
        t.setAttribute("aria-expanded", String(open));
        p.setAttribute("data-open", String(open));
      });
      $$("a", p).forEach(function (a) {
        a.addEventListener("click", function () {
          t.setAttribute("aria-expanded", "false");
          p.setAttribute("data-open", "false");
        });
      });
    }
  }

  /* --------------------------------------------------- solution matcher */
  function solutionMatcher() {
    var root = $("[data-matcher]");
    if (!root) return;
    var tabs = $$("[role='tab']", root);
    var panels = $$("[role='tabpanel']", root);
    function activate(id) {
      tabs.forEach(function (tab) {
        var on = tab.getAttribute("data-target") === id;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (panel) {
        var on = panel.getAttribute("data-panel") === id;
        panel.hidden = !on;
      });
    }
    tabs.forEach(function (tab, idx) {
      tab.addEventListener("click", function () {
        activate(tab.getAttribute("data-target"));
      });
      tab.addEventListener("keydown", function (e) {
        var next = -1;
        if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
        if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
        if (next >= 0) {
          e.preventDefault();
          tabs[next].focus();
          activate(tabs[next].getAttribute("data-target"));
        }
      });
    });
  }

  /* ------------------------------------------------ ProtocolX estimator */
  function feeCalculator() {
    var calc = $("[data-fee-calc]");
    if (!calc) return;
    var range = $("[data-pool-range]", calc);
    var input = $("[data-pool-input]", calc);
    var feeOut = $("[data-fee-out]", calc);
    var netOut = $("[data-net-out]", calc);
    if (!range || !input || !feeOut || !netOut) return;

    function fmt(n) {
      return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " SUI";
    }
    function update(val) {
      var num = Math.max(0, Math.min(1000000, Number(val) || 0));
      var fee = num * 0.029;
      var net = num - fee;
      feeOut.textContent = fmt(fee);
      netOut.textContent = fmt(net);
    }
    range.addEventListener("input", function () {
      input.value = range.value;
      update(range.value);
    });
    input.addEventListener("input", function () {
      var val = Math.max(0, Number(input.value) || 0);
      if (val <= 50000) range.value = String(val);
      update(val);
    });
    update(input.value || 1000);
  }

  function year() {
    $$("[data-year]").forEach(function (y) {
      y.textContent = String(new Date().getFullYear());
    });
  }

  function boot() {
    reveal();
    copyButtons();
    nav();
    solutionMatcher();
    feeCalculator();
    year();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
