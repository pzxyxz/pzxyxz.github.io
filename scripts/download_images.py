#!/usr/bin/env python3
"""Download every image referenced in data.js into assets/img/ so the site is fully self-hosted.
Run from the repo root:  python3 scripts/download_images.py
Then in data.js set:     window.IMG_BASE = "assets/img/";
"""
import re, pathlib, urllib.request

root = pathlib.Path(__file__).resolve().parent.parent
data = (root / "data.js").read_text(encoding="utf-8")
names = sorted(set(re.findall(r'"([A-Za-z0-9]{10,}\.(?:png|jpe?g|svg|webp|gif))"', data)))
out = root / "assets" / "img"
out.mkdir(parents=True, exist_ok=True)
for n in names:
    dest = out / n
    if dest.exists():
        continue
    url = f"https://framerusercontent.com/images/{n}"
    print("↓", n)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as r:
        dest.write_bytes(r.read())
print(f"Done: {len(names)} images in {out}")
