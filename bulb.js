/* =========================================================================
   bulb.js — a little lightbulb who hops in, finds the "i" in your name,
   screws herself onto its dot, and lights up.
   Home page only. Plays once per visit (per browser tab); after that she's
   already lit. Click her to switch the light off / on.
   Respects "reduce motion" (she just appears, already lit).
   ========================================================================= */
(() => {
  const sig = document.querySelector("h1 .sig");
  if (!sig || !sig.textContent.toLowerCase().includes("i")) return;
  document.body.classList.add("has-bulb");

  /* ---------- 1. swap the "i" for a dotless "ı" so she can BE the dot ---------- */
  const original = sig.textContent;
  const at = original.toLowerCase().indexOf("i");
  sig.setAttribute("aria-hidden", "true");
  sig.innerHTML =
    esc(original.slice(0, at)) +
    '<span class="i-stem">ı<span class="i-base"></span></span>' +
    esc(original.slice(at + 1));
  const sr = document.createElement("span");          // screen readers still hear the real name
  sr.className = "vh"; sr.textContent = original;
  sig.after(sr);
  function esc(t) { return t.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }

  /* ---------- 2. the character ---------- */
  const W = 60, H = 86;                                 // SVG units; base contact point is (30, 84)
  const wrap = document.createElement("div");
  wrap.className = "bulb"; wrap.setAttribute("aria-hidden", "true");
  wrap.innerHTML = `
  <svg viewBox="0 0 ${W} ${H}" data-face="curious">
    <defs>
      <radialGradient id="bulb-glow" cx="50%" cy="38%" r="62%">
        <stop offset="0" stop-color="#fffaf0"/><stop offset=".55" stop-color="#ffe9a8"/><stop offset="1" stop-color="#ffd27f"/>
      </radialGradient>
    </defs>
    <g class="body">
      <circle class="halo" cx="30" cy="28" r="28"/>
      <path class="glass" d="M30 4 C45 4 54 15 54 28 C54 38 47 44 42 50 C40 53 39 56 39 59 L21 59 C21 56 20 53 18 50 C13 44 6 38 6 28 C6 15 15 4 30 4 Z"/>
      <path class="gleam" d="M14 22 C15 15 20 10 26 9"/>
      <g class="base">
        <rect x="20" y="59" width="20" height="6" rx="3"/>
        <rect x="21" y="65.5" width="18" height="5.5" rx="2.75"/>
        <rect x="22.5" y="71.5" width="15" height="5" rx="2.5"/>
        <path d="M25 77 h10 q-.5 6 -5 7 q-4.5 -1 -5 -7 z"/>
      </g>
      <g class="bow" transform="rotate(18 45 8)">
        <path d="M45 8 C41 3 36 5 38 9 C36 13 41 13 45 8 Z"/>
        <path d="M45 8 C49 3 54 5 52 9 C54 13 49 13 45 8 Z"/>
        <circle cx="45" cy="8" r="1.8"/>
      </g>
      <g class="face">
        <g class="specs"><circle cx="21" cy="30" r="7"/><circle cx="39" cy="30" r="7"/><path d="M28 29.5 q2 -1.5 4 0"/></g>
        <g class="eyes open">
          <g class="lashes"><path d="M17.6 27.4 q-2 -.6 -3.2 -2.6"/><path d="M18.8 26.4 q-1 -1.2 -1.1 -3.2"/><path d="M42.4 27.4 q2 -.6 3.2 -2.6"/><path d="M41.2 26.4 q1 -1.2 1.1 -3.2"/></g>
          <g class="pupils">
            <ellipse cx="21" cy="30.5" rx="3" ry="3.6"/><ellipse cx="39" cy="30.5" rx="3" ry="3.6"/>
            <circle class="shine" cx="22.1" cy="29.2" r="1.15"/><circle class="shine" cx="40.1" cy="29.2" r="1.15"/>
            <circle class="shine" cx="20.2" cy="32" r=".55"/><circle class="shine" cx="38.2" cy="32" r=".55"/>
          </g>
        </g>
        <g class="eyes squint"><path d="M18.5 28 l3.5 2.2 l-3.5 2.2"/><path d="M41.5 28 l-3.5 2.2 l3.5 2.2"/></g>
        <g class="eyes happy"><path d="M17.8 31.5 q3.2 -4.4 6.4 0"/><path d="M35.8 31.5 q3.2 -4.4 6.4 0"/></g>
        <g class="blush"><ellipse cx="14.5" cy="38" rx="2.8" ry="1.5"/><ellipse cx="45.5" cy="38" rx="2.8" ry="1.5"/></g>
        <g class="mouth o"><ellipse cx="30" cy="40" rx="1.5" ry="1.8"/></g>
        <g class="mouth smile"><path d="M27 39.2 q1.5 1.8 3 0 q1.5 1.8 3 0"/></g>
        <g class="mouth grin"><path d="M26.6 38.6 q3.4 5 6.8 0 z"/></g>
        <g class="mouth tight"><path d="M28.3 40 q1.7 .9 3.4 0"/></g>
      </g>
      <g class="spark"><path d="M52 15 l3 -2 M54 20 l3.5 0 M50 11 l1.5 -3"/></g>
      <g class="rays"><path d="M30 -3 v-3 M10 8 l-2 -2 M50 8 l2 -2 M2 28 h-3 M58 28 h3 M9 47 l-2 2 M51 47 l2 2"/></g>
    </g>
  </svg>`;
  const dot = document.createElement("div");
  dot.className = "i-dot"; dot.setAttribute("aria-hidden", "true");
  document.body.append(dot, wrap);
  const svg = wrap.querySelector("svg");
  const face = f => svg.dataset.face = f;               // curious | searching | spotted | effort | joy | dark
  const look = (x, y = 0) => svg.style.setProperty("--look", `translate(${x}px, ${y}px)`);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  /* ---------- 3. geometry: where is the dot of the "i"? ---------- */
  function target() {
    const stem = sig.querySelector(".i-stem"), base = sig.querySelector(".i-base");
    const em = parseFloat(getComputedStyle(sig).fontSize);
    const r = stem.getBoundingClientRect(), baseline = base.getBoundingClientRect().top;
    const slant = Math.tan(13 * Math.PI / 180);          // Instrument Serif italic lean
    const rise = 0.60 * em;                              // dot height above the baseline
    return {
      x: r.left + r.width * 0.5 + slant * rise + scrollX,
      y: baseline - rise + scrollY,
      em
    };
  }
  function size(em) { const h = Math.max(34, em * 0.74); return { w: h * W / H, h }; }
  // place the bulb so its base contact point (30,84) sits at (x, y)
  function place(x, y, s) {
    wrap.style.width = s.w + "px"; wrap.style.height = s.h + "px";
    wrap.style.left = (x - s.w * 30 / W) + "px";
    wrap.style.top = (y - s.h * 84 / H) + "px";
  }
  function placeDot(t) {
    const d = Math.max(6, t.em * 0.13);
    Object.assign(dot.style, { width: d + "px", height: d + "px", left: (t.x - d / 2) + "px", top: (t.y - d / 2) + "px" });
  }

  /* ---------- 4. light switch (click her) ---------- */
  let lit = false;
  const light = on => { lit = on; wrap.classList.toggle("on", on); face(on ? "joy" : "dark"); };
  wrap.addEventListener("click", () => { if (wrap.classList.contains("done")) light(!lit); });

  const settle = () => { const t = target(); placeDot(t); place(t.x, t.y, size(t.em)); };
  addEventListener("resize", () => { if (wrap.classList.contains("done")) settle(); });

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("calm");
  let seen = false; try { seen = sessionStorage.getItem("bulb-seen") === "1"; } catch {}

  const finish = () => { settle(); wrap.classList.add("done"); light(true); try { sessionStorage.setItem("bulb-seen", "1"); } catch {} };

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(async () => {
    const t = target(), s = size(t.em);
    placeDot(t);
    if (reduce || seen) { finish(); return; }

    /* ---------- 5. the little story ---------- */
    const wrapEl = document.querySelector(".wrap").getBoundingClientRect();
    const sub = document.querySelector(".sub") || sig;
    const floor = sub.getBoundingClientRect().bottom + scrollY + s.h * 0.95;   // she walks in the space under your tagline
    const startX = wrapEl.right + scrollX + s.w;                        // off to the right
    const nearX = t.x + s.w * 1.6;                                      // a little right of the "i"
    const hop = (x0, x1, y0, y1, height, ms) => {
      // arc from (x0,y0) to (x1,y1), with squash on take-off and landing
      const k = [];
      for (let i = 0; i <= 10; i++) {
        const p = i / 10, x = x0 + (x1 - x0) * p, y = y0 + (y1 - y0) * p - height * 4 * p * (1 - p);
        const sq = i === 0 || i === 10 ? "scale(1.12, .86)" : i === 1 || i === 9 ? "scale(.94, 1.08)" : "scale(1,1)";
        k.push({ transform: `translate(${x - x1}px, ${y - y1}px) ${sq}`, offset: p });
      }
      place(x1, y1, s);
      return wrap.animate(k, { duration: ms, easing: "linear" }).finished;
    };

    wrap.classList.add("show");
    place(startX, floor, s);

    // peek in, curious, looking left
    face("curious"); look(-1.4);
    await hop(startX, startX - s.w * 1.4, floor, floor, s.h * 0.35, 520);
    // two little hops toward the name
    const mid = (startX - s.w * 1.4 + nearX) / 2;
    await hop(startX - s.w * 1.4, mid, floor, floor, s.h * 0.5, 480);
    await hop(mid, nearX, floor, floor, s.h * 0.5, 480);

    // where is it? look around
    face("searching");
    look(-1.6); await sleep(380);
    look(1.6);  await sleep(380);
    look(-1.6, -1); await sleep(320);

    // there! look up at the dot
    look(-0.8, -1.8); face("spotted");
    wrap.animate([{ transform: "translateY(0)" }, { transform: "translateY(-6px)" }, { transform: "translateY(0)" }], { duration: 260, easing: "ease-out" });
    await sleep(650);

    // big jump onto the dot
    look(0, -1);
    await hop(nearX, t.x, floor, t.y, s.h * 1.1 + (floor - t.y) * 0.4, 720);

    // twist, twist, twist — screwing herself in
    face("effort"); look(0);
    const twist = [];
    for (let i = 0; i <= 6; i++) twist.push({ transform: `translateY(${i * 0.5}px) scaleX(${i % 2 ? -1 : 1})`, offset: i / 6 });
    await wrap.animate(twist, { duration: 1100, easing: "ease-in-out" }).finished;
    wrap.animate([{ transform: "translateY(3px)" }, { transform: "translateY(0)" }], { duration: 160 });
    await sleep(220);

    // click — light!
    finish();
    wrap.classList.add("pop");
  });
})();
