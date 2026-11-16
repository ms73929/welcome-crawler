/* item-art.js: a picture for every item, used by the store (shop.js) and the bag (index.html).
   Each entry has `alt` (what the picture shows, for people who can't see it) and either `svg` (a drawing made here) or `src`
   (the path to your own image file, such as 'images/top-hat.png'). To swap in your own image, replace an entry's svg with src.
   The drawings sit on a cream tile (see .art in styles.css), so their dark outlines stay easy to see. */
const INK = '#2b2233';
const S = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const star = (cx, cy, ro, ri) => Array.from({ length: 10 }, (_, i) => {            // the corners of a five-pointed star
  const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? ri : ro;
  return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
}).join(' ');
const svg = inner => `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${inner}</svg>`;
const caseSvg = full => svg(`
  <rect x="50" y="8" width="20" height="10" rx="4" fill="#b8bcc6" ${S}/>
  <rect x="30" y="16" width="60" height="16" rx="6" fill="#8d94a0" ${S}/>
  <rect x="34" y="30" width="52" height="78" rx="8" fill="#b8bcc6" ${S}/>
  <rect x="42" y="44" width="36" height="46" rx="5" fill="${full ? '#fff1d6' : '#3a3150'}" ${S}/>
  ${full ? `<rect x="46" y="74" width="8" height="8" fill="#ff4fa3"/><rect x="56" y="78" width="8" height="8" fill="#ffd23f"/><rect x="66" y="72" width="8" height="8" fill="#1fc8b8"/>
  <rect x="48" y="62" width="8" height="8" fill="#3d7bff"/><rect x="60" y="64" width="8" height="8" fill="#ff8a1f"/><rect x="68" y="52" width="6" height="6" fill="#9b5de5"/>
  <rect x="50" y="50" width="6" height="6" fill="#5ad65a"/><rect x="94" y="22" width="7" height="7" fill="#ff4fa3"/><rect x="18" y="38" width="7" height="7" fill="#ffd23f"/>
  <rect x="98" y="52" width="6" height="6" fill="#1fc8b8"/>` : '<path d="M48 52l24 30M72 52L48 82" stroke="#6d6585" stroke-width="3" stroke-linecap="round"/>'}
  <rect x="30" y="94" width="60" height="6" fill="#ff8a1f" ${S}/>`);

const tallHat = () => {                                       // a tall hat with horizontal red and white stripes: each stripe is a slice of a slightly tapering shape
  const yTop = 8, yBot = 98, n = 9, h = (yBot - yTop) / n, edge = y => [38 + (yBot - y) * 4 / (yBot - yTop), 82 - (yBot - y) * 4 / (yBot - yTop)];
  let out = '';
  for (let i = 0; i < n; i++) {
    const y1 = yTop + i * h, y2 = y1 + h, [l1, r1] = edge(y1), [l2, r2] = edge(y2);
    out += `<polygon points="${l1.toFixed(1)},${y1.toFixed(1)} ${r1.toFixed(1)},${y1.toFixed(1)} ${r2.toFixed(1)},${y2.toFixed(1)} ${l2.toFixed(1)},${y2.toFixed(1)}" fill="${i % 2 ? '#ffffff' : '#e0242a'}"/>`;
  }
  const [lt, rt] = edge(yTop), [lb, rb] = edge(yBot);
  return svg(`${out}<polygon points="${lt},${yTop} ${rt},${yTop} ${rb},${yBot} ${lb},${yBot}" fill="none" ${S}/>
    <ellipse cx="60" cy="${yTop}" rx="21" ry="4.5" fill="#e0242a" ${S}/>
    <ellipse cx="60" cy="${yBot + 3}" rx="42" ry="9" fill="#e0242a" ${S}/>`);
};

