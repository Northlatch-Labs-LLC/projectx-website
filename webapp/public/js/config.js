/* Where this site's services live, decided where the site RUNS.
   The container writes /runtime-config.js at start-up, which sets
   window.__XLAUNCH_CONFIG__ before this file loads. Every value is optional;
   an absent one means "not connected" and each surface says so plainly.
   Nothing here invents an address, a download or a command. */
(function () {
  "use strict";
  /* loaded in <head>, before first paint: marks the page as scripted so the
     scroll reveals can start hidden without a flash */
  document.documentElement.classList.add("js");
  var raw = window.__XLAUNCH_CONFIG__ || {};

  function text(v) { return typeof v === "string" ? v.trim() : ""; }
  function origin(v) {
    var s = text(v);
    if (!s) return "";
    try { var u = new URL(s); if (u.protocol !== "https:" && u.protocol !== "http:") return ""; }
    catch (e) { return ""; }
    return s.replace(/\/+$/, "");
  }
  var dl = raw.downloads && typeof raw.downloads === "object" ? raw.downloads : {};

  var cfg = {
    gatewayUrl: origin(raw.gatewayUrl),
    billingUrl: origin(raw.billingUrl),
    /* the harness install line: empty until the package is published, because
       a command that fails is worse than no command */
    installCommand: text(raw.harnessInstallCommand),
    /* desktop builds, one https URL per platform, each optional */
    downloads: { macos: origin(dl.macos), windows: origin(dl.windows), linux: origin(dl.linux) }
  };
  cfg.accounts = cfg.gatewayUrl !== "";
  cfg.cards = cfg.billingUrl !== "";
  cfg.gatewayApiBase = cfg.gatewayUrl ? cfg.gatewayUrl + "/v1" : "";

  /* which machine the visitor is on, so the page can lead with one download */
  cfg.platform = (function () {
    var ua = (navigator.userAgent || "").toLowerCase();
    if (ua.indexOf("win") > -1) return "windows";
    if (ua.indexOf("linux") > -1 && ua.indexOf("android") < 0) return "linux";
    return "macos";
  })();
  cfg.platformName = { macos: "macOS", windows: "Windows", linux: "Linux" };

  /* the signed-in session: the Gateway's bearer token plus its email, under
     the same key the previous build used, so nobody is signed out by the
     redesign. Every access is guarded: blocked storage means "this tab only". */
  var KEY = "xlaunch.session", memory;
  cfg.session = {
    get: function () {
      if (memory) return memory;
      try {
        var p = JSON.parse(localStorage.getItem(KEY) || "null");
        if (p && typeof p.token === "string" && typeof p.email === "string") return (memory = { token: p.token, email: p.email });
      } catch (e) { /* closed storage */ }
      return undefined;
    },
    set: function (s) {
      memory = s;
      try { if (s) localStorage.setItem(KEY, JSON.stringify(s)); else localStorage.removeItem(KEY); } catch (e) { /* this tab only */ }
    }
  };

  window.XL = cfg;
})();
