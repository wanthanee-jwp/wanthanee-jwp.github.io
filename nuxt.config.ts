export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      siteUrl: 'https://wanthanee-jwp.github.io',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#e9eceb' },
      ],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    },
  },
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
