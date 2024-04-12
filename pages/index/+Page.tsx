import BlurDot from '#atoms/BlurDot'
import Layout from '#atoms/Layout'
import StartPageMenu from '#root/pages/index/Menu'

const StartPage = () => (
  <Layout className="flex flex-col relative max-w-xl mx-auto z-2">
    <BlurDot className="-left-80 -top-100 w-300 h-300 opacity-30 z-1" />
    <div className="relative z-2">
      <div className="hitbox pointer-events-none relative z-10 inline-flex flex-col mx-auto mt-5 md:mt-10 xl:mt-20">
        <h2 className="relative text-4xl md:text-7xl font-bold text-center text-light inline-block mb-4 md:mb-10">
          Hello
        </h2>
        <h2 className="relative text-2xl md:text-2xl lg:text-2xl md:font-light text-center text-gray inline-block">
          I love to create modern websites and interfaces. Let&apos;s build something together ✌️
        </h2>
      </div>
      <StartPageMenu />
    </div>
  </Layout>
)

export default StartPage
