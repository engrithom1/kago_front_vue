import { createApp } from 'vue'
import App from './App.vue'
import Toaster from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-bootstrap.css';
//import VueSweetalert2 from 'vue-sweetalert2';
//import 'sweetalert2/dist/sweetalert2.min.css';
//import * as CryptoJS from 'crypto-js';

import router from './router'
import store from './store/index'
window.$ = window.jQuery = require('jquery');

//var token_cry = localStorage.getItem("rosh") || "";
//var token = CryptoJS.AES.decrypt(token_cry, 'rosh').toString(CryptoJS.enc.Utf8) || null

//import Auth from './packages/Auth.js'

/*slint-disable no-new*/

createApp(App)
.use(router)
//.use(VueSweetalert2)
.use(Toaster,{position: "top-right"})
.use(store)
.mount('#app')


/*import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')*/
