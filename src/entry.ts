import TvBreadcrumbs from './components/TvBreadcrumbs.vue'

(TvBreadcrumbs as any).install = (app: any) => {
  app.component('TvBreadcrumbs', TvBreadcrumbs)
};

export const TvBreadcrumbsPlugin = {
  install(app: any) {
    app.component('TvBreadcrumbs', TvBreadcrumbs)
  }
}

export { TvBreadcrumbs }
export default TvBreadcrumbs
