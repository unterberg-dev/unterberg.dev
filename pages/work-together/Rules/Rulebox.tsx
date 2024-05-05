import BlurDot from '#atoms/BlurDot'
import { GlassItem } from '#atoms/GlassItem'
import H4Headline from '#atoms/H4Headline'
import { APP_CONFIG } from '#lib/constants'
import { Rule } from '#pages/work-together/rulesMap'

interface RuleboxProps {
  rule: Rule
}

const Rulebox = ({ rule }: RuleboxProps) => (
  <GlassItem className="relative p-7">
    <BlurDot className="top-0 -mt-50 -left-40 w-100 h-100 opacity-10 absolute" />
    <div className="flex lg:flex-col gap-8 z-4 h-full">
      <div className="w-1/8 relative h-full lg:absolute lg:left-6">
        <img
          src={`${APP_CONFIG.viteMediaUrl}${rule.imagePath}`}
          width="100%"
          height="auto"
          className="object-contain absolute inset-0"
          alt=""
        />
      </div>
      <div className="grow w-full lg:pl-20">
        <H4Headline className="font-bold">{`${rule.id} - ${rule.title}`}</H4Headline>
        <p className="mt-5 ">{rule.content}</p>
      </div>
    </div>
  </GlassItem>
)

export default Rulebox
