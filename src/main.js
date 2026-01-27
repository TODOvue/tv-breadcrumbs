import { createApp } from 'vue'
import TvBreadcrumbs from './demo/Demo.vue'
import '@todovue/tv-demo/style.css'
import './style.scss'

const app = createApp(TvBreadcrumbs)
app.mount('#tv-breadcrumbs')
