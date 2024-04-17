import BlurDot from '#atoms/BlurDot'
import Layout from '#atoms/Layout'
import StartPageMenu from '#root/pages/index/Menu'

const StartPage = () => (
  // todo: state for hide content
  <Layout className="flex flex-col relative max-w-xl mx-auto z-2">
    {/* <HideContent /> */}
    <BlurDot className="left-1/2 -ml-50 md:ml-inherit md:left-20 -top-20 w-100 h-100 opacity-20 fixed md:absolute" />
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
