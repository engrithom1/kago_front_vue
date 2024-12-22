import { createRouter, createWebHistory } from 'vue-router'
import * as CryptoJS from 'crypto-js';

///general file views
import NotFound from "../views/NotFound.vue"

///client file views
import Dashbord from "../views/client/Dashbord.vue"
import AddParcel from "../views/client/AddParcel.vue"
import Incoming_parcel from "../views/client/IncomingParcel.vue"
import Outgoing_parcel from "../views/client/OutgoingParcel.vue"
import Destinations from "../views/client/Destination.vue"
import Staffs from "../views/client/Staffs.vue"
import Customers from "../views/client/Customer.vue"
import Profile from "../views/client/Profile.vue"

import Revenue_Report from "../views/client/ReportRevenue.vue"
import Transit_Report from "../views/client/ReportTransit.vue"
import Received_Report from "../views/client/ReportReceived.vue"
import Removed_Report from "../views/client/ReportRemoved.vue"
///admin file views
import Admin_dashbord from "../views/admin/Admin_Dashbord.vue"

var user_cry = localStorage.getItem("user")  || "";
var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null
user = JSON.parse(user)

function authManager(){
  if(user){
    //user = JSON.parse(user)
    if(user.role == 3){
      return true
    }else{
      return {name:'NotParmit'}
    }
  }else{
    return {name:'Dashbord'}
  }
}

function authAdmin(){
  if(user){
    //user = JSON.parse(user)
    if(user.role == 2){
      return true
    }else{
      return {name:'NotParmit'}
    }
  }else{
    return {name:'Dashbord'}
  }
}

function authClient(){
  if(user){
    
    if(user.role == 1 || user.role == 2){
      return true
    }else{
      return {name:'NotParmit'}
    }
  }else{
    return {name:'Dashbord'}
  }
}

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotParmit",
    component: NotFound,
  },
  {
    path: '/',
    beforeEnter:authClient,
    name: 'dashbord',
    component: Dashbord
  },
  {
    path: '/add_parcel',
    beforeEnter:authClient,
    name: 'add_parcel',
    component: AddParcel
  },
  {
    path: '/incoming_parcels',
    beforeEnter:authClient,
    name: 'incoming_parcel',
    component: Incoming_parcel
  },
  {
    path: '/outgoing_parcels',
    beforeEnter:authClient,
    name: 'outgoing_parcel',
    component: Outgoing_parcel
  },
  {
    path: '/destination',
    beforeEnter:authAdmin,
    name: 'destinations',
    component: Destinations
  },
  {
    path: '/staffs',
    beforeEnter:authAdmin,
    name: 'staffs',
    component: Staffs
  },
  {
    path: '/customers',
    beforeEnter:authAdmin,
    name: 'customers',
    component: Customers
  },
  {
    path: '/revenue-report',
    beforeEnter:authAdmin,
    name: 'revenue_report',
    component: Revenue_Report
  },
  {
    path: '/transit-report',
    beforeEnter:authAdmin,
    name: 'transit_report',
    component: Transit_Report
  },
  {
    path: '/received-report',
    beforeEnter:authAdmin,
    name: 'received_report',
    component: Received_Report
  },
  {
    path: '/removed-report',
    beforeEnter:authAdmin,
    name: 'removed_report',
    component: Removed_Report
  },
  {
    path: '/profile',
    beforeEnter:authClient,
    name: 'profile',
    component: Profile
  },
  {
    path: '/admin',
    /*beforeEnter:authAdmin,*/
    name: 'admindashbord',
    component: Admin_dashbord
  },/*
  {
    path: '/addstudent',
    name: 'Addstudent',
    component: AddStudent
  }*/
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
