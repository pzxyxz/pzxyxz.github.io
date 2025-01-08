---
layout: page
title: projects
permalink: /projects/
description: university and personal projects
nav: true
nav_order: 3
display_categories: [work, fun]
horizontal: false
---
<style>
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
  background: #2c2c2c; /* Dark background for cards */
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
  color: #f5f5f5; /* Light color for header */
  font-style: italic; /* Italicize header */
}

.card p {
  flex: 1;
  line-height: 1.4;
  margin-top: 10px;
  color: #ccc; /* Light gray for paragraph text */
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
  border-bottom: 1px solid #444; /* Optional: separates thumbnail and content */
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

