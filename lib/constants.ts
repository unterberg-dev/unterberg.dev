export const APP_CONFIG = {
  viteSiteUrl: `${
    import.meta.env.PROD ? import.meta.env.VITE_SITE_URL_PROD : import.meta.env.VITE_SITE_URL_DEV
  }${import.meta.env.BASE_URL.slice(0, -1)}`,
  viteMediaUrl: `${
    import.meta.env.PROD ? 'https://cdn.unterberg.dev' : 'http://localhost:5247'
  }${import.meta.env.BASE_URL.slice(0, -1)}`,
  defaultDuration: 0.35,
  defaultDurationSlow: 2.5,
}

// todo: find better name
export enum IDLE_TILE_TIMELINE {
  DEFAULT,
}

export enum SPACE_TIMELINE {
  IDLE,
}

export enum EMITTER_TIMELINE {
  DEFAULT,
}

// path created with figma
export const defaultCirclePath = {
  d: 'M200 6.25942e-06C90.3739 1.10182 0.773361 90.3687 0.500015 200C0.225974 309.91 90.0953 398.395 200 399.5C311.004 400.616 399.777 311.009 399.5 200C399.224 89.2669 310.728 -1.11288 200 6.25942e-06Z',
  viewBox: '0 0 400 400',
}

export const PixiConfig = {
  configMaxDivider: 50,
  configMinDivider: 15,
  configMinDividerThreshold: 500,
  configMaxDividerThreshold: 1900,
  configCursorRadius: 1,
  configEmitterIcons: [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '🤣',
    '😂',
    '🙂',
    '🙃',
    '😉',
    '😊',
    '😇',
    '🥰',
    '😍',
    '🤩',
    '😘',
    '😗',
    '😚',
    '😙',
    '🐶',
    '🐱',
    '🐹',
    '🦊',
    '🐻',
    '🐨',
    '🦁',
    '🎉',
    '🎈',
    '🎁',
    '🏳️‍🌈',
  ],
  configTileIcons: ['🌝', '🌙', '🌔', '⭐', '🌞', '🛸', '🛰', '🚀'],
  configSpaceIcons: ['🌝', '🌙', '🌔', '⭐', '🌞', '🛸', '🛰', '🚀'],
}
