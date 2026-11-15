/* Shared behaviour for every page. Content lives in data.js and posts.js. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const B = window.IMG_BASE || "";
  const img = (f, w = 1024) => !f ? "" : B.startsWith("http") ? `${B}${f}?scale-down-to=${w}` : B + f;
  const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = { get: k => { try { return localStorage.getItem(k); } catch { return null; } },
                  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
  const reduceMotion = () => document.documentElement.classList.contains("calm") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const zoomBtn = (full, thumb, alt, cls = "") =>
    `<button class="zoom ${cls}" data-full="${full}" aria-label="Enlarge image: ${esc(alt)}"><img loading="lazy" src="${thumb}" alt="${esc(alt)}"></button>`;

  /* ───────── accessibility panel (text size · contrast · motion · read aloud) ───────── */
  const root = document.documentElement;
  const prefs = { size: +(store.get("a11y-size") || 0), contrast: store.get("a11y-contrast") === "1", calm: store.get("a11y-calm") === "1" };
  const apply = () => {
    root.style.setProperty("--scale", [1, 1.15, 1.3][prefs.size] || 1);
    root.classList.toggle("contrast", prefs.contrast);
    root.classList.toggle("calm", prefs.calm);
  };
  apply();
  const panel = $("#a11y-panel"), toggle = $("#a11y-toggle");
  if (panel && toggle) {
    const sizeOut = $("#a11y-size-out"), setSizeLabel = () => sizeOut.textContent = ["100%", "115%", "130%"][prefs.size];
    setSizeLabel();
    const mark = (id, on) => { const b = $(id); b.setAttribute("aria-pressed", on); b.textContent = on ? "On" : "Off"; };
    mark("#a11y-contrast", prefs.contrast); mark("#a11y-calm", prefs.calm);
    toggle.addEventListener("click", () => {
      const open = panel.hidden; panel.hidden = !open; toggle.setAttribute("aria-expanded", open);
      if (open) panel.querySelector("button").focus();
    });
    panel.addEventListener("keydown", e => { if (e.key === "Escape") { panel.hidden = true; toggle.setAttribute("aria-expanded", false); toggle.focus(); } });
    $("#a11y-bigger").onclick = () => { prefs.size = Math.min(2, prefs.size + 1); store.set("a11y-size", prefs.size); apply(); setSizeLabel(); };
    $("#a11y-smaller").onclick = () => { prefs.size = Math.max(0, prefs.size - 1); store.set("a11y-size", prefs.size); apply(); setSizeLabel(); };
    $("#a11y-contrast").onclick = e => { prefs.contrast = !prefs.contrast; store.set("a11y-contrast", prefs.contrast ? "1" : "0"); apply(); mark("#a11y-contrast", prefs.contrast); };
    $("#a11y-calm").onclick = e => { prefs.calm = !prefs.calm; store.set("a11y-calm", prefs.calm ? "1" : "0"); apply(); mark("#a11y-calm", prefs.calm); };

    // read aloud (helps low-vision and dyslexic visitors; screen-reader users already have their own)
    const listen = $("#a11y-listen");
    if (!("speechSynthesis" in window)) listen.hidden = true;
    else listen.onclick = () => {
      if (speechSynthesis.speaking) { speechSynthesis.cancel(); listen.textContent = "Read this page aloud"; return; }
      const u = new SpeechSynthesisUtterance($("main").innerText); u.lang = "en-US";
      u.onend = () => listen.textContent = "Read this page aloud";
      speechSynthesis.speak(u); listen.textContent = "Stop reading";
    };
  }


  /* ───────── "who's visiting?" — tailors the start-here list ───────── */
  const PATHS = {
    recruiter: { note: "Shipped hardware, a paper, three awards.", items: [
      ["projects.html#abb-elsp", "A mechanism I designed that shipped at ABB", "20,000 UL-98 cycles"],
      ["projects.html#abb-nema", "Taking a part from concept to production release", "UL-67, injection molded"],
      ["https://www.sciencedirect.com/science/article/pii/S2405580825003838?via%3Dihub", "My first paper", "Biochemistry and Biophysics Reports"],
      ["#formerly", "Experience and awards", ""] ] },
    engineer: { note: "The analysis behind the decisions.", items: [
      ["projects.html#knee-brace", "Sizing a hinge pin to SF 9.9 under 2030 N", "clevis joint, double shear"],
      ["projects.html#plasma", "Why fluorine wrecked our plasma uniformity", "EDX, 30+ SDBD devices"],
      ["projects.html#recycling-sorter", "Encoder-free gate positioning from a calibrated constant", "Arduino C++"],
      ["projects.html#li-ion-soh", "Reading battery health from heat flow", "thesis, in progress"] ] },
    curious: { note: "The fun ones.", items: [
      ["projects.html#voxvest", "VoxVest, a wearable we built in 24 hours for deafblind people", ""],
      ["projects.html#manta-ray", "ManTaRay, a robot manta ray that collects marina plastic", ""],
      ["art.html", "Things I make for fun", ""],
      ["blog.html", "The blog", ""] ] }
  };
  const picker = $("#paths");
  if (picker) {
    const list = $("#start-list"), note = $("#start-note");
    const choose = (k, save) => {
      picker.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.path === k));
      const p = PATHS[k]; note.textContent = p.note;
      list.innerHTML = p.items.map(([href, t, m]) => `<li><a href="${href}">${esc(t)}</a>${m ? ` <span class="dim">· ${esc(m)}</span>` : ""}</li>`).join("");
      if (save) store.set("path", k);
    };
    picker.addEventListener("click", e => { const b = e.target.closest("button[data-path]"); if (b) choose(b.dataset.path, true); });
    const saved = store.get("path"); if (saved && PATHS[saved]) choose(saved, false);
  }

  /* ───────── latest posts on the home page ───────── */
  const POSTS = window.POSTS || [];
  const fmt = d => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const latest = $("#latest-posts");
  if (latest) latest.innerHTML = POSTS.slice(0, 3).map(p => `<li><span class="d"><time datetime="${p.date}">${fmt(p.date)}</time></span><span><a href="blog.html#${p.slug}">${esc(p.title)}</a></span></li>`).join("") || "<li><span>First post coming soon.</span></li>";

  /* ───────── blog page ───────── */
  const blog = $("#blog");
  if (blog) {
    const inline = t => esc(t).replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2">$1</a>');
    const render = body => { let out = "", ul = false;
      body.forEach(b => {
        if (b.startsWith("- ")) { if (!ul) { out += "<ul>"; ul = true; } out += `<li>${inline(b.slice(2))}</li>`; return; }
        if (ul) { out += "</ul>"; ul = false; }
        out += b.startsWith("## ") ? `<h3>${inline(b.slice(3))}</h3>` : `<p>${inline(b)}</p>`;
      });
      return out + (ul ? "</ul>" : ""); };
    const mins = p => Math.max(1, Math.round(p.body.join(" ").split(/\s+/).length / 220));
    blog.innerHTML = `<ul class="rows">${POSTS.map(p => `<li><span class="d"><time datetime="${p.date}">${fmt(p.date)}</time></span><span><a href="#${p.slug}">${esc(p.title)}</a> <span class="dim">· ${esc(p.summary)}</span></span></li>`).join("")}</ul>` +
      POSTS.map(p => `<article class="post" id="${p.slug}" aria-labelledby="${p.slug}-t"><h2 id="${p.slug}-t">${esc(p.title)}</h2>
        <p class="meta"><time datetime="${p.date}">${fmt(p.date)}</time> · ${mins(p)} min read</p>${render(p.body)}
        <p class="back"><a href="#top">↑ back to top</a> · <a href="https://www.linkedin.com/in/preisha-mishra/">reply on LinkedIn</a></p></article>`).join("");
  }

  /* ───────── projects page ───────── */
  const P = window.PROJECTS || [];
  const proj = $("#projects");
  if (proj) {
    const groups = [["eng", "engineering"], ["design", "product design"]];
    const toc = groups.map(([g, name]) => `<h2>${name}</h2><ul class="toc">` +
      P.filter(p => p.group === g).map(p => `<li><a href="#${p.slug}">${esc(p.title)}</a> <span class="dim">— ${esc(p.subtitle)}</span></li>`).join("") + "</ul>").join("");
    const item = it => Array.isArray(it) ? `<li><strong>${esc(it[0])}.</strong> ${esc(it[1])}</li>` : `<li>${esc(it)}</li>`;
    proj.innerHTML = toc + P.map(p => {
      const meta = [p.tag, ...Object.values(p.meta || {})].filter(Boolean).map(esc).join(" · ");
      const secs = (p.sections || []).map(s => `<h4>${esc(s.h)}</h4>` + (s.p ? `<p>${esc(s.p)}</p>` : "") +
        (s.items ? `<ul>${s.items.map(item).join("")}</ul>` : "") + (s.note ? `<p class="note">${esc(s.note)}</p>` : "")).join("");
      const figs = (p.gallery || []).length ? `<div class="figs">${p.gallery.map(([f, c], i) => { const alt = c || `${p.title}, figure ${i + 1}`;
        return `<figure>${zoomBtn(img(f, 2048), img(f, 512), alt)}${c ? `<figcaption>${esc(c)}</figcaption>` : ""}</figure>`; }).join("")}</div>` : "";
      const link = p.link ? ` <a href="${esc(p.link[1])}">${esc(p.link[0])} ↗</a>` : "";
      return `<article id="${p.slug}" aria-labelledby="${p.slug}-t"><h3 id="${p.slug}-t">${esc(p.title)}</h3><p class="meta">${esc(p.subtitle)}<br>${meta}</p>
        <p>${esc(p.lede)}${link}</p>${p.comingSoon ? `<p class="note">write-up coming soon.</p>` : ""}${secs}${figs}
        <p class="back"><a href="#top">↑ back to top</a></p></article>`;
    }).join("");
  }

  /* ───────── art page ───────── */
  const art = $("#art");
  if (art) { const alts = window.SITE?.artAlt || [];
    art.innerHTML = (window.SITE?.art || []).map((f, i) => zoomBtn(img(f, 2048), img(f, 1024), alts[i] || `Artwork by Preisha, piece ${i + 1}`, "art-item")).join(""); }

  // jump to #anchor after content renders
  if (location.hash && (proj || blog)) document.getElementById(location.hash.slice(1))?.scrollIntoView();

  /* ───────── image viewer (accessible dialog) ───────── */
  const v = document.createElement("div");
  v.className = "viewer"; v.hidden = true; v.setAttribute("role", "dialog"); v.setAttribute("aria-modal", "true"); v.setAttribute("aria-label", "Enlarged image");
  v.innerHTML = `<button class="viewer-close">Close ✕</button><img alt=""><p class="viewer-cap"></p>`;
  document.body.appendChild(v);
  let opener = null;
  const close = () => { v.hidden = true; opener?.focus(); };
  document.addEventListener("click", e => {
    const t = e.target.closest("button.zoom");
    if (t) { opener = t; const alt = t.querySelector("img").alt; const im = v.querySelector("img"); im.src = t.dataset.full; im.alt = alt;
      v.querySelector(".viewer-cap").textContent = alt; v.hidden = false; v.querySelector(".viewer-close").focus(); return; }
    if (!v.hidden && (e.target === v || e.target.closest(".viewer-close"))) close();
  });
  document.addEventListener("keydown", e => {
    if (v.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "Tab") { e.preventDefault(); v.querySelector(".viewer-close").focus(); }
  });

  /* ───────── a soft light that follows the cursor across the grid ───────── */
})();
