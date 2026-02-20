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
         
          <!-- forms goes here-->
          <div>
            <div class="row gx-3 justify-content-between">

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
