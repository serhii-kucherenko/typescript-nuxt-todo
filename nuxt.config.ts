import { Configuration } from '@nuxt/types';

const isDev = process.env.NODE_ENV === 'development';

const config: Configuration = {
  /*
  |------------------------------------------------------
  | Mode
  |------------------------------------------------------
  */
  mode: 'universal',
  /*
  |------------------------------------------------------
  | Transition
  |------------------------------------------------------
  */
  pageTransition: { name: 'layout' },
  /*
  |------------------------------------------------------
  | Path
  |------------------------------------------------------
  */
  srcDir: 'app/',
  /*
  |------------------------------------------------------
  | Headers
  |------------------------------------------------------
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
  |------------------------------------------------------
  | Progress-bar
  |------------------------------------------------------
  */
  loading: { color: '#fff' },
  /*
  |------------------------------------------------------
  | Global CSS
  |------------------------------------------------------
  */
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/styles/main.scss'],
  /*
  |------------------------------------------------------
  | Router
  |------------------------------------------------------
  */
  router: {
    linkExactActiveClass: 'active',
    base: '/typescript-nuxt-todo/',
  },
  /*
  |------------------------------------------------------
  | plugins
  |------------------------------------------------------
  */
  plugins: ['plugins/element-ui', { src: '~/plugins/inject-ww', ssr: false }],
  /*
  |------------------------------------------------------
  | Build Modules
  |------------------------------------------------------
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxt/typescript-build',
  ],
  /*
  |------------------------------------------------------
  | Modules
  |------------------------------------------------------
  */
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv'],
  /*
  |------------------------------------------------------
  | Axios module configuration
  | https://axios.nuxtjs.org/options
  |------------------------------------------------------
  */
  axios: {
    debug: isDev,
  },
  /*
  |------------------------------------------------------
  | Build
  |------------------------------------------------------
  */
  build: {
    transpile: [/^element-ui/],
    hotMiddleware: {
      client: {
        overlay: false,
      },
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
  },
};

export default config;
