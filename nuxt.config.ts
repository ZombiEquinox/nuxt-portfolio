// @ts-ignore
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-12',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
    '@nuxtjs/sanity',
  ],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
   sanity: {
    projectId: "2u7mhqfv",
    dataset: "production",
  },
})