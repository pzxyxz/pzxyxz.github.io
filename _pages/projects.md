---
layout: page
title: projects
permalink: /projects/
description: 
nav: true
nav_order: 3
display_categories: [work, fun]
horizontal: false
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

<p> Engineering offers a means to merge curiosity with methodical problem-solving, unraveling the complexities of how things function and transforming abstract ideas into tangible outcomes. It is as much an intellectual pursuit as it is a creative one. There is an undeniable adrenaline with unraveling how things work, piecing them together, and transforming abstract ideas into tangible realities. Here are some <span class="highlight">fun projects </span> throughout the years.</p>


<style>
  :root {
  --matte-white: rgb(255, 255, 255); /* Slightly dark white */
  --matte-black: rgb(34, 34, 34); /* Slightly black/grey for dark theme */
  /* Light Theme Colors */
  --h1-light-color: rgb(0, 0, 66); /* Black color for h1 in light theme */
  --p-light-color:rgb(29, 29, 82); /* Slightly lighter black for p in light theme */
  /* Dark Theme Colors */
  --h1-dark-color: white; /* White color for h1 in dark theme */
  --p-dark-color: rgb(200, 200, 200); /* Lighter white for p in dark theme */
}

/* Light theme: matte white for cards */
html[data-theme="light"] {
  --card-bg-color: var(--matte-white); /* Apply matte white */
   --h1-color: var(--h1-light-color); /* Apply light theme h1 color */
  --p-color: var(--p-light-color); /* Apply light theme p color */
}

/* Dark theme: matte black for cards */
html[data-theme="dark"] {
  --card-bg-color: var(--matte-black); /* Apply matte black */
    --h1-color: var(--h1-dark-color); /* Apply dark theme h1 color */
  --p-color: var(--p-dark-color); /* Apply dark theme p color */
}

  html {
    background: rgb(48, 57, 61);
    font-family: system-ui;
    -webkit-font-smoothing: antialiased;
    padding: 20px 0;
  }
  header {
    width: 90%;
    max-width: 1240px;
    margin: 0 auto;
  }
  .band {
    width: 90%;
    max-width: 1240px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 20px;
  }
  @media (min-width: 30em) {
    .band {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 60em) {
    .band {
      grid-template-columns: repeat(2, 1fr);
    }
  }
.card {
 background: var(--card-bg-color); /* Apply theme-based background color */
  text-decoration: none;
  color: #ddd; /* Light text color for dark theme */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5); /* Slightly darker shadow */
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  top: 0;
  transition: all 0.1s ease-in;
  border-radius: 12px; /* Optional: adds rounded corners */
  justify-content: space-between; 
}

.card:hover {
  top: -2px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.8); /* Stronger shadow on hover */
}
.card article {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
.card h1 {
  font-size: 20px;
  margin: 10px 0 0px 0;
  color: var(--h1-color); /* Light color for header */
  font-style: italic; /* Italicize header */
}

.card p {
  flex: 1;
  line-height: 1.4;
  margin-top: 10px;
  color: var(--p-color);/* Light gray for paragraph text */
}

.card span {
  font-size: 12px;
  font-weight: bold;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: auto; /* Push span to the bottom */
}

.thumb {
  padding-bottom: 60%;
  background-size: cover;
  background-position: center center;
  position: relative;
  overflow: hidden;
}
.thumb video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
<body>
   <div class="band">
    <div class="item-1">
      <a class="card">
        <div class="thumb" style="background-image: url('/assets/img/humatvalve.png');"></div>
        <article>
          <h1>improved humat valve</h1>
          <p>Storz adapters integration for each outlet to ensure efficient connections between fire hoses and other equipment in a two-way Gated Wye Valve as well as addition of bolted handle, pressure gauge, and Storz Connection Nozzle. Respective engineering drawings included.</p>
          <span>SolidWorks Group Project</span>
        </article>
      </a>
    </div>
    <div class="item-2">
      <a class="card">
        <div class="thumb">
          <video autoplay muted loop>
            <source src="/assets/video/engine.mp4" type="video/mp4">
          </video>
        </div>
        <article>
          <h1>engine</h1>
          <p> First assembly & animation </p>
          <span>SolidWorks</span>
        </article>
      </a>
    </div>
    <div class="item-3">
      <a class="card">
        <div class="thumb">
          <video autoplay muted loop>
            <source src="/assets/video/ornithopter.mp4" type="video/mp4">
          </video>
        </div>
        <article>
          <h1>ornithopter</h1>
          <p>Flapping-wing mechanism</p>
          <span>SolidWorks</span>
        </article>
      </a>
    </div>
    <div class="item-4">
      <a href="/assets/pdf/ball-valve drawing combined.pdf" class="card">
        <div class="thumb">
          <video autoplay muted loop>
            <source src="/assets/video/ballvalve.mp4" type="video/mp4">
          </video>
        </div>
        <article>
          <h1>ball valve</h1>
          <p>Body and assembly drawing.</p>
          <span>SolidWorks</span>
        </article>
      </a>
    </div>
  </div>
</body>

