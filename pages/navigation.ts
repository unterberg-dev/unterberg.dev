import { ICON_ID } from '#lib/icons/iconID'
import type { NavigationItem } from '#lib/types'

export enum MAIN_NAV_KEY {
  HOME = 'home',
}

export const mainNavigation: {
  [key in MAIN_NAV_KEY]: NavigationItem
} = {
  [MAIN_NAV_KEY.HOME]: {
    name: 'Home',
    path: '',
    icon: ICON_ID.Smile,
    title: 'Web Developer & Software Services | Richard Unterberg',
    description:
      'I am Richard, web developer with some years of experience in modern & legacy web development, rich frontend applications and product development processes.',
  },
}
