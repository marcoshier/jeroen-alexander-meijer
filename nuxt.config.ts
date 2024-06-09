// https://nuxt.com/docs/api/configuration/nuxt-config

import { compilerOptions, transformAssetUrls } from 'vue3-pixi';

export default defineNuxtConfig({
    ssr: false,
    css: ['the-new-css-reset/css/reset.css',
        'normalize.css/normalize.css'],
    devtools: { enabled: true },
    modules: ['vue3-pixi-nuxt', ['@nuxtjs/google-fonts', {
      families:  {
        Inter: [400, 700]
      }
    }], "@nuxt/image"],
    components: [
        {
          path: '~/components',
        },
    ]
})