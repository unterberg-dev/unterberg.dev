import BlurDot from '#atoms/BlurDot'
import Layout from '#atoms/Layout'

const Footer = () => (
  <div className=" absolute w-full bottom-0">
    <Layout className="flex justify-center">
      <BlurDot className="w-100 h-100 mt-0 opacity-40 top-5/6 md:-top-20 fixed md:absolute" />
      <div className="hitbox pb-5 md:pb-7 text-center ">
        <div className="text-grayLight relative z-10">
          <p className="mb-2">2024, Richard Unterberg</p>
        </div>
      </div>
    </Layout>
  </div>
)

export default Footer
