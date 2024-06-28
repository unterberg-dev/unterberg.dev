// uno.config.ts
import { colors } from '@unocss/preset-wind'
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  content: {
    // needed for uno css to properly parse the content
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts}',
      ],
    },
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      dark: colors.slate[950], // '#020617'
      darkLight: colors.slate[900],
      darkLightBorder: colors.slate[800],
      grayDark: colors.slate[600],
      gray: colors.slate[400],
      grayLight: colors.slate[300],
      light: colors.slate[200],
      primary: colors.sky[600],
      success: '#27C485',
      warning: '#F1B650',
      error: colors.red[500],
    },
    fontSize: {
      base: ['14px', '24px'],
      small: ['14px', '20px'],
      micro: ['10px', '12px'],
    },
    fontFamily: {
      sans: 'Helvetica Neue, Arial, Tahoma, sans-serif',
    },
  },
  preflights: [
    {
      getCSS: ({ theme }) => {
        let cssVariables = ''

        if (theme.colors) {
          Object.keys(theme.colors).forEach(color => {
            if (typeof theme.colors?.[color] === 'string') {
              cssVariables += `--color-${color}: ${theme.colors?.[color]};\n`
            }
          })
        }

        if (theme.fontSize) {
          Object.keys(theme.fontSize).forEach(size => {
            if (Array.isArray(theme.fontSize?.[size])) {
              cssVariables += `--font-size-${size}: ${theme.fontSize?.[size][0]};\n`
            }
          })
        }

        return `
          body, html {
            background-color: ${theme.colors?.dark};
            color: ${theme.colors?.light};
            font-family: ${theme.fontFamily?.sans};
            font-size: ${theme.fontSize?.base[0]};
          }
          :root {
            ${cssVariables}
          }
        `
      },
    },
  ],
})
