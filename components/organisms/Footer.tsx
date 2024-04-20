import BlurDot from '#atoms/BlurDot'
import Layout from '#atoms/Layout'
import MainNavigation from '#organisms/MainNavigation'

const Footer = () => (
  <>
    <div className="h-150" />
    <footer className="absolute w-full bottom-0">
      <Layout>
        <MainNavigation />
        <BlurDot className="w-100 h-100 mt-0 opacity-40 top-5/6 fixed" />
        <div className="pixi-hitbox pb-5 md:pb-7 text-center ">
          <div className="text-grayLight relative z-10">
            <p className="mb-2">2024, Richard Unterberg</p>
          </div>
        </div>
      </Layout>
    </footer>
  </>
)

export default Footer
