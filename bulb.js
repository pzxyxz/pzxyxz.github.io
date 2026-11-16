/* =========================================================================
   bulb.js — a little lightbulb who hops in, finds the "i" in your name,
   screws herself onto its dot, and lights up.

   Talk to her:
     click once      -> light off / on
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

  let state = "idle";                                   // idle | playing | done
  async function play(plan) {
    state = "playing";
    wrap.classList.remove("done", "on", "pop");
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

  /* ---------- 7. lit / off ---------- */
  let lit = false;
  const light = on => { lit = on; wrap.classList.toggle("on", on); face(on ? "joy" : "dark"); };
  const settle = () => { const t = target(); S = size(t.em); placeDot(t); place(t.x, t.y); };
  function finish(pop) {
    settle(); state = "done"; wrap.classList.add("show", "done"); light(true);
    if (pop) { wrap.classList.remove("pop"); void wrap.offsetWidth; wrap.classList.add("pop"); }
    try { sessionStorage.setItem("bulb-seen", "1"); } catch {}
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

  /* ---------- 8. her controls: tap, drag ---------- */
  let downAt = null, dragged = false;
  wrap.addEventListener("pointerdown", e => { downAt = { x: e.clientX, y: e.clientY }; dragged = false; wrap.setPointerCapture(e.pointerId); });
  wrap.addEventListener("pointermove", e => {
    if (!downAt || dragged) return;
    if (Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 8) {
      dragged = true; downAt = null;
      if (state === "done") runAway();
    }
  });
  wrap.addEventListener("pointerup", () => {
    if (!downAt) return;
    downAt = null;
    if (state === "done") light(!lit);                  // tap = light off / on
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
