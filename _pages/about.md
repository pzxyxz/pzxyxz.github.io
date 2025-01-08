---
layout: about
title: about
permalink: /
subtitle: <a href='#'>Rutgers-NB SOE '27 ⚔️ </a>

profile:
  align: right
  image: prof_pic.jpg
  image_circular: true # crops the image to make it circular
  more_info: >
    <p></p>
    <p></p>
    <p></p>

news: false # includes a list of news items
selected_papers: false # includes a list of papers marked as "selected={true}"
social: false # includes social icons at the bottom of the page
_styles: >
    p + ul {
        margin-top: -10px;
    }
---
<style>
/* Light Theme - Default */
:root {
  --highlight-light: rgb(215, 230, 251); /* Light blue */
}

/* Dark Theme */
html[data-theme="dark"] {
  --highlight-dark: rgb(39, 85, 120); /* Dark blue */
}

/* Highlight Class */
.highlight {
  position: relative;
  display: inline-block;
}

.highlight::before {
  content: '';
  position: absolute;
  top: 55%;
  left: 0;
  right: 0;
  height: 40%;
  background: var(--highlight-light); /* Default to light theme color */
  border-radius: 2px;
  z-index: -1;
}

/* Dark theme: change the background to dark blue */
html[data-theme="dark"] .highlight::before {
  background: var(--highlight-dark); /* Dark blue for dark theme */
}
</style>

<p>
  Hi, I’m Preisha —a <span class="highlight">Mechanical Engineering and Mathematics</span> student at Rutgers. I’m currently interested in the potential of cold plasma for advanced sterilization technologies, its implications in healthcare, and the transformative promise of nuclear fusion energy in addressing global energy challenges. In my free time, I enjoy building things from scratch to avoid buying them. Welcome to my portfolio!
</p>
