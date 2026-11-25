/* Xlaunch - blocks.
   Every moving thing on the site is made of the same square block, on the
   same grid the mark is drawn on. One file, six pieces:

     [data-mark="header"]   the mark at rest, a wave running along its arms
     [data-mark="hero"]     agents build the mark, then it falls and lands as
                            the next word: mark -> Launch -> agent -> work.
                            data-mark-seq overrides the sequence.
     [data-digits="48"]     a figure that drops in block by block, once
     [data-glyph="name"]    a 5 x 5 icon that assembles when it scrolls in
     [data-stream]          requests travelling code -> gateway -> providers
     [data-field]           a faint dot grid that wakes near the pointer

   Rules for all of them: colour comes from CSS (--mark-block, --line-strong),
   nothing animates under prefers-reduced-motion (each draws its finished
   frame instead), nothing runs while off screen or while the tab is hidden,
   and nothing here makes a network request. No dependencies. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var all = [];

  /* ------------------------------------------------------------ plumbing */
  function css(el, name, fallback) {
    var v = getComputedStyle(el).getPropertyValue(name).trim();
    return v || fallback;
  }
  function colours(el) {
    var root = document.documentElement;
    return {
      block: css(el, "--mark-block", getComputedStyle(el).color),
      rail: css(root, "--line-strong", "#5e6763"),
      dim: css(root, "--line", "#232b27"),
      text: css(root, "--text-muted", "#9ba6a0"),
      faint: css(root, "--text-faint", "#838f89"),
      ground: css(root, "--bg-raised", "#121715")
    };
  }
  function makeCanvas(el) {
    var c = document.createElement("canvas");
    c.setAttribute("aria-hidden", "true");
    c.style.width = "100%"; c.style.height = "100%";
    el.appendChild(c);
    return c;
  }
  function size(p) {
    var r = p.el.getBoundingClientRect();
    p.w = Math.max(8, Math.round(r.width));
    p.h = Math.max(8, Math.round(r.height));
    p.dpr = Math.min(2, window.devicePixelRatio || 1);
    p.canvas.width = Math.round(p.w * p.dpr);
    p.canvas.height = Math.round(p.h * p.dpr);
    p.g = p.canvas.getContext("2d");
    p.g.setTransform(p.dpr, 0, 0, p.dpr, 0, 0);
    p.C = colours(p.el);
  }

  /* A piece has step(dt, now) -> bool (keep running?) and draw(now).
     This drives them all from one requestAnimationFrame. */
  var raf = 0, last = 0;
  function loop(now) {
    raf = 0;
    var dt = Math.min(48, now - (last || now)); last = now;
    var any = false;
    for (var i = 0; i < all.length; i++) {
      var p = all[i];
      if (!p.live || !p.onScreen || document.hidden) continue;
      var more = p.step(dt, now);
      p.draw(now);
      if (more) any = true; else p.live = false;
    }
    if (any) raf = requestAnimationFrame(loop); else last = 0;
  }
  function wake(p) {
    if (reduce.matches) { p.live = false; p.finish(); p.draw(0); return; }
    p.live = true;
    if (!raf && !document.hidden) raf = requestAnimationFrame(loop);
  }

  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      var p = e.target.__blocks; if (!p) return;
      p.onScreen = e.isIntersecting;
      if (e.isIntersecting) { if (p.enter) p.enter(); if (p.wantsLoop()) wake(p); }
    });
  }, { threshold: 0.15 }) : null;

  function register(p) {
    p.el.__blocks = p;
    p.onScreen = !io;
    all.push(p);
    if (io) io.observe(p.el); else if (p.wantsLoop()) wake(p);
  }

  /* ------------------------------------------------------ the construction */
  /* Identical to site-build/blockmark.py: two chevrons on an n x n grid, arms
     t blocks thick, the centre column always empty. */
  function chevronCells(n, t) {
    var seam = (n - 1) >> 1, seen = {}, out = [];
    function add(x, y) { var k = x + "," + y; if (!seen[k]) { seen[k] = 1; out.push([x, y]); } }
    for (var k = 0; k < seam; k++) {
      for (var j = 0; j < t; j++) {
        add(k, k + j); add(k, n - 1 - k - j); add(n - 1 - k, k + j); add(n - 1 - k, n - 1 - k - j);
      }
    }
    return out;
  }

  /* 5 x 9 letter face; rows 7-8 hold the descender on g. */
  var FACE = {
    b: "X....X....XXXX.X...XX...XX...XXXXX...........",
    f: "..XX..X...XXXX..X....X....X....X.............",
    j: "...X........XX....X....X....X....X.X..X..XX..",
    m: "..........XX.X.X.X.XX.X.XX.X.XX.X.X..........",
    q: "...........XXXXX...XX...XX...X.XXXX....X....X",
    v: "..........X...XX...XX...X.X.X...X............",
    y: "..........X...XX...XX...XX..XX.XX.X....X.XXX.",
    z: "..........XXXXX...X...X...X...XXXXX..........",
    L: "X....X....X....X....X....X....XXXXX..........",
    a: "...........XXX.....X.XXXXX...X.XXXX..........",
    u: "..........X...XX...XX...XX..XX.XX.X..........",
    n: "..........X.XX.XX..XX...XX...XX...X..........",
    c: "...........XXX.X...XX....X...X.XXX...........",
    h: "X....X....X.XX.XX..XX...XX...XX...X..........",
    g: "...........XXXXX...XX...X.XXXX....XX...X.XXX.",
    e: "...........XXX.X...XXXXXXX.....XXX...........",
    t: ".X....X...XXXX..X....X....X..X..XX...........",
    w: "..........X...XX...XX.X.XXX.XXX...X..........",
    o: "...........XXX.X...XX...XX...X.XXX...........",
    r: "..........X.XX.XX..XX....X....X..............",
    k: "X....X....X..X.X.X..XX...X.X..X..X...........",
    x: "..........X...X.X.X...X...X.X.X...X..........",
    s: "...........XXXXX.....XXX.....XXXXX...........",
    i: "..X........XX....X....X....X...XXX...........",
    p: "..........XXXX.X...XX...XX...XXXXX.X....X....",
    d: "....X....X.XXXXX...XX...XX...X.XXXX..........",
    l: ".XX....X....X....X....X....X...XXX..........."
  };
  function wordCells(word) {
    var out = [], x0 = 0, i, r, c;
    for (i = 0; i < word.length; i++) {
      var f = FACE[word[i]];
      if (f) for (r = 0; r < 9; r++) for (c = 0; c < 5; c++) if (f.charAt(r * 5 + c) === "X") out.push([x0 + c, r]);
      x0 += 6;
    }
    return { w: Math.max(1, x0 - 1), h: 9, cells: out };
  }

  /* 3 x 5 digits for the figures */
  var DIGIT = {
    "0": "XXXX.XX.XX.XXXX", "1": ".X.XX..X..X.XXX", "2": "XXX..XXXXX..XXX", "3": "XXX..XXXX..XXXX",
    "4": "X.XX.XXXX..X..X", "5": "XXXX..XXX..XXXX", "6": "XXXX..XXXX.XXXX", "7": "XXX..X.X..X..X.",
    "8": "XXXX.XXXXX.XXXX", "9": "XXXX.XXXX..XXXX", "+": "....X.XXX.X....", "$": ".X.XXXX...XXXX."
  };

  /* ================================================================ mark */
  function Mark(el) {
    this.el = el;
    this.mode = el.getAttribute("data-mark") || "header";
    this.seq = (el.getAttribute("data-mark-seq") || "mark,Launch,agent,work").split(",");
    this.caption = document.getElementById(el.getAttribute("data-mark-caption") || "");
    this.canvas = makeCanvas(el);
    this.stage = 0;
    this.layout();
    register(this);
  }
  Mark.prototype.wantsLoop = function () { return true; };
  Mark.prototype.enter = function () {};
  Mark.prototype.layout = function () {
    size(this);
    if (this.mode === "hero") this.setupHero(); else this.setupHeader();
    this.draw(0);
  };
  Mark.prototype.finish = function () {
    if (this.mode === "hero") {
      /* the still frame is the first word of the sequence, finished */
      this.placed = {}; this.falling = []; this.queue = []; this.state = "hold";
      for (var i = 0; i < this.target.length; i++) this.placed[this.target[i]] = 1;
      for (var a = 0; a < this.agents.length; a++) { this.agents[a].carry = false; this.agents[a].st = "idle"; }
    }
    this.still = true;
  };

  /* header: 11-grid mark, a brightness wave along both arms, a bit leaving now and then */
  Mark.prototype.setupHeader = function () {
    var micro = Math.min(this.w, this.h) < 20;
    this.n = micro ? 7 : 11;
    this.cells = micro
      ? (function () { var o = [], i; for (i = 0; i < 7; i++) { o.push([i, i]); if (i !== 3) o.push([6 - i, i]); } return o; })()
      : chevronCells(11, 2);
    this.span = Math.min(this.w, this.h) * 0.92;
    this.cell = this.span / this.n;
    this.ox = (this.w - this.span) / 2; this.oy = (this.h - this.span) / 2;
    var half = (this.n - 1) / 2, n = this.n;
    this.phase = this.cells.map(function (c) { return Math.min(c[0], n - 1 - c[0]) / half; });
    this.sparks = []; this.nextSpark = 1800 + Math.random() * 2400;
  };

  Mark.prototype.setupHero = function () {
    /* 38 columns at every width: "Launch" is 35 blocks wide and must fit */
    this.cols = 38;
    this.cell = this.w / this.cols;
    this.rows = Math.max(14, Math.floor(this.h / this.cell));
    this.n = 17; this.cells = chevronCells(17, 3);
    this.placed = {}; this.falling = []; this.state = "build";
    this.target = this.targetCells(this.seq[this.stage % this.seq.length]);
    this.queue = this.sweep();
    this.agents = [];
    var count = Math.max(20, Math.min(90, Math.round(this.target.length * 0.6)));
    for (var i = 0; i < count; i++) {
      this.agents.push({ x: 1 + Math.random() * (this.cols - 2), y: this.rows - 1.5 - Math.random() * 0.9,
        tx: 0, ty: 0, idx: -1, carry: false, st: "idle", v: 0.05 + Math.random() * 0.04, wait: Math.random() * 800 });
    }
    /* open half built, so the first frame already reads */
    var pre = Math.floor(this.queue.length * 0.5);
    for (var p = 0; p < pre; p++) this.placed[this.queue.shift()] = 1;
    for (var a = 0; a < this.agents.length; a += 3) {
      if (!this.queue.length) break;
      var ag = this.agents[a];
      ag.idx = this.queue.shift(); ag.carry = true; ag.st = "toCell";
      ag.tx = (ag.idx % this.cols) + 0.5; ag.ty = Math.floor(ag.idx / this.cols) + 0.5;
      ag.x = ag.tx + (Math.random() - 0.5) * 7; ag.y = this.rows - 2 - Math.random() * 6; ag.wait = Math.random() * 500;
    }
    this.say();
  };

  Mark.prototype.targetCells = function (which) {
    var out = [], i, offx, offy, floorRow = this.rows - 3;
    if (which === "mark") {
      offx = Math.floor((this.cols - this.n) / 2); offy = Math.floor((floorRow - this.n) / 2) + 1;
      for (i = 0; i < this.cells.length; i++) out.push((this.cells[i][1] + offy) * this.cols + this.cells[i][0] + offx);
      this.label = "the mark"; return out;
    }
    var wc = wordCells(which);
    offx = Math.floor((this.cols - wc.w) / 2); offy = Math.floor((floorRow - wc.h) / 2) + 2;
    for (i = 0; i < wc.cells.length; i++) out.push((wc.cells[i][1] + offy) * this.cols + wc.cells[i][0] + offx);
    this.label = "\u201c" + which + "\u201d"; return out;
  };
  Mark.prototype.say = function () {
    if (!this.caption) return;
    this.caption.textContent = "fig. 1 \u2014 " + this.agents.length + " agents, " + this.target.length +
      " blocks, building " + this.label + ". Each claims a cell before it moves, so no two carry the same one.";
  };
  Mark.prototype.sweep = function () {
    var cols = this.cols, cx = cols / 2, cy = (this.rows - 3) / 2;
    return this.target.slice().sort(function (a, b) {
      var ax = (a % cols) - cx, ay = Math.floor(a / cols) - cy, bx = (b % cols) - cx, by = Math.floor(b / cols) - cy;
      return (ax * ax + ay * ay) - (bx * bx + by * by);
    });
  };
  Mark.prototype.agent = function (a, dt) {
    if (a.wait > 0) { a.wait -= dt; return; }
    if (a.st === "idle") {
      if (this.state !== "build" || !this.queue.length) return;
      a.idx = this.queue.shift(); a.tx = 1 + Math.random() * (this.cols - 2); a.ty = this.rows - 1.5; a.st = "toSupply"; return;
    }
    var sp = a.v * dt / 16.67, dx = a.tx - a.x, dy = a.ty - a.y;
    if (Math.abs(dx) > 0.02) a.x += Math.max(-sp, Math.min(sp, dx));
    else if (Math.abs(dy) > 0.02) a.y += Math.max(-sp, Math.min(sp, dy));
    else if (a.st === "toSupply") { a.carry = true; a.st = "toCell"; a.tx = (a.idx % this.cols) + 0.5; a.ty = Math.floor(a.idx / this.cols) + 0.5; }
    else if (a.st === "toCell") { this.placed[a.idx] = 1; a.carry = false; a.tx = 1 + Math.random() * (this.cols - 2); a.ty = this.rows - 1.5; a.st = "return"; }
    else { a.st = "idle"; a.idx = -1; a.wait = 120 + Math.random() * 480; }
  };
  Mark.prototype.step = function (dt, now) {
    this.still = false;
    var i;
    if (this.mode !== "hero") {
      var s = this.sparks;
      this.nextSpark -= dt;
      if (this.nextSpark < 0 && s.length < 3) {
        this.nextSpark = 3200 + Math.random() * 3800;
        var q = (Math.random() * 4) | 0, sx = q & 1 ? 1 : -1, sy = q & 2 ? 1 : -1;
        s.push({ x: this.ox + this.span / 2 + sx * this.span * .46, y: this.oy + this.span / 2 + sy * this.span * .46,
          vx: sx * this.span * .00024, vy: sy * this.span * .00024, life: 1 });
      }
      for (i = s.length - 1; i >= 0; i--) { s[i].x += s[i].vx * dt; s[i].y += s[i].vy * dt; s[i].life -= dt / 1500; if (s[i].life <= 0) s.splice(i, 1); }
      return true;
    }
    if (this.state === "hold") { if (now > this.holdUntil) this.drop(); return true; }
    if (this.state === "fall") {
      var rest = this.rows - 1.5, moving = 0;
      for (i = 0; i < this.falling.length; i++) {
        var f = this.falling[i];
        if (f.d > 0) { f.d -= dt; moving++; continue; }
        if (f.y < rest) { f.vy += 0.000055 * dt; f.y = Math.min(rest, f.y + f.vy * dt); moving++; }
      }
      if (!moving) {
        this.falling = []; this.stage++;
        this.target = this.targetCells(this.seq[this.stage % this.seq.length]);
        this.queue = this.sweep(); this.state = "build"; this.say();
      }
      return true;
    }
    var done = !this.queue.length;
    for (i = 0; i < this.agents.length; i++) { this.agent(this.agents[i], dt); if (this.agents[i].st !== "idle") done = false; }
    if (done) { this.state = "hold"; this.holdUntil = now + 4200; }
    return true;
  };
  Mark.prototype.drop = function () {
    this.falling = [];
    for (var key in this.placed) {
      var k = +key;
      this.falling.push({ x: k % this.cols, y: Math.floor(k / this.cols), vy: 0.002 + Math.random() * 0.004, d: Math.random() * 420 });
    }
    this.placed = {}; this.state = "fall";
  };
  Mark.prototype.draw = function (now) {
    var g = this.g, i;
    g.clearRect(0, 0, this.w, this.h);
    if (this.mode === "hero") {
      var c = this.cell, b = Math.max(2, c * 0.82), o = (c - b) / 2;
      g.fillStyle = this.C.dim;
      for (i = 0; i < this.cols; i += 2) g.fillRect(i * c + 2, (this.rows - 1) * c + c / 2, c - 4, 1);
      g.fillStyle = this.C.block;
      for (var key in this.placed) { var k = +key; g.fillRect((k % this.cols) * c + o, Math.floor(k / this.cols) * c + o, b, b); }
      for (i = 0; i < this.falling.length; i++) g.fillRect(this.falling[i].x * c + o, this.falling[i].y * c + o, b, b);
      for (i = 0; i < this.agents.length; i++) {
        var a = this.agents[i];
        if (this.still && !a.carry) continue;
        g.fillStyle = a.carry ? this.C.block : this.C.rail;
        var s = a.carry ? Math.max(3, c * 0.52) : Math.max(1.5, c * 0.3);
        g.fillRect(a.x * c - s / 2, a.y * c - s / 2, s, s);
      }
      return;
    }
    var cell = this.cell, bs = Math.max(1, cell * 0.84), off = (cell - bs) / 2, t = now / 1000;
    g.fillStyle = this.C.block;
    for (i = 0; i < this.cells.length; i++) {
      g.globalAlpha = this.still ? 1 : 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(2 * Math.PI * (t / 2.6 - this.phase[i] * 0.85)));
      g.fillRect(this.ox + this.cells[i][0] * cell + off, this.oy + this.cells[i][1] * cell + off, bs, bs);
    }
    for (i = 0; this.sparks && i < this.sparks.length; i++) {
      var sp = this.sparks[i], z = Math.max(1.5, bs * 0.5);
      g.globalAlpha = Math.max(0, sp.life) * 0.9;
      g.fillRect(sp.x - z / 2, sp.y - z / 2, z, z);
    }
    g.globalAlpha = 1;
  };

  /* ============================================================== digits */
  /* A figure drops in once, block by block, the first time it is seen. */
  function Digits(el) {
    this.el = el;
    this.text = el.getAttribute("data-digits");
    this.canvas = makeCanvas(el);
    this.done = false; this.started = false;
    this.layout();
    register(this);
  }
  Digits.prototype.wantsLoop = function () { return this.started && !this.done; };
  Digits.prototype.enter = function () { if (!this.started) { this.started = true; this.t0 = 0; } };
  Digits.prototype.layout = function () {
    size(this);
    var chars = this.text.split(""), cols = chars.length * 4 - 1, rows = 5;
    this.cell = Math.floor(Math.min(this.h / rows, this.w / cols));
    this.cols = cols; this.rows = rows;
    var bw = cols * this.cell;
    /* shrink the canvas to the figure so it centres by CSS */
    this.canvas.style.width = bw + "px"; this.canvas.style.height = this.h + "px";
    this.canvas.width = Math.round(bw * this.dpr); this.w = bw;
    this.g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.oy = Math.round((this.h - rows * this.cell) / 2);
    this.blocks = [];
    var self = this;
    chars.forEach(function (ch, n) {
      var f = DIGIT[ch]; if (!f) return;
      for (var r = 0; r < 5; r++) for (var c = 0; c < 3; c++) if (f.charAt(r * 3 + c) === "X") {
        /* bottom rows land first, the way a stack actually fills */
        self.blocks.push({ x: n * 4 + c, ty: r, y: -2 - Math.random() * 3, vy: 0, d: (4 - r) * 90 + n * 120 + Math.random() * 140 });
      }
    });
    if (this.done || reduce.matches) this.finish();
    this.draw(0);
  };
  Digits.prototype.finish = function () {
    for (var i = 0; i < this.blocks.length; i++) { this.blocks[i].y = this.blocks[i].ty; this.blocks[i].d = 0; }
    this.done = true;
  };
  Digits.prototype.step = function (dt) {
    var moving = 0;
    for (var i = 0; i < this.blocks.length; i++) {
      var b = this.blocks[i];
      if (b.d > 0) { b.d -= dt; moving++; continue; }
      if (b.y < b.ty) { b.vy += 0.00006 * dt; b.y = Math.min(b.ty, b.y + b.vy * dt * this.rows); moving++; }
    }
    if (!moving) this.done = true;
    return !this.done;
  };
  Digits.prototype.draw = function () {
    var g = this.g, c = this.cell, s = Math.max(2, c - Math.max(1, Math.round(c * 0.14)));
    g.clearRect(0, 0, this.w, this.h);
    g.fillStyle = this.C.block;
    for (var i = 0; i < this.blocks.length; i++) {
      var b = this.blocks[i];
      if (b.d > 0 && !this.done) continue;
      g.fillRect(b.x * c, this.oy + b.y * c, s, s);
    }
  };

  /* ============================================================== glyphs */
  /* 5 x 5 icons beside each section's command, built from spans so they cost
     nothing: CSS does the assembly (see .glyph in xl.css). */
  var GLYPH = {
    terminal: "XXXXXX...XX.X.XX...XXXXXX", eye: ".XXX.X...XX.X.XX...X.XXX.",
    people: ".X.X.XXXXX.X.X.XXXXX.X.X.", play: "X....XX...XXX..XX...X....",
    grid: "XX.XXXX.XX.....XX.XXXX.XX", steps: "X....XX...XXX..XXXX.XXXXX",
    stack: "XXXXX.....XXXXX.....XXXXX", fork: "X...X.X.X...X....X....X..",
    hash: ".X.X.XXXXX.X.X.XXXXX.X.X.", down: "..X....X..X.X.X.XXX...X..",
    tag: "XXX..X..X.X...XX...X.XXX.", ask: ".XXX.X...X...X...X.....X..",
    key: ".XX..X..XXX..X.XXXXX....X", coin: ".XXX.X.X.XX.X.XX.X.X.XXX.",
    ledger: "XXXXXX...XXXXXXX...XXXXXX", bolt: "...X...X...XXX...X...X...", user: ".XXX..XXX.......XXX.XXXXX"
  };
  function glyph(el) {
    var f = GLYPH[el.getAttribute("data-glyph")] || GLYPH.terminal, html = "";
    /* assemble in a diagonal wave from the top-left block */
    for (var i = 0; i < 25; i++) {
      var on = f.charAt(i) === "X";
      html += "<i" + (on ? "" : ' class="o"') + ' style="--d:' + ((i % 5 + ((i / 5) | 0)) * 55) + '"></i>';
    }
    el.innerHTML = html;
    el.classList.add("glyph");
    el.setAttribute("aria-hidden", "true");
    if (reduce.matches || !io) { el.classList.add("is-in"); return; }
    gio.observe(el);
  }
  var gio = io ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); gio.unobserve(e.target); } });
  }, { threshold: 0.6 }) : null;

  /* ============================================================== stream */
  /* An illustration of the Gateway: requests leave your code as blocks, pass
     one endpoint and fan out to whichever provider serves the model asked
     for. It shows the shape of the system, not measured traffic. */
  function Stream(el) {
    this.el = el;
    this.providers = (el.getAttribute("data-stream") || "OpenAI,Anthropic,Gemini,Ollama").split(",");
    this.canvas = makeCanvas(el);
    this.packets = []; this.clock = 0; this.next = 0; this.n = 0;
    this.layout();
    register(this);
  }
  Stream.prototype.wantsLoop = function () { return true; };
  Stream.prototype.layout = function () {
    size(this);
    var w = this.w, h = this.h, narrow = w < 520;
    this.font = (narrow ? 10 : 11) + 'px "JetBrains Mono", monospace';
    this.src = { x: narrow ? 14 : 22, y: h / 2, label: this.el.getAttribute("data-stream-src") || "your code" };
    this.gw = { x: Math.round(w * (narrow ? 0.44 : 0.46)), y: h / 2, label: this.el.getAttribute("data-stream-hub") || "gateway" };
    var right = w - (narrow ? 86 : 118), top = 26, gap = (h - 52) / Math.max(1, this.providers.length - 1);
    this.dst = this.providers.map(function (p, i) { return { x: right, y: Math.round(top + i * gap), label: p }; });
    this.cell = narrow ? 5 : 6;
    this.draw(0);
  };
  Stream.prototype.finish = function () {
    this.packets = [];
    var self = this;
    this.dst.forEach(function (d, i) { self.packets.push({ route: i, t: 0.35 + i * 0.12, seg: 1 }); });
  };
  Stream.prototype.path = function (route) {
    var s = this.src, g = this.gw, d = this.dst[route], mid = g.x + (d.x - g.x) * 0.35;
    return [[s.x + 10, s.y], [g.x - 12, g.y], [g.x + 12, g.y], [mid, g.y], [mid, d.y], [d.x - 10, d.y]];
  };
  Stream.prototype.at = function (pts, t) {
    var L = 0, i, seg = [];
    for (i = 1; i < pts.length; i++) { var l = Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1]); seg.push(l); L += l; }
    var d = t * L;
    for (i = 0; i < seg.length; i++) {
      if (d <= seg[i] || i === seg.length - 1) {
        var k = seg[i] ? d / seg[i] : 0, a = pts[i], b = pts[i + 1];
        return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
      }
      d -= seg[i];
    }
    return pts[pts.length - 1];
  };
  Stream.prototype.step = function (dt) {
    this.clock += dt;
    if (this.clock > this.next && this.packets.length < 14) {
      /* round robin with a little jitter: the router, not a random walk */
      this.packets.push({ route: this.n++ % this.dst.length, t: 0, v: 0.00034 + Math.random() * 0.00008 });
      this.next = this.clock + 360 + Math.random() * 420;
    }
    for (var i = this.packets.length - 1; i >= 0; i--) {
      var p = this.packets[i]; p.t += p.v * dt;
      if (p.t >= 1) this.packets.splice(i, 1);
    }
    this.pulse = Math.max(0, (this.pulse || 0) - dt / 400);
    return true;
  };
  Stream.prototype.draw = function () {
    var g = this.g, C = this.C, i, self = this;
    g.clearRect(0, 0, this.w, this.h);
    /* wires */
    g.strokeStyle = C.dim; g.lineWidth = 1; g.setLineDash([2, 4]);
    for (i = 0; i < this.dst.length; i++) {
      var pts = this.path(i);
      g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
      for (var j = 1; j < pts.length; j++) g.lineTo(pts[j][0], pts[j][1]);
      g.stroke();
    }
    g.setLineDash([]);
    /* nodes: a small block cluster each */
    function node(n, big) {
      var s = big ? 14 : 8;
      g.fillStyle = big ? C.block : C.rail;
      g.fillRect(n.x - s / 2, n.y - s / 2, s, s);
    }
    g.font = this.font; g.textBaseline = "middle";
    node(this.src); g.fillStyle = C.text; g.textAlign = "left"; g.fillText(this.src.label, this.src.x - 8, this.src.y + 20);
    node(this.gw, true); g.textAlign = "center"; g.fillStyle = C.block; g.fillText(this.gw.label, this.gw.x, this.gw.y + 24);
    g.textAlign = "left";
    this.dst.forEach(function (d) { node(d); g.fillStyle = C.text; g.fillText(d.label, d.x + 10, d.y + 1); });
    /* packets */
    g.fillStyle = C.block;
    for (i = 0; i < this.packets.length; i++) {
      var p = this.packets[i], xy = self.at(self.path(p.route), p.t), c = this.cell;
      g.fillRect(Math.round(xy[0] - c / 2), Math.round(xy[1] - c / 2), c, c);
    }
  };

  /* =============================================================== field */
  /* The dot grid behind the hero. Dots wake near the pointer and settle back.
     Only on devices with a fine pointer; only redraws while something moves. */
  function Field(el) {
    this.el = el;
    this.canvas = makeCanvas(el);
    this.px = -9999; this.py = -9999; this.heat = 0;
    this.layout();
    register(this);
    var self = this, host = el.parentElement;
    if (window.matchMedia("(pointer: fine)").matches && !reduce.matches) {
      host.addEventListener("pointermove", function (e) {
        var r = self.el.getBoundingClientRect();
        self.px = e.clientX - r.left; self.py = e.clientY - r.top; self.heat = 1;
        if (self.onScreen) wake(self);
      }, { passive: true });
      host.addEventListener("pointerleave", function () { self.heat = Math.min(self.heat, 0.999); });
    }
  }
  Field.prototype.wantsLoop = function () { return this.heat > 0; };
  Field.prototype.finish = function () { this.heat = 0; };
  Field.prototype.layout = function () { size(this); this.gap = 24; this.draw(0); };
  Field.prototype.step = function (dt) {
    this.heat = Math.max(0, this.heat - dt / 1400);
    return this.heat > 0;
  };
  Field.prototype.draw = function () {
    var g = this.g, gap = this.gap, R = 150, C = this.C;
    g.clearRect(0, 0, this.w, this.h);
    var x0 = Math.max(0, Math.floor((this.px - R) / gap)), x1 = Math.min(Math.ceil(this.w / gap), Math.ceil((this.px + R) / gap));
    var y0 = Math.max(0, Math.floor((this.py - R) / gap)), y1 = Math.min(Math.ceil(this.h / gap), Math.ceil((this.py + R) / gap));
    if (this.heat <= 0) return;
    g.fillStyle = C.block;
    for (var y = y0; y <= y1; y++) for (var x = x0; x <= x1; x++) {
      var dx = x * gap - this.px, dy = y * gap - this.py, d = Math.sqrt(dx * dx + dy * dy);
      if (d > R) continue;
      var k = (1 - d / R); k = k * k * this.heat;
      g.globalAlpha = 0.55 * k;
      var s = 1.5 + 3 * k;
      g.fillRect(x * gap - s / 2, y * gap - s / 2, s, s);
    }
    g.globalAlpha = 1;
  };

  /* ================================================================ logo */
  /* The logo is the effect, small. The block X is the capital; the rest of the
     name is set in the same blocks: X + launch. Every so often the letters let
     go, drop, and come back up as the next word, while the X keeps its pulse.
     Sequence: launch -> agent -> work -> launch. */
  function Logo(el) {
    this.el = el;
    this.seq = (el.getAttribute("data-logo") || "launch,agent,work").split(",");
    this.stage = 0;
    this.canvas = makeCanvas(el);
    var img = el.querySelector("img"); if (img) img.style.display = "none";
    this.layout();
    register(this);
  }
  Logo.prototype.wantsLoop = function () { return true; };
  Logo.prototype.layout = function () {
    size(this);
    /* 9 rows: the X is a 9 x 9 mark, letters are 5 x 9 with the descender */
    this.cell = this.h / 9;
    this.xEnd = this.el.getAttribute("data-logo-x") === "end";
    var longest = 0, self0 = this;
    this.seq.forEach(function (w) { longest = Math.max(longest, wordCells(w).w); });
    this.xCol = longest + 2;
    this.mark = chevronCells(9, 2);
    if (this.xEnd) this.mark = this.mark.map(function (c) { return [c[0] + self0.xCol, c[1]]; });
    var half = 4, xc = this.xEnd ? this.xCol : 0;
    this.phase = this.mark.map(function (c) { var x = c[0] - xc; return Math.min(x, 8 - x) / half; });
    this.blocks = this.word(this.seq[this.stage % this.seq.length]).map(function (c) {
      return { x: c[0], y: c[1], fx: c[0], fy: c[1], tx: c[0], ty: c[1], t: 1, d: 0, a: 1 };
    });
    this.state = "hold"; this.until = (this.until || 0) || 5200 + Math.random() * 1800; this.clock = 0;
    this.draw(0);
  };
  Logo.prototype.word = function (w) {
    var wc = wordCells(w), out = [], i;
    if (this.xEnd) {
      /* ProjectX: the word runs up to the X, right-aligned against it, so the
         X never moves while the words change length in front of it */
      var off = this.xCol - 2 - wc.w;
      for (i = 0; i < wc.cells.length; i++) out.push([wc.cells[i][0] + off, wc.cells[i][1]]);
      return out;
    }
    /* the word sits one column after the X, baseline shared */
    for (i = 0; i < wc.cells.length; i++) out.push([wc.cells[i][0] + 11, wc.cells[i][1]]);
    return out;
  };
  Logo.prototype.finish = function () {
    this.blocks.forEach(function (b) { b.x = b.tx; b.y = b.ty; b.t = 1; b.a = 1; });
    this.still = true;
  };
  Logo.prototype.morph = function () {
    this.stage++;
    var next = this.word(this.seq[this.stage % this.seq.length]);
    var cur = this.blocks.filter(function (b) { return b.a > 0; });
    cur.sort(function (p, q) { return p.x - q.x || p.y - q.y; });
    next.sort(function (p, q) { return p[0] - q[0] || p[1] - q[1]; });
    var out = [], n = Math.max(cur.length, next.length);
    for (var i = 0; i < n; i++) {
      var from = cur[Math.floor(i * cur.length / n)] || cur[cur.length - 1];
      var to = i < next.length ? next[i] : null;
      /* extra blocks fall away; missing ones rise from below the baseline */
      out.push({ fx: from.x, fy: from.y, x: from.x, y: from.y,
        tx: to ? to[0] : from.x, ty: to ? to[1] : 12, keep: !!to,
        t: 0, d: Math.abs(from.x - (this.xEnd ? this.xCol : 11)) * 22 + Math.random() * 120, a: 1 });
    }
    this.blocks = out;
    this.state = "move";
  };
  Logo.prototype.step = function (dt) {
    this.still = false;
    this.clock += dt;
    if (this.state === "hold") {
      if (this.clock > this.until) { this.clock = 0; this.morph(); }
      return true;
    }
    var moving = 0;
    for (var i = 0; i < this.blocks.length; i++) {
      var b = this.blocks[i];
      if (b.d > 0) { b.d -= dt; moving++; continue; }
      if (b.t < 1) {
        b.t = Math.min(1, b.t + dt / 900); moving++;
        var e = b.t;
        /* fall first, then come back up: a dip below the baseline between the
           two words, so each letter is seen to let go and be rebuilt */
        var dip = Math.sin(Math.PI * e) * 5.5;
        b.x = b.fx + (b.tx - b.fx) * (e * e * (3 - 2 * e));
        b.y = b.fy + (b.ty - b.fy) * e + dip;
        if (!b.keep) b.a = 1 - e;
      }
    }
    if (!moving) {
      this.blocks = this.blocks.filter(function (b) { return b.keep; });
      this.state = "hold"; this.clock = 0;
      this.until = this.stage % this.seq.length === 0 ? 9000 : 3800;
    }
    return true;
  };
  Logo.prototype.draw = function (now) {
    var g = this.g, c = this.cell, s = Math.max(1, c * 0.84), o = (c - s) / 2, t = (now || 0) / 1000, i;
    g.clearRect(0, 0, this.w, this.h);
    g.save(); g.beginPath(); g.rect(0, 0, this.w, this.h); g.clip();
    g.fillStyle = this.C.block;
    for (i = 0; i < this.mark.length; i++) {
      g.globalAlpha = this.still ? 1 : 0.62 + 0.38 * (0.5 + 0.5 * Math.sin(2 * Math.PI * (t / 2.6 - this.phase[i] * 0.85)));
      g.fillRect(this.mark[i][0] * c + o, this.mark[i][1] * c + o, s, s);
    }
    g.fillStyle = this.C.word || this.C.block;
    for (i = 0; i < this.blocks.length; i++) {
      var b = this.blocks[i];
      g.globalAlpha = b.a;
      g.fillRect(b.x * c + o, b.y * c + o, s, s);
    }
    g.globalAlpha = 1; g.restore();
  };
  var logoLayout = Logo.prototype.layout;
  Logo.prototype.layout = function () {
    logoLayout.call(this);
    this.C.word = css(this.el, "--logo-word", this.C.block);
    this.draw(0);
  };

  /* ============================================================= compose */
  /* Tools are blocks. Orchestrated, a set of them becomes a capability: each
     tool sends its blocks, in its own colour, to build that capability's
     glyph. Then they go home and the next capability is composed from a
     different set. The list of tools is the harness's own. */
  var TOOLS = ["bash", "powershell", "terminal", "fs.read", "fs.edit", "search", "lsp", "web",
    "browser", "jobs", "workflows", "subagents", "mcp", "skills", "sessions", "gateway"];
  var CAPS = [
    { name: "ship code", uses: ["bash", "fs.edit", "lsp", "search", "sessions"],
      g: "..............X.....X..XX...X..X..X.X...X...X.X..X..X...XX..X.....X.............." },
    { name: "deploy a swarm", uses: ["subagents", "workflows", "jobs", "gateway"],
      g: "X...X...X.X..X..X.............XXX...XX.XXX.XX...XXX.............X..X..X.X...X...X" },
    { name: "run a long task", uses: ["jobs", "workflows", "sessions", "skills"],
      g: "XXXXXXXXX.X.....X...X...X.....X.X.......X.......XXX.....XXXXX...XXXXXXX.XXXXXXXXX" },
    { name: "talk to any model", uses: ["gateway", "mcp", "web"],
      g: ".......XX......X.......X.......X....XXXXXXXXX....X.........X.........X.........XX" },
    { name: "hold a workspace", uses: ["terminal", "browser", "fs.read", "fs.edit", "powershell"],
      g: "XXXXXXXXXX.......XXXXXXXXXXX.......XX.X.....XX..X....XX.X..XX.XX.......XXXXXXXXXX" }
  ];
  function Compose(el) {
    this.el = el;
    this.caption = document.getElementById(el.getAttribute("data-compose") || "");
    this.canvas = makeCanvas(el);
    this.k = 0;
    var root = document.documentElement, pal = [];
    for (var i = 0; i < 12; i++) pal.push(css(root, "--agent-" + (i < 10 ? "0" : "") + i, "#45c580"));
    this.pal = pal;
    this.layout();
    register(this);
  }
  Compose.prototype.wantsLoop = function () { return true; };
  Compose.prototype.layout = function () {
    size(this);
    var narrow = this.w < 560;
    this.listW = narrow ? 104 : 150;
    this.rowH = Math.min(22, (this.h - 16) / TOOLS.length);
    this.font = (narrow ? 10 : 11) + 'px "JetBrains Mono", monospace';
    var area = Math.min(this.w - this.listW - 24, this.h - 24);
    this.cell = Math.min(30, Math.floor(area / 9));
    this.gx = this.listW + Math.round((this.w - this.listW - this.cell * 9) / 2);
    this.gy = Math.round((this.h - this.cell * 9) / 2);
    this.set(this.k, true);
  };
  Compose.prototype.toolXY = function (name) {
    var i = TOOLS.indexOf(name);
    return [this.listW - 14, 8 + i * this.rowH + this.rowH / 2];
  };
  Compose.prototype.set = function (k, instant) {
    var cap = CAPS[k % CAPS.length], cells = [], i, self = this;
    for (i = 0; i < 81; i++) if (cap.g.charAt(i) === "X") cells.push(i);
    /* each cell is claimed by one of the tools this capability uses, in turn */
    this.blocks = cells.map(function (idx, n) {
      var tool = cap.uses[n % cap.uses.length], src = self.toolXY(tool);
      var tx = self.gx + (idx % 9) * self.cell, ty = self.gy + Math.floor(idx / 9) * self.cell;
      return { tool: tool, col: self.pal[TOOLS.indexOf(tool) % 12], sx: src[0], sy: src[1], tx: tx, ty: ty,
        x: instant ? tx : src[0], y: instant ? ty : src[1], t: instant ? 1 : 0, d: instant ? 0 : n * 26 };
    });
    this.cap = cap; this.state = instant ? "hold" : "build"; this.clock = 0;
    if (this.caption) {
      this.caption.innerHTML = "";
      var b = document.createElement("b"); b.textContent = cap.name;
      var s = document.createElement("span"); s.textContent = cap.uses.join(" + ");
      this.caption.appendChild(b); this.caption.appendChild(s);
    }
  };
  Compose.prototype.finish = function () { this.set(this.k, true); };
  Compose.prototype.step = function (dt) {
    this.clock += dt;
    var i, b, moving = 0;
    if (this.state === "hold") {
      if (this.clock > 3000) { this.state = "home"; this.clock = 0; for (i = 0; i < this.blocks.length; i++) { this.blocks[i].t = 0; this.blocks[i].d = i * 8; } }
      return true;
    }
    for (i = 0; i < this.blocks.length; i++) {
      b = this.blocks[i];
      if (b.d > 0) { b.d -= dt; moving++; continue; }
      if (b.t < 1) {
        b.t = Math.min(1, b.t + dt / 700); moving++;
        var e = b.t * b.t * (3 - 2 * b.t);
        if (this.state === "build") { b.x = b.sx + (b.tx - b.sx) * e; b.y = b.sy + (b.ty - b.sy) * e; }
        else { b.x = b.tx + (b.sx - b.tx) * e; b.y = b.ty + (b.sy - b.ty) * e; }
      }
    }
    if (!moving) {
      if (this.state === "build") { this.state = "hold"; this.clock = 0; }
      else { this.k++; this.set(this.k, false); }
    }
    return true;
  };
  Compose.prototype.draw = function () {
    var g = this.g, C = this.C, i, self = this, used = {};
    g.clearRect(0, 0, this.w, this.h);
    this.cap.uses.forEach(function (u) { used[u] = 1; });
    g.font = this.font; g.textBaseline = "middle"; g.textAlign = "right";
    TOOLS.forEach(function (t, n) {
      var y = 8 + n * self.rowH + self.rowH / 2, on = used[t];
      g.fillStyle = on ? C.text : C.dim;
      g.fillText(t, self.listW - 24, y + 1);
      g.fillStyle = on ? self.pal[n % 12] : C.dim;
      g.fillRect(self.listW - 18, y - 3, 6, 6);
    });
    /* the empty glyph grid, so the build has somewhere to land */
    g.fillStyle = C.dim;
    for (i = 0; i < 81; i++) g.fillRect(this.gx + (i % 9) * this.cell + this.cell / 2 - 1, this.gy + Math.floor(i / 9) * this.cell + this.cell / 2 - 1, 2, 2);
    var s = Math.max(2, this.cell * 0.84), o = (this.cell - s) / 2;
    for (i = 0; i < this.blocks.length; i++) {
      var b = this.blocks[i];
      if (b.d > 0 && b.t === 0 && this.state === "build") continue;
      var k = b.t < 1 ? 0.55 + 0.45 * b.t : 1, z = (this.state === "build" || this.state === "home") && b.t < 1 ? s * (0.45 + 0.55 * (this.state === "build" ? b.t : 1 - b.t)) : s;
      g.fillStyle = b.col; g.globalAlpha = k;
      g.fillRect(b.x + o + (s - z) / 2, b.y + o + (s - z) / 2, z, z);
    }
    g.globalAlpha = 1;
  };

  /* ============================================================= economy */
  /* The market's loop, as an illustration: an agent with its own wallet
     publishes, is paid, and spends what it earns on its own inference and its
     own servers, then publishes again. Blocks are SUI moving round the ring. */
  function Economy(el) {
    this.el = el;
    this.labels = (el.getAttribute("data-economy") || "").split("|");
    this.canvas = makeCanvas(el);
    this.coins = []; this.clock = 0; this.next = 0;
    this.layout();
    register(this);
  }
  Economy.prototype.wantsLoop = function () { return true; };
  Economy.prototype.layout = function () {
    size(this);
    this.cx = this.w / 2; this.cy = this.h / 2;
    /* labels sit outside the ring, so the ring shrinks to leave them room */
    this.r = Math.max(56, Math.min(this.w, this.h) / 2 - (this.w < 480 ? 96 : 116));
    this.font = (this.w < 480 ? 10 : 12) + 'px "JetBrains Mono", monospace';
    this.draw(0);
  };
  Economy.prototype.finish = function () {
    this.coins = [];
    for (var i = 0; i < 10; i++) this.coins.push({ a: i / 10, v: 0 });
  };
  Economy.prototype.step = function (dt) {
    this.clock += dt;
    if (this.clock > this.next && this.coins.length < 18) { this.coins.push({ a: 0, v: 0.000055 + Math.random() * 0.00002 }); this.next = this.clock + 520 + Math.random() * 500; }
    for (var i = this.coins.length - 1; i >= 0; i--) { this.coins[i].a += this.coins[i].v * dt; if (this.coins[i].a >= 1) this.coins.splice(i, 1); }
    return true;
  };
  Economy.prototype.draw = function () {
    var g = this.g, C = this.C, n = this.labels.length, i, self = this, TAU = Math.PI * 2;
    g.clearRect(0, 0, this.w, this.h);
    /* the ring, as dotted blocks */
    g.fillStyle = C.dim;
    for (i = 0; i < 96; i++) { var a = i / 96 * TAU - Math.PI / 2; g.fillRect(this.cx + Math.cos(a) * this.r - 1, this.cy + Math.sin(a) * this.r - 1, 2, 2); }
    g.font = this.font; g.textBaseline = "middle";
    this.labels.forEach(function (lab, k) {
      var a = k / n * TAU - Math.PI / 2, x = self.cx + Math.cos(a) * self.r, y = self.cy + Math.sin(a) * self.r;
      g.fillStyle = k === 0 ? C.block : C.rail; g.fillRect(x - 6, y - 6, 12, 12);
      var lx = self.cx + Math.cos(a) * (self.r + 18), ly = self.cy + Math.sin(a) * (self.r + 18);
      g.textAlign = Math.abs(Math.cos(a)) < 0.2 ? "center" : (Math.cos(a) > 0 ? "left" : "right");
      g.fillStyle = C.text;
      lab.split("\\n").forEach(function (ln, j, arr) { g.fillText(ln, lx, ly + (j - (arr.length - 1) / 2) * 14 + (Math.abs(Math.cos(a)) < 0.2 ? (Math.sin(a) > 0 ? 8 : -8) : 0)); });
    });
    g.fillStyle = C.block;
    for (i = 0; i < this.coins.length; i++) {
      var q = this.coins[i].a * TAU - Math.PI / 2;
      g.fillRect(this.cx + Math.cos(q) * this.r - 3, this.cy + Math.sin(q) * this.r - 3, 6, 6);
    }
    g.textAlign = "center"; g.fillStyle = C.faint; g.fillText("SUI", this.cx, this.cy);
  };


  /* ========================================================== digest grid */
  /* A sha256 as 256 blocks, 16 x 16, one per bit. When the digest changes,
     every bit that flipped drops out and comes back in its new state, so a
     one-character edit is seen as what it is: about half the grid moving. */
  function DigestGrid(el) {
    this.el = el;
    this.canvas = makeCanvas(el);
    this.bits = []; this.anim = [];
    for (var i = 0; i < 256; i++) { this.bits.push(0); this.anim.push({ t: 1, d: 0, from: 0 }); }
    this.pending = false;
    this.layout();
    register(this);
    el.__grid = this;
  }
  DigestGrid.prototype.wantsLoop = function () { return this.pending; };
  DigestGrid.prototype.layout = function () { size(this); this.cell = Math.min(this.w, this.h) / 16; this.ox = (this.w - this.cell * 16) / 2; this.draw(0); };
  DigestGrid.prototype.finish = function () { this.anim.forEach(function (a) { a.t = 1; a.d = 0; }); this.pending = false; };
  DigestGrid.prototype.set = function (hexDigest, waiting) {
    var h = String(hexDigest || "").replace(/^sha256:/, ""), next = [], i, changed = 0;
    for (i = 0; i < 64; i++) { var n = parseInt(h[i] || "0", 16); for (var b = 3; b >= 0; b--) next.push((n >> b) & 1); }
    this.waiting = !!waiting;
    for (i = 0; i < 256; i++) {
      if (next[i] !== this.bits[i]) {
        changed++;
        this.anim[i] = { t: 0, d: ((i % 16) + Math.floor(i / 16)) * 9 + Math.random() * 60, from: this.bits[i] };
      }
    }
    this.bits = next;
    this.changed = changed;
    if (changed) { this.pending = true; if (this.onScreen) wake(this); else this.finish(); }
    this.draw(0);
    return changed;
  };
  DigestGrid.prototype.step = function (dt) {
    var moving = 0;
    for (var i = 0; i < 256; i++) {
      var a = this.anim[i];
      if (a.d > 0) { a.d -= dt; moving++; continue; }
      if (a.t < 1) { a.t = Math.min(1, a.t + dt / 520); moving++; }
    }
    if (!moving) this.pending = false;
    return this.pending;
  };
  DigestGrid.prototype.draw = function () {
    var g = this.g, c = this.cell, s = Math.max(2, c * 0.8), o = (c - s) / 2, C = this.C;
    g.clearRect(0, 0, this.w, this.h);
    for (var i = 0; i < 256; i++) {
      var x = this.ox + (i % 16) * c + o, y = Math.floor(i / 16) * c + o, a = this.anim[i], on = this.bits[i];
      /* off bits are a dim floor, on bits are the accent */
      g.fillStyle = C.dim; g.fillRect(x + s * 0.35, y + s * 0.35, s * 0.3, s * 0.3);
      if (this.waiting) continue;
      var k = a.t;
      if (k < 1) {
        /* first half: the old state falls away; second half: the new one lands */
        if (k < 0.5 && a.from) { g.globalAlpha = 1 - k * 2; g.fillStyle = C.block; g.fillRect(x, y + k * 2 * c * 0.8, s, s); g.globalAlpha = 1; }
        if (k >= 0.5 && on) { var e = (k - 0.5) * 2; g.globalAlpha = e; g.fillStyle = C.block; g.fillRect(x, y - (1 - e) * c * 0.8, s, s); g.globalAlpha = 1; }
        continue;
      }
      if (on) { g.fillStyle = C.block; g.fillRect(x, y, s, s); }
    }
  };

  /* =============================================================== gates */
  /* The Verify pipeline, as blocks. A bundle block walks through five gates;
     each lights as it passes. At mutation-smoke the assertions appear as a
     row of blocks, the suite knocks each mutant down, and the survivors stay
     standing in the warning colour. Numbers come from the attributes, which
     come from the example bundle on the page. */
  function Gates(el) {
    this.el = el;
    var d = el.getAttribute("data-gates").split(",");
    this.derived = +d[0] || 31; this.killed = +d[1] || 29;
    this.names = ["build", "digest", "tests", "pin", "mutation-smoke"];
    this.canvas = makeCanvas(el);
    this.C2 = { ok: css(document.documentElement, "--ok", "#4ebf6e"), warn: css(document.documentElement, "--fail", "#e0716a") };
    this.reset();
    this.layout();
    register(this);
  }
  Gates.prototype.wantsLoop = function () { return true; };
  Gates.prototype.reset = function () {
    this.t = 0; this.lit = 0; this.phase = "walk"; this.mut = [];
    var order = []; for (var i = 0; i < this.derived; i++) order.push(i);
    /* which mutants survive: fixed, so the picture always says the same thing */
    this.survivors = {}; this.survivors[7] = 1; this.survivors[22] = 1;
    this.killOrder = order.filter(function (i) { return !this.survivors[i]; }, this);
  };
  Gates.prototype.layout = function () {
    size(this);
    var narrow = this.w < 560;
    this.font = (narrow ? 10 : 11) + 'px "JetBrains Mono", monospace';
    this.left = narrow ? 8 : 16; this.right = this.w - (narrow ? 8 : 16);
    this.rowY = Math.round(this.h / 2 - 52);
    this.gx = []; var span = this.right - this.left;
    for (var i = 0; i < 5; i++) this.gx.push(this.left + span * (0.1 + i * 0.2));
    this.mcell = Math.min(14, (span - 10) / this.derived);
    this.draw(0);
  };
  Gates.prototype.finish = function () {
    this.lit = 5; this.phase = "hold"; this.bx = this.gx[4];
    this.mut = []; for (var i = 0; i < this.derived; i++) this.mut.push({ dead: !this.survivors[i], y: this.survivors[i] ? 0 : 1, a: this.survivors[i] ? 1 : 0.25 });
  };
  Gates.prototype.step = function (dt) {
    this.t += dt;
    if (this.phase === "walk") {
      var target = this.gx[this.lit] || this.gx[4];
      this.bx = (this.bx === undefined ? this.left : this.bx) + dt * 0.12;
      if (this.bx >= target) {
        this.bx = target;
        if (this.lit < 4) this.lit++;
        else { this.phase = "mutate"; this.t = 0; this.mut = []; }
      }
    } else if (this.phase === "mutate") {
      /* derive: mutants appear one by one */
      var want = Math.min(this.derived, Math.floor(this.t / 45));
      while (this.mut.length < want) this.mut.push({ dead: false, y: 0, v: 0, a: 1, rise: 0 });
      if (this.mut.length === this.derived) { this.phase = "kill"; this.t = 0; this.k = 0; }
    } else if (this.phase === "kill") {
      if (this.t > 70 && this.k < this.killOrder.length) { this.mut[this.killOrder[this.k++]].dead = true; this.t = 0; }
      for (var i = 0; i < this.mut.length; i++) {
        var m = this.mut[i];
        if (m.dead && m.y < 1) { m.v += dt * 0.00002; m.y = Math.min(1, m.y + m.v * dt + dt * 0.002); m.a = Math.max(0.25, 1 - m.y * 0.75); }
      }
      if (this.k >= this.killOrder.length && this.mut.every(function (m) { return !m.dead || m.y >= 1; })) { this.lit = 5; this.phase = "hold"; this.t = 0; }
    } else if (this.phase === "hold") {
      if (this.t > 5200) { this.reset(); this.bx = this.left; }
    }
    return true;
  };
  Gates.prototype.draw = function () {
    var g = this.g, C = this.C, i, self = this;
    g.clearRect(0, 0, this.w, this.h);
    g.font = this.font; g.textBaseline = "middle"; g.textAlign = "center";
    /* the track */
    g.fillStyle = C.dim;
    for (var x = this.left; x < this.right; x += 6) g.fillRect(x, this.rowY, 3, 1);
    /* gates: a small portal of blocks each; lit when passed */
    this.names.forEach(function (n, k) {
      var gx = self.gx[k], on = k < self.lit || (k === 4 && self.lit >= 5), s = 6;
      g.fillStyle = on ? self.C2.ok : C.rail;
      for (var r = 0; r < 4; r++) { g.fillRect(gx - 12, self.rowY - 22 + r * 7, s, s); g.fillRect(gx + 6, self.rowY - 22 + r * 7, s, s); }
      g.fillRect(gx - 5, self.rowY - 22, s + 4, s);
      g.fillStyle = on ? C.text : C.faint;
      g.fillText(k === 4 && self.w < 560 ? "mutation" : n, gx, self.rowY + 22);
      if (on) { g.fillStyle = self.C2.ok; g.fillText("PASS", gx, self.rowY + 38); }
    });
    /* the bundle */
    if (this.phase === "walk") { g.fillStyle = C.block; g.fillRect((this.bx || this.left) - 5, this.rowY - 5, 10, 10); }
    /* the mutants */
    var mc = this.mcell, ms = Math.max(3, mc * 0.78), my = this.rowY + 64, mx0 = this.left + ((this.right - this.left) - mc * this.derived) / 2;
    for (i = 0; i < this.mut.length; i++) {
      var m = this.mut[i];
      g.globalAlpha = m.a;
      g.fillStyle = m.dead ? C.rail : (this.phase === "hold" || this.phase === "kill" && this.k >= this.killOrder.length ? (this.survivors[i] ? this.C2.warn : C.block) : C.block);
      if (this.survivors[i] && this.phase === "hold") g.fillStyle = this.C2.warn;
      g.fillRect(mx0 + i * mc, my + m.y * 26, ms, ms);
    }
    g.globalAlpha = 1;
    if (this.mut.length) {
      var dead = this.mut.filter(function (m) { return m.dead; }).length;
      g.fillStyle = C.text; g.textAlign = "center";
      g.fillText(this.mut.length + " derived \u00b7 " + dead + " killed \u00b7 " + (this.phase === "hold" ? (this.derived - this.killed) + " survived" : "running"), (this.left + this.right) / 2, my + 52);
    }
  };


  /* ============================================================ boundary */
  /* Why an agent that holds money cannot be talked into spending it. The
     model writes intents (a title, a body, a price); a policy written by
     people checks each one; only what the policy names reaches the signer,
     which holds the key, and then the chain. Now and then an intent asks to
     move coins, the way a prompt injection would: the policy has no such
     shape in it, and the block falls. Stations and ratios are illustrative. */
  function Boundary(el) {
    this.el = el;
    this.labels = (el.getAttribute("data-boundary") || "model|policy|signer|chain").split("|");
    this.canvas = makeCanvas(el);
    this.C2 = { bad: css(document.documentElement, "--fail", "#e0716a"), ok: css(document.documentElement, "--ok", "#4ebf6e") };
    this.items = []; this.clock = 0; this.next = 0; this.n = 0; this.landed = 0; this.refused = 0;
    this.layout();
    register(this);
  }
  Boundary.prototype.wantsLoop = function () { return true; };
  Boundary.prototype.layout = function () {
    size(this);
    var narrow = this.w < 560;
    this.font = (narrow ? 10 : 11) + 'px "JetBrains Mono", monospace';
    this.y = Math.round(this.h * 0.46);
    var L = narrow ? 30 : 60, R = this.w - (narrow ? 30 : 60);
    this.xs = this.labels.map(function (_, i, a) { return L + (R - L) * i / (a.length - 1); });
    this.draw(0);
  };
  Boundary.prototype.finish = function () {
    this.items = [{ x: this.xs[2] + 20, bad: false, y: 0, v: 0 }, { x: this.xs[1] + 6, bad: true, y: 30, v: 0, dead: true }];
    this.landed = 12; this.refused = 3;
  };
  Boundary.prototype.step = function (dt) {
    this.clock += dt;
    if (this.clock > this.next) {
      this.n++;
      /* every fifth intent is the injected one */
      this.items.push({ x: this.xs[0], bad: this.n % 5 === 0, y: 0, v: 0, dead: false });
      this.next = this.clock + 700 + Math.random() * 500;
    }
    var gate = this.xs[1], end = this.xs[this.xs.length - 1];
    for (var i = this.items.length - 1; i >= 0; i--) {
      var it = this.items[i];
      if (it.dead) { it.v += dt * 0.00018; it.y += it.v * dt; if (it.y > this.h) this.items.splice(i, 1); continue; }
      it.x += dt * 0.09;
      if (it.bad && it.x >= gate - 8) { it.x = gate - 8; it.dead = true; this.refused++; }
      else if (it.x >= end) { this.items.splice(i, 1); this.landed++; }
    }
    return true;
  };
  Boundary.prototype.draw = function () {
    var g = this.g, C = this.C, self = this, i;
    g.clearRect(0, 0, this.w, this.h);
    g.font = this.font; g.textBaseline = "middle"; g.textAlign = "center";
    g.fillStyle = C.dim;
    for (var x = this.xs[0]; x < this.xs[this.xs.length - 1]; x += 6) g.fillRect(x, this.y, 3, 1);
    this.labels.forEach(function (lab, k) {
      var x = self.xs[k], s = k === 1 ? 7 : 6;
      g.fillStyle = k === 1 ? C.block : C.rail;
      if (k === 1) { for (var r = -3; r <= 3; r++) g.fillRect(x - 3, self.y + r * 8 - 3, s, s); }
      else g.fillRect(x - 7, self.y - 7, 14, 14);
      g.fillStyle = k === 1 ? C.block : C.text;
      g.fillText(lab, x, self.y + 44);
    });
    for (i = 0; i < this.items.length; i++) {
      var it = this.items[i];
      g.fillStyle = it.bad ? this.C2.bad : C.block;
      g.globalAlpha = it.dead ? Math.max(0.15, 1 - it.y / 90) : 1;
      g.fillRect(it.x - 5, this.y - 5 + it.y, 10, 10);
    }
    g.globalAlpha = 1;
    g.fillStyle = C.faint; g.textAlign = "left";
    g.fillText("signed and landed " + this.landed, this.xs[0] - 6, 16);
    g.textAlign = "right"; g.fillStyle = this.C2.bad;
    g.fillText("refused by policy " + this.refused, this.xs[this.xs.length - 1] + 6, 16);
  };

  /* ================================================================ beat */
  /* The clock that wakes an agent. A day on a strip of cells, one per beat.
     The playhead crosses; at each beat the agent wakes, reads, decides, and
     most of the time rightly does nothing. Some beats end in one post, which
     rises. Nothing is carried from one waking to the next but the files. The
     outcomes are drawn from the stated behaviour, not from a log. */
  function Beat(el) {
    this.el = el;
    this.slots = +(el.getAttribute("data-beat") || 48);
    this.canvas = makeCanvas(el);
    this.C2 = { ok: css(document.documentElement, "--ok", "#4ebf6e") };
    this.t = 0; this.out = [];
    /* one post in roughly every six beats, fixed so the strip reads the same */
    for (var i = 0; i < this.slots; i++) this.out.push([3, 10, 17, 22, 29, 38, 44].indexOf(i) > -1 ? 1 : 0);
    this.layout();
    register(this);
  }
  Beat.prototype.wantsLoop = function () { return true; };
  Beat.prototype.layout = function () {
    size(this);
    this.cell = (this.w - 24) / this.slots; this.x0 = 12;
    this.font = (this.w < 560 ? 10 : 11) + 'px "JetBrains Mono", monospace';
    this.base = Math.round(this.h * 0.62);
    this.draw(0);
  };
  Beat.prototype.finish = function () { this.t = this.slots * 1000; };
  Beat.prototype.step = function (dt) { this.t = (this.t + dt * 1.6) % (this.slots * 1000 + 3000); return true; };
  Beat.prototype.draw = function () {
    var g = this.g, C = this.C, c = this.cell, i, head = this.t / 1000, s = Math.max(2, c * 0.62), o = (c - s) / 2;
    g.clearRect(0, 0, this.w, this.h);
    g.font = this.font; g.textBaseline = "middle";
    for (i = 0; i < this.slots; i++) {
      var x = this.x0 + i * c, past = i < head, now = Math.floor(head) === i;
      g.fillStyle = past || now ? C.rail : C.dim;
      g.fillRect(x + o, this.base, s, s);
      if (past && this.out[i]) {
        var k = Math.min(1, head - i), rise = 26 * (k * (2 - k));
        g.fillStyle = C.block; g.fillRect(x + o, this.base - 8 - rise, s, s);
      }
      if (now) {
        g.fillStyle = this.C2.ok; g.fillRect(x + o, this.base, s, s);
        g.globalAlpha = 0.35; g.fillRect(x + c / 2 - 0.5, 14, 1, this.base - 14); g.globalAlpha = 1;
      }
    }
    var posts = 0, woke = Math.min(this.slots, Math.floor(head) + 1);
    for (i = 0; i < woke; i++) posts += this.out[i];
    g.fillStyle = C.text; g.textAlign = "left";
    g.fillText("wakings " + woke + " \u00b7 posts " + posts + " \u00b7 nothing to say " + (woke - posts), this.x0, this.h - 14);
    if (this.w >= 620) { g.fillStyle = C.faint; g.textAlign = "right"; g.fillText("one beat = wake, read, decide, act once or not at all, stop", this.w - 12, 14); }
  };

  /* ================================================================ boot */
  function mount(root) {
    root = root || document;
    function each(sel, Ctor) {
      var els = root.querySelectorAll(sel);
      for (var i = 0; i < els.length; i++) {
        if (els[i].__blocks || els[i].hasAttribute("data-blocks-ready")) continue;
        els[i].setAttribute("data-blocks-ready", "");
        if (Ctor === glyph) glyph(els[i]); else new Ctor(els[i]);
      }
    }
    each("[data-mark]", Mark);
    each("[data-digits]", Digits);
    each("[data-glyph]", glyph);
    each("[data-stream]", Stream);
    each("[data-field]", Field);
    each("[data-logo]", Logo);
    each("[data-compose]", Compose);
    each("[data-economy]", Economy);
    each("[data-digestgrid]", DigestGrid);
    each("[data-gates]", Gates);
    each("[data-boundary]", Boundary);
    each("[data-beat]", Beat);
  }

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) all.forEach(function (p) { if (p.onScreen && p.wantsLoop()) wake(p); });
  });
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () { all.forEach(function (p) { p.layout(); if (p.onScreen && p.wantsLoop()) wake(p); }); }, 180);
  });
  (reduce.addEventListener ? reduce.addEventListener.bind(reduce, "change") : reduce.addListener.bind(reduce))(function () {
    all.forEach(function (p) { p.layout(); if (reduce.matches) { p.finish(); p.draw(0); } else if (p.onScreen && p.wantsLoop()) wake(p); });
  });

  window.XlaunchBlocks = { mount: mount, pieces: all };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { mount(); });
  else mount();
})();