export const ITEM_ART = {
  stick: { alt: 'A brown stick with one small twig.', svg: svg(`
    <path d="M22 100L98 22" stroke="${INK}" stroke-width="18" stroke-linecap="round"/><path d="M22 100L98 22" stroke="#a37c4e" stroke-width="11" stroke-linecap="round"/>
    <path d="M58 64L84 80" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><path d="M58 64L84 80" stroke="#a37c4e" stroke-width="8" stroke-linecap="round"/>`) },
  water: { alt: 'A water bottle with a pink cap and a blue water drop on its label.', svg: svg(`
    <rect x="44" y="8" width="32" height="14" rx="4" fill="#ff4fa3" ${S}/>
    <path d="M48 22h24v8c10 6 16 14 16 26v48a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8V56c0-12 6-20 16-26z" fill="#9fd3f5" ${S}/>
    <rect x="32" y="58" width="56" height="28" fill="#ffffff" ${S}/>
    <path d="M60 62c-6 8-8 11-8 14a8 8 0 0 0 16 0c0-3-2-6-8-14z" fill="#3d7bff" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M42 40c-4 6-6 12-6 18" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>`) },
  caseEmpty: { alt: 'A steel grenade case with a small window. The inside is dark and empty.', svg: caseSvg(false) },
  caseFull: { alt: 'A steel grenade case with a small window, full of colorful confetti.', svg: caseSvg(true) },
  file: { alt: 'A blue nail file with a gritty surface and a yellow star badge.', svg: svg(`
    <g transform="rotate(-35 60 66)"><rect x="12" y="52" width="96" height="26" rx="13" fill="#3d7bff" ${S}/>
    <g fill="#bcd4ff"><circle cx="34" cy="62" r="2.2"/><circle cx="46" cy="70" r="2.2"/><circle cx="58" cy="62" r="2.2"/><circle cx="70" cy="70" r="2.2"/><circle cx="82" cy="62" r="2.2"/><circle cx="94" cy="70" r="2.2"/></g></g>
    <polygon points="${star(92, 28, 15, 6.5)}" fill="#ffd23f" ${S}/>`) },
  hatParty: { alt: 'A purple party hat with colored dots, a yellow band and a yellow pom-pom.', svg: svg(`
    <polygon points="60,16 94,98 26,98" fill="#9b5de5" ${S}/>
    <polygon points="32,84 88,84 94,98 26,98" fill="#ffd23f" ${S}/>
    <circle cx="60" cy="14" r="9" fill="#ffd23f" ${S}/>
    <circle cx="56" cy="46" r="4" fill="#ff4fa3"/><circle cx="68" cy="62" r="4" fill="#1fc8b8"/><circle cx="50" cy="68" r="4" fill="#ffd23f"/>`) },
  hatPirate: { alt: 'A black pirate hat with gold trim and a white skull and crossbones.', svg: svg(`
    <path d="M8 80Q22 22 60 20Q98 22 112 80Q60 64 8 80Z" fill="#1c1824" ${S}/>
    <path d="M8 80Q60 64 112 80" fill="none" stroke="#ffd23f" stroke-width="5" stroke-linecap="round"/>
    <path d="M46 70L74 54M46 54L74 70" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
    <circle cx="60" cy="44" r="10" fill="#ffffff" ${S}/><circle cx="56" cy="43" r="2.6" fill="${INK}"/><circle cx="64" cy="43" r="2.6" fill="${INK}"/>
    <rect x="55" y="50" width="10" height="5" fill="#ffffff" ${S}/>`) },
  hatUmbrella: { alt: 'A hat with a small red and yellow striped umbrella held above it on a pole.', svg: svg(`
    <path d="M60 62V90" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M12 64A48 44 0 0 1 108 64Z" fill="#ff3b3b" ${S}/>
    <path d="M60 20L36 64M60 20L84 64" fill="none" stroke="#ffd23f" stroke-width="9" stroke-linecap="round"/>
    <path d="M12 64A48 44 0 0 1 108 64Z" fill="none" ${S}/>
    <circle cx="60" cy="18" r="4" fill="#ffd23f" ${S}/>
    <rect x="40" y="88" width="40" height="18" rx="7" fill="#3d7bff" ${S}/>`) },
  hatCap: { alt: 'A blue baseball cap with a curved brim and a button on top.', svg: svg(`
    <path d="M60 84Q104 74 114 90Q84 98 60 94Z" fill="#2a5bd0" ${S}/>
    <path d="M24 86A36 44 0 0 1 96 86Z" fill="#3d7bff" ${S}/>
    <path d="M60 42V86" stroke="#bcd4ff" stroke-width="3" stroke-linecap="round"/>
    <circle cx="60" cy="40" r="5" fill="#2a5bd0" ${S}/>
    <polygon points="${star(42, 66, 9, 4)}" fill="#ffffff" ${S}/>`) },
  hatCowboy: { alt: 'A tan cowboy hat with a wide curled brim and a brown band with a gold buckle.', svg: svg(`
    <path d="M6 72Q24 96 60 94Q96 96 114 72Q100 82 80 80L40 80Q20 82 6 72Z" fill="#cf9a55" ${S}/>
    <path d="M38 80Q34 36 50 28Q60 38 70 28Q86 36 82 80Z" fill="#e8c98c" ${S}/>
    <rect x="38" y="64" width="44" height="14" fill="#5a2f12" ${S}/>
    <rect x="54" y="65" width="12" height="12" rx="2" fill="#ffd23f" ${S}/>`) }
,
  hatPickle: { alt: 'A green pickle-shaped hat covered in small dark green bumps, with a short brim.', svg: svg(`
    <ellipse cx="60" cy="100" rx="34" ry="8" fill="#2f6b1c" ${S}/>
    <g transform="rotate(-8 60 60)"><rect x="40" y="10" width="40" height="92" rx="20" fill="#5ea83a" ${S}/>
    <path d="M50 26v56" stroke="#9bd66b" stroke-width="5" stroke-linecap="round" fill="none"/>
    <g fill="#2f6b1c"><circle cx="52" cy="22" r="3"/><circle cx="68" cy="30" r="3"/><circle cx="58" cy="42" r="3"/><circle cx="71" cy="54" r="3"/><circle cx="50" cy="60" r="3"/>
    <circle cx="64" cy="70" r="3"/><circle cx="54" cy="82" r="3"/><circle cx="70" cy="88" r="3"/></g></g>`) },
  hatTall: { alt: 'A very tall hat with red and white horizontal stripes and a red brim.', svg: tallHat() }
};

