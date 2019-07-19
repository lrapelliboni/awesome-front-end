import Vue from 'vue'
import VueRouter from 'vue-router'

// Vue Dialog
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faTrash, 
  faSearch, 
  faSmile, 
  faHeartbeat, 
  faLifeRing, 
  faPuzzlePiece, 
  faTrophy, 
  faMapSigns,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faSearch, faSmile, faHeartbeat, faLifeRing, faPuzzlePiece, faTrophy, faMapSigns, faAngleRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import App from './App.vue'
import Home from './components/Home'
import Table from './components/Table'
import Form from './components/Form'
import NotFound from './components/NotFound'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VuejsDialog, {
  html: true,
  loader: true,
  okText: 'Proceed',
  cancelText: 'Cancel',
  animation: 'zoom',
  customClass: 'custom-dialog'
})

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home,
      redirect: {
        name: 'Users'
      },
      meta: {
        breadcrumb: [
          { name: 'Home', link: '/' }
        ]
      }
    },
    {
      name: 'Users',
      path: '/users',
      component: Table,
      meta: {
        breadcrumb: [
          { name: 'Home', link: '/' },
          { name: 'Users' }
        ]
      }
    },
    {
      name: 'Register',
      path: '/users/new', component: Form,
      meta: {
        breadcrumb: [
          { name: 'Home', link: '/' },
          { name: 'Users', link: '/users' },
          { name: 'Register' }
        ]
      }
    },
    { path: '*', component: NotFound }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
