/* =========================================================================
   iWannaLearn — one new thing every week. Newest first.

   To add a week, copy the TEMPLATE block below to the top of the list.
     slug     short-name-with-dashes (becomes the page address)
     date     "YYYY-MM-DD"
     title    what you learned / built / read
     subject  one or two words, e.g. "cryptography", "philosophy", "math"
     kind     "course" | "book" | "build" | "essay" | "rabbit hole"
     star     true for the ones you're proudest of (shows ★ in the list)
     summary  one line for the list page
     sources  [["label", "https://link"], ...]   (optional)
     body     paragraphs. "## " = heading, "- " = bullet, [text](https://link) = link

   TEMPLATE:
   {
     slug: "cryptography-basics",
     date: "2026-11-23",
     title: "how public-key cryptography actually works",
     subject: "cryptography",
     kind: "course",
     star: false,
     summary: "RSA from scratch, by hand.",
     sources: [["Course name", "https://..."]],
     body: [
       "What I set out to learn and why.",
       "## What clicked",
       "- one idea",
       "- another idea",
       "## What I'd tell someone starting",
       "One honest paragraph."
     ]
   },
   ========================================================================= */
window.LEARN = [
  {
    slug: "week-00",
    date: "2026-11-16",
    title: "week 00: the rules",
    subject: "manifesto",
    kind: "essay",
    star: true,
    summary: "One new thing every week. Courses, books, builds, rabbit holes.",
    body: [
      "I'm a lifelong learner, and I want to prove it, not just say it.",
      "So here's the challenge: every week I learn something new and write it down here. A course, a book, a build, or a topic I knew nothing about on Monday. Cryptography one week, philosophy the next, math patterns in nature after that.",
      "## The rules",
      "- One topic per week.",
      "- Write what I actually understood, not what sounds smart.",
      "- Say what I got wrong.",
      "- Breadth is the point. I want to be a generalist."
    ]
  }
];