export function artFor(id) {                                  // a picture element for an item, with its description for assistive technology
  const a = ITEM_ART[id], el = document.createElement('span');
  el.className = 'art';
  if (!a) { el.setAttribute('aria-hidden', 'true'); return el; }
  el.setAttribute('role', 'img'); el.setAttribute('aria-label', a.alt);
  if (a.src) { const img = new Image(); img.alt = ''; img.src = a.src; el.append(img); } else el.innerHTML = a.svg;
  return el;
}


/* ---- The storefront drawn above the store window (decorative: the heading already says what the shop is).
   Three parts carry classes that styles.css animates: .sign and .llama sway from where they hang, .bulb dims now and then. ---- */
export const STOREFRONT_ALT = 'Shop front of First Chance for Loose Change: a purple fringed awning, a hanging wooden sign reading "First chance for loose change," a pink piñata llama dangling on the left, and a bare light bulb on the right. The three sway or flicker gently.';
export const donutAlt = hatName => hatName ? `Donut, an orange cat, wearing the ${hatName.replace(/ for Donut$/, '').toLowerCase()}.` : 'Donut, an orange cat, wearing no hat.';
export function storefrontSvg() {
  const cols = ['#b9515a', '#d1a845', '#4b9a93'], hs = [34, 22, 40, 28, 44, 20, 36, 30, 42, 24, 38, 26, 46, 32, 28, 40];
  const fringe = hs.map((h, i) => `<path d="M${104 + i * 47} 170h30l-3 ${h}l-8 -6l-6 8l-7 -7l-6 5z" fill="${cols[i % 3]}" ${S}/>`).join('');
  return `<svg viewBox="100 100 760 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <rect x="110" y="170" width="740" height="190" fill="#cdbb94" ${S}/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M${170 + i * 60} 172V358" stroke="#a8966f" stroke-width="2"/>`).join('')}
    <polygon points="100,172 122,112 838,106 862,168" fill="#9a86a9" ${S}/>${fringe}
    <g class="sign"><path d="M392 172L402 232M568 172L562 228" stroke="${INK}" stroke-width="3"/>
      <g transform="rotate(-2 480 262)"><rect x="378" y="228" width="204" height="70" rx="4" fill="#6d5237" ${S}/>
      <text x="480" y="256" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="19" fill="#f4e6c8">FIRST CHANCE</text>
      <text x="480" y="282" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="19" fill="#f4e6c8">FOR LOOSE CHANGE</text></g></g>
    <circle cx="190" cy="176" r="5" fill="none" stroke="${INK}" stroke-width="3"/>
    <g class="llama"><path d="M190 181V262" stroke="${INK}" stroke-width="3"/>
      <rect x="155" y="262" width="70" height="38" fill="#c98ca0" ${S}/><rect x="212" y="244" width="14" height="22" fill="#c98ca0" ${S}/><rect x="214" y="236" width="26" height="18" fill="#c98ca0" ${S}/>
      <polygon points="216,236 220,224 224,236" fill="#c98ca0" ${S}/><polygon points="228,236 233,225 236,236" fill="#c98ca0" ${S}/>
      <rect x="160" y="300" width="9" height="22" fill="#a56f84" ${S}/><rect x="176" y="300" width="9" height="22" fill="#a56f84" ${S}/><rect x="198" y="300" width="9" height="22" fill="#a56f84" ${S}/><rect x="214" y="300" width="9" height="22" fill="#a56f84" ${S}/>
      <rect x="168" y="268" width="26" height="9" fill="#c9ccd2" ${S} transform="rotate(-12 181 272)"/><polyline points="204,262 200,272 207,278 202,290" fill="none" ${S}/>
      <circle cx="230" cy="244" r="2.6" fill="${INK}"/><rect x="196" y="330" width="6" height="6" fill="#d1a845"/><rect x="208" y="340" width="6" height="6" fill="#4b9a93"/><rect x="186" y="344" width="6" height="6" fill="#b9515a"/></g>
    <path d="M730 172V210" stroke="${INK}" stroke-width="3"/>
    <g class="bulb"><rect x="723" y="208" width="14" height="10" fill="#8d94a0" ${S}/><circle cx="730" cy="232" r="14" fill="#ffe9a8" ${S}/>
      <path d="M730 202v-6M706 232h-8M754 232h8M713 215l-6-6M747 215l6-6" stroke="${INK}" stroke-width="2" stroke-dasharray="3 3"/></g>
  </svg>`;
}

/* ---- Donut for the try-on strip: a cat's head with every hat drawn on top, all hidden until styles.css shows the one being tried on.
   The hats are the same drawings as the item pictures, placed on her head. ---- */
export function donutPreviewSvg() {
  const hats = Object.keys(ITEM_ART).filter(id => id.startsWith('hat')).map(id => {
    const inner = ITEM_ART[id].svg.trim().replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    return `<g class="tryon-hat" data-hat="${id}" transform="translate(22.8 2) scale(0.62)">${inner}</g>`;
  }).join('');
  return `<svg viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <ellipse cx="60" cy="118" rx="36" ry="20" fill="#b85a16" ${S}/>
    <polygon points="36,90 38,56 56,72" fill="#d97a2a" ${S}/><polygon points="84,90 82,56 64,72" fill="#d97a2a" ${S}/>
    <polygon points="42,80 43,64 52,74" fill="#f2a07b"/><polygon points="78,80 77,64 68,74" fill="#f2a07b"/>
    <circle cx="60" cy="96" r="27" fill="#d97a2a" ${S}/>
    <path d="M60 70v8M50 72l2 7M70 72l-2 7" stroke="#8a3f0f" stroke-width="3" stroke-linecap="round" fill="none"/>
    <ellipse cx="50" cy="96" rx="5" ry="6" fill="#ffffff" ${S}/><ellipse cx="70" cy="96" rx="5" ry="6" fill="#ffffff" ${S}/>
    <ellipse cx="51" cy="97" rx="2.4" ry="4" fill="${INK}"/><ellipse cx="71" cy="97" rx="2.4" ry="4" fill="${INK}"/>
    <polygon points="56,105 64,105 60,110" fill="#ff7aa8" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M60 110v3M54 115q6 4 12 0M40 108l-14-3M40 112l-14 3M80 108l14-3M80 112l14 3" stroke="${INK}" stroke-width="2" stroke-linecap="round" fill="none"/>
    ${hats}
  </svg>`;
}
