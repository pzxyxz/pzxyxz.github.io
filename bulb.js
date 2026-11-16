/* =========================================================================
   bulb.js — a little lightbulb who hops in, finds the "i" in your name,
   screws herself onto its dot, and lights up.

   Talk to her:
     click once      -> light off / on
     double-click    -> she hides (the "i" gets its normal dot back)
     try to drag her -> she bolts, then comes back from somewhere new with a
                        different routine every time
   Plays once per visit (per tab); after that she's already lit.
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
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  /* ---------- 3. geometry ---------- */
  function target() {
    const stem = sig.querySelector(".i-stem"), base = sig.querySelector(".i-base");
    const em = parseFloat(getComputedStyle(sig).fontSize);
    const r = stem.getBoundingClientRect(), baseline = base.getBoundingClientRect().top;
    const slant = Math.tan(13 * Math.PI / 180);          // Instrument Serif italic lean
    const rise = 0.60 * em;                              // dot height above the baseline
    return { x: r.left + r.width * 0.5 + slant * rise + scrollX, y: baseline - rise + scrollY, em };
  }
  // her size: change 0.6 to make her bigger / smaller
  function size(em) { const h = Math.max(30, em * 0.6); return { w: h * W / H, h }; }
  let pos = { x: 0, y: 0 }, S = { w: 0, h: 0 };
  // place her so her base contact point (30,84) sits at (x, y)
  function place(x, y) {
    pos = { x, y };
    wrap.style.width = S.w + "px"; wrap.style.height = S.h + "px";
    wrap.style.left = (x - S.w * 30 / W) + "px";
    wrap.style.top = (y - S.h * 84 / H) + "px";
  }
  function placeDot(t) {
    const d = Math.max(6, t.em * 0.13);
    Object.assign(dot.style, { width: d + "px", height: d + "px", left: (t.x - d / 2) + "px", top: (t.y - d / 2) + "px" });
  }

  /* ---------- 4. a real hop: crouch → launch → lean through the air → squash → settle ---------- */
  function hop(x1, y1, height, ms = 640, extra = {}) {
    const x0 = pos.x, y0 = pos.y, dir = Math.sign(x1 - x0) || 1, lean = (extra.lean ?? 12) * dir;
    const spin = extra.flip ? 360 * dir : 0;
    const k = [];
    const T = (dx, dy, sx, sy, r) => `translate(${dx}px, ${dy}px) rotate(${r}deg) scale(${sx}, ${sy})`;
    // all keyframes are relative to the landing spot (x1, y1)
    k.push({ offset: 0,    transform: T(x0 - x1, y0 - y1, 1, 1, 0) });
    k.push({ offset: .16,  transform: T(x0 - x1, y0 - y1, 1.18, .74, -lean * .4), easing: "cubic-bezier(.3,0,.2,1)" }); // crouch (anticipation)
    k.push({ offset: .24,  transform: T(x0 - x1, y0 - y1 - 2, .82, 1.24, lean * .6) });                                   // spring off, stretched
    const N = 8;
    for (let i = 1; i < N; i++) {                                                                                          // the arc
      const p = i / N, x = x0 + (x1 - x0) * p, y = y0 + (y1 - y0) * p - height * 4 * p * (1 - p);
      const st = 1 + .1 * Math.cos(p * Math.PI);                                                                          // stretched going up/down, round at the top
      k.push({ offset: .24 + .52 * p, transform: T(x - x1, y - y1, 2 - st, st, lean * (1 - 2 * p) + spin * p) });
    }
    k.push({ offset: .76,  transform: T(0, 0, .9, 1.14, -lean * .5 + spin) });                                            // touch down
    k.push({ offset: .84,  transform: T(0, 0, 1.22, .76, 0 + spin), easing: "ease-out" });                                // squash
    k.push({ offset: .93,  transform: T(0, 0, .95, 1.06, 0 + spin) });                                                    // rebound
    k.push({ offset: 1,    transform: T(0, 0, 1, 1, spin) });
    place(x1, y1);
    return wrap.animate(k, { duration: ms, easing: "linear" }).finished;
  }
  const bounce = (h = 6, ms = 300) => wrap.animate([
    { transform: "scale(1,1)" }, { transform: "scale(1.12,.86)", offset: .2 },
    { transform: `translateY(${-h}px) scale(.92,1.1)`, offset: .55 }, { transform: "scale(1.08,.92)", offset: .85 }, { transform: "none" }
  ], { duration: ms }).finished;

  /* ---------- 5. her moves (mixed and matched every time) ---------- */
  const lookAround = async () => { face("searching"); look(-1.6); await sleep(360); look(1.6); await sleep(360); look(-1.2, -1); await sleep(300); };
  const doubleTake = async () => { face("searching"); look(1.6); await sleep(420); look(-1.6); await sleep(140); face("spotted"); look(-1.8, -1.4); await bounce(4, 240); await sleep(240); };
  const twirl = async () => { face("curious"); await wrap.animate([{ transform: "rotate(0)" }, { transform: "rotate(-12deg) scale(1.08,.92)", offset: .2 }, { transform: "rotate(360deg)" }], { duration: 650, easing: "ease-in-out" }).finished; };
  const tiptoe = async () => { face("curious"); for (let i = 0; i < 3; i++) await bounce(3, 200); };
  const peekUp = async () => { face("curious"); look(-.6, -1.8); await sleep(500); look(0, 0); await sleep(220); };
  const excited = async () => { face("spotted"); await bounce(8, 320); await bounce(6, 280); };
  const MIDDLES = { lookAround, doubleTake, twirl, tiptoe, peekUp };

  async function screwIn(turns) {
    face("effort"); look(0);
    const k = [];
    for (let i = 0; i <= turns * 2; i++) k.push({ transform: `translateY(${i * .4}px) scaleX(${i % 2 ? -1 : 1})`, offset: i / (turns * 2) });
    await wrap.animate(k, { duration: 300 * turns, easing: "ease-in-out" }).finished;
    await wrap.animate([{ transform: "translateY(2px)" }, { transform: "none" }], { duration: 160 }).finished;
  }

  /* ---------- 6. the routine: a different combination each time ---------- */
  let last = "";
  function newPlan() {
    let plan, key, n = 0;
    do {
      plan = {
        entry: pick(["right", "left", "drop"]),
        hops: Math.floor(rand(1, 4)),
        middle: [...Object.keys(MIDDLES)].sort(() => Math.random() - .5).slice(0, Math.random() < .5 ? 1 : 2),
        finale: pick(["jump", "flip", "stepJump"]),
        turns: Math.floor(rand(2, 5))
      };
      key = [plan.entry, plan.hops, plan.middle.join("+"), plan.finale].join("|");
    } while (key === last && ++n < 10);
    last = key;
    return plan;
  }

  let state = "idle";                                   // idle | playing | done | gone
  async function play(plan) {
    state = "playing";
    wrap.classList.remove("done", "on", "pop", "gone");
    wrap.getAnimations().forEach(a => a.cancel());
    const t = target(); S = size(t.em); placeDot(t);
    const box = document.querySelector(".wrap").getBoundingClientRect();
    const sub = document.querySelector(".sub") || sig;
    const floor = sub.getBoundingClientRect().bottom + scrollY + S.h * 0.95;
    const left = box.left + scrollX, right = box.right + scrollX;
    const step = S.w * 2.2;

    // entry
    face("curious"); look(plan.entry === "left" ? 1.4 : -1.4);
    wrap.classList.add("show");
    if (plan.entry === "drop") {
      const x = rand(left + S.w, right - S.w);
      place(x, scrollY - S.h);                           // above the top of the screen
      await wrap.animate([{ transform: "translateY(0)" }, { transform: `translateY(${floor - (scrollY - S.h)}px) scale(.9,1.12)`, offset: .85, easing: "ease-in" }, { transform: `translateY(${floor - (scrollY - S.h)}px) scale(1.25,.72)` }], { duration: 700, easing: "cubic-bezier(.5,0,1,1)" }).finished;
      place(x, floor); await bounce(10, 380);
    } else {
      const from = plan.entry === "left" ? left - S.w : right + S.w;
      place(from, floor);
      await hop(from + (plan.entry === "left" ? step : -step), floor, S.h * .6, 600);
    }

    // hops toward the "i" (stop a little to its side)
    const side = pos.x > t.x ? 1 : -1;
    const near = t.x + side * S.w * 1.6;
    for (let i = plan.hops; i >= 1; i--) {
      const x = near + (pos.x - near) * ((i - 1) / i);
      face(i === 1 ? "searching" : "curious");
      await hop(x, floor, S.h * rand(.45, .75), rand(560, 700));
      await sleep(rand(80, 200));
    }

    // a little personality
    for (const m of plan.middle) await MIDDLES[m]();

    // spot it
    face("spotted"); look(-side * .8, -1.8);
    await excited(); await sleep(250);

    // get up there
    look(0, -1);
    const up = S.h * 1.0 + (floor - t.y) * .45;
    if (plan.finale === "stepJump") {
      await hop(t.x + side * S.w * .7, (floor + t.y) / 2 + S.h * .3, S.h * .7, 560);   // a small hop first
      await hop(t.x, t.y, S.h * .9, 600);
    } else {
      await hop(t.x, t.y, up, 760, { flip: plan.finale === "flip" });
    }

    await screwIn(plan.turns);
    finish(true);
  }

  /* ---------- 7. lit, off, hidden ---------- */
  let lit = false;
  const light = on => { lit = on; wrap.classList.toggle("on", on); face(on ? "joy" : "dark"); };
  const settle = () => { const t = target(); S = size(t.em); placeDot(t); place(t.x, t.y); };
  function finish(pop) {
    settle(); state = "done"; wrap.classList.add("show", "done"); light(true);
    if (pop) { wrap.classList.remove("pop"); void wrap.offsetWidth; wrap.classList.add("pop"); }
    try { sessionStorage.setItem("bulb-seen", "1"); } catch {}
  }
  async function hide() {
    state = "gone";
    await wrap.animate([{ transform: "none", opacity: 1 }, { transform: "scale(1.15,.85)", offset: .25 }, { transform: "translateY(-14px) scale(0)", opacity: 0 }], { duration: 380, easing: "ease-in" }).finished;
    wrap.classList.add("gone"); wrap.classList.remove("show", "done", "on");
  }
  async function runAway() {
    state = "playing"; wrap.classList.remove("done", "pop");
    face("spotted");
    const dir = pick([-1, 1]);
    await wrap.animate([{ transform: "none" }, { transform: "scale(1.2,.8)", offset: .2 }, { transform: `translate(${dir * 60}px, -80px) rotate(${dir * 200}deg) scale(.2)`, opacity: 0 }], { duration: 450, easing: "cubic-bezier(.5,0,1,1)" }).finished;
    wrap.classList.remove("show");
    await sleep(500);
    play(newPlan());
  }
  addEventListener("resize", () => { if (state === "done") settle(); });

  /* ---------- 8. her controls: tap, double-tap, drag ---------- */
  let downAt = null, dragged = false, tapTimer = null;
  wrap.addEventListener("pointerdown", e => { downAt = { x: e.clientX, y: e.clientY }; dragged = false; wrap.setPointerCapture(e.pointerId); });
  wrap.addEventListener("pointermove", e => {
    if (!downAt || dragged) return;
    if (Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 8) {
      dragged = true; downAt = null; clearTimeout(tapTimer); tapTimer = null;
      if (state === "done") runAway();
    }
  });
  wrap.addEventListener("pointerup", () => {
    if (!downAt) return;
    downAt = null;
    if (state !== "done") return;
    if (tapTimer) { clearTimeout(tapTimer); tapTimer = null; hide(); return; }    // second tap = double-click
    tapTimer = setTimeout(() => { tapTimer = null; if (state === "done") light(!lit); }, 260);
  });
  wrap.addEventListener("dragstart", e => e.preventDefault());

  /* ---------- 9. go ---------- */
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("calm");
  let seen = false; try { seen = sessionStorage.getItem("bulb-seen") === "1"; } catch {}
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    const t = target(); S = size(t.em); placeDot(t);
    if (reduce || seen) finish(false);
    else play(newPlan());
  });
})();
