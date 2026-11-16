# Motion log

**Student:** Martina Svyantek
**Shop name:** First Chance for Loose Change
**Live site:** https://  <!-- add your GitHub Pages link to shop.html here -->

## Motion sentences

Write one row for every animation. Fill in all six parts:

> When **[trigger]**, the **[element]** changes **[property]** over **[duration and delay]** with **[easing]**, so that **[job]**.

Jobs: feedback, orientation, continuity, status, storytelling, delight.

Easing names: `--ease-heavy` = cubic-bezier(0.25, 0.8, 0.35, 1); `--ease-sag` = cubic-bezier(0.45, 0, 0.55, 1); `--ease-clunk` = cubic-bezier(0.5, 0, 0.8, 0.4); flip curve = cubic-bezier(0.34, 1.2, 0.64, 1).

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 1 | R1 | hover or keyboard focus | shop card | translateY 0 → -3px and rotate 0 → -0.8deg | 240ms | `--ease-heavy` | feedback | transition |

When the pointer rests on a shop card or keyboard focus lands on anything inside it, the card changes its position and tilt (translateY from 0 to -3px and rotate from 0 to -0.8 degrees) over 240 ms with `--ease-heavy`, so that the player gets feedback about which card the next click or key press will act on.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 2 | R1 | press (mouse down or Space/Enter held) | shop card | translateY → -1px and scale 1 → 0.97 | 90ms | `--ease-heavy` | feedback | transition |

When a shop card is pressed with the mouse or with Space or Enter held down, the card changes its position and size (translateY to -1px and scale from 1 to 0.97) over 90 ms with `--ease-heavy`, so that the press gives immediate feedback and the click feels like it landed on something with weight.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 3 | R1 | hover or keyboard focus | button inside a card (Add, Remove, Details) | translateY 0 → -2px | 240ms | `--ease-heavy` | feedback | transition |

When the pointer rests on a button inside a card (Add, Remove or Details) or keyboard focus lands on it, the button changes its position (translateY from 0 to -2px) over 240 ms with `--ease-heavy`, so that the player gets feedback that the button is the thing that will respond.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 4 | R1 | press | button inside a card | scale 1 → 0.97 | 90ms | `--ease-heavy` | feedback | transition |

When a button inside a card is pressed, the button changes its size (scale from 1 to 0.97) over 90 ms with `--ease-heavy`, so that the press is acknowledged right away as feedback, before anything else on the page reacts.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 5 | R2 | page load | each of the five words of the shop's name | opacity 0 → 1, translateY 16px → 0 ("Loose" also settles at 2deg crooked) | 450ms each, delay 110ms × word number (0 to 440ms), all done by 890ms | `--ease-heavy` | storytelling | @keyframes + `--i` delay |

When the page loads, each of the five words of the shop's name changes its opacity (0 to 1) and position (translateY from 16px to 0, with "Loose" also settling 2 degrees crooked) over 450 ms, starting 110 ms after the word before it (the last word begins at 440 ms and the whole name is in place by 890 ms), with `--ease-heavy`, so that the name arrives like items set down on a counter, which tells the shop's dingy, overpriced story.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 6 | R3 | storefront on screen (loops forever) | SVG sign | rotate -3deg ↔ 2deg about the hinge at the awning (480, 172) | 5.2s, alternate, infinite | `--ease-sag` | delight | @keyframes, SVG (transform-box) |

When the storefront is on screen, the SVG sign rotates between -3 and 2 degrees about its hinge at the awning (480, 172) over 5.2 seconds, alternating forever, with `--ease-sag`, so that the sign looks hung from chains and the shop feels alive, which is delight.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 7 | R3 | storefront on screen (loops forever) | SVG piñata llama | rotate -2.5deg ↔ 3.5deg about the ring it hangs from (190, 176) | 6.7s, alternate, infinite | `--ease-sag` | delight | @keyframes, SVG (transform-box) |

When the storefront is on screen, the SVG piñata llama rotates between -2.5 and 3.5 degrees about the ring it hangs from (190, 176) over 6.7 seconds, alternating forever, with `--ease-sag`, so that it looks like it is dangling and not stuck to the wall, which is delight.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 8 | R3 | storefront on screen (loops forever) | SVG bulb | opacity 1 → 0.75 → 1 (one dip per cycle) | 4.3s, infinite | `--ease-sag` | delight | @keyframes, SVG |

When the storefront is on screen, the SVG bulb changes its opacity (1 to 0.75 and back, one dip per cycle) over 4.3 seconds, repeating forever, with `--ease-sag`, so that the shop feels like it has bad wiring without ever going dark, which is delight.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 9 | R4 | a card scrolls 15% into view | shop card | opacity 0 → 1 and translateY 24px → 0 | 500ms, delay 0 / 90 / 180ms by column | `--ease-heavy` | orientation | IntersectionObserver |

When a shop card scrolls 15% into view, the card changes its opacity (0 to 1) and position (translateY from 24px to 0) over 500 ms, delayed 0, 90 or 180 ms according to its column in the row, with `--ease-heavy`, so that the wares arrive a few at a time as the player moves down the shelf, which orients them in the list.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 10 | R4 | the same card is revealed | price inside the card | opacity 0 → 1 and translateY 10px → 0 | 500ms, delay 150ms after its card | `--ease-heavy` | orientation | IntersectionObserver |

