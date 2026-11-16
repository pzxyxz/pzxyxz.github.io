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
      <radialGradient id="bulb-glow" cx="50%" cy="40%" r="60%">
        <stop offset="0" stop-color="#fff6dc"/><stop offset=".6" stop-color="#ffd877"/><stop offset="1" stop-color="#ffb938"/>
      </radialGradient>
    </defs>
    <g class="body">
      <ellipse class="halo" cx="30" cy="33" rx="31" ry="25"/>
      <path class="glass" d="M30 14 C47 14 56 21 56 31 C56 40 48 45 43 50 C41 53 40 56 40 59 L20 59 C20 56 19 53 17 50 C12 45 4 40 4 31 C4 21 13 14 30 14 Z"/>
      <path class="filament" d="M20 22 C24 16.5 34 15.5 39 19 C42 21.5 38.5 25 35.5 22"/>
      <g class="base">
        <rect x="19.5" y="59" width="21" height="6" rx="1.5"/>
        <rect class="b2" x="20.5" y="65" width="19" height="5.5" rx="1.5"/>
        <rect x="21.5" y="70.5" width="17" height="5.5" rx="1.5"/>
        <path class="b2" d="M24 76 h12 l-2.5 7.5 h-7 z"/>
      </g>
      <g class="face">
        <g class="brows"><path class="bl" d="M13.5 24.6 L22 22.8"/><path class="br" d="M46.5 24.6 L38 22.8"/></g>
        <g class="specs"><rect x="12.5" y="28" width="13" height="9" rx="1.2"/><rect x="34.5" y="28" width="13" height="9" rx="1.2"/><path d="M25.5 31.6 h9"/></g>
        <g class="eyes open">
          <path class="lid" d="M16.2 32.6 q2.8 -2.8 5.6 0 q-2.8 2.4 -5.6 0 z"/><path class="lid" d="M38.2 32.6 q2.8 -2.8 5.6 0 q-2.8 2.4 -5.6 0 z"/>
          <g class="pupils"><circle cx="19" cy="32.6" r="1.25"/><circle cx="41" cy="32.6" r="1.25"/></g>
          <path class="wing" d="M16.2 32.4 l-2 -1.5 M43.8 32.4 l2 -1.5"/>
        </g>
        <g class="eyes narrow">
          <path class="lid" d="M16.2 33 q2.8 -1.6 5.6 0 q-2.8 1.3 -5.6 0 z"/><path class="lid" d="M38.2 33 q2.8 -1.6 5.6 0 q-2.8 1.3 -5.6 0 z"/>
          <g class="pupils"><circle cx="19" cy="33" r=".9"/><circle cx="41" cy="33" r=".9"/></g>
          <path class="wing" d="M16.2 32.8 l-2 -1.3 M43.8 32.8 l2 -1.3"/>
        </g>
        <g class="eyes wink">
          <path class="lid" d="M16.2 32.8 q2.8 -2.3 5.6 0 q-2.8 2 -5.6 0 z"/><circle class="dotp" cx="19" cy="32.9" r="1.05"/>
          <path d="M38.2 33.2 q2.8 1.8 5.6 0"/>
          <path class="wing" d="M16.2 32.6 l-2 -1.4 M43.8 33.2 l2 -1.2"/>
        </g>
        <g class="mouth smirk"><path class="lip" d="M25.5 41 q4.6 2.6 9.6 -1.4 q-4.4 4.6 -9.6 1.4 z"/></g>
        <g class="mouth flat"><path d="M26.5 41.6 h7"/></g>
        <g class="mouth grin"><path class="lip" d="M25 40.2 q5 5.2 10 -1.2 q-5 2.4 -10 1.2 z"/></g>
      </g>
      <g class="spark"><path d="M53 14 l3 -3 M56 19 h4 M50 10 l1 -4"/></g>
      <g class="rays"><path d="M30 8 v-5 M10 17 l-3 -3 M50 17 l3 -3 M1 33 h-4 M59 33 h4 M8 49 l-3 3 M52 49 l3 3"/></g>
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
  function size(em) { const h = Math.max(36, em * 0.82); return { w: h * W / H, h }; }
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
