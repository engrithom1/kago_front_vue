<style>
.simple-btn{
  border-radius: 0;
  padding: 1px 10px !important;
  outline: 1px solid #ced4da !important;
  height: 40px !important;
}
</style>

<template>
  <div>
    <div v-if="this.parcels_fetch" class="mt-5">
      <div class="text-center">
        <div class="spinner-grow text-success" role="status"></div>
        <div class="spinner-grow text-danger" role="status"></div>
        <div class="spinner-grow text-warning" role="status"></div>
      </div>
    </div>
    <div v-if="!this.parcels_fetch">
      <div v-if="!this.parcels" class="text-center m-5">
        <img
          src="/assets/images/empty_box.png"
          width="200px"
          height="200px"
          alt=""
          srcset=""
        />
        <h5 class="text-danger mt-3">No Parcel Found !</h5>
      </div>
      <div v-if="this.parcels" class="card mb-3">
        <div class="card-header d-flex justify-content-between table-responsive">
            <h6></h6>
            <div class="d-flex">
                <input type="date" class="form-control" name="" id="">
            <input type="date" class="form-control" name="" id="">
            <select class="form-select form-control simple-select" name="branch_select" id="branch_select" style="width:auto">
                      <option selected value="">From All Destination</option>
             <option :disabled="!branch.status" class="text-capitalize"
                      v-for="branch in branches"
                      :key="branch.id"
                      :value="branch.id"
                    >
                      {{ branch.name }}
              </option>
                    </select>
                    <select class="form-select form-control simple-select" name="branch_select" id="branch_select" style="width:auto">
                      <option selected value="">All Final Destination</option>
             <option :disabled="!branch.status" class="text-capitalize"
                      v-for="branch in branches"
                      :key="branch.id"
                      :value="branch.id"
                    >
                      {{ branch.name }}
              </option>
                    </select>
            <button id="sms_btn" class="btn btn-success text-white simple-btn">Filter</button>
            
            </div>
                
        </div>
        
        <div class="card-body">
            <h5 class="text-center mt-3">On Transit Parcels For All Destinations</h5>
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
                        <th>Parcel Name</th>
                        <th>Price</th>
                        <th>From Destn</th>
                        <th>Final Destn</th>
                        <th>Created By</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="" v-for="parcel, index in parcels" :key="parcel.id">
                        <td class="sorting_1">{{ index+1 }}</td>
                        <td>{{ parcel.name }}</td>
                        <td>
                         {{parcel.price}}
                        </td>
                        <td>
                          <span class="badge border border-success text-success"
                            >Urafiki</span
                          >
                          
                        </td>
                        <td>
                          <span class="badge border border-danger text-danger"
                            >Tunduma</span
                          >
                        </td>
                       <td>{{ parcel.fulname }}</td>
                       <td> {{this.dateFormat(parcel.created_at)}}</td>
                       
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
</template>

<script>
import axios from "axios";
//import * as CryptoJS from "crypto-js";
import moment from "moment";

export default {
  data() {
    return {
      filter_btn: true,
      parcels_fetch: true,
      errors: "",
      tags: [],
      branches: [],
      parcels: [],
      user: this.$attrs.user,
    };
  },
  methods: {
    dateFormat(date){
      return moment(date).format("DD - MM - YYYY");
    },
    async allTags() {
      var response = await axios.get(
        this.$store.state.api_url + "/tag/all-tags"
      );
      if (response.data.success) {
        this.tags = response.data.tags;
      } else {
        var message = response.data.message;
        this.$toast.danger(message, { duration: 5000, dismissible: true });
      }
    },

    async otherBranches() {
      var response = await axios.get(
        this.$store.state.api_url + "/branch/other-branches"
      );
      if (response.data.success) {
        this.branches = response.data.branches;
      } else {
        var message = response.data.message;
        this.$toast.danger(message, { duration: 5000, dismissible: true });
      }
    },
    async outgoingParcel() {
      var response = await axios
        .get(this.$store.state.api_url + "/parcel/outgoing")
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        this.parcels = response.data.parcels;
        this.parcels_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.danger(message, { duration: 5000, dismissible: true });
      }
    },
  },
  created() {
    this.$store.state.page_name = "On Transit Report";
    this.allTags();
    this.otherBranches();
    this.outgoingParcel();
  },
};
</script>
