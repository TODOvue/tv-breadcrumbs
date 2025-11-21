import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@todovue/tv-breadcrumbs',
    configKey: 'tvBreadcrumbs'
  },
  setup(_options, nuxt) {
    const cssPath = '@todovue/tv-breadcrumbs/style.css';
    if (!nuxt.options.css.includes(cssPath)) {
      nuxt.options.css.push(cssPath);
    }
  }
})
