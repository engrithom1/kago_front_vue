
<template>
     <!-- Page wrapper starts -->
     <div v-if="loged" class="page-wrapper">

<!-- Main container starts -->
<div class="main-container">

  <!-- Sidebar wrapper starts -->
  <nav id="sidebar" class="sidebar-wrapper">

    <div class="sidebar-container">

      <!-- Sidebar menu starts -->
      <div class="sidebar-menu">
        <!-- Top curve -->
        <div class="nav-circle1"></div>
        <div class="nav-square1"></div>
        <a href="/" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Dashboard">
          <i class="ri-layout-grid-fill"></i>
        </a>
        <a href="/add_parcel" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Add Package">
          <i class="ri-gift-fill"></i>
        </a>
        <a href="/incoming_parcels" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Incoming Parcel">
          <i class="ri-suitcase-3-fill"></i>
        </a>
        <a href="/outgoing_parcels" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Outgoing Parcel">
          <i class="ri-luggage-cart-fill"></i>
        </a>
        <a href="/revenue-report" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Subscribers">
          <i class="ri-money-dollar-box-fill"></i>
        </a>
        <a href="/destination" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Subscribers">
          <i class="ri-node-tree"></i>
        </a>
        <a href="/staffs" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Destinations">
          <i class="ri-team-fill"></i>
        </a>
        <a href="/profile" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="User Profile">
          <i class="ri-user-2-fill"></i>
        </a>
        <!-- Bottom curve -->
        <div class="nav-circle2"></div>
        <div class="nav-square2"></div>
      </div>
      <!-- Sidebar menu ends -->

    </div>
  </nav>
  <!-- Sidebar wrapper ends -->

  <!-- App container starts -->
  <div class="app-container">

    <!-- App header starts -->
    <div class="app-header d-flex align-items-center">

      <!-- App logo starts -->
      <div class="d-flex align-items-center">

        <!-- App brand starts -->
        <div class="app-brand me-3 d-flex align-items-center">
          <a href="index.html" class="d-lg-block d-none">
            <h4 class="text-uppercase">{{ this.user.company_name }}</h4>
          </a>
          <a href="index.html" class="d-lg-none d-md-block">
            <h4 class="text-uppercase">{{ this.user.company_label }}</h4>
          </a>
        </div>
        <!-- App brand ends -->

        <!-- Top Menu Start -->
        <div class="cd-dropdown-wrapper">
          <a class="cd-dropdown-trigger" href="#0"><i class="ri-menu-unfold-line menu-icon"></i><span
              class="menu-text">Menu</span></a>
          <nav class="cd-dropdown">

            <ul class="cd-dropdown-content">
              <li>
                <a class="active-menu" href="/">Dashboard</a>
              </li>
              <li class="has-children">
                <a href="#">Parcels</a>
                <ul class="cd-secondary-dropdown is-hidden">
                  <li class="has-children">
                    <ul class="is-hidden">
                      <li>
                        <a href="/add_parcel">Add Parcel</a>
                      </li>
                      <li>
                        <a href="/incoming_parcels">Incoming Parcels</a>
                      </li>
                      <li>
                        <a href="/outgoing_parcels">Outgoing Parcels</a>
                      </li>
                    </ul>
                  </li>
                 
                </ul>
              </li>
              <li class="has-children">
                <a href="#">Reports</a>
                <ul class="cd-secondary-dropdown is-hidden">
                  <li class="has-children">
                    <ul class="is-hidden">
                     
                      <li>
                        <a href="/revenue-report">Revenue Reports</a>
                      </li>
                      <li>
                        <a href="/transit-report">Transit Parcels</a>
                      </li>
                      <li>
                        <a href="/received-report">Received Parcels</a>
                      </li>
                      <li>
                        <a href="/removed-report">Removed Parcels</a>
                      </li>
                    </ul>
                  </li>
                 
                </ul>
              </li>
              <li>
                <a class="" href="/destination">Destination Branches</a>
              </li>
              <li>
                <a class="" href="/staffs">Staff Members</a>
              </li>
              <li>
                <a class="" href="/customers">Customers</a>
              </li>
              <li>
                <a class="" href="/profile">Profile</a>
              </li>
            </ul>

          </nav>
        </div>
        <!-- Top Menu End -->

      </div>
      <!-- App logo ends -->

      <!-- App header actions starts -->
      <div class="header-actions">

        <!-- Account settings starts -->
        <div class="dropdown ms-4">
          <a id="userSettings" class="dropdown-toggle user-settings" href="#!" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            <div class="me-2 text-truncate d-lg-block d-none">
              <span class="d-flex opacity-50 small">{{ this.user.role_name }}</span>
              <span>{{ this.user.fulname }}</span>
            </div>
            <div class="position-relative">
              <img :src="this.$store.state.img_url+this.user.avator"  class="rounded-5 img-3x" alt="Kagopoint" />
              <span class="user-status busy"></span>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <div class="mx-3 my-2 d-grid">
              <a href="login.html" class="btn btn-primary">Profile</a>
              <p></p>
              <button @click="logout" class="btn btn-danger">Logout</button>
            </div>
          </div>
        </div>
        <!-- Account settings ends -->

      </div>
      <!-- App header actions ends -->

    </div>
    <!-- App header ends -->

    <!-- App hero header starts -->
    <div class="app-hero-header d-flex align-items-center">

      <!-- Page title starts -->
      <div>
        <h5 class="mb-1 text-primary fw-semibold">{{ this.$store.state.page_name }}</h5>
      </div>
      <!-- Page title ends -->


      <!-- Header graphs start -->
      <div class="ms-auto">
        <div class="d-md-flex d-none gap-4">
          <div class="d-flex align-items-center">
            <div class="m-0">
              
              <h5 class="text-primary">{{ this.user.branch_name }}</h5>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="m-0">
             
              <h5 class="text-primary">{{ this.user.branch_region }}</h5>
            </div>
          </div>
        </div>
      </div>
      <!-- Header graphs end -->

    </div>
    <!-- App Hero header ends -->
   
    <!-- App body starts -->
    <router-view :user=this.user :key="$route.fullPath" />
    <!-- App body ends -->

    <!-- App footer starts -->
    <div class="app-footer text-center text-primary">
      <hr/>
      <p>© Kagopoint 2024</p>
      <p><a href="http://www.akilikubwadigital.com" target="_blank" rel="noopener noreferrer">www.akilikubwadigital.com</a></p>
    </div>
    <!-- App footer ends -->

  </div>
  <!-- App container ends -->

