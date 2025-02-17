import type { PixiConfigType } from "#lib/types"

export const APP_CONFIG = {
  viteSiteUrl: import.meta.env.PROD ? "https://unterberg.dev/" : "http://localhost:3000/",
  viteMediaUrl: `${
    import.meta.env.PROD ? "https://cdn.unterberg.dev/" : "http://localhost:3000"
  }${import.meta.env.BASE_URL.slice(0, -1)}`,
  viteMailApi: "https://mail.unterberg.dev/",
  defaultDuration: 0.35,
  defaultDurationSlow: 2.5,
}

export enum EMITTER_TIMELINE {
  DEFAULT = 0,
}

export enum SPACE_TIMELINE {
  DEFAULT = 0,
}

// path created with figma
export const defaultCirclePath = {
  d: "M200 6.25942e-06C90.3739 1.10182 0.773361 90.3687 0.500015 200C0.225974 309.91 90.0953 398.395 200 399.5C311.004 400.616 399.777 311.009 399.5 200C399.224 89.2669 310.728 -1.11288 200 6.25942e-06Z",
  viewBox: "0 0 400 400",
}

export const PixiConfig: PixiConfigType = {
  maxDivider: 80,
  minDivider: 15,
  minDividerThreshold: 500,
  maxDividerThreshold: 1900,
  emitter: {
    cursorRadius: {
      value: 1,
      min: 0,
      max: 1.5,
    },
    scaleModifier: {
      value: 1.2,
      min: 0.3,
      max: 7,
    },
    gravity: {
      value: 0,
      min: -3,
      max: 3,
    },
    pointerInertia: {
      value: 1.2,
      min: 1,
      max: 3,
    },
    pointerMissRate: {
      value: 0.05, // 0.1 = 10%,
      min: 0,
      max: 1,
    },
    inDuration: {
      min: 0.1,
      max: 0.9,
      value: [0.14, 0.7],
    },
    outDuration: {
      min: 0.9,
      max: 3,
      value: [0.9, 1.1],
    },
    skewFrom: {
      min: -2,
      max: 2,
      value: [-1.1, 1.1],
    },
    skewTo: {
      min: -2,
      max: 2,
      value: [-0.2, 0.2],
    },
    // dev only
    scaleHitboxIn: {
      min: 0.1,
      max: 0.3,
      value: [0.1, 0.3],
    },
    scaleIn: {
      min: 0.1,
      max: 1.9,
      value: [0.5, 1.9],
    },
    rotationIn: {
      min: -3.6,
      max: 3.6,
      value: [-1.6, 1.6], // 1.6 = 160 deg
    },
    alphaIn: {
      min: 0.1,
      max: 1,
      value: [0.1, 1],
    },
    pixelSpread: {
      min: 0,
      max: 150,
      value: [0, 10],
    },
    outDelay: {
      min: 0.04,
      max: 0.15,
      value: [0.04, 0.15],
    },
    bufferCount: {
      min: 10,
      max: 10000,
      value: 4000,
    },
  },
}
