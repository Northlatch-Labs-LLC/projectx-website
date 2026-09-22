/* ProtocolX Verify: the bundle digest, recomputed in the browser.
   A byte-for-byte port of the live verifier:
     - parse keeping every number exactly as written (no float round trip)
     - drop the top-level "run" and "bundleDigest" keys
     - serialise canonically: keys sorted by code point, no whitespace,
       strings JSON-escaped with every character from U+007F upward as \uXXXX,
       integers as written, floats in the canonical float form
     - sha256 over the UTF-8 bytes, printed as "sha256:<hex>"
   Works offline. Nothing leaves the page. */
(function (root) {
  "use strict";
  var EXCLUDE = ["run", "bundleDigest"];

  function Num(raw) { this.raw = raw; this.isFloat = /[.eE]/.test(raw); }

  function floatText(v) {
    if (isNaN(v) || !isFinite(v)) throw new Error("NaN and Infinity cannot appear in a bundle");
    if (v === 0) return (1 / v < 0) ? "-0.0" : "0.0";
    var neg = v < 0, parts = Math.abs(v).toExponential().split("e");
    var digits = parts[0].replace(".", ""), exp = parseInt(parts[1], 10) + 1, out;
    if (exp <= -4 || exp > 16) {
      var e = exp - 1, sign = e < 0 ? "-" : "+", mag = String(Math.abs(e));
      while (mag.length < 2) mag = "0" + mag;
      out = (digits.length > 1 ? digits[0] + "." + digits.slice(1) : digits) + "e" + sign + mag;
    } else if (exp <= 0) out = "0." + new Array(-exp + 1).join("0") + digits;
    else if (exp >= digits.length) out = digits + new Array(exp - digits.length + 1).join("0") + ".0";
    else out = digits.slice(0, exp) + "." + digits.slice(exp);
    return neg ? "-" + out : out;
  }

  function parse(src) {
    var i = 0;
    function ws() { while (i < src.length && " \t\n\r".indexOf(src[i]) > -1) i++; }
    function fail(m) { throw new SyntaxError(m + " at position " + i); }
    function value() {
      ws();
      var c = src[i];
      if (c === "{") return obj();
      if (c === "[") return arr();
      if (c === '"') return str();
      if (c === "-" || (c >= "0" && c <= "9")) return num();
      if (src.substr(i, 4) === "true") { i += 4; return true; }
      if (src.substr(i, 5) === "false") { i += 5; return false; }
      if (src.substr(i, 4) === "null") { i += 4; return null; }
      fail("unexpected character " + JSON.stringify(c === undefined ? "<end of input>" : c));
    }
    function obj() {
      i++; var pairs = []; ws();
      if (src[i] === "}") { i++; return { __obj: pairs }; }
      for (;;) {
        ws(); if (src[i] !== '"') fail("expected a key");
        var k = str(); ws(); if (src[i] !== ":") fail("expected ':'"); i++;
        pairs.push([k, value()]); ws();
        if (src[i] === ",") { i++; continue; }
        if (src[i] === "}") { i++; return { __obj: pairs }; }
        fail("expected ',' or '}'");
      }
    }
    function arr() {
      i++; var a = []; ws();
      if (src[i] === "]") { i++; return a; }
      for (;;) {
        a.push(value()); ws();
        if (src[i] === ",") { i++; continue; }
        if (src[i] === "]") { i++; return a; }
        fail("expected ',' or ']'");
      }
    }
    function str() {
      i++; var s = "";
      for (;;) {
        if (i >= src.length) fail("unterminated string");
        var c = src[i];
        if (c === '"') { i++; return s; }
        if (c === "\\") {
          i++; var e = src[i++];
          if (e === '"') s += '"'; else if (e === "\\") s += "\\"; else if (e === "/") s += "/";
          else if (e === "b") s += "\b"; else if (e === "f") s += "\f"; else if (e === "n") s += "\n";
          else if (e === "r") s += "\r"; else if (e === "t") s += "\t";
          else if (e === "u") { s += String.fromCharCode(parseInt(src.slice(i, i + 4), 16)); i += 4; }
          else fail("bad escape \\" + e);
        } else { s += c; i++; }
      }
    }
    function num() {
      var start = i;
      if (src[i] === "-") i++;
      while (i < src.length && src[i] >= "0" && src[i] <= "9") i++;
      if (src[i] === ".") { i++; while (i < src.length && src[i] >= "0" && src[i] <= "9") i++; }
      if (src[i] === "e" || src[i] === "E") { i++; if (src[i] === "+" || src[i] === "-") i++; while (i < src.length && src[i] >= "0" && src[i] <= "9") i++; }
      return new Num(src.slice(start, i));
    }
    var v = value(); ws();
    if (i < src.length) fail("trailing content after the document");
    return v;
  }

  function cmp(a, b) {
    var x = Array.from(a), y = Array.from(b), n = Math.min(x.length, y.length);
    for (var k = 0; k < n; k++) { var d = x[k].codePointAt(0) - y[k].codePointAt(0); if (d) return d; }
    return x.length - y.length;
  }
  function esc(s) { return s.replace(/[\x7f-\uffff]/g, function (c) { return "\\u" + ("000" + c.charCodeAt(0).toString(16)).slice(-4); }); }
  function ser(v) {
    if (v === null) return "null";
    if (v === true) return "true";
    if (v === false) return "false";
    if (v instanceof Num) return v.isFloat ? floatText(Number(v.raw)) : v.raw;
    if (typeof v === "string") return esc(JSON.stringify(v));
    if (Array.isArray(v)) return "[" + v.map(ser).join(",") + "]";
    if (v && v.__obj) return "{" + v.__obj.slice().sort(function (p, q) { return cmp(p[0], q[0]); })
      .map(function (p) { return esc(JSON.stringify(p[0])) + ":" + ser(p[1]); }).join(",") + "}";
    throw new Error("value is not from the parser");
  }

  function canonical(src) {
    var t = parse(src);
    if (!t || !t.__obj) throw new Error("a bundle must be a JSON object");
    return ser({ __obj: t.__obj.filter(function (p) { return EXCLUDE.indexOf(p[0]) < 0; }) });
  }
  function claimed(src) {
    var p = (parse(src).__obj || []).filter(function (q) { return q[0] === "bundleDigest"; })[0];
    return p ? p[1] : null;
  }
  function hex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join(""); }
  function digest(src, subtle) {
    subtle = subtle || (root.crypto && root.crypto.subtle);
    return subtle.digest("SHA-256", new TextEncoder().encode(canonical(src))).then(function (b) { return "sha256:" + hex(b); });
  }

  var api = { canonical: canonical, claimed: claimed, digest: digest, parse: parse };
  if (typeof module !== "undefined") module.exports = api; else root.XLcanon = api;
})(typeof window !== "undefined" ? window : globalThis);