</div>
<!-- Main container ends -->

</div>
<!-- Page wrapper ends -->

  <div v-if="!loged">
      <Authentication />
  </div>


</template>

<script>
import axios from "axios";
import * as CryptoJS from 'crypto-js';
import Authentication from "./views/auth/Authentication.vue";
//import Verify from "./views/auth/Verify.vue";
//import JoinForm from "./views/JoinForm.vue"

export default {
  components: {
    Authentication,
  },
  data() {
    return {
      loged: false,
      user: {
        fullname:"Sambokile Andy",
        auth_statuses_id:0
      },
    };
  },
  methods: {
    isLoged() {
      //var user = localStorage.getItem("user");
      var user_cry = localStorage.getItem("user") || "";
      var token_cry = localStorage.getItem("user_token") || "";
      var user = CryptoJS.AES.decrypt(user_cry, 'user').toString(CryptoJS.enc.Utf8) || null
      var token = CryptoJS.AES.decrypt(token_cry, 'user_token').toString(CryptoJS.enc.Utf8) || null

      if (user && token) {
        this.loged = true;
        this.user = JSON.parse(user);
      } else {
        localStorage.removeItem("user_token")
        localStorage.removeItem("user")
        this.loged = false;
      }
    },
    logout() {
      this.$store.dispatch("logOut", { id: this.user.id });
    },
  },
  created() {
    this.isLoged();
    //alert(localStorage.getItem("user"));
    //this.reload();
    var token_cry = localStorage.getItem("user_token") || "";
    var token = CryptoJS.AES.decrypt(token_cry, 'user_token').toString(CryptoJS.enc.Utf8) || null
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.common["Authorization"] = token
  },
};
</script>
