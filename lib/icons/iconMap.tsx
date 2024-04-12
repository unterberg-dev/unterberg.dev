/**
 * App Icons Collection - All icons must be defined here
 * no manual imports in modules needed / wanted
 * todo: "minimize", "maximize", "close" icons
 */
import { ExternalLink, Github, Linkedin, LucideProps, Mail, Orbit } from 'lucide-react'

import { ICON_ID } from './iconID'

type ICON_TYPE = {
  [key in ICON_ID]: {
    component: React.ComponentType<LucideProps> | null
    className?: string
  }
}

const APP_ICON: ICON_TYPE = {
  [ICON_ID.None]: { component: null },
  [ICON_ID.Github]: { component: Github },
  [ICON_ID.ExternalLink]: { component: ExternalLink },
  [ICON_ID.Orbit]: { component: Orbit },
  [ICON_ID.Mail]: { component: Mail },
  [ICON_ID.Linkedin]: { component: Linkedin },
}

export default APP_ICON
