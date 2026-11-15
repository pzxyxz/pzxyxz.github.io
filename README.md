# preisha mishra — portfolio v2

A deliberately simple site: three pages, one stylesheet, no build step.

- `index.html` — about, news, selected work, publications, toolkit, contact. **Edit the text right in this file.**
- `projects.html` — every project write-up on one page, generated from `data.js`.
- `art.html` — artwork gallery, also from `data.js` (add one-sentence descriptions in `artAlt`).
- `blog.html` — posts from `posts.js`. Add a post by copying one block at the top.
- `accessibility.html` — what the site does for accessibility and how to report problems.
- `data.js` — project write-ups and art images. Add a project by copying one block.
- `style.css` — colors and fonts at the top.

Deploy: drag this folder onto Netlify Drop, or push to GitHub and turn on Pages (Settings → Pages → main / root).

Images still load from the Framer CDN. To self-host them: `python3 scripts/download_images.py`, then set `IMG_BASE = "assets/img/"` in `data.js` and point the `<img>` tags in `index.html` at `assets/img/<filename>`.
