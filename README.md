# a pixi stage with custom mouse handler and gsap tweening.
### in typescript, build with vite

Dream of my sleepless nights; a template for creating interactive pages with PixiJS, Vite, and TypeScript.

<img src="https://github.com/richard-unterberg/richard-unterberg.github.io/blob/master/public/preview.gif?raw=true" alt="drawing" width="480"/>

## Motivation

I had this cool effect in mind, saw on a flash website years ago. It was a spawn effect, where the user could emit a massive amount of sprites by hovering on a stage. The sprites were spawned at the mouse position and animated to a random position on the screen. So Impressive - always wanted to recreate this effect. Also the [particle-emitter](https://github.com/pixijs/particle-emitter) was a inspiring reference.

## Drawbacks Pixi version 8

- gsap pixi plugin currently not usable with pixi v8
  - mainly drawbacks with the color transitions (I'll adapt a small helper in the future)

## vite Startup Process

To start the development server with Vite, follow these steps:

1. Install dependencies:
   ```bash
   npm install or yarn
   ```

2. Run the development server:
   ```bash
   npm run dev or yarn dev
   ```

3. Run the production preview:
   ```bash
   npm run prod or yarn prod
   ```

## there will be more info and more control soon

- project structure (oop or functional?)
  - test react integration
- animation controller
- use [particle-emitter](https://github.com/pixijs/particle-emitter)
  - is it compatible with pixi v8?
  - hitbox possible for emitted particles?
- color transitions pixi vs gsap (0xFFF to #FFF)
- check why ``repeatRefresh`` is not working at all :(
- hitbox controller (partially implemented)
- cool getters for gsap animation target setters

welcome to 2024 👽
