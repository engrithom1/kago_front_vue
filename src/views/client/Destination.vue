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
      <div class="card-header d-flex justify-content-between m-3">
        <h5 class="card-title"></h5>
        <div class="d-flex">
          <button
            data-bs-toggle="modal"
            href="#createBranch"
            role="button"
            class="btn btn-success simple-btn"
          >
            Create Branch
          </button>
        </div>
      </div>

      <div v-if="this.branches_fetch" class="">
        <div class="text-center">
          <div class="spinner-grow text-success" role="status"></div>
          <div class="spinner-grow text-danger" role="status"></div>
          <div class="spinner-grow text-warning" role="status"></div>
        </div>
      </div>
      <div v-if="!this.branches_fetch">
        <div v-if="!this.branches" class="text-center m-5">
          <img
            src="/assets/images/empty_box.png"
            width="200px"
            height="200px"
            alt=""
            srcset=""
          />
          <h5 class="text-danger mt-3">No Branch Found !</h5>
        </div>
        <div v-if="this.branches" class="mt-3">
          <div class="row gx-3">
            <div
              v-for="branch in branches"
              :key="branch.id"
              class="col-sm-6 col-md-3 col-12"
            >
              <div class="card mb-3">
                <div class="card-body">
                  <div class="card-img">
                    <img
                      :src="this.$store.state.img_url + branch.thumbnail"
                      class="img-fluid rounded-2 mb-3"
                      alt="branch image"
                    />
                  </div>
                  <div class="d-flex justify-content-between">
                    <h5 class="text-capitalize">{{ branch.name }}</h5>
                    <h6 class="text-gray">{{ branch.region }}</h6>
                  </div>
                  <p class="">
                    {{ branch.description }}
                  </p>
                  <button
                    class="btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    href="#editBranch"
                    @click="this.updateBranchInfo(branch)"
                  >
                    <i class="ri-mark-pen-line"></i></button
                  >|
                  <a
                    @click="this.branchInfo(branch)"
                    class="btn btn-info btn-sm"
                    href="#branch-details"
                    ><i class="ri-eye-fill"></i></a
                  >|
                  <button
                    @click="this.deleteData(branch.id, branch.name)"
                    class="btn btn-danger btn-sm"
                    data-bs-toggle="modal"
                    href="#confitmModal"
                    role="button"
                  >
                    <i class="ri-delete-bin-5-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="branch-details" class="mt-5"></div>
    <div v-if="this.branch_info" class="p-2">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Destination Summay</h5>
        </div>
        <div class="card-body pt-0">
          <!-- Row start -->
          <div class="row">
            <div class="col-sm-12 col-md-6 mt-3">
              <img
                :src="this.$store.state.img_url + this.branch.thumbnail"
                width="100%"
              />
            </div>
            <div class="col-sm-12 col-md-6">
              <div class="row">
                <div class="col-sm-12 col-md-12 mt-3">
                  <div class="border border-primary-subtle rounded-2 p-3">
                    <h4>
                      {{ this.branch.name }} - {{ this.branch.location }},
                      {{ this.branch.district }}, {{ this.branch.region }}
                    </h4>
                    <p>
                      {{ this.branch.description }}
                    </p>
                  </div>
                </div>

                <div class="col-sm-12 col-md-12 mt-3">
                  <div v-if="this.statistics_loading" class="">
              <div class="text-center">
                <div class="spinner-grow text-success" role="status"></div>
                <div class="spinner-grow text-danger" role="status"></div>
                <div class="spinner-grow text-warning" role="status"></div>
              </div>
            </div>
                  <div v-if="!this.statistics_loading" class="row">
                    <div class="col-sm-6 col-md-6 mt-3">
                  <div class="border border-primary-subtle rounded-2 p-3">
                    <div class="d-flex justify-content-between">
                      <p></p>
                      <div class="fs-4 fw-bold text-danger">{{ this.statistics.sent }}</div>
                    </div>
                    <small class="text-dark">Total Sent Parcels</small>
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 mt-3">
                  <div class="border border-primary-subtle rounded-2 p-3">
                    <div class="d-flex justify-content-between">
                      <p></p>
                      <div class="fs-4 fw-bold text-info">{{ this.statistics.received }}</div>
                    </div>
                    <small class="text-dark">Total Received Parcels</small>
                  </div>
                </div>

                <div class="col-sm-6 col-md-6 mt-3">
                  <div class="border border-primary-subtle rounded-2 p-3">
                    <div class="d-flex justify-content-between">
                      <p></p>
                      <div class="fs-4 fw-bold text-warning">{{ this.priceFormat(this.statistics.rev_30) }}</div>
                    </div>
                    <small class="text-dark">Last 30 Day's Revenue</small>
                  </div>
                </div>
                <div class="col-sm-6 col-md-6 mt-3">
                  <div class="border border-primary-subtle rounded-2 p-3">
                    <div class="d-flex justify-content-between">
                      <p></p>
                      <div class="fs-4 fw-bold text-dark-green">{{ this.priceFormat(this.statistics.rev_time) }}</div>
                    </div>
                    <small class="text-dark">Life time Revenue</small>
                  </div>
                </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <!-- Row end -->
          <!--staff or agents-->
          <div class="mt-5">
            <h5>Staff or Agents</h5>
            <div v-if="this.staffs_loading" class="">
              <div class="text-center">
                <div class="spinner-grow text-success" role="status"></div>
                <div class="spinner-grow text-danger" role="status"></div>
                <div class="spinner-grow text-warning" role="status"></div>
              </div>
            </div>
            <div v-if="!this.staffs_loading" class="table-outer">
              <div class="table-responsive">
                <table
                  class="table align-middle table-bordered table-hover m-0"
                >
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Fulname</th>
                      <th>Phone no</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Start date</th>
                      <th>Created By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="staff in staffs" :key="staff.id">
                      <th scope="row">
                        <img
                          class="rounded-circle img-2x me-2"
                           :src="this.$store.state.img_url + staff.avator"
                          alt="Bootstrap Gallery"
                        />
                      </th>
                      <td>{{ staff.fulname }}</td>
                      <td>{{ staff.username }}</td>
                      <td>
                        <span v-if="staff.role == 2" class="badge border border-danger text-danger"
                          >Admin</span
                        >
                        <span v-if="staff.role == 1" class="badge border border-success text-success"
                          >Staff</span
                        >
                      </td>
                      <td>
                        <span v-if="staff.status = 0" class="badge bg-danger">Disabled</span>
                        <span v-if="staff.status = 1" class="badge bg-success">Active</span>
                      </td>
                      <td>{{ this.dateFormat(staff.created_at) }}</td>
                      <td>{{ staff.created_by }}</td>
                    </tr>
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="confitmModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
      aria-labelledby="confitmModalLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">
            <h1 class="display-4">
              <i class="ri-delete-bin-line text-danger"></i>
            </h1>
            <h4 class="fw-bold">Confirm Delete</h4>
            <p>
              Are you sure, what to delete Branch({{ this.delete_data.name }}).
            </p>
            <div class="d-flex justify-content-center">
              <button
                :disabled="!this.delete_btn"
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <span class="m-2"></span>
              <button
                v-if="this.delete_btn"
                @click="deleteBranch"
                class="btn btn-success"
              >
                Delete
              </button>

              <button
                v-if="!this.delete_btn"
                class="btn btn-success"
                type="button"
              >
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
 

  <div
    class="modal fade"
    id="createBranch"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="createBranchLabel"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createBranchLabel">
            Create Destination(Branch)
          </h5>
          <button
            :disabled="!this.create_btn"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <p class="text-danger">{{ this.errors }}</p>
          </div>

          <div class="form-group">
            <label for="branch_name">Destination Name</label>
            <input
              class="form-control"
              type="text"
              v-model="this.form_data.name"
              id=""
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="abc">Region*</label>
            <select
              class="form-select"
              v-model="this.form_data.region"
              aria-label="Default select example"
              v-on:change="selectedRegion()"
            >
              <option selected disabled value="">Select region</option>
              <option
                class="text-capitalize"
                v-for="region in regions"
                :key="region.id"
                :value="region.id"
              >
                {{ region.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="branch_name">District</label>
            <select
              class="form-select"
              v-model="this.form_data.district"
              aria-label="Default select example"
            >
              <option selected disabled value="">Select District</option>
              <option
                class="text-capitalize"
                v-for="district in districts"
                :key="district"
                :value="district"
              >
                {{ district }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="abc">Specify location</label>
            <input
              type="text"
              class="form-control"
              v-model="this.form_data.location"
              placeholder="Enter fulname"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="abc">Description (option)</label>
            <input
              type="text"
              class="form-control"
              v-model="this.form_data.description"
              placeholder="Enter fulname"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :disabled="!this.create_btn"
            class="btn btn-danger"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            v-if="this.create_btn"
            @click="addBranch"
            type="button"
            class="btn btn-success"
          >
            Create
          </button>
          <button v-if="!this.create_btn" class="btn btn-success" type="button">
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

  <div
    class="modal fade"
    id="editBranch"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="editBranchLabel"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editBranchLabel">
            Update Destination(Branch)
          </h5>
          <button
            :disabled="!this.update_btn"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <p class="text-danger">{{ this.errors }}</p>
          </div>

          <div class="form-group">
            <label for="branch_name">Destination Name</label>
            <input
              class="form-control"
              type="text"
              v-model="this.update_data.name"
              id=""
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="abc">Region*</label>
            <select
              class="form-select"
              v-model="this.update_data.region"
              aria-label="Default select example"
              v-on:change="selectedRegion()"
            >
              <option selected disabled value="">Select region</option>
              <option
                class="text-capitalize"
                v-for="region in regions"
                :key="region.id"
                :value="region.id"
              >
                {{ region.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="branch_name">District</label>
            <select
              class="form-select"
              v-model="this.update_data.district"
              aria-label="Default select example"
            >
              <option selected disabled value="">Select District</option>
              <option
                class="text-capitalize"
                v-for="district in update_districts"
                :key="district"
                :value="district"
              >
                {{ district }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="branch_name">Destination Status</label>
            <select
              class="form-select"
              v-model="this.update_data.status"
              aria-label="Default select example"
            >
              <option value="1">Active</option>
              <option value="0">InActive</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="abc">Specify location</label>
            <input
              type="text"
              class="form-control"
              v-model="this.update_data.location"
              placeholder="Enter fulname"
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="abc">Description (option)</label>
            <input
              type="text"
              class="form-control"
              v-model="this.update_data.description"
              placeholder="Enter fulname"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :disabled="!this.update_btn"
            class="btn btn-danger"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            v-if="this.update_btn"
            @click="updateBranch"
            type="button"
            class="btn btn-success"
          >
            Update
          </button>
          <button v-if="!this.update_btn" class="btn btn-success" type="button">
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
</template>

<script>
import axios from "axios";
//import * as CryptoJS from "crypto-js";
import moment from "moment";

export default {
  data() {
    return {
      create_btn: true,
      update_btn: true,
      delete_btn: true,
      staffs_loading:true,
      statistics_loading:true,
      branches_fetch: true,
      branch_info: false,
      branch: {},
      staffs: [],
      statistics: {},
      regions: [],
      districts: [],
      update_districts: [],
      errors: "",
      tags: [],
      branches: [],
      form_data: {
        name: "",
        region: "",
        district: "",
        location: "",
        description: "",
      },
      update_data: {
        name: "",
        region: "",
        district: "",
        location: "",
        description: "",
        status: "",
        id: "",
      },
      delete_data: {
        id: "",
        name: "",
      },
      user: this.$attrs.user,
    };
  },
  methods: {
    dateFormat(date) {
      return moment(date).format("DD - MM - YYYY");
    },
    priceFormat(price) {
      return price.toLocaleString()
    },
    deleteData(id, name) {
      (this.delete_data.id = id), (this.delete_data.name = name);
    },
    selectedRegion() {
      var region = this.form_data.region;
      let reg_data = this.regions.find((i) => i.id === region);

      var districts = reg_data.district.split(",");
      //let clazs = this.claszs.filter((i) => i.level === level.level);
      this.districts = districts;
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
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
    async usersAndStatistics() {
      var response = await axios.get(
        this.$store.state.api_url + "/branch/users-and-statistics"
      );
      if (response.data.success) {
        this.staffs = response.data.staffs;
        this.staffs_loading= false;
        this.statistics = response.data.statistics;
        this.statistics_loading = false;
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
    async addBranch() {
      this.errors = "";
      this.create_btn = false;

      var response = await axios
        .post(this.$store.state.api_url + "/branch/create", this.form_data)
        .catch((errors) => {
          this.create_btn = true;
          var message = "Network or Request Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        var message = response.data.message;
        this.$toast.success(message, { duration: 7000, dismissible: true });
        window.location.reload();
      } else {
        if (response.data.code == 444) {
          localStorage.removeItem("user_token");
          localStorage.removeItem("user");
          window.location.reload();
        }
        this.errors = response.data.message;
        this.create_btn = true;
      }
    },
    async updateBranch() {
      this.errors = "";
      this.update_btn = false;

      var response = await axios
        .post(this.$store.state.api_url + "/branch/update", this.update_data)
        .catch((errors) => {
          this.update_btn = true;
          var message = "Network or Request Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        var message = response.data.message;
        this.$toast.success(message, { duration: 7000, dismissible: true });
        window.location.reload();
      } else {
        if (response.data.code == 444) {
          localStorage.removeItem("user_token");
          localStorage.removeItem("user");
          window.location.reload();
        }
        this.errors = response.data.message;
        this.update_btn = true;
      }
    },
    async deleteBranch() {
      this.errors = "";
      this.delete_btn = false;
      var id = this.delete_data.id;

      var response = await axios
        .post(this.$store.state.api_url + "/branch/delete", { id })
        .catch((errors) => {
          this.delete_btn = true;
          var message = "Network or Request Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        var message = response.data.message;
        this.$toast.success(message, { duration: 7000, dismissible: true });
        window.location.reload();
      } else {
        if (response.data.code == 444) {
          localStorage.removeItem("user_token");
          localStorage.removeItem("user");
          window.location.reload();
        }
        var errors = response.data.message;
        this.$toast.error(errors, { duration: 7000, dismissible: true });
        this.delete_btn = true;
      }
    },
    async allRegions() {
      var response = await axios.get(
        this.$store.state.api_url + "/branch/all-regions"
      );
      if (response.data.success) {
        this.regions = response.data.regions;
      } else {
        var message = response.data.message;
        this.$toast.success(message, { duration: 5000, dismissible: true });
      }
    },
    branchInfo(branch) {
      this.branch_info = true;
      this.branch = branch;

      this.usersAndStatistics();
    },
    updateBranchInfo(branch) {
      console.log(branch);

      var districts = branch.region_district.split(",");
      this.update_districts = districts;

      this.update_data.name = branch.name;
      this.update_data.region = branch.region_id;
      this.update_data.location = branch.location;
      this.update_data.description = branch.description;
      this.update_data.district = branch.district;
      this.update_data.id = branch.id;
      this.update_data.status = branch.status;
    },
  },
  created() {
    this.$store.state.page_name = "Destinations";
    this.allBranches();
    this.allRegions();
  },
};
</script>
