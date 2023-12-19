/** @type {import('tailwindcss').Config} */
/* To compile:
    - for dev: npx tailwindcss -i ./assets/src/style.css -o ./assets/style.css --watch
    - for build: npx tailwindcss -i ./assets/src/style.css -o ./assets/style.css --minify
*/
module.exports = {
  content: ["./*.html"],
  /* chemins à surveiller */
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#d6e3fd',
          lighter: '#ADC6FB',
          '100': '#ADC6FB',
          '200': '#99b3ec',
          light: '#84A0DD',
          '300': '#84A0DD',
          '400': '#738dc5',
          DEFAULT: '#627AAD',
          '500': '#627AAD',
          '600': '#526692',
          dark: '#415277',
          '700': '#415277',
          '800': '#2e3951',
          darker: '#1B1F2A',
          '900': '#1B1F2A',
          '950': '#0e1015'
        },
        'secondary': {
          '50': '#fff0d3',
          lighter: '#FFE1A7',
          '100': '#FFE1A7',
          '200': '#ffdd9a',
          light: '#FFD88D',
          '300': '#FFD88D',
          '400': '#ffd789',
          DEFAULT: '#FFD584',
          '500': '#FFD584',
          '600': '#d9b56f',
          dark: '#B29459',
          '700': '#B29459',
          '800': '#78653f',
          darker: '#3E3625',
          '900': '#3E3625',
          '950': '#1f1b13'
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.secondary.900'),
            h2: {
              color: theme('colors.secondary.700')
            }
          },
        },
      })
    },
  },
  plugins: [ /* module indispensable */
    require('@tailwindcss/typography'), /* permet l'utilisation la classe prose, re-stylant les contenus utiisateurs */
    require('@tailwindcss/forms'), /* uniformise les formulaires */
  ],
}