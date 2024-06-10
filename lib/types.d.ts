import { ICON_ID } from '#lib/icons/iconID'

export type NavigationItem = {
  name: string
  path: string
  icon: ICON_ID
  title: string
  description: string
}

// RESPONSE TYPES

export type GetTokenResponse = {
  token: string
}

export type PostMailResponse = {
  message: string
}
