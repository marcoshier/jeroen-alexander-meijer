// https://nuxt.com/docs/api/configuration/nuxt-config

import { compilerOptions, transformAssetUrls } from 'vue3-pixi';

export default defineNuxtConfig({
    ssr: false,
    css: ['the-new-css-reset/css/reset.css',
        'normalize.css/normalize.css'],
    devtools: { enabled: true },
    vite: {
        server: {
            hmr: {
                overlay: false,
            },
        },
    },
    modules: [
        'vue3-pixi-nuxt',
        ['@nuxtjs/google-fonts', {
          families:  {
            Inter: [400, 700]
          }
        }],
        "@nuxt/image",
        '@nuxtjs/device'],
    devServer: {
        host: '192.168.1.148',
        port: 3000,
        https: {
            key: '192.168.1.148-key.pem',
            cert: '192.168.1.148.pem',
        }
    },
    components: [
        {
          path: '~/components',
        },
    ]
})
