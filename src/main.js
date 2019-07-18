import Vue from 'vue'
import VueRouter from 'vue-router'

// Vue Dialog
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faSearch)
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
      path: '/', component: Home, redirect: {
        name: 'users'
      }
    },
    { name: 'users', path: '/users', component: Table },
    { path: '/users/new', component: Form },
    { path: '*', component: NotFound }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
