import Layout from '#atoms/Layout'
import HeadlineArea from '#molecules/HeadlineArea'
import Rulebox from '#pages/work-together/Rules/Rulebox'
import rules from '#pages/work-together/rulesMap'

const CollaborateRules = () => (
  <Layout $fullWidth className="relative pb-100 pixi-hitbox pt-20 z-9">
    <div className="absolute left-0 w-full top-0 bg-gradient-to-b from-dark opacity-100 h-50" />
    <HeadlineArea
      id="rules"
      className="mb-30 relative pt-20"
      headline="COC & Rules"
      subHeadline="Important things to share of beeing partners"
    />
    <Layout className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {rules.map(rule => (
        <Rulebox key={rule.id} rule={rule} />
      ))}
    </Layout>
  </Layout>
)

export default CollaborateRules
