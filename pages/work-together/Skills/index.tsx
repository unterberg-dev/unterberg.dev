import { useState } from 'react'

import Layout from '#atoms/Layout'
import { GsapStaggerFunctionComponent } from '#gsap/usePageHeaderAnimations'
import HeadlineArea from '#molecules/HeadlineArea'
import Skillbox from '#pages/work-together/Skills/Skillbox'

interface SkillProps {
  GsapStaggerElement: GsapStaggerFunctionComponent
}

const Skills = ({ GsapStaggerElement }: SkillProps) => {
  const [isSomeTileHovered, setIsSomeTileHovered] = useState(false)

  return (
    <Layout id="skills" $fullWidth className="bg-dark relative z-4 pt-30">
      <Layout className="pb-30">
        <GsapStaggerElement fromBottom className="">
          <HeadlineArea
            headline="Skills & Experience"
            subHeadline="Things I learned, things I will never forget"
          />
        </GsapStaggerElement>
        <GsapStaggerElement fromBottom className="mt-30 z-40 relative">
          <Skillbox
            tags={[
              'JSX',
              'react-hook-form',
              'mui',
              'redux & rtk',
              'zustand',
              'react-query',
              'tailwind',
              'React 18',
              'Styled Components',
            ]}
            imagePath="/skills/react.png"
            title="React, Declarative & Functional Coding"
            experience={{ value: 4, className: 'hover:bg-amber-3' }}
            dedication={{ value: 10, className: 'hover:bg-emerald-5' }}
            excerpt="Starting with React; Its here to stay. Its not even a programming language, but no library before made me finish so many things in such a short manner of time."
            isSomeTileHovered={isSomeTileHovered}
            setIsSomeTileHovered={setIsSomeTileHovered}
          >
            <p>
              As a frontend developer you should no have missed to learn at least one of them;
              React, Angular, Vue, you name it - declarative ui frameworks / libraries to structure
              and maintain frontend code ranging from small sidekicks to full-blown enterprise
              situations.
            </p>
            <p className="mt-5">
              I like all the other libraries, but at the moment I mainly choose functional react for
              my frontends 👻
            </p>
          </Skillbox>
        </GsapStaggerElement>
        <Skillbox
          tags={[
            'express',
            'next.js',
            'tone.js',
            'vite / vike',
            'tRPC',
            'maplibre-gl',
            'leaflet',
            'telefunc',
            'post-CSS',
            'eslint',
          ]}
          imagePath="/skills/node-2.png"
          title="Typescript & Node"
          experience={{ value: 3, className: 'hover:bg-amber-3' }}
          dedication={{ value: 9, className: 'hover:bg-emerald-5' }}
          excerpt="The engine of the most of my current projects bundles in my dayjob and side projects. Gracefully looking at all the libraries and tools we got through the node module system."
          isSomeTileHovered={isSomeTileHovered}
          setIsSomeTileHovered={setIsSomeTileHovered}
          switchLayout
        >
          <p>
            some further explanation about the skills and experience with node.js, especially with
            setting up a server, handling requests and responses, and working with databases.
            experimenting with different libraries and tools to make the development process more
            efficient. RPC and rest experience gained
          </p>
          <p className="mt-5">
            <b>Typescript</b> makes it possible to interact with large datasets and keep control
            over big architectures. My colleques said &quot;Like it or not, you will need it for
            working on big stuff&quot;. They should be right as always :)
          </p>
        </Skillbox>
        <Skillbox
          tags={[
            'ACF',
            'Custom (Child) Themes',
            'Custom Plugins',
            'Rest-API',
            'SPA-like Wordpress',
            'Inpsyde WP VIP',
            'Page Builders (I know them all) 😅',
          ]}
          imagePath="/skills/wordpress-2.png"
          title="Custom Wordpress Development & PHP"
          experience={{ value: 13, className: 'hover:bg-emerald-5' }}
          dedication={{ value: 7, className: 'hover:bg-amber-3' }}
          excerpt="Dunno how many hours wasted and brain damage done by trying to get the right plugins and themes for clients before I started to learn how to code themes and plugins for myself"
          isSomeTileHovered={isSomeTileHovered}
          setIsSomeTileHovered={setIsSomeTileHovered}
        >
          <p>
            use it in a modular fashion for customer projects can be a real advantage. Im developed
            a whole bunch of plugins and themes to control exactly what I want and we need
          </p>
          <p className="mt-5">
            Pudding candy gummies apple pie sesame snaps. Marzipan icing sweet roll cake croissant
            halvah. Pastry cake topping gummi bears jelly liquorice tart cake.
          </p>
        </Skillbox>
        <Skillbox
          tags={['HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind', 'Mobile First']}
          title="HTML, CSS and everything between"
          imagePath="/skills/css.png"
          experience={{ value: 15, className: 'hover:bg-amber-3' }}
          dedication={{ value: 7, className: 'hover:bg-emerald-5' }}
          excerpt="Okay this is a bit trivial that its listed here, but I started here with the very basics and I still love to think like that, because it is the foundation of what the browser renders at the end."
          isSomeTileHovered={isSomeTileHovered}
          setIsSomeTileHovered={setIsSomeTileHovered}
          switchLayout
        >
          <p>
            Having deep knowledge about the structure of DOM giving us the power to onPage SEO like
            king. Mobile first is standard.
          </p>
          <p className="mt-5">
            Oat cake jujubes marshmallow lollipop tart topping. Biscuit dragée cupcake bonbon
            chocolate bar ice cream donut. Cheesecake marzipan danish fruitcake bear claw sesame
            snaps brownie cheesecake lollipop.
          </p>
        </Skillbox>
        <Skillbox
          tags={['Jira', 'Trello', 'Monday', 'Slack', 'Email', 'Agile', 'Scrum', 'Kanban', 'Git']}
          title="Be dedicated, be state of the art"
          imagePath="/skills/flex.png"
          experience={{ value: 15, className: 'hover:bg-amber-3' }}
          dedication={{ value: 7, className: 'hover:bg-emerald-5' }}
          excerpt="Liquorice tiramisu fruitcake brownie candy sesame snaps. Caramels apple pie bonbon chocolate chocolate cake brownie sweet croissant pastry. Biscuit dragée halvah soufflé lollipop jujubes."
          isSomeTileHovered={isSomeTileHovered}
          setIsSomeTileHovered={setIsSomeTileHovered}
        >
          <p>
            Chocolate cookie lemon drops marzipan sweet roll bear claw topping jelly-o. Liquorice
            pudding cupcake shortbread donut candy chocolate cake toffee jelly-o. Pastry sugar plum
            biscuit donut muffin. Soufflé dragée powder carrot cake wafer sesame snaps.
          </p>
          <p className="mt-5">
            Pudding candy gummies apple pie sesame snaps. Marzipan icing sweet roll cake croissant
            halvah. Pastry cake topping gummi bears jelly liquorice tart cake.
          </p>
        </Skillbox>
      </Layout>
    </Layout>
  )
}

export default Skills
