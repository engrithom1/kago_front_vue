<template>
  <div class="app-body">
    <!-- Row start -->
    <div class="row gx-3">
      <div class="col-xl-3 col-sm-6">
        <div class="bg-danger mb-3 p-3 text-white rounded-2">
          <h2 class="mb-2 d-flex align-items-center justify-content-between">
            <div class="p-3 border border-white rounded-5 d-flex">
              <i class="ri-box-1-fill fs-4 lh-1"></i>
            </div>
            <span>139</span>
          </h2>
          <p class="m-0 small">
            On Transit Parcels<!--span class="badge float-end bg-danger-subtle text-danger">50%</span-->
          </p>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="bg-info mb-3 p-3 text-white rounded-2">
          <h2 class="mb-2 d-flex align-items-center justify-content-between">
            <div class="p-3 border border-white rounded-5 d-flex">
              <i class="ri-currency-fill fs-4 lh-1"></i>
            </div>
            <span>560,000</span>
          </h2>
          <p class="m-0 small">
            To Day's Revenue<!--span class="badge float-end bg-info-subtle text-info">60%</span-->
          </p>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="bg-primary mb-3 p-3 text-white rounded-2">
          <h2 class="mb-2 d-flex align-items-center justify-content-between">
            <div class="p-3 border border-white rounded-5 d-flex">
              <i class="ri-currency-fill fs-4 lh-1"></i>
            </div>
            <span>2,670,000</span>
          </h2>
          <p class="m-0 small">
            Last 7 Day's Revenue<!--span class="badge float-end bg-primary-subtle text-primary">70%</span-->
          </p>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="bg-warning mb-3 p-3 text-white rounded-2">
          <h2 class="mb-2 d-flex align-items-center justify-content-between">
            <div class="p-3 border border-white rounded-5 d-flex">
              <i class="ri-currency-fill fs-4 lh-1"></i>
            </div>
            <span>36,900,000</span>
          </h2>
          <p class="m-0 small">
            Last 30 Day's Revenue<!--span class="badge float-end bg-warning-subtle text-warning">80%</span-->
          </p>
        </div>
      </div>
    </div>
    <!-- Row end -->

    <!-- Row starts -->
    <div class="row gx-3">
      <div class="col-xl-12">
        <div class="card mb-3">
          <div class="card-header">
            <h5 class="card-title">Current Branch</h5>
          </div>
          <div class="card-body pt-0">
            <!-- Row start -->
            <div class="row">
              <div class="col-sm-12 col-md-6 mt-3">
                <img :src="this.$store.state.img_url+this.user.branch_image" width="100%" />
              </div>
              <div class="col-sm-12 col-md-6">
                <div class="row">
                  <div class="col-sm-12 col-md-12 mt-3">
                    <div class="border border-primary-subtle rounded-2 p-3">
                      <h4>{{ this.user.branch_name }} - {{ this.user.branch_region }}</h4>
                      <p>
                        {{ this.user.branch_location }}
                      </p>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6 mt-3">
                    <div class="border border-primary-subtle rounded-2 p-3">
                      <div class="d-flex align-items-center">
                        <div class="fs-4 fw-bold text-danger">75</div>
                        <span
                          class="badge float-end bg-danger text-white ms-auto"
                          >70% <i class="ri-arrow-right-down-line"></i
                        ></span>
                      </div>
                      <small class="text-dark">Incoming Parcels</small>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6 mt-3">
                    <div class="border border-primary-subtle rounded-2 p-3">
                      <div class="d-flex align-items-center">
                        <div class="fs-4 fw-bold text-info">257</div>
                        <span class="badge float-end bg-info text-white ms-auto"
                          >60% <i class="ri-arrow-right-up-line"></i
                        ></span>
                      </div>
                      <small class="text-dark">Outgoing Parcels</small>
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6 mt-3">
                    <div class="border border-primary-subtle rounded-2 p-3">
                      <div class="d-flex align-items-center">
                        <div class="fs-4 fw-bold text-dark-green">1,750</div>
                        <span
                          class="badge float-end bg-primary text-white ms-auto"
                          >50% <i class="ri-arrow-right-up-line"></i
                        ></span>
                      </div>
                      <small class="text-dark"
                        >Received Parcel In Last 30 Day's</small
                      >
                    </div>
                  </div>
                  <div class="col-sm-6 col-md-6 mt-3">
                    <div class="border border-primary-subtle rounded-2 p-3">
                      <div class="d-flex align-items-center">
                        <div class="fs-4 fw-bold text-warning">15,000</div>
                        <span
                          class="badge float-end bg-warning text-white ms-auto"
                          >40% <i class="ri-arrow-right-up-line"></i
                        ></span>
                      </div>
                      <small class="text-dark"
                        >Sent Parcel In Last 30 Day's</small
                      >
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>
            <!-- Row end -->
          </div>
        </div>
      </div>
    </div>
    <!-- Row end -->
  </div>
</template>
<script>
import axios from "axios";

export default {
  
  data() {
    return {
      add_btn: true,
      errors: "",
      data: [],
      tags:[],
      user:this.$attrs.user
    };
  },
  methods: {
    async allTags() {
      var response = await axios.get(this.$store.state.api_url + "/parents");
      //console.log(response.data);
      this.tags = response.data;
    },
    
  },
  created() {
    this.$store.state.page_name = "Dashbord" 
    //this.isAuth();
    //this.allParents();
    //this.getGender();
  },
};
</script>
