import TvBreadcrumbs from './components/TvBreadcrumbs.vue'
import './style.scss'

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
