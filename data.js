/* =========================================================================
   SITE DATA — edit this file to update the portfolio. No build step needed.
   ========================================================================= */

/* Where images load from.
   Right now images are served from your existing Framer CDN.
   To self-host them: run `python3 scripts/download_images.py` from the repo
   root, then change IMG_BASE to "assets/img/". */
window.IMG_BASE = "https://framerusercontent.com/images/";

window.SITE = {
  name: "Preisha Mishra",
  tagline: "Building things that move us forward :)",
  role: "Mechanical Engineer · Rutgers University",
  headshot: "kz869j81BmHrBGPgJPBhJcfjQ.jpg",
  banner: "2I0VLRBNxhzFJ1Lv9bryQMjFXE.jpeg",
  links: {
    linkedin: "https://www.linkedin.com/in/preisha-mishra/",
    devpost: "https://devpost.com/software/voxvest",
    email: "" // optional: add an email address to show a mail button
  },
  intro:
    "I'm a mechanical engineering student at Rutgers who likes the whole arc of a problem — from the free-body diagram to the UL test lab. I've designed mechanisms that shipped at ABB, built and characterized cold-plasma devices for published research, and hacked together assistive wearables in 24 hours.",
  affiliations: [
    "ABB Electrification",
    "Princeton Plasma Physics Laboratory",
    "Rutgers Mechanical & Aerospace Eng.",
    "Mazzeo Tech Group",
    "M-TED Lab",
    "IWOPA-5",
    "Society of Women Engineers",
    "Rutgers Blueprint",
    "Rutgers Calisthenics Club"
  ],
  stats: [
    { n: 20000, suffix: "", label: "UL-98 endurance cycles passed, near-zero wear", unit: "cycles" },
    { n: 20, suffix: "×", label: "increase in localized ozone output from a plasma jet I prototyped", unit: "O₃" },
    { n: 30, suffix: "+", label: "SDBD plasma devices fabricated across 9 material combinations", unit: "devices" },
    { n: 9.9, suffix: "", label: "bearing-stress safety factor on an 8 mm knee-brace hinge pin", unit: "SF", decimals: 1 },
    { n: 10, suffix: "+", label: "UL-98 certification tests executed, incl. temp rise at 640 A", unit: "tests" },
    { n: 3, suffix: "", label: "competition awards: Best Social Good, 2nd Place, 3rd Place", unit: "awards" }
  ],
  featured: [
    { kind: "Award", title: "VoxVest", sub: "R IEEE × RU HART Build-a-thon — Best Social Good", href: "https://devpost.com/software/voxvest" },
    { kind: "Award", title: "Where's Waldo?", sub: "CreateRU Design-a-thon — Second Place", href: "https://devpost.com/software/where-s-waldo-04k1v2" },
    { kind: "Publication", title: "Antibacterial efficacy of combined atmospheric cold plasma and hydrogen peroxide treatment on a wound surrogate", sub: "Biochemistry and Biophysics Reports · Oct 2025", href: "https://www.sciencedirect.com/science/article/pii/S2405580825003838" },
    { kind: "Talk", title: "PPPL Graduate Summer School of Microelectronics", sub: "Flash Talk — Princeton Plasma Physics Laboratory", href: "https://drive.google.com/file/d/1N7bkVFWSc3u7Q5PRSx1ruJ6B2C8jUXfc/view" }
  ],
  skills: [
    { group: "CAD", items: ["SolidWorks", "PTC Creo (Pro/ENGINEER)", "Onshape", "Fusion 360", "GD&T", "Tolerance Stack-Up", "2D Engineering Drawings"] },
    { group: "Materials & DFM", items: ["Injection Molding", "Plastic & Metal Part Design", "DFM/DFA", "DFMEA", "Fixture & Tooling Design"] },
    { group: "Testing & Analysis", items: ["ANSYS (Structural & Thermal FEA)", "DOE", "Root-Cause Analysis", "Product Validation", "UL-489 / UL-98 Testing"] },
    { group: "Prototyping & Code", items: ["FDM/SLA 3D Printing", "Vertical Mill", "Lathe", "CNC", "Arduino", "Raspberry Pi", "Python", "C++", "Java", "SwiftUI", "Figma", "MATLAB/Simulink"] }
  ],
  art: [
    "sONIlGJ187gysemwQGty18a0Y.png",
    "mTvkjUu0s2HlyVQci8SKe6UiEk0.png",
    "SHQwtzlKpl8NpVz9M1MlnkoaABU.png",
    "uD6VxVnx0W1D3vlLoxHDG2UeP0Q.png",
    "CnEyQAWpkCJenzVGsAen7Dnx6k.jpg",
    "dzEJMDDbx8hyRR4HkQjiBS8bU4A.jpg",
    "PmPzQmoxDa8vFF669DkXhkLCNg8.jpg"
  ],
  /* Describe each artwork in one sentence, in the same order as above.
     Screen readers read these aloud to blind visitors. */
  artAlt: [
    "", "", "", "", "", "", ""
  ]
};

