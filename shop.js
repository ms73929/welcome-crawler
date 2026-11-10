/* shop.js: the store's mechanics.
   STORE_ITEMS is the stock: an id (the same as the item's id in the bag), a name, a price, a description and the line shown when the
   player can't carry any more. Each item is a card with its picture (item-art.js) on the front. The Details button turns the card over
   to show the description. The cart, Buy and the store window are below. index.html calls createShop once and hands it the few things it
   needs from the game, so this file can be edited on its own. (The store room itself, with its counter and shelf, is built in index.html.)

   The shop's motion is planned in the six motion sentences (R1 to R6). The styles and timings are in styles.css (search for "motion");
   what needs the script is here: the headline words (R2), the cards that reveal as they scroll (R4), the try-on picture that follows the
   scroll (R5), and the add-to-cart flight with its badge bump (R6). */
import { artFor, storefrontSvg, donutPreviewSvg } from './item-art.js';

export function createShop({ state, $, storeDlg, invRoom, invGive, coinSound = () => {}, updateHud = () => {}, updatePause = () => {}, checkAchievements = () => {}, leaveHref = 'index.html' }) {
  /* Two homes, one shop: in the game the store is a <dialog> (a window that scrolls inside itself); on shop.html it is a plain <main>
     (the page scrolls). `modal` says which one this is, and `scroller` is what the scroll observers watch (null means the page). */
  const modal = typeof storeDlg.showModal === 'function', scroller = modal ? storeDlg : null;
  const STORE_ITEMS = [                                                    // placeholder wording and prices: edit freely
    { id: 'hatParty', name: 'Party hat for Donut', price: 4, text: 'A small purple party hat for Donut. She will pretend not to like it.', full: 'You already have this hat.' },
    { id: 'hatPirate', name: 'Pirate hat for Donut', price: 8, text: 'A black pirate hat with gold trim and a skull and crossbones, sized for a cat.', full: 'You already have this hat.' },
    { id: 'hatUmbrella', name: 'Umbrella hat for Donut', price: 6, text: 'A hat with a small red and yellow umbrella on top, sized for a cat.', full: 'You already have this hat.' },
    { id: 'hatCap', name: 'Baseball cap for Donut', price: 5, text: 'A blue baseball cap with a curved brim, sized for a cat.', full: 'You already have this cap.' },
    { id: 'hatCowboy', name: 'Cowboy hat for Donut', price: 8, text: 'A tan cowboy hat with a wide curled brim, sized for a cat.', full: 'You already have this hat.' },
    { id: 'hatPickle', name: 'Pickle hat for Donut', price: 6, text: 'A hat shaped like a green pickle, covered in little bumps, sized for a cat.', full: 'You already have this hat.' },
    { id: 'hatTall', name: 'Tall striped hat for Donut', price: 9, text: 'A very tall hat with red and white stripes, sized for a cat. It sticks well above her head.', full: 'You already have this hat.' },
    { id: 'caseEmpty', name: 'Confetti grenade case', price: 5, text: 'An empty case. Walk through fresh llama confetti to fill it. A full case is a grenade.', full: 'You cannot carry any more cases.' },
    { id: 'file', name: 'Confetti-proof nail file', price: 5, text: 'Confetti no longer slows you down.', full: 'You already have it.' }
  ];
  for (const it of STORE_ITEMS) if (!(it.id in state.cart)) state.cart[it.id] = 0;
  const storeNote = $('storeNote');
  const coinWord = n => `${n} coin${n === 1 ? '' : 's'}`;
  const cartCount = () => STORE_ITEMS.reduce((n, it) => n + state.cart[it.id], 0);
  const cartTotal = () => STORE_ITEMS.reduce((n, it) => n + state.cart[it.id] * it.price, 0);
  const cartSummary = () => `Cart: ${cartCount()} item${cartCount() === 1 ? '' : 's'}, ${coinWord(cartTotal())}.`;
  const make = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
  const button = (label, aria, cls) => { const b = make('button', cls, label); b.type = 'button'; b.setAttribute('aria-label', aria); return b; };

  /* ---- Motion: everything that needs the script (the timings and easings themselves are in styles.css) ---- */
  document.documentElement.classList.add('js-motion');                    // styles that hide things before they animate in only apply once this script is running
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nameOf = id => (STORE_ITEMS.find(i => i.id === id) || {}).name || '';
  $('storeArt').innerHTML = storefrontSvg();                              // R3: the storefront; its sign, llama and bulb are animated by styles.css
  $('tryonArt').innerHTML = donutPreviewSvg();
  const title = $('storeTitle'), titleWords = title.textContent.trim().split(/\s+/);
  title.textContent = '';
  titleWords.forEach((w, i) => {                                          // R2: each word is its own span, so each can arrive on its own; real spaces stay between them
    const sp = make('span', 'w', w); sp.style.setProperty('--i', String(i)); if (w === 'Loose') sp.classList.add('crooked'); title.append(sp);
    if (i < titleWords.length - 1) title.append(' ');
  });
  function playHero() { storeDlg.classList.remove('play'); void storeDlg.offsetWidth; storeDlg.classList.add('play'); }   // restart the headline every time the store opens
  const pause = $('storePause');
  pause.addEventListener('click', () => {                                 // the storefront's loops run for more than five seconds, so they can be paused
    const on = $('storeArt').classList.toggle('paused'); pause.textContent = on ? 'Play animations' : 'Pause animations';
  });

  function setTryOn(id) {                                                 // R5: the hat Donut is wearing in the strip follows the card in the middle of the window
    for (const g of $('tryonArt').querySelectorAll('.tryon-hat')) g.classList.toggle('on', g.dataset.hat === id);
    $('tryonName').textContent = id ? `Trying on: ${nameOf(id)}` : 'Scroll to try hats on Donut.';
  }
  let revealIO = null, tryIO = null; const inBand = new Set();
  function watchCards() {
    if (revealIO) revealIO.disconnect(); if (tryIO) tryIO.disconnect();
    const all = [...cards.values()];
    if (!('IntersectionObserver' in window) || reduced()) all.forEach(c => c.card.classList.add('in'));   // no observer, or reduced motion: nothing waits to be revealed
    else revealIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } }), { root: scroller, threshold: 0.15 });   // R4
    inBand.clear();
    if ('IntersectionObserver' in window) tryIO = new IntersectionObserver(es => {
      es.forEach(e => { if (e.target.dataset.hat) (e.isIntersecting ? inBand.add(e.target) : inBand.delete(e.target)); });
      const mid = modal ? storeDlg.getBoundingClientRect() : { left: 0, width: innerWidth }; let best = null, bestGap = Infinity;      // a whole row of cards can be in the band together: take the one nearest the window's middle
      inBand.forEach(c => { const r = c.getBoundingClientRect(), gap = Math.abs(r.left + r.width / 2 - (mid.left + mid.width / 2)); if (gap < bestGap) { best = c; bestGap = gap; } });
      if (best) setTryOn(best.dataset.hat);
    }, { root: scroller, rootMargin: '-50% 0px -45% 0px' });
    all.forEach((c, i) => {
      c.card.style.setProperty('--d', `${(i % 3) * 90}ms`);               // R4: cards in the same row arrive 90 ms apart
      if (revealIO) revealIO.observe(c.card); if (tryIO && c.card.dataset.hat) tryIO.observe(c.card);
    });
  }
  const tryOnCard = e => { const c = e.target.closest && e.target.closest('.shopcard[data-hat]'); if (c) setTryOn(c.dataset.hat); };
  storeDlg.addEventListener('mouseover', tryOnCard); storeDlg.addEventListener('focusin', tryOnCard);   // pointing at a hat card, or tabbing into one, tries that hat on too
  let flying = 0;                                                         // flights in the air: the badge's number waits for them to land
  function flyToCart(fromEl) {                                            // R6: a copy of the item's picture flies to the cart badge; when it lands, the badge bumps
    const badge = $('cartBadge');
    if (!fromEl || reduced() || !badge.getClientRects().length) return;
    flying++;
    const a = fromEl.getBoundingClientRect(), b = badge.getBoundingClientRect(), ghost = fromEl.cloneNode(true);
    ghost.removeAttribute('role'); ghost.removeAttribute('aria-label'); ghost.setAttribute('aria-hidden', 'true'); ghost.classList.add('fly-copy');
    const d = storeDlg.getBoundingClientRect();                           // the dialog is moved by a transform, so the ghost is placed in the dialog's own coordinates (and scrolls with it)
    Object.assign(ghost.style, { left: `${a.left - d.left - storeDlg.clientLeft}px`, top: `${a.top - d.top - storeDlg.clientTop + storeDlg.scrollTop}px`, width: `${a.width}px`, height: `${a.height}px` });
    storeDlg.append(ghost);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    ghost.animate([{ transform: 'translate(0, 0) scale(1)', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(0.3)`, opacity: 0.9 }],
      { duration: 520, easing: 'cubic-bezier(0.5, 0, 0.8, 0.4)', fill: 'forwards' }).finished
      .then(() => { flying--; ghost.remove(); badge.textContent = String(cartCount()); badge.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 260, easing: 'cubic-bezier(0.25, 0.8, 0.35, 1)' }); })
      .catch(() => { flying--; ghost.remove(); badge.textContent = String(cartCount()); });
  }

  /* ---- The cards: built when the store opens, then updated in place so a card that is turned over stays turned over ---- */
  const cards = new Map();
  function buildStore() {
    const box = $('storeItems'); box.textContent = ''; cards.clear();
    for (const it of STORE_ITEMS) {
      const card = make('div', 'shopcard'), inner = make('div', 'shopcard-inner'), front = make('div', 'shopface front'), back = make('div', 'shopface back');
      card.setAttribute('role', 'group'); card.setAttribute('aria-label', it.name); if (it.id.startsWith('hat')) card.dataset.hat = it.id;
      const top = make('div', 'top'), info = make('div'), art = artFor(it.id);
      info.append(make('span', 'name', it.name), make('span', 'cost', coinWord(it.price))); top.append(art, info);
      const status = make('p', 'status');
      const row = make('div', 'row');
      const add = button('Add to cart', `Add to cart: ${it.name}`); add.dataset.add = it.id;
      const rem = button('Remove', `Remove from cart: ${it.name}`, 'ghost'); rem.dataset.remove = it.id;
      const qty = make('span', 'qty');
      const more = button('Details', `Details: ${it.name}`, 'ghost'); more.dataset.flip = it.id; more.dataset.to = 'back';
      row.append(add, rem, qty, more); front.append(top, status, row);
      const bk = button('Back to item', `Back to item: ${it.name}`, 'ghost'); bk.dataset.flip = it.id; bk.dataset.to = 'front';
      back.append(make('span', 'name', it.name), make('p', 'd', it.text), bk);
      back.inert = true;                                                  // the face that is turned away can't be reached with Tab or a screen reader
      inner.append(front, back); card.append(inner); box.append(card);
      cards.set(it.id, { card, front, back, add, rem, qty, status, more, bk });
    }
  }
  function setFlipped(id, on) {
    const c = cards.get(id); if (!c) return;
    c.card.classList.toggle('flipped', on); c.front.inert = on; c.back.inert = !on;
    (on ? c.bk : c.more).focus({ preventScroll: true });
  }
  function updateStore() {
    for (const it of STORE_ITEMS) {
      const max = invRoom(it.id); state.cart[it.id] = Math.max(0, Math.min(state.cart[it.id], max));   // never more in the cart than the player could carry
      const c = cards.get(it.id), qty = state.cart[it.id];
      c.add.setAttribute('aria-disabled', String(max - qty <= 0)); c.rem.setAttribute('aria-disabled', String(qty <= 0));
      c.qty.textContent = `In cart: ${qty}`; c.status.textContent = max <= 0 ? it.full : '';
    }
    const lines = $('cartLines'); lines.textContent = '';
    const inCart = STORE_ITEMS.filter(it => state.cart[it.id] > 0);
    for (const it of inCart) lines.append(make('li', '', `${state.cart[it.id]} \u00d7 ${it.name}: ${coinWord(state.cart[it.id] * it.price)}`));
    if (!inCart.length) lines.append(make('li', '', 'The cart is empty.'));
    const total = cartTotal(), short = total - state.coins;
    $('cartTotal').textContent = `Total: ${coinWord(total)}. You have ${coinWord(state.coins)}.${short > 0 ? ` You need ${coinWord(short)} more.` : ''}`;
    $('storeCoins').textContent = String(state.coins);
    if (!flying) $('cartBadge').textContent = String(cartCount());
    $('storeBuy').setAttribute('aria-disabled', String(!cartCount() || short > 0));
    $('storeEmpty').setAttribute('aria-disabled', String(!cartCount()));
  }
  function openStore() {
    storeNote.textContent = ''; buildStore(); updateStore(); setTryOn(null);
    if (modal) { storeDlg.showModal(); storeDlg.scrollTop = 0; }
    updatePause(); playHero(); watchCards();
    if (modal) storeDlg.querySelector('[data-add]').focus();                // on the page, focus stays where the browser puts it
  }
  function cartAdd(id, fromEl) {
    const it = STORE_ITEMS.find(i => i.id === id); if (!it) return;
    const max = invRoom(id);
    if (max - state.cart[id] <= 0) { storeNote.textContent = max <= 0 ? it.full : `That is all you can carry. ${cartSummary()}`; return; }
    state.cart[id]++; storeNote.textContent = `Added: ${it.name}. ${cartSummary()}`; flyToCart(fromEl); updateStore();   // the flight starts first, so the badge's number waits for it
  }
  function cartRemove(id) {
    const it = STORE_ITEMS.find(i => i.id === id); if (!it) return;
    if (state.cart[id] <= 0) { storeNote.textContent = `${it.name} is not in the cart.`; return; }
    state.cart[id]--; storeNote.textContent = `Removed: ${it.name}. ${cartSummary()}`; updateStore();
  }
  function emptyCart() {
    if (!cartCount()) { storeNote.textContent = 'The cart is already empty.'; return; }
    for (const it of STORE_ITEMS) state.cart[it.id] = 0;
    storeNote.textContent = 'Cart emptied.'; updateStore();
  }
  function buyCart() {                                                     // the one purchase: pays for everything in the cart and hands it over
    if (!cartCount()) { storeNote.textContent = 'The cart is empty. Add something first.'; return; }
    const total = cartTotal();
    if (total > state.coins) { storeNote.textContent = `You need ${coinWord(total - state.coins)} more. Remove something or come back with more coins.`; return; }
    const bought = [];
    for (const it of STORE_ITEMS) {
      const n = state.cart[it.id]; if (!n) continue;
      invGive(it.id, n);                                                   // the cart was trimmed to what fits, so all of it goes in
      bought.push(n > 1 ? `${n} \u00d7 ${it.name}` : it.name); state.cart[it.id] = 0;
    }
    state.coins -= total; state.bought++; coinSound(); updateHud();
    storeNote.textContent = `Bought: ${bought.join(', ')}. Coins left: ${state.coins}.`;
    updateStore();
  }
  storeDlg.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.add) cartAdd(b.dataset.add, b.closest('.shopface').querySelector('.art')); else if (b.dataset.remove) cartRemove(b.dataset.remove);
    else if (b.dataset.flip) setFlipped(b.dataset.flip, b.dataset.to === 'back');
  });
  $('storeBuy').addEventListener('click', buyCart);
  $('storeEmpty').addEventListener('click', emptyCart);
  const leave = $('storeLeave'), closeX = $('storeX');                    // on shop.html, Leave is a plain link to the game and there is no X
  if (modal) { leave.addEventListener('click', () => storeDlg.close()); closeX.addEventListener('click', () => storeDlg.close()); }
  else if (leave.tagName === 'BUTTON') leave.addEventListener('click', () => { location.href = leaveHref; });
  storeDlg.addEventListener('close', () => { updatePause(); if (state.bought === 0) state.windowShopped = true; checkAchievements(); });
  return { STORE_ITEMS, openStore, cartAdd, cartRemove, emptyCart, buyCart };
}
