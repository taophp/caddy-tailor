/** @type {import('tailwindcss').Config} */
/* To compile:
    - for dev: npx tailwindcss -i ./assets/src/style.css -o ./assets/style.css --watch
    - for build: npx tailwindcss -i ./assets/src/style.css -o ./assets/style.css --minify
*/
module.exports = {
    content: ["./*.html"], /* chemins à surveiller */
    theme: {
      extend: {
        colors: { /* Palette */
          'rouge': { /* rouge-50, rouge-100... */
            '50': '#e89a9a',
            '100': '#D03434',
            /* ... */
            light: '#ae1515',
            DEFAULT: '#8e0000',
            dark: '#3f0000',
            /* ... */
            '950': '#150000'
          }
        }
      },
    },
    plugins: [ /* module indispensable */
      require('@tailwindcss/typography'), /* permet l'utilisation la classe prose, re-stylant les contenus utiisateurs */
      require('@tailwindcss/forms'), /* uniformise les formulaires */
    ],
  }