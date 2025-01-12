const path = require('path');

module.exports = {
  content: [
    "file:///" + path.resolve("C:/Users/preis/Desktop/portfolio/pzxyxz.github.io/_site/**/*.html").replace(/\\/g, "/"),
    "file:///" + path.resolve("C:/Users/preis/Desktop/portfolio/pzxyxz.github.io/_site/**/*.js").replace(/\\/g, "/")
  ],
  css: [
    "file:///" + path.resolve("C:/Users/preis/Desktop/portfolio/pzxyxz.github.io/_site/assets/css/*.css").replace(/\\/g, "/")
  ],
  output: "C:/Users/preis/Desktop/portfolio/pzxyxz.github.io/_site/assets/css/",
  skippedContentGlobs: [
    "file:///" + path.resolve("C:/Users/preis/Desktop/portfolio/pzxyxz.github.io/_site/assets/**/*.html").replace(/\\/g, "/")
  ],
};
