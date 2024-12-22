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
      <div v-if="this.branches_fetch" class="">
        <div class="text-center">
          <div class="spinner-grow text-success" role="status"></div>
          <div class="spinner-grow text-danger" role="status"></div>
          <div class="spinner-grow text-warning" role="status"></div>
        </div>
      </div>
      <div v-if="!this.branches_fetch">
        <div v-if="this.branches" class="mt-3">
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
          <div class="mx-n4 p-4 bg-danger mb-4">
            <div class="d-flex align-items-center flex-row flex-wrap">
              
              <div class="ms-3 text-white">
                <h5 class="mb-1">Package/ Bundle</h5>
                <h6 class="m-0 fw-light">Type : Palapala</h6>
                <h6 class="m-0 fw-light">Period : Year</h6>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-phone-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Subscription</h6>
                  <p class="m-0 fw-light small">Start : 12-05-2025</p>
                  <p class="m-0 fw-light small">Update : 12-05-2025</p>
                  <p class="m-0 fw-light small">Expire : 12-06-2026</p>
                </div>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-phone-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Branches</h6>
                  <p class="m-0 fw-light small">Current : 5</p>
                  <p class="m-0 fw-light small">Balance : 15</p>
                </div>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-map-pin-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Staff accounts</h6>
                  <p class="m-0 fw-light small">Current : 13</p>
                  <p class="m-0 fw-light small">Balance : 8</p>
                </div>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-map-pin-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Parcels</h6>
                  <p class="m-0 fw-light small">
                    Life time : 4100
                  </p>
                  <p class="m-0 fw-light small">Balance : 380</p>
                </div>
              </div>

              <div
                class="ms-4 text-white d-flex align-items-center ps-4 border-start"
              >
                <i class="ri-map-pin-line fs-2 lh-1 me-2"></i>
                <div>
                  <h6 class="mb-1">Text SMS</h6>
                  <p class="m-0 fw-light small">
                    Life time : 2100
                  </p>
                  <p class="m-0 fw-light small">Balance : 780</p>
                </div>
              </div>
            </div>
          </div>
          <!-- forms goes here-->
          <div>
            <div class="row gx-3 justify-content-between">

                <div class="col-md-3 col-sm-6 col-12">
                <div class="card mb-3">
                  <div class="card-header">
                    <h5 class="card-title">Profile Picture</h5>
                  </div>
                  <div class="card-body">
                    <div class="d-flex justify-content-center">
                      <img
                        :src="this.$store.state.img_url + this.user.avator"
                        class="img-5x rounded-circle"
                        alt="Admin Dashboard"
                      />
                      
                    </div>
                    <div class="d-flex justify-content-center mt-2">
                        <button class="btn btn-success align-center">Upload picture</button>
                    </div>
                   
                  </div>
                </div>
              </div>


              <div class="col-sm-6 col-md-5 col-12">
                <div class="card mb-3">
                  <div class="card-header">
                    <h5 class="card-title">Personal Details</h5>
                  </div>
                  <div class="card-body">
                    <!-- Row start -->
                    <div class="row gx-3">
                      <div class="col-sm col-12">
                        <!-- Form Field Start -->
                        <div class="mb-3">
                          <label for="fullName" class="form-label"
                            >Full Name</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="fullName"
                            placeholder="Full Name"
                          />
                        </div>

                        <!-- Form Field Start -->
                        <div class="mb-3">
                          <label for="contactNumber" class="form-label"
                            >Contact</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="contactNumber"
                            placeholder="Contact"
                          />
                        </div>
                      </div>

                      <div class="col-12">
                        <!-- Form Field Start -->
                        <div class="mb-3">
                          <label class="form-label">About</label>
                          <textarea class="form-control" rows="3"></textarea>
                        </div>
                      </div>
                    </div>

                    <button class="btn btn-success align-center">Update</button>
                    <!-- Row end -->
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
                            id="confirmNewPassword"
                            placeholder="Confirm New Password"
                          />
                        </div>

                        <button class="btn btn-success align-center">Change password</button>
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

    <div
      class="modal fade"
      id="exampleModalToggle"
      aria-hidden="true"
      aria-labelledby="exampleModalToggleLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">
            <h1 class="display-4">
              <i class="ri-delete-bin-line text-danger"></i>
            </h1>
            <h4 class="fw-bold">Confirm Delete</h4>
            <p>Are you sure, what to delete Branch.</p>
            <div class="d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <span class="m-2"></span>
              <button class="btn btn-success">Delete</button>
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
      branches_fetch: true,
      branch: {},
      staff: [],
      statistics: {},
      errors: "",
      tags: [],
      branches: [],
      form: {
        name: "",
      },
      user: this.$attrs.user,
    };
  },
  methods: {
    dataFormat(date) {
      return moment(date).format("DD - MM - YYYY");
    },
    async allBranches() {
      var response = await axios.get(
        this.$store.state.api_url + "/branch/all-branches"
      );
      if (response.data.success) {
        this.branches = response.data.branches;
        this.branches_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.danger(message, { duration: 5000, dismissible: true });
      }
    },
    branchInfo(branch) {
      this.branch_info = true;
      this.branch = branch;
    },
  },
  created() {
    this.$store.state.page_name = "Profile";
    this.allBranches();
  },
};
</script>
