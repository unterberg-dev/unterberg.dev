import BlurDot from '#atoms/BlurDot'
import { GlassItem } from '#atoms/GlassItem'
import H4Headline from '#atoms/H4Headline'
import { APP_CONFIG } from '#lib/constants'
import { Rule } from '#pages/_dev/work-together/rulesMap'

interface RuleboxProps {
  rule: Rule
}

const Rulebox = ({ rule }: RuleboxProps) => (
  <GlassItem className="relative p-7">
    <div className="inset-0 absolute">
      <div className="absolute w-30 h-30 z-1 right-0 bottom-0">
        <BlurDot className="w-80 h-80 opacity-50" />
      </div>
      <img
        src={`${APP_CONFIG.viteMediaUrl}${rule.imagePath}`}
        width="200"
        height="auto"
        className="absolute right-0 bottom-2 transform-origin-br z-2 opacity-5"
        alt=""
      />
    </div>
    <div className="flex flex-col w-full relative z-3 h-full">
      <H4Headline className="font-bold grow pb-4">{`$${rule.id} - ${rule.title}`}</H4Headline>
      <p className="mt-5 text-gray w-3/4">{rule.content}</p>
    </div>
  </GlassItem>
)

export default Rulebox
