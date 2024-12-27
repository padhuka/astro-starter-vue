import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'
import icon from 'astro-icon'
import vuetifyPlugin from 'vite-plugin-vuetify'
import vue from '@astrojs/vue'

//Astro integration for Vuetify
function vuetify() {
  return {
    name: 'my-astro-vuetify-integration',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          vite: {
            ssr: {
              noExternal: ['vuetify'],
            },
            plugins: [vuetifyPlugin()],
          },
        })
      },
    },
  }
}
// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    mdx(),
    icon(),
    tailwind({
      applyBaseStyles: false,
    }),
    compress(),
    vue({
      appEntrypoint: '/src/_app',
    }),
    vuetify(),
  ],
  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          logger: {
            warn: () => {},
          },
        },
      },
    },
  },
})
