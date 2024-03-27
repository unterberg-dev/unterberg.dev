import { initStage } from '#pixi/initStage'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './style.css'

import { createIcons, Github, Linkedin, Mail } from 'lucide'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="stage" class="fixed inset-0"></div>
`

createIcons({
  icons: {
    Github,
    Linkedin,
    Mail,
  },
})

if (document.readyState !== 'loading') {
  const stage = document.querySelector<HTMLDivElement>('#stage')
  initStage(stage)
} else {
  document.addEventListener('DOMContentLoaded', () => {
    const stage = document.querySelector<HTMLDivElement>('#stage')
    initStage(stage)
  })
}
