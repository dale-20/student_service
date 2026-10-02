import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'StudentServe',
      meta: [{ name: 'application-name', content: 'StudentServe' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/brand/studentserve-crest.svg' }],
    },
  },
  runtimeConfig: {
    public: {
      backendOrigin: 'http://localhost:8000',
      apiBase: 'http://localhost:8000/api/v1',
    },
  },
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