/* -------------------------------------------------------------------------
   PROJECTS
   group: "eng" (Engineering) or "design" (Product Design)
   sections: [{ h, p?, items?: [[label, text]] | [text], note? }]
   ------------------------------------------------------------------------- */
window.PROJECTS = [
  {
    slug: "abb-nema",
    group: "eng",
    title: "ABB Internship",
    subtitle: "NEMA Circuit Breakers",
    tag: "Hardware",
    thumb: "KObvA5lX8vVJAj0S7U4DpwoxD4.jpg",
    meta: { Industry: "Electrification", Role: "R&D Product Development Intern", Duration: "3 months" },
    metric: ["UL-67", "compliant accessory shipped"],
    lede:
      "During my internship with ABB's NEMA Circuit Breakers team, I worked on new product development, design validation, testing, and manufacturing support for low-voltage circuit breakers. My projects ranged from taking an accessory from initial concept through production release, to improving validation methods and automating breaker testing.",
    sections: [
      {
        h: "Finger-Safe Barrier for 2- and 3-Pole Breakers",
        items: [
          ["Challenge", "When circuit breakers are reverse-fed inside lighting panels, energized conductors can remain exposed on the load side even when the breaker is switched off. Under UL-67 safety requirements (US/CSA), a finger-safe barrier accessory becomes necessary while accommodating multiple wire sizes and existing breaker geometries."],
          ["My Role", "I owned the design and development of the finger-safe barrier from concept generation through production release."]
        ]
      },
      {
        h: "What I Did",
        items: [
          "Created and iterated multiple barrier concepts (plastic knockouts, coring) in Creo, balancing safety, manufacturability, and ease of assembly.",
          "Used ANSYS static FEA to evaluate deformation and identify failure modes before physical testing.",
          "Built and tested prototypes against UL-67 finger probe requirements and worst-case cable configurations.",
          "Performed Design for Assembly (DFA) and Design Failure Mode and Effects Analysis (DFMEA) to reduce risk prior to release.",
          "Collaborated with engineers to refine injection-molded geometry, material selection, and tooling considerations."
        ],
        note: "Outcome — The final injection-molded design met CSA/UL-67 requirements and a quote was implemented to add it as an accessory kit for both 2-pole and 3-pole breakers. Through multiple prototype iterations, I improved usability while maintaining compliance and manufacturability."
      },
      {
        h: "Design Validation Improvement: Contact Depression & Trip Force Testing",
        items: [
          ["Challenge", "Existing breaker validation methods produced inconsistent measurements because the test setup did not accurately replicate real operating conditions."],
          ["My Role", "I designed and validated a new steel force tool and fixture methodology used for trip force and contact depression testing."],
          "Investigated discrepancies in test results through root-cause analysis.",
          "Designed a custom steel tool to improve force application during trip testing.",
          "Repurposed and improved fixture concepts to better simulate actual breaker assembly conditions.",
          "Used ANSYS FEA to verify tool performance and structural integrity before testing.",
          "Conducted testing and compared results against expected specifications."
        ],
        note: "Outcome — The revised methodology significantly improved measurement accuracy and repeatability, and was adopted as the standard validation procedure for future testing."
      },
      {
        h: "Automated Contact Depression Test Rig",
        items: [
          ["Challenge", "Detecting breaker contact discontinuity relied on manual multimeter readings, making measurements time-consuming and susceptible to operator error."],
          ["My Role", "I initiated development of an automated sensing system to streamline data collection during contact depression testing."],
          "Proposed and developed a Raspberry Pi 5-based test architecture.",
          "Read and integrated a custom voltage-sensing PCB circuit (sensor hardware using I²C communication + ADC measurements).",
          "Developed logic for capturing and exporting voltage-versus-time data.",
          "Supported UL-489 qualification testing activities and failure investigations (root-cause analysis)."
        ],
        note: "Outcome — Established a proposed architecture for automated contact-depression testing, reducing setup complexity and enabling more repeatable measurement collection for future validation."
      },
      {
        h: "Manufacturing & Documentation Support",
        items: [
          "Authored a 10-page circuit breaker assembly SOP that is now used for training new employees and manufacturing teams.",
          "Assembled 20+ circuit breaker units during pre-UL and UL testing activities.",
          "Created GD&T engineering drawings for legacy components in Creo."
        ]
      }
    ],
    gallery: []
  },
  {
    slug: "li-ion-soh",
    group: "eng",
    title: "Li-Ion Battery SOH",
    subtitle: "JJ Slade Thesis · PI: Dr. Amin Reihani",
    tag: "Heat Transfer",
    thumb: "Rqmp5mvdy06X5WdlLDhAhRTwLAA.jpg",
    meta: { Program: "JJ Slade Thesis", PI: "Dr. Amin Reihani", Domain: "Heat Transfer" },
    lede: "Probing Anisotropic Thermal Transport in Batteries via Rapid Optical Sensing — J.J. Slade Scholar thesis in the TEAMS Lab with Prof. Amin Reihani. The idea: map how heat moves through a lithium-ion cell, and use that thermal signature to estimate its state of health. Thesis and poster in progress.",
    
    sections: [],
    gallery: []
  },
  {
    slug: "manta-ray",
    group: "eng",
    title: "ManTaRay",
    subtitle: "TechStart 2026 · 3rd Place",
    tag: "Robotics",
    thumb: "",
    meta: { Event: "TechStart 2026", Result: "3rd Place" },
    lede: "ManTaRay is a low-mass robot that swims like a manta ray under docks and hulls, picks up sunken plastic only when its camera sees debris and no animal, and returns to a floating station that empties its basket and recharges it. We pitched it as a $750–1,500/month cleanup service at about half the per-ton cost of paid divers, aimed at marinas and under-resourced harbors internationally. Placed 3rd overall at TechStart 2026 as a team of three.",
    
    sections: [],
    gallery: []
  },
  {
    slug: "abb-elsp",
    group: "eng",
    title: "ABB Internship",
    subtitle: "ELSP High Ampacity Safety Switches",
    tag: "Hardware",
    thumb: "BuKSXAXQsatqurv8BCXNDgSnU2k.jpg",
    meta: { Industry: "Electrification", Role: "R&D Design Intern", Duration: "3 months" },
    metric: ["20,000", "UL-98 cycles, ~zero wear"],
    lede:
      "Challenge: a mechanically reliable switching mechanism was needed within a constrained electromechanical assembly, requiring precise actuation, durability, and compatibility with existing systems.",
    sections: [
      {
        h: "Auxiliary Switch Kit",
        items: [
          ["Kinematic Design", "Owned the end-to-end mechanical architecture of a new cam-follower mechanism. Translated required dwell and displacement into manufacturable Creo geometry."],
          ["Analytical Validation", "Driven by worst-case tolerance stack-ups and ANSYS static structural FEA to ensure the mounting bracket withstood thick-cable loading scenarios."],
          ["The Result", "The mechanism passed UL-98 endurance testing for 20,000 operating cycles with virtually zero wear. Delivered production-ready CAD with reduced bracket thickness and a smaller (less material) cam."],
          ["Materials", "Cold-rolled low-carbon steel (E = 200–205 GPa) for the bracket, polycarbonate (E = 2.0–2.5 GPa) for the final cam, 3D-printed PLA for test cams."]
        ],
        note: "Now a fully launched product."
      },
      {
        h: "Pivot Pin Redesign",
        p: "The existing 1215 carbon steel pivot pin wore down easily due to metal-on-metal contact (galling), and the rivet force periodically restricted rotational motion, causing the handle to stick. I determined running-fit dimensions for a cap that could go over the pin, generated two design concepts addressing hoop stress and shoulder geometry, and recommended a stainless steel cap solution with a larger slot to eliminate binding. Validated through ANSYS elastic strain analysis — the non-uniform stress distribution indicates a thick-walled cap."
      },
      {
        h: "UL-98 Validation Testing",
        p: "I executed and supported 10+ UL-98 certification tests: rotor break, gasket compression, temperature rise at 640 A, hose down, handle force, pole resistance, and overload. I also assisted short-circuit testing at KEMA, building and wiring samples for the 1200 A switch production launch."
      }
    ],
    gallery: [
      ["CglOge7TlvUCKrTBj3fs8ATacQ0.png", "Auxiliary switch kit on bracket"],
      ["f0gFdCwxHaFHk1HWEsL4n60VXeM.png", ""],
      ["TluDrIZBcJubKZyrxOC3aui4baA.png", "Cam prototype"],
      ["hniwRbloibKonKVUSEnFah1YBJU.png", "Polycarbonate cam"],
      ["sJsiz2YutTh5ePgA1PDQNp454HE.jpeg", "Pivot pin in launched handle mechanism"]
    ]
  },
  {
    slug: "plasma",
    group: "eng",
    title: "Plasma Research",
    subtitle: "Mazzeo Tech Group · PI: Dr. Aaron Mazzeo",
    tag: "Energy",
    thumb: "GWeu80H49FpphScqj6L1zQ934o.png",
    meta: { Role: "Undergraduate Research Assistant", Industry: "Plasma / Energy", Duration: "16 months" },
    metric: ["Published", "Biochem. & Biophys. Reports"],
    lede:
      "Plasma research started my freshman year as a complete detour into something I knew nothing about and turned into one of the most interesting things I've done in college because of how wide the field actually is. Plasma is everywhere: etching semiconductors, making crops grow faster, killing bacteria on wounds.",
    sections: [
      {
        h: "Introduction",
        p: "Working within this research group opened doors to spaces of profound impact. I had the privilege of listening to some of the leading physicists in the nation, if not the world — it was amazing how niche ideas connect to uniquely solve universal problems. Hearing people use plasma in real agricultural and medical applications made the lab work feel connected to something much bigger. I spent 16 months in Dr. Mazzeo's lab working across three parallel workstreams, centered on surface dielectric barrier discharge (SDBD) devices."
      },
      {
        h: "Bacterial Inactivation Study",
        p: "We wanted to know whether combining SDBD plasma with hydrogen peroxide produced sterilization effects beyond either treatment alone — tested on surfaces with wound-like topology. I ran controlled experiments varying time parameters, collected bacterial inactivation data, and contributed to experimental design, data interpretation, and manuscript development.",
        note: "Results published in Biochemistry and Biophysics Reports, October 2025. Presented at the PPPL Graduate Summer School and IWOPA-5. Drive signal: 2.5 kHz sinusoid at ±2.5 V, amplified to ±2.5 kV at the electrodes."
      },
      {
        h: "Material Degradation & Selection",
        p: "I fabricated 30+ SDBD devices across 9 material combinations — Kapton, PET, and paper dielectrics against aluminum, copper, and steel electrodes — systematically mapping how material choice affected performance. An unexpected pH decrease of 3 on treated tissue (which could cause chemical burns on open wounds) led us to investigate what was deposited on the agar during treatment. Energy-dispersive X-ray spectroscopy (EDX) detected traces of fluorine on the agar, indicating degradation of the Kapton dielectric coating or PTFE tape during operation. Because fluorine is highly electronegative, gaseous fluorine atoms trap free electrons, producing non-uniform ionization — the discharge becomes constricted and filamentary, lowering efficiency and device life. This study informed the lab's future device-optimization focus."
      },
      {
        h: "Manufacturing Process Development",
        items: [
          ["The Challenge", "Hand-assembled SDBD devices yielded erratic plasma fields. I isolated the root cause to two factors: geometric variability in individual electrode cuts and human error during layer-stack alignment and pressing."],
          ["What I Did", "CAD-ed a custom die-cut and mechanical stamping fixture to press the material layers together uniformly. While validating, I realized the lab already had a press mechanism, so I adapted the workflow to leverage existing tooling, creating a minimum manufacturing process framework."],
          ["Result", "Presented the standardized process and handed it off to the lab team for long-term implementation."]
        ]
      },
      {
        h: "Plasma Jet",
        items: [
          ["The Challenge", "Standard atmospheric plasma fields suffer from geometric dissipation, severely limiting localized ozone concentration and throughput efficiency."],
          ["Aluminum Nozzle", "Machined on a lathe for rapid prototyping; serves as the grounded outer electrode."],
          ["Copper Wire Element", "Positioned inside as the primary high-voltage electrode."],
          ["Electrical Tape", "Layered between wire and nozzle as the dielectric barrier."]
        ]
      },
      {
        h: "Physics & Application",
        p: "The plasma forms via a capacitive network. When a high-voltage, high-frequency AC signal is applied to the copper wire, a large electric field builds across the dielectric layer. Because the aluminum nozzle acts as an asymmetric ground, the field eventually exceeds the breakdown voltage of the process gas (O₂), triggering surface micro-discharges that ionize the gas into a stable, non-thermal atmospheric plasma. The tape acts as a capacitor, building an opposing surface charge that self-terminates the arc within nanoseconds to preserve cold-plasma uniformity. Applying Bernoulli's principle, the nozzle acts as a convergent restriction: gas velocity rises as static pressure drops through the neck, accelerating the plasma flow into a concentrated, directional discharge — yielding a 20× increase in localized ozone output. Even so, the jet didn't yet look like those run with gases other than O₂."
      }
    ],
    gallery: [
      ["FRhQ71lcZelq1jOkfrPj2kjJfwk.png", "Experimental setup"],
      ["V2xVUTpJaOk3q3Zr23Ji0IoPpw.png", "SDBD layer stack"],
      ["iKYdjOiRo6YkJXDBNcN6sDV1awQ.png", ""],
      ["QXIkTcZBpDqEfsHuPY0UCu3WE.png", "Signal chain: function generator → HV amplifier → electrodes"],
      ["aPXWVvbDfYAe5YHuSY4ANlXi1kQ.png", "Die-cut fixture CAD"],
      ["9wGRqCLp197r9p258JyoublkRc.png", "Stamping fixture CAD"],
      ["eEGQiVdZAzB2oLn0iGnxEo9vg.png", ""],
      ["ZPiWXj1achh2cFT6nnvAnT6OwPc.png", ""]
    ]
  },
  {
    slug: "voxvest",
    group: "eng",
    title: "VoxVest",
    subtitle: "R IEEE × RU HART Build-a-thon · Best Social Good",
    tag: "Hardware",
    thumb: "aVAMmW6sht4Qpg7loElMDhhaWM.png",
    meta: { Role: "Hardware Development, CAD & System Integration", Duration: "24 hours", Result: "Best Social Good" },
    metric: ["24 h", "concept → working wearable"],
    link: ["Devpost", "https://devpost.com/software/voxvest"],
    lede:
      "Design and build a functional, low-cost wearable system to grant deafblind individuals independent spatial awareness and bidirectional communication — all within a 24-hour design sprint.",
    sections: [
      {
        h: "My Role & Core Contributions",
        p: "Operating under extreme time constraints, I led the physical architecture and hardware integration, transforming a loose network of sensors and microprocessors into an ergonomic, body-worn prototype.",
        items: [
          ["Rapid Prototyping & Physical Architecture", "Modeled and iterated CAD on the fly for an unobtrusive wearable form factor. Strategically mapped and mounted vibration motors just above the user's shoulders for intuitive, directional haptic feedback."],
          ["Agile Hardware Development", "Wired and mounted a Raspberry Pi, camera, microphone, speaker, vibration motors, and a tactile input button into a cohesive unit in under 23 hours."],
          ["Real-Time System Integration", "Bridged the physical hardware and the Python software architecture — tying together OpenCV obstacle detection, SpeechRecognition APIs, and custom Morse-code translation scripts."]
        ]
      },
      {
        h: "Impact & Results",
        p: "Delivered a fully functional, bidirectional prototype before the deadline. The system operates in two states: navigating via varying haptic frequencies, and conversing via haptic/audio Morse code translation. VoxVest won the Social Good Challenge at the Rutgers IEEE × RU HART Build-a-thon for its functional execution and accessible approach to assistive tech."
      }
    ],
    gallery: [
      ["YDB2OzAfhmm7HX2Df03kfMSE.png", ""],
      ["DkEU6BSuAszIdcvU8Uwr0WGmVg0.png", ""],
      ["mpElYLBJrttDay4bIXaosRqsrA.png", ""],
      ["6DJu8jVAT0WtCVXvxkJ2pzKj4.png", ""],
      ["VrLOw6FN3rsp0ww9Evlx1lLPGBo.png", ""],
      ["yigB36lLsQD1KRTMHT4wOYJ0Gk.png", ""]
    ]
  },
  {
    slug: "recycling-sorter",
    group: "eng",
    title: "Automatic Recycling Sorter",
    subtitle: "Intro to Mechatronics",
    tag: "Electronics",
    thumb: "9WlahSO5HkGVJUWPpKY0vqC8oo.png",
    meta: { Role: "Team Final Project", Duration: "4 months", Stack: "Arduino C++ · H-bridge · ultrasonic" },
    metric: ["2.2 cm/s", "empirically calibrated actuator"],
    lede:
      "Co-led system ideation and sensor-to-actuator configuration for an autonomous bin that dynamically sorts waste into three streams (Metal, Organic, Paper/Plastic). I personally owned the firmware architecture, sensor-fusion algorithm development, and kinematic calibration.",
    sections: [
      {
        h: "My Role",
        items: [
          ["System Ideation & Layout", "Co-led concept development, planning the physical placement of sensors and motorized gates to isolate and route metal, organic waste, and paper/plastic."],
          ["Firmware Architecture", "Developed and debugged the primary Arduino C++ codebase managing data flow between the sensor array, linear actuators, and status LEDs."],
          ["Acoustic Ranging — getUltrasonicDistance()", "Triggers a 10 µs ultrasonic pulse, measures the echo return time in microseconds, and converts it to centimeters using the speed of sound."],
          ["Capacity Signal Filtering — checkBinLevels()", "Dual-stage verification that prevents falling debris from causing false positives: the sensor must read 6.5 cm twice across a strict 3 s window before the bin is marked full."],
          ["State-Based Alarm Control — activateBuzzer()", "A boolean flag (buzzerActive) gates the audio output so the full-bin alarm triggers properly without getting trapped in a repetitive loop."],
          ["Motor Speed Calibration", "Physically tested unmapped linear actuators to isolate their velocity under load, establishing an empirical constant of 0.00022 cm/µs (2.2 cm/s)."],
          ["Timed Gate Actuation — moveActuatorA/B()", "Computes the exact millisecond duration (moveTime) to run the H-bridge drivers from the gate's current to target position — alignment without position encoders."]
        ]
      }
    ],
    gallery: [
      ["vYOplZIHLfQ2fvmLnoYD68iBmM.png", ""],
      ["YghhWlY7uXg0uWrJPrTDb7bBnI.jpg", ""],
      ["fs89QYT229LlAFlGkiqlV5n2oHU.png", ""]
    ]
  },
  {
    slug: "knee-brace",
    group: "eng",
    title: "Knee Brace",
    subtitle: "Design of Mechanical Components",
    tag: "Biomechanics",
    thumb: "SsI5UzkGtNfngO1LRlbRvYXwo.png",
    meta: { Role: "Team Final Project", Duration: "4 months", Material: "Al 7075-T6" },
    metric: ["SF 9.9", "bearing stress @ 2030 N"],
    lede:
      "Designed a purely mechanical, spring-loaded knee brace to assist osteoarthritis patients and post-surgical athletes — an electronics-free mechanism that provides biomechanical support at lower cost and weight.",
    sections: [
      {
        h: "My Role & Core Contributions",
        p: "I owned the end-to-end design and mechanical analysis of the core torque-transfer mechanism: the cam, hinge pin, and joint assemblies.",
        items: [
          ["Kinematic Cam Design", "Engineered a custom cam profile to create a non-linear torque curve — peak assistance at high flexion angles (when the quadriceps are weakest), tapering off toward full extension for a natural gait."],
          ["Material Selection & Optimization", "Selected Aluminum 7075-T6 for the hinge pin, cam, and load-bearing brackets to maximize strength-to-weight while surviving cyclic daily use."],
          ["Engineering Validation", "Static failure analysis (shear, bending, bearing) with free-body diagrams against a peak compressive spring force of 2030 N."],
          ["Precision Sizing", "Modeled the hinge pin in a clevis joint (double shear). Optimized the pin diameter to 8 mm, achieving a bearing-stress safety factor of 9.9 to prevent hole elongation or shear failure."]
        ]
      },
      {
        h: "Impact & Results",
        p: "Validated via SolidWorks static and kinematic simulations. Under worst-case loading the assembly showed a maximum deformation of only 3.24 mm. The module integrated into a cohesive $500 prototype — a reliable, low-maintenance alternative to complex electromechanical mobility aids."
      }
    ],
    gallery: [
      ["Z7qtSHbywI3OoOGJ0pNzO8VJhkg.png", ""],
      ["GILvePhCDNgNwV5DjSVJn3d194.png", ""],
      ["gbgDCH06Nn20OKwSux3aygydA7o.png", ""],
      ["OGmst46q2C4Jk0lRvyr6cGHtxo.png", ""]
    ]
  },
  {
    slug: "mems",
    group: "eng",
    title: "MEMS Research",
    subtitle: "M-TED Lab · PI: Dr. Amin Reihani",
    tag: "Energy",
    thumb: "gN32SZQSXx1mNPQRNx1sxgMA.png",
    meta: { Role: "Research Assistant", Duration: "3 months", Tools: "MATLAB · LabVIEW" },
    metric: ["19.6 → 28.9 J", "heat release vs. H₂ pressure"],
    lede: "Thermal measurement at extreme temperatures and the physics of energy loss in micro-resonators.",
    sections: [
      {
        h: "High-Temperature Calorimeter",
        items: [
          ["How the System Works", "A custom-built instrument that measures heat changes up to 700 °C. Its differential design has two identical sides — one holds the sample, the other an empty reference — so measuring the temperature difference cancels furnace noise and isolates the heat released by the sample."],
          ["Data Workflows", "Set up data-tracking loops in MATLAB and LabVIEW to catch tiny temperature changes, and studied how raw readings convert to energy (J) by accounting for natural heat loss from the system."],
          ["Real-World Troubleshooting", "Learned how sensitive these instruments are: facility issues (water leaks and large room-temperature swings) corrupted the sensor readings, so the project paused until a fully enclosed furnace could shield the device."],
          ["The Science", "Studied titanium hydrogenation (metal absorbing hydrogen gas). Higher gas pressures make the reaction faster and release more heat — from 19.6 J up to 28.9 J just by increasing pressure."]
        ]
      },
      {
        h: "MEMS Resonators",
        items: [
          ["What it is", "Micro-electro-mechanical resonators are microscopic silicon structures that vibrate at extremely fast, steady frequencies, acting as clocks and signal filters inside advanced electronics."],
          ["Simplifying the System", "Used MATLAB simulations to reduce complex 3D micro-geometries into simple mathematical models of heat differential, vibration, and energy loss."],
          ["Thermoelastic Damping (TED)", "As the structure flexes millions of times a second, compressed regions heat up and regions in tension cool. That gradient drives heat across the part and leaks energy from the vibration. Minimizing it raises the Quality Factor (Q)."],
          ["Application", "Phones, Wi-Fi routers, and radios are bombarded with signals; a filter must pass one exact frequency and block the rest. High Q means a narrow, sharp filter — low Q lets neighboring frequencies leak in, causing static, dropped calls, or cross-talk."]
        ]
      }
    ],
    gallery: []
  },

  /* ---------------- Product design ---------------- */
  {
    slug: "linkedin-coffee-chat",
    group: "design",
    title: "LinkedIn Coffee Chat",
    subtitle: "Rutgers Blueprint Design Fellowship",
    tag: "UI/UX Design",
    thumb: "NU2MBsCuMWBT1kgEMvbQrpcsc.png",
    meta: { Role: "Team Lead", Duration: "2 months", Tools: "Figma" },
    metric: ["81%", "of users schedule chats via back-and-forth DMs"],
    lede:
      "Conceived the original product concept and led a cross-functional design team to reimagine LinkedIn's professional networking experience. After identifying major friction points in how people set up informal professional meetings, we designed and prototyped an integrated \"Coffee Chat\" feature directly within the platform — taking it from concept to an interactive Figma prototype.",
    sections: [
      {
        h: "My Role",
        items: [
          ["Leadership & Project Management", "Conceived the initial idea and acted as group lead — managing timelines and delegating research and design tasks across the team."],
          ["UX Research & Problem Validation", "Drafted the vast majority of the user survey questions. Our research validated three critical platform barriers:"],
          ["Coordination Friction", "81% of users rely on inefficient back-and-forth messaging to schedule chats."],
          ["Platform Fragmentation", "Users constantly switch between LinkedIn and external video tools (Zoom, Google Meet, Teams)."],
          ["Low Authenticity", "75% of users rated LinkedIn's connection authenticity at 3/5 or lower due to frequent ghosting."],
          ["Collaborative Design", "Had every team member sketch independent lo-fi wireframes, then shared, critiqued, and synthesized them before moving to high fidelity."],
          ["Figma Prototyping", "Contributed hands-on to UI design and interactive prototyping, building out the end-to-end user flow."]
        ]
      }
    ],
    gallery: []
  },
  {
    slug: "wheres-waldo",
    group: "design",
    title: "Where's Waldo?",
    subtitle: "Rutgers CreativeX Designathon · 2nd Place",
    tag: "UI/UX Design",
    thumb: "qNAqzYlFrKoF6epUHY9eZGzgQ2A.png",
    meta: { Event: "CreateRU Design-a-thon", Result: "2nd Place" },
    link: ["Devpost", "https://devpost.com/software/where-s-waldo-04k1v2"],
    lede: "A daily augmented-reality scavenger hunt on campus, built around the CreateRU prompt of bringing back nostalgia in an age of automation. Each day Waldo hides somewhere new; students follow a clue, use their phone as a compass, and find him through the AR camera, which pings friends and updates a daily leaderboard. I worked on ideation, Figma design, and prototyping. 2nd place at CreateRU 2026.",
    
    sections: [],
    gallery: []
  },
  {
    slug: "push-up-for-charity",
    group: "design",
    title: "Push-Up For Charity",
    subtitle: "Rutgers Calisthenics Club EOY Charity Event",
    tag: "UI/UX Design",
    thumb: "Fw1amUZrHHO5XFgOrFgdTmrATA.png",
    meta: { Organization: "Rutgers Calisthenics Club" },
    lede: "Design work for the Rutgers Calisthenics Club end-of-year charity event. Full case study coming soon.",
    comingSoon: true,
    sections: [],
    gallery: []
  }
];
