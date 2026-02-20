<style>
.simple-btn {
  border-radius: 0;
  padding: 1px 10px !important;
  outline: 1px solid #ced4da !important;
  height: 40px !important;
}
</style>

<template>
  <div>
    <div class="p-2">
      <div v-if="this.bundle_fetch" class="">
        <div class="text-center">
          <div class="spinner-grow text-success" role="status"></div>
          <div class="spinner-grow text-danger" role="status"></div>
          <div class="spinner-grow text-warning" role="status"></div>
        </div>
      </div>
      <div v-if="!this.bundle_fetch">
        <div class="mt-3">
          <div class="mx-n4 p-4 bg-primary mb-4">
            <div class="d-flex align-items-center flex-row flex-wrap">
              <img
                :src="this.$store.state.img_url + this.user.avator"
                class="img-5x rounded-circle"
                alt="Admin Dashboard"
              />

              <div class="ms-3 text-white">
                <h5 class="mb-1">{{ this.user.fulname }}</h5>
                <h6 class="m-0 fw-light">{{ this.user.role_name }}</h6>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-phone-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Phone1</h6>
                  <p class="m-0 fw-light small">{{ this.user.username }}</p>
                </div>
              </div>
              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-phone-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Phone2</h6>
                  <p class="m-0 fw-light small">000 000 0000</p>
                </div>
              </div>
              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-map-pin-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Branch</h6>
                  <p class="m-0 fw-light small">{{ this.user.branch_name }}</p>
                </div>
              </div>
              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-map-pin-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Location</h6>
                  <p class="m-0 fw-light small">
                    {{ this.user.branch_location }} -
                    {{ this.user.branch_region }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!--bando info-->
          <div v-if="this.user.role == 2" class="mx-n4 p-4 bg-danger mb-4">
            <div class="d-flex align-items-center flex-row flex-wrap">
              
              <div class="ms-3 text-white">
                <h5 class="mb-1">Package/ Bundle</h5>
                <h6 class="m-0 fw-light">Current Package :</h6>
                <h6 class="m-0 fw-bold">{{ this.dataz.current_package }}</h6>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-phone-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Subscription</h6>
                  <p class="m-0 fw-light small">Start : {{ this.dataz.start_sub }}</p>
                  <p class="m-0 fw-light small">Update : {{ this.dataz.start_date }}</p>
                  <p class="m-0 fw-light small">Expire : {{ this.dataz.expire_date }}</p>
                </div>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-phone-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Branches</h6>
                  <p class="m-0 fw-light small">Currently : {{ this.priceFormat(dataz.branches) }}</p>
                  <p class="m-0 fw-light small">Limits : <b>Not</b></p>
                </div>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-map-pin-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Staff accounts</h6>
                  <p class="m-0 fw-light small">Currently : {{ this.priceFormat(dataz.staffs) }}</p>
                  <p class="m-0 fw-light small">Limits : <b>Not</b></p>
                </div>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-map-pin-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Parcels</h6>
                  <p class="m-0 fw-light small">
                    Life time : {{ this.priceFormat(dataz.parcels) }}
                  </p>
                  <p v-if="this.dataz.bundle_id == 2" class="m-0 fw-light small">Limit : <b>Not</b></p>
                  <p v-if="this.dataz.bundle_id != 2" class="m-0 fw-light small">Balance : {{ this.priceFormat(dataz.company_info.parcels) }}</p>
                </div>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-map-pin-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Text SMS</h6>
                  <p class="m-0 fw-light small">
                    Life time : {{ this.priceFormat(dataz.sms_lifetime) }}
                  </p>
                  <p class="m-0 fw-light small">Balance : {{ this.priceFormat(dataz.sms_balance) }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- forms goes here-->
          <div>
            <div class="row gx-3 justify-content-between">

              <div class="col-sm-4 col-md-6 col-12">
                 <div v-if="this.bundle_fetch" class="mt-5">
      <div class="text-center">
        <div class="spinner-grow text-success" role="status"></div>
        <div class="spinner-grow text-danger" role="status"></div>
        <div class="spinner-grow text-warning" role="status"></div>
      </div>
    </div>
    <div v-if="!this.bundle_fetch">
      
      <div v-if="this.user.role == 2" class="card mb-3">
     
        <div class="card-body">
          <!-- Table start -->
          <div class="table-responsive">
            <div
              id="basicExample2_wrapper"
              class="dataTables_wrapper dt-bootstrap5 no-footer"
            >
              <div class="row"></div>
              <div class="row">
                <div class="col-sm-12">
                  <table
                    id="basicExample2"
                    class="table table-striped table-responsive align-middle dataTable no-footer"
                    aria-describedby="basicExample2_info"
                  >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Bundle Name</th>
                        <th>Start Date</th>
                        <th>Expire Date</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class=""
                        v-for="(parcel, index) in bundles"
                        :key="parcel.id"
                      >
                        <td class="sorting_1">{{ index + 1 }}</td>
                        <td>{{ parcel.bundle_name }}</td>
                        
                        <td>
                          <span
                            class="badge border border-success text-success"
                            >{{ parcel.sub_at_date }}</span
                          >
                        </td>
                        <td>
                          <span
                            class="badge border border-danger text-danger"
                            >{{ parcel.sub_end_date }}</span>
                          </td>
                      
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Table end -->
        </div>
      </div>
    </div>
               </div>

              <div class="col-md-4 col-sm-6 col-12">
                <div class="card mb-3">
                  <div class="card-header">
                    <h5 class="card-title">Reset Password</h5>
                  </div>
                  <div class="card-body">
                    <div class="row gx-3">
                      <div class="col-12">
                        <!-- Form Field Start -->
                        <div class="mb-3">
                          <label for="currentPassword" class="form-label"
                            >Current Password</label
                          >
                          <input
                            type="text"
                            class="form-control"
                             v-model="this.form.current_password"
                            id="currentPassword"
                            placeholder="Enter Current Password"
                          />
                        </div>
                        <!-- Form Field Start -->
                        <div class="mb-3">
                          <label for="newPassword" class="form-label"
                            >New Password</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            v-model="this.form.new_password"
                            id="newPassword"
                            placeholder="Enter New Password"
                          />
                        </div>
                        <!-- Form Field Start -->
                        <div class="mb-3">
                          <label for="confirmNewPassword" class="form-label">
                            Confirm New Password
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="this.form.confirm_password"
                            id="confirmNewPassword"
                            placeholder="Confirm New Password"
                          />
                        </div>
<div>
  <p class="text-danger">{{ this.errors }}</p>
</div>
                        
                        <button v-if="this.change_pass_btn" @click="changePassword" type="button" class="btn align-center btn-success">
                          Change password
            </button>

            <button v-if="!this.change_pass_btn" class="btn btn-success" type="button">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Please Wait...
            </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
//import * as CryptoJS from "crypto-js";
import moment from "moment";

export default {
  data() {
    return {
      filter_btn: true,
      change_pass_btn: true,
      branches_fetch:false,
      bundle_fetch: true,
      bundles: [],
      dataz:{},
      errors: "",
      form: {
        current_password: "",
        new_password:"",
        confirm_password:""
      },
      user: this.$attrs.user,
    };
  },
  methods: {
    dataFormat(date) {
      return moment(date).format("DD - MM - YYYY");
    },
     priceFormat(price) {
      return price.toLocaleString()
    },
    async changePassword() {
      this.errors = "";
      this.change_pass_btn = false;

      var response = await axios
        .post(this.$store.state.api_url + "/change-password", this.form)
        .catch((errors) => {
          this.change_pass_btn = true;
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        this.change_pass_btn = true;
        var message = response.data.message;
        this.$toast.success(message, { duration: 7000, dismissible: true });
        //window.location.reload();
      } else {
        if(response.data.code == 444){
            localStorage.removeItem("user_token")
            localStorage.removeItem("user")
            window.location.reload(); 
        }
        this.errors = response.data.message;
        this.$toast.error(response.data.message, { duration: 7000, dismissible: true });
        this.change_pass_btn = true;
      }
    },
       async companyProfile() {
      var response = await axios.get(
        this.$store.state.api_url + "/profile/company-profile"
      );
      if (response.data.success) {
        this.dataz = response.data.dataz;
        this.bundles = response.data.bundles;
        this.bundle_fetch = false;
        
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },

    
  },
  created() {
    this.$store.state.page_name = "Profile";
    this.companyProfile()
  },
};
</script>
