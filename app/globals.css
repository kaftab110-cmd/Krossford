@import "tailwindcss";

@layer base {
  html, body {
    background: #0a0a0a;
    color: #ffffff;
    overflow-x: hidden;
    overflow-x: clip;
    width: 100%;
    max-width: 100vw;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    overscroll-behavior-x: none;
  }

  /* FIX 2: min-width 0 - Flex items ab shrink honge, cutting khatam */
  * {
    box-sizing: border-box;
    min-width: 0;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  img, video, svg, canvas {
    max-width: 100%;
    height: auto;
  }

  /* ALL DEVICES: lamba word / heading / price kabhi side se bahar nahi jayega */
  h1, h2, h3, h4, h5, h6, p, span, a, button, li {
    overflow-wrap: break-word;
    word-break: break-word;
  }

  /* ALL DEVICES: form ke input / button mobile pe bahar nahi nikalenge */
  input, textarea, select, button {
    max-width: 100%;
  }

  /* FIX 3: Mobile pe zyada tracking auto kam ho jayegi - poori site ke liye */
  @media (max-width: 640px) {
    .tracking-\[0\.3em\],
    .tracking-\[0\.35em\],
    .tracking-\[0\.4em\],
    .tracking-widest {
      letter-spacing: 0.08em !important;
    }
    .tracking-\[0\.2em\],
    .tracking-\[0\.25em\] {
      letter-spacing: 0.1em !important;
    }
  }

  /* ALL DEVICES: bohat chhota phone (320px) - tracking bilkul zero ke qareeb, warna KROSSFORD / ANNOUNCEMENTS kat jata hai */
  @media (max-width: 400px) {
    .tracking-widest,
    .tracking-\[0\.3em\],
    .tracking-\[0\.35em\],
    .tracking-\[0\.4em\] {
      letter-spacing: 0.02em !important;
    }
  }
}

/* FIX 1: Marquee Animation - Header wali ticker ab chalegi */
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

/* Scrollbar clean */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0a0a0a;
}
::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 4px;
}

/* FIX 4: MOBILE FLOAT FIX - WhatsApp + AI button hero ke buttons ke upar na chadhen */
/* PEHLE WALI GALTI: yahan main section:first-child pe padding-bottom 2.5rem !important tha, jo Home page ke pb-28 (7rem) ko kaat raha tha - isi liye AI button Shop Collection pe charh jata tha. Ab wo line HATA DI - Home page ki apni padding hi chalegi. */
@media (max-width: 640px) {
  /* Fixed wale floating buttons (WhatsApp / AI) ko thoda upar karo taake content na chhupaye - lekin itna upar nahi ke hero ko dhak dein */
  .fixed.bottom-4, .fixed.bottom-5, .fixed.bottom-6 {
    bottom: 1rem !important;
  }
  /* AI wali patti mobile pe full width na le, taake button poora dikhe */
  [class*="Ask Krossford"] {
    max-width: calc(100vw - 2rem) !important;
  }
}

/* ALL DEVICES: koi bhi table / bara element mobile pe bahar nahi nikalega - andar hi scroll hoga */
table {
  max-width: 100%;
  display: block;
  overflow-x: auto;
}
