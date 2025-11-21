import type { App, Plugin } from 'vue'
import _TvBreadcrumbs from './components/TvBreadcrumbs.vue'
import './style.scss'

const TvBreadcrumbs = _TvBreadcrumbs as typeof _TvBreadcrumbs & Plugin;
TvBreadcrumbs.install = (app: App) => {
  app.component('TvBreadcrumbs', TvBreadcrumbs)
};

export { TvBreadcrumbs }

export const TvBreadcrumbsPlugin: Plugin = {
  install: TvBreadcrumbs.install
};
export default TvBreadcrumbs;

declare module 'vue' {
  export interface GlobalComponents {
    TvBreadcrumbs: typeof TvBreadcrumbs;
  }
}
