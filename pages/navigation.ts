import { ICON_ID } from '#lib/icons/iconID'
import { NavigationItem } from '#lib/types'

export enum MAIN_NAV_KEY {
  HOME,
  SHOWCASE,
  TOGETHER,
}

export const mainNavigation: {
  [key in MAIN_NAV_KEY]: NavigationItem
} = {
  [MAIN_NAV_KEY.HOME]: {
    name: 'Home',
    path: '',
    icon: ICON_ID.Smile,
    title: 'web dev & engineer | richard unterberg',
    description:
      'I am Richard, web developer with some years of experience in modern & legacy web development, rich frontend applications and product development processes.',
  },
  [MAIN_NAV_KEY.SHOWCASE]: {
    name: 'Showcase',
    path: 'showcase/',
    icon: ICON_ID.Code,
    title: 'Skills & Showcase',
    description:
      'I have a broad range of skills in frontend web development, especially modern technologies but also worked a lot with to legacy systems.',
  },
  [MAIN_NAV_KEY.TOGETHER]: {
    name: 'Work together',
    path: 'work-together/',
    icon: ICON_ID.Handshake,
    title: 'Work together',
    description:
      'Surely beeing open for new projects and collaborations - But there are some basic rules to collaborate.',
  },
}
