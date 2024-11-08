// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/eslint-module',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
  ],
  shadcn:{
    prefix: '',
    componentDir: './components/ui',
  }
})
