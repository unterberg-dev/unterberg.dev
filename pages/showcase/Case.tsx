import { ShowCaseItem } from '#pages/showcase/cases'

const Case = ({ title, images }: ShowCaseItem) => (
  <div>
    <div className="relative w-full h-60 overflow-hidden">
      <img
        className="object-cover w-full h-full"
        src={`/images/showcase/${images?.[0]}.png`}
        alt={title}
      />
    </div>
  </div>
)

export default Case
