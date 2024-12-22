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
                <input type="date" class="" name="" id="">
            <input type="date" class="" name="" id="">
            <button id="sms_btn" class="btn btn-success text-white simple-btn">Filter</button>
            <button id="sms_btn" class="btn btn-dark text-white simple-btn">Excel</button>
            </div>
                
        </div>
        
        <div class="card-body">
            <h5 class="text-center mt-3">All Branches Revenue 2024-07-01 To 2024-08-02</h5>
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
                        <th>Branch Name</th>
                        <th>Parcels</th>
                        <th>Average(p/p)</th>
                        <th>Total Rev</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="" v-for="parcel, index in parcels" :key="parcel.id">
                        <td class="sorting_1">{{ index+1 }}</td>
                        <td>Mwananyamala Br</td>
                        <td>
                         {{parcel.price}}
                        </td>
                        <td>
                          <span class="badge border border-success text-success"
                            >45,000</span
                          >
                        </td>
                       <td>1,000,000</td>
                       
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- Table end -->

          <!--summary-->
          <div class="mt-5">
            <h3 class=""><u>Summary</u></h3>
            <h5>Total parcel : 30</h5>
            <h5>Average (price/parcel) : Tsh 40,000/=</h5>
            <h5>Total Income : Tsh 2,040,000/=</h5>
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
      parcels_fetch: true,
      errors: "",
      tags: [],
      branches: [],
      parcels: [],
      user: this.$attrs.user,
    };
  },
  methods: {
    dataFormat(date){
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
    this.$store.state.page_name = "Revenue Summary";
    this.allTags();
    this.otherBranches();
    this.outgoingParcel();
  },
};
</script>
