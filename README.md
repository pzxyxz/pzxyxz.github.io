# preisha mishra — portfolio v2

A deliberately simple site: three pages, one stylesheet, no build step.

- `index.html` — about, news, selected work, publications, toolkit, contact. **Edit the text right in this file.**
- `art.html` — artwork gallery, also from `data.js` (add one-sentence descriptions in `artAlt`).
- `learn.html` — the iWannaLearn list; each entry opens `entry.html?e=<slug>`. Add a week in `learn.js` (template at the top of that file).
- `projects.html` — the project list; each project opens `project.html?p=<slug>`. Edit projects in `data.js`.
- `assets/img/profile.jpg` — your round profile photo.
- `accessibility.html` — what the site does for accessibility and how to report problems.
- `data.js` — project write-ups and art images. Add a project by copying one block.
- `style.css` — colors and fonts at the top.

Deploy: drag this folder onto Netlify Drop, or push to GitHub and turn on Pages (Settings → Pages → main / root).

Images still load from the Framer CDN. To self-host them: `python3 scripts/download_images.py`, then set `IMG_BASE = "assets/img/"` in `data.js` and point the `<img>` tags in `index.html` at `assets/img/<filename>`.
