/* Shared behaviour for every page. Content lives in data.js (projects, art) and learn.js (iWannaLearn). */
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
      ["project.html?p=abb-elsp", "A mechanism I designed that shipped at ABB", "20,000 UL-98 cycles"],
      ["project.html?p=abb-nema", "Taking a part from concept to production release", "UL-67, injection molded"],
      ["https://www.sciencedirect.com/science/article/pii/S2405580825003838?via%3Dihub", "My first paper", "Biochemistry and Biophysics Reports"],
      ["#formerly", "Experience and awards", ""] ] },
    engineer: { note: "The analysis behind the decisions.", items: [
      ["project.html?p=knee-brace", "Sizing a hinge pin to SF 9.9 under 2030 N", "clevis joint, double shear"],
      ["project.html?p=plasma", "Why fluorine wrecked our plasma uniformity", "EDX, 30+ SDBD devices"],
      ["project.html?p=recycling-sorter", "Encoder-free gate positioning from a calibrated constant", "Arduino C++"],
      ["project.html?p=li-ion-soh", "Reading battery health from heat flow", "thesis, in progress"] ] },
    curious: { note: "The fun ones.", items: [
      ["project.html?p=voxvest", "VoxVest, a wearable we built in 24 hours for deafblind people", ""],
      ["project.html?p=manta-ray", "ManTaRay, a robot manta ray that collects marina plastic", ""],
      ["art.html", "Things I make for fun", ""],
      ["learn.html", "iWannaLearn: one new thing every week", ""] ] }
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

  const P = window.PROJECTS || [];
  const L = window.LEARN || [];
  const param = k => new URLSearchParams(location.search).get(k);
  const md = d => { const x = new Date(d + "T12:00:00"); return `${String(x.getMonth() + 1).padStart(2, "0")}.${String(x.getDate()).padStart(2, "0")}`; };
  const long = d => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const inline = t => esc(t).replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2">$1</a>');
  const renderBody = body => { let out = "", ul = false;
    (body || []).forEach(b => {
      if (b.startsWith("- ")) { if (!ul) { out += "<ul>"; ul = true; } out += `<li>${inline(b.slice(2))}</li>`; return; }
      if (ul) { out += "</ul>"; ul = false; }
      out += b.startsWith("## ") ? `<h2>${inline(b.slice(3))}</h2>` : `<p>${inline(b)}</p>`;
    });
    return out + (ul ? "</ul>" : ""); };
  const pager = (list, i, href, label) => {
    const prev = list[i - 1], next = list[i + 1];
    return `<nav class="pager" aria-label="More ${label}">${prev ? `<a href="${href(prev)}"><span>← previous</span>${esc(prev.title)}</a>` : ""}${next ? `<a class="next" href="${href(next)}"><span>next →</span>${esc(next.title)}</a>` : ""}</nav>`; };
  const notFound = (el, back, label) => { el.innerHTML = `<h1>Not found</h1><p>That page doesn't exist. <a href="${back}">See all ${label}</a>.</p>`; };

  /* ───────── iWannaLearn on the home page (latest 3) ───────── */
  const latest = $("#latest-learn");
  if (latest) latest.innerHTML = L.slice(0, 3).map(e => `<li><span class="d"><time datetime="${e.date}">${md(e.date)}</time></span><span><a href="entry.html?e=${e.slug}">${esc(e.title)}</a> <span class="dim">· ${esc(e.subject)}</span></span></li>`).join("") || "<li><span>Week one starts soon.</span></li>";

  /* ───────── iWannaLearn list ───────── */
  const learnList = $("#learn-list");
  if (learnList) {
    $("#learn-count").textContent = `(${L.length})`;
    const years = [...new Set(L.map(e => e.date.slice(0, 4)))];
    learnList.innerHTML = years.map(y => { const rows = L.filter(e => e.date.startsWith(y));
      return `<table class="index"><caption>${y}<span>(${rows.length})</span></caption>
        <thead><tr><th scope="col">date</th><th scope="col">title</th><th scope="col">subject</th></tr></thead><tbody>` +
        rows.map(e => `<tr><td class="date"><time datetime="${e.date}">${md(e.date)}</time></td>
          <td>${e.star ? '<span class="star" aria-label="favorite">★</span>' : ""}<a href="entry.html?e=${e.slug}">${esc(e.title)}</a></td>
          <td class="subj">${esc(e.subject)}</td></tr>`).join("") + "</tbody></table>"; }).join("");
  }

  /* ───────── single iWannaLearn entry ───────── */
  const entry = $("#entry");
  if (entry) {
    const i = L.findIndex(e => e.slug === param("e")), e = L[i];
    if (!e) notFound(entry, "learn.html", "entries");
    else {
      document.title = `${e.title} — iWannaLearn — Preisha Mishra`;
      const src = (e.sources || []).length ? `<h2>sources</h2><ul class="sources">${e.sources.map(([t, u]) => `<li><a href="${esc(u)}">${esc(t)}</a></li>`).join("")}</ul>` : "";
      entry.innerHTML = `<p class="crumb"><a href="learn.html">← iWannaLearn</a></p>
        <h1>${esc(e.title)}</h1>
        <p class="meta"><time datetime="${e.date}">${long(e.date)}</time> · ${esc(e.subject)}${e.kind ? " · " + esc(e.kind) : ""}</p>
        ${renderBody(e.body)}${src}${pager(L, i, x => `entry.html?e=${x.slug}`, "entries")}`;
    }
  }

  /* ───────── projects list ───────── */
  const projList = $("#project-list");
  if (projList) {
    $("#project-count").textContent = `(${P.length})`;
    projList.innerHTML = [["eng", "engineering"], ["design", "product design"]].map(([g, name]) => { const rows = P.filter(p => p.group === g);
      return `<table class="index"><caption>${name}<span>(${rows.length})</span></caption>
        <thead><tr><th scope="col">project</th><th scope="col" class="ctx-col">context</th><th scope="col">subject</th></tr></thead><tbody>` +
        rows.map(p => `<tr><td><a href="project.html?p=${p.slug}">${esc(p.title)}</a></td><td class="ctx ctx-col">${esc(p.subtitle)}</td><td class="subj">${esc((p.tag || "").toLowerCase())}</td></tr>`).join("") + "</tbody></table>"; }).join("");
    // old links like projects.html#plasma go to the new page
    if (location.hash && P.some(p => p.slug === location.hash.slice(1))) location.replace(`project.html?p=${location.hash.slice(1)}`);
  }

  /* ───────── single project ───────── */
  const proj = $("#project");
  if (proj) {
    const i = P.findIndex(p => p.slug === param("p")), p = P[i];
    if (!p) notFound(proj, "projects.html", "projects");
    else {
      document.title = `${p.title} — Preisha Mishra`;
      const item = it => Array.isArray(it) ? `<li><strong>${esc(it[0])}.</strong> ${esc(it[1])}</li>` : `<li>${esc(it)}</li>`;
      const meta = [p.subtitle, p.tag, ...Object.values(p.meta || {})].filter(Boolean).map(esc).join(" · ");
      const secs = (p.sections || []).map(s => `<h2>${esc(s.h)}</h2>` + (s.p ? `<p>${esc(s.p)}</p>` : "") +
        (s.items ? `<ul>${s.items.map(item).join("")}</ul>` : "") + (s.note ? `<p class="note">${esc(s.note)}</p>` : "")).join("");
      const figs = (p.gallery || []).length ? `<h2>figures</h2><div class="figs">${p.gallery.map(([f, c], k) => { const alt = c || `${p.title}, figure ${k + 1}`;
        return `<figure>${zoomBtn(img(f, 2048), img(f, 512), alt)}${c ? `<figcaption>${esc(c)}</figcaption>` : ""}</figure>`; }).join("")}</div>` : "";
      const link = p.link ? ` <a href="${esc(p.link[1])}">${esc(p.link[0])} ↗</a>` : "";
      proj.innerHTML = `<p class="crumb"><a href="projects.html">← projects</a></p>
        <h1>${esc(p.title)}</h1><p class="meta">${meta}</p>
        <p>${esc(p.lede)}${link}</p>${p.comingSoon ? `<p class="note">write-up coming soon.</p>` : ""}${secs}${figs}
        ${pager(P, i, x => `project.html?p=${x.slug}`, "projects")}`;
    }
  }

  /* ───────── art page ───────── */
  const art = $("#art");
  if (art) { const alts = window.SITE?.artAlt || [];
    art.innerHTML = (window.SITE?.art || []).map((f, i) => zoomBtn(img(f, 2048), img(f, 1024), alts[i] || `Artwork by Preisha, piece ${i + 1}`, "art-item")).join(""); }


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

})();
