/**
 * App Icons Collection - All icons must be defined here
 * no manual imports in modules needed / wanted
 * todo: "minimize", "maximize", "close" icons
 */
import {
  ChevronsDown,
  ChevronsUp,
  Code,
  ExternalLink,
  Eye,
  EyeOff,
  Github,
  Handshake,
  Hourglass,
  Linkedin,
  type LucideProps,
  Mail,
  MousePointerClick,
  Shell,
  Smile,
  Sparkles,
} from "lucide-react"

import { ICON_ID } from "./iconID"

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
  [ICON_ID.Mail]: { component: Mail },
  [ICON_ID.Linkedin]: { component: Linkedin },
  [ICON_ID.ChevronsUp]: { component: ChevronsUp },
  [ICON_ID.ChevronsDown]: { component: ChevronsDown },
  [ICON_ID.Smile]: { component: Smile },
  [ICON_ID.Code]: { component: Code },
  [ICON_ID.Handshake]: { component: Handshake },
  [ICON_ID.Sparkles]: { component: Sparkles },
  [ICON_ID.EyeOff]: { component: EyeOff },
  [ICON_ID.Eye]: { component: Eye },
  [ICON_ID.MousePointerClick]: { component: MousePointerClick },
  [ICON_ID.Hourglass]: { component: Hourglass },
  [ICON_ID.Shell]: { component: Shell },
}

export default APP_ICON