When a card is revealed, the price inside it changes its opacity (0 to 1) and position (translateY from 10px to 0) over 500 ms, delayed 150 ms after its card, with `--ease-heavy`, so that the price arrives last and the player's eye is guided from the item to its cost, which is orientation.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 11 | R5 | a hat card crosses the middle band of the window while scrolling (also on hover or focus) | the hat drawn on Donut in the pinned strip | opacity: old hat 1 → 0, new hat 0 → 1 | 350ms | `--ease-sag` | storytelling | IntersectionObserver |

When a hat card crosses the middle band of the window while scrolling, or is pointed at or focused, the hat drawn on Donut in the pinned strip crossfades its opacity (the old hat from 1 to 0 and the new hat from 0 to 1) over 350 ms with `--ease-sag`, so that the player sees the hat on a cat before buying it, which tells the story of the purchase.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 12 | R6 | Add to cart pressed | copy of the item's picture | translate to the cart badge, scale 1 → 0.3, opacity 1 → 0.9 | 520ms | `--ease-clunk` | continuity | element.animate() |

When Add to cart is pressed, a copy of the item's picture changes its position, size and opacity (it translates to the cart badge, scales from 1 to 0.3 and fades from 1 to 0.9) over 520 ms with `--ease-clunk`, so that the player sees where the item went, which gives continuity between the card and the cart.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 13 | R6 | the flight finishes (`.finished`) | cart badge | scale 1 → 1.3 → 1 (number changes as it lands; the result is announced in a live region) | 260ms | `--ease-heavy` | status | element.animate() |

When the flight finishes (`.finished`), the cart badge changes its size (scale from 1 to 1.3 and back to 1) over 260 ms with `--ease-heavy`, while the number changes as the item lands and the result is announced in a live region, so that the player gets a status update at the moment the cart count changes.

| # | Req | Trigger | Element | Property | Duration / delay | Easing | Job | Tool |
|---|-----|---------|---------|----------|------------------|--------|-----|------|
| 14 | extra | Details or Back to item pressed | card (inner layer) | rotateY 0 → 180deg (the face turned away is `inert`) | 600ms | flip curve | continuity | transition |

When Details or Back to item is pressed, the card's inner layer rotates about its vertical axis (rotateY from 0 to 180 degrees) over 600 ms with the flip curve, while the face turned away becomes `inert`, so that the description reads as the back of the same card, which gives continuity between the two sides.


Tool = transition, @keyframes, IntersectionObserver, scroll progress, element.animate(), SVG, View Transition.

## Easing choices (R7)

Name three different easing curves you used. For each, say in one sentence why it fits that motion.

1. `--ease-heavy`, cubic-bezier(0.25, 0.8, 0.35, 1): it starts fast and settles slowly, so things land and stick like a heavy object set down on a counter, which suits a dingy, overpriced shop and never bounces.
2. `--ease-sag`, cubic-bezier(0.45, 0, 0.55, 1): it is slow at both ends, so the sign, llama and bulb never show a hard start or stop, like something hanging from a chain.
3. `--ease-clunk`, cubic-bezier(0.5, 0, 0.8, 0.4): it hesitates, then drops fast at the end, so the flying picture plunges into the cart like a coin into a jar.

Bonus, a fourth curve: the flip curve, cubic-bezier(0.34, 1.2, 0.64, 1), overshoots slightly and settles, the one deliberately springy move in the shop, so the card turns over with a small snap.

## What I saw in the X-ray

Pick one animation and describe what the Motion X-ray or the Chrome Animations panel showed you that you couldn't see at normal speed.

<!-- YOURS TO WRITE: one specific thing you saw. Numbers the X-ray shows for this page, so you can check them: the five headline words start 110ms apart and the last one ends at 890ms; the cart flight lasts 520ms and the badge number only changes when it ends; the sign (5.2s) and the llama (6.7s) loops are different lengths, so they never line up. -->

## Checks

- [ ] (R8) Reduced motion emulated in DevTools: what still moves, and what stops? **Result to confirm in DevTools:** nothing loops (the sign, llama and bulb stay still), the word-drop and card reveals are skipped so everything is simply there, the flip is instant, the cart flight is skipped (the badge updates at once), and the Pause button is hidden because there is nothing to pause. The hover lift on cards and buttons also stops.
- [ ] (R8) Pause button stops every infinite loop, and works from the keyboard **Result to confirm:** Pause freezes the sign, llama and bulb, and turns off the rest of the store's motion too: card lift, reveal, flip, hat crossfade and the cart flight all happen instantly instead of moving (nothing is left half-way or hidden). It is a real button, so Enter and Space both pause and resume it.
- [ ] (R8) Every :hover effect also happens on :focus-visible **Result to confirm:** each hover rule has a matching `:focus-visible` rule; cards lift when anything inside them has keyboard focus.
- [ ] (R8) Nothing flashes more than 3 times per second **Result to confirm:** the fastest change is the bulb, one dip to 75% opacity every 4.3s.
- [ ] (R9) Paint flashing checked: my animations use transform and opacity (DevTools, Rendering, Paint flashing; hover, scroll and press while watching)
- [ ] (R9) No `transition: all` anywhere **Result to confirm:** every transition names its properties (transform, translate, opacity); no `background-color` or layout properties are animated.
- [ ] (R4) With JavaScript disabled, every card is still visible **Result to confirm:** with JavaScript off, a plain list of every item with its price appears instead of the cards, and the controls that need JavaScript are hidden.
