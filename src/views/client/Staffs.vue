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
        <select
          class="form-select form-control simple-select"
           v-on:change="filterStaff()"
           v-model="this.branch_id"
          style="width: auto"
        >
          <option selected disabled value="">Filter by Destination</option>
          <option value="0">All Destination (branch)</option>
          <option
            :disabled="!branch.status"
            class="text-capitalize"
            v-for="branch in branches"
            :key="branch.id"
            :value="branch.id"
          >
            {{ branch.name }}
          </option>
        </select>

        <button  data-bs-toggle="modal"
            href="#createUser"
            role="button"
            class="btn btn-success simple-btn">
          Add New User
        </button>
      </div>

      <div v-if="this.staffs_fetch" class="">
        <div class="text-center">
          <div class="spinner-grow text-success" role="status"></div>
          <div class="spinner-grow text-danger" role="status"></div>
          <div class="spinner-grow text-warning" role="status"></div>
        </div>
      </div>
      <div v-if="!this.staffs_fetch">
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
          <div class="table-outer">
            <div class="table-responsive">
              <table class="table align-middle table-bordered table-hover m-0">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Fulname</th>
                    <th>Contacts</th>
                    <th>Branch</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Start date</th>
                    <th>Created By</th>
                    <th>Action</th>
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
                    <td>{{ staff.bname }}</td>
                    <td>
                      <span v-if="staff.role == 2 && staff.created_by == 1" title="Super Manager" class="badge border border-danger text-danger"
                        >Manager</span>
                      <span v-if="staff.role == 2 && staff.created_by != 1" title="Branch Manager" class="badge border border-info text-info"
                        >B.Manager</span>
                        <span v-if="staff.role == 1" title="Staff" class="badge border border-success text-success"
                        >Staff</span>  
                    </td>
                    <td>
                      <span v-if="staff.status == 1" class="badge bg-success">Active</span>
                      <span v-if="staff.status == 0" class="badge bg-danger">Disabled</span>
                    </td>
                    <td>{{ this.dataFormat(staff.create_at) }}</td>
                    <td>{{ staff.created_name }}</td>
                    <td>
                      <a v-if="staff.created_by != 1" class="btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    href="#editStaff"
                    @click="this.updateStaffInfo(staff)"
                        ><i class="ri-mark-pen-line"></i></a
                      >|
                      <a v-if="this.user.creater == 1 && staff.created_by != 1"@click="this.deleteData(staff.id, staff.fulname)"
                    class="btn btn-danger btn-sm"
                    data-bs-toggle="modal"
                    href="#confitmModal"
                    role="button"
                        ><i class="ri-delete-bin-5-line"></i
                      ></a>
                    </td>
                  </tr>
                 
                </tbody>
              </table>
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
              Are you sure, what to delete Staff({{ this.delete_data.name }}).
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
                @click="deleteStaff"
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
    id="createUser"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="createUserLabel"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createUserLabel">
            Create Staff/ Agent
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
            <label for="branch_name">FulName</label>
            <input
              class="form-control"
              type="text"
              v-model="this.form_data.fulname"
              id=""
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="abc">Destination(Branch)*</label>
            <select
              class="form-select"
              v-model="this.form_data.branch_id"
              aria-label="Default select example"
            >
              <option selected disabled value="">Select Destination</option>
              <option
                class="text-capitalize"
                v-for="branch in branches"
                :key="branch.id"
                :value="branch.id"
              >
                {{ branch.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label" for="abc">Phone no</label>
            <input
              type="text"
              class="form-control"
              v-model="this.form_data.phone"
              placeholder="Enter Phonenumber"
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
            @click="addStaff"
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
    id="editStaff"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="editStaffLabel"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editStaffLabel">
            Update Staff(Agent)
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
            <label for="branch_name">FulName</label>
            <input
              class="form-control"
              type="text"
              v-model="this.update_data.fulname"
              id=""
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="abc">Destination(Branch)*</label>
            <select
              class="form-select"
              v-model="this.update_data.branch_id"
              aria-label="Default select example"
            >
              <option selected disabled value="">Select Destination</option>
              <option
                class="text-capitalize"
                v-for="branch in branches"
                :key="branch.id"
                :value="branch.id"
              >
                {{ branch.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="branch_name">Role</label>
            <select
              class="form-select"
              v-model="this.update_data.role"
              aria-label="Default select example"
            >
              <option value="2">Branch Manager</option>
              <option value="1">Staff</option>
            </select>
          </div>

          <div class="form-group">
            <label for="branch_name">Status</label>
            <select
              class="form-select"
              v-model="this.update_data.status"
              aria-label="Default select example"
            >
              <option value="1">Active</option>
              <option value="0">Disabled</option>
            </select>
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
            @click="updateStaff"
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
      filter_btn: true,
      staffs_fetch: true,
      branch: {},
      staffs: [],
      og_staffs: [],
      branch_id:"",
      errors: "",
      branches: [],
      form_data: {
        fulname: "",
        phone: "",
        branch_id: "",
      },
      update_data: {
        fulname: "",
        phone: "",
        branch_id: "",
        role: "",
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
    dataFormat(date) {
      return moment(date).format("DD - MM - YYYY");
    },
    deleteData(id, name) {
      (this.delete_data.id = id), (this.delete_data.name = name);
    },
    filterStaff() {
        var bid = this.branch_id
        //let level = this.levels.find((i) => i.id === level_id);
        if(bid == 0){
          this.staffs = this.og_staffs
        }else{
          let clazs = this.og_staffs.filter((i) => i.branch_id == bid);
          this.staffs = clazs;
        }
  
    },
    async allBranches() {
      var response = await axios.get(
        this.$store.state.api_url + "/branch/all-branches"
      );
      if (response.data.success) {
        this.branches = response.data.branches;
      } else {
        var message = response.data.message;
        this.$toast.danger(message, { duration: 5000, dismissible: true });
      }
    },
    async allStaffs() {
      var response = await axios.get(
        this.$store.state.api_url + "/user/all-staff"
      );
      if (response.data.success) {
        this.staffs = response.data.staffs;
        this.og_staffs = response.data.staffs;
        this.staffs_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.danger(message, { duration: 5000, dismissible: true });
      }
    },
    async addStaff() {
      this.errors = "";
      this.create_btn = false;

      var response = await axios
        .post(this.$store.state.api_url + "/user/staff-create", this.form_data)
        .catch((errors) => {
          this.create_btn = true;
          var message = "Network or Server Errors";
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
    async updateStaff() {
      this.errors = "";
      this.update_btn = false;

      var response = await axios
        .post(this.$store.state.api_url + "/user/update", this.update_data)
        .catch((errors) => {
          this.update_btn = true;
          var message = "Network or Server Errors";
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
    async deleteStaff() {
      this.errors = "";
      this.delete_btn = false;
      var id = this.delete_data.id;

      var response = await axios
        .post(this.$store.state.api_url + "/user/delete", { user:id })
        .catch((errors) => {
          this.delete_btn = true;
          var message = "Network or Server Errors";
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
    updateStaffInfo(staff) {

      this.update_data.fulname = staff.fulname;
      this.update_data.branch_id = staff.branch_id;
      this.update_data.role = staff.role;
      this.update_data.status = staff.status;
      this.update_data.id = staff.id;
      this.update_data.created_by = staff.created_by;
    },
  },
  created() {
    this.$store.state.page_name = "Staff & Agents";
    this.allBranches();
    this.allStaffs();
  },
};
</script>
