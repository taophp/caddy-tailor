/** @type {import('tailwindcss').Config} */
/* To compile:
    - for dev: npx tailwindcss -i ./assets/src/style.css -o ./assets/style.css --watch
    - for build: npx tailwindcss -i ./assets/src/style.css -o ./assets/style.css --minify
*/
module.exports = {
  content: ["./*.html", "/home/steph/PixyBlue/Code/pixyblue.com/*/*.md","/home/steph/PixyBlue/Code/pixyblue.com/.config.yml" , "/home/steph/PixyBlue/Code/pixyblue.com/*/*.html", "/home/steph/Code/CaddyTailor/sites/themes/pixy/assets/script.js"],
  /* chemins à surveiller */
  theme: {
    extend: {
      colors: {"main":{"50":"#eef0fc","100":"#d8dbf9","200":"#abb2f3","300":"#7e89ed","lighter":"#7e89ed","400":"#515fe7","500":"#2436e1","light":"#2436e1","600":"#1928b9","700":"#131e8c","800":"#0c1460","DEFAULT":"#0c1460","900":"#060b33","dark":"#060b33","950":"#03061c","darker":"#03061c"},"compl":{"50":"#fbefe2","100":"#f8e2cb","light":"#f8e2cb","lighter":"#f8e2cb","200":"#f2c99f","DEFAULT":"#f2c99f","300":"#ebb172","400":"#e59845","500":"#da7f1d","dark":"#da7f1d","600":"#ad6517","700":"#804a11","800":"#53300b","darker":"#53300b","900":"#261605","950":"#100902"},"adj-1":{"50":"#e2fafb","100":"#cbf6f8","light":"#cbf6f8","lighter":"#cbf6f8","200":"#9feff2","DEFAULT":"#9feff2","300":"#72e7eb","400":"#45e0e5","500":"#1dd4da","dark":"#1dd4da","600":"#17a8ad","700":"#117c80","800":"#0b5153","darker":"#0b5153","900":"#052526","950":"#020f10"},"adj-2":{"50":"#ede2fb","100":"#dfcbf8","light":"#dfcbf8","lighter":"#dfcbf8","200":"#c29ff2","DEFAULT":"#c29ff2","300":"#a672eb","400":"#8a45e5","500":"#6f1dda","dark":"#6f1dda","600":"#5817ad","700":"#411180","800":"#2a0b53","darker":"#2a0b53","900":"#130526","950":"#080210"},"compl-adj-1":{"50":"#fcf3ee","100":"#f9e2d8","200":"#f3c2ab","300":"#eda17e","lighter":"#eda17e","400":"#e78051","500":"#e16024","light":"#e16024","600":"#b94c19","700":"#8c3913","800":"#60270c","DEFAULT":"#60270c","900":"#331406","dark":"#331406","950":"#1c0b03","darker":"#1c0b03"},"compl-adj-2":{"50":"#fcf9ee","100":"#f9f1d8","200":"#f3e1ab","300":"#edd17e","lighter":"#edd17e","400":"#e7c251","500":"#e1b224","light":"#e1b224","600":"#b99119","700":"#8c6e13","800":"#604b0c","DEFAULT":"#604b0c","900":"#332806","dark":"#332806","950":"#1c1603","darker":"#1c1603"},"second":{"50":"#e2fafb","100":"#cbf6f8","light":"#cbf6f8","lighter":"#cbf6f8","200":"#9feff2","DEFAULT":"#9feff2","300":"#72e7eb","400":"#45e0e5","500":"#1dd4da","dark":"#1dd4da","600":"#17a8ad","700":"#117c80","800":"#0b5153","darker":"#0b5153","900":"#052526","950":"#020f10"}},
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