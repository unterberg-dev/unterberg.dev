export enum TILE_TIMELINE {
  HOVER_IN,
  HOVER_OUT,
  HITBOX_IN,
  HITBOX_OUT,
  IDLE,
}

export enum SPACE_TIMELINE {
  IDLE,
}

export const PixiConfig = {
  configMaxDivider: 90,
  configMinDivider: 25,
  configMinDividerThreshold: 500,
  configMaxDividerThreshold: 1700,
  configCursorRadius: 2,
  configTileIcons: [
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
    '🌞',
    '🌝',
    '🌛',
  ],
  configSpaceIcons: ['🌝', '🌙', '🌔', '⭐', '🌞', '🛸', '🛰', '🚀'],
}
