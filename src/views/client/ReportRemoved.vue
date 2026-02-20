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
          <div>
            <div v-if="this.parcel_filter" class="text-center">
            <div class="spinner-grow text-success" role="status"></div>
            <div class="spinner-grow text-danger" role="status"></div>
            <div class="spinner-grow text-warning" role="status"></div>
          </div>
          </div>
            <div class="d-flex">
                <input type="date" class="form-control" v-model="this.sdate">
            <input type="date" class="form-control" v-model="this.edate">
            <select class="form-select form-control simple-select" v-model="this.branch" id="branch_select" style="width:auto">
                      <option selected value="0">All Destination</option>
             <option :disabled="!branch.status" class="text-capitalize"
                      v-for="branch in branches"
                      :key="branch.id"
                      :value="branch.id"
                    >
                      {{ branch.name }}
              </option>
                    </select>
                    
            <button  @click="this.filterParcelDate"
            :disabled="this.parcel_filter" class="btn btn-success text-white simple-btn">Filter</button>
            
            </div>
                
        </div>
        
        <div class="card-body">
            <h5 class="text-center mt-3">Removed Parcels For All Branches</h5>
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
                        <th>Sender Agent</th>
                        <th>Removed By</th>
                        <th>Reason to remove</th>
                        <th>Created At</th>
                        <th>Removed At</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="" v-for="parcel, index in parcels" :key="parcel.id">
                        <td class="sorting_1">{{ index+1 }}</td>
                        <td>{{ parcel.name }}</td>
                        <td>
                         {{this.priceFormat(parcel.price)}}
                        </td>
                        <td>
                          <span class="badge border border-success text-success"
                            >{{ parcel.bfname }}</span
                          >
                          
                        </td>
                        <td>
                          <span class="badge border border-danger text-danger"
                            >{{ parcel.btname }}</span
                          >
                        </td>
                       <td>{{ parcel.fulname }}</td>
                       <td>{{ parcel.remove_staff }}</td>
                       <td>{{ parcel.remove_description }}</td>
                       <td> {{this.dateFormat(parcel.created_at)}}</td>
                       <td> {{this.dateFormat(parcel.updated_at)}}</td>
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
      parcel_filter: false,
      errors: "",
      branches: [],
      branch:0,
      sdate:"",
      edate:"",
      parcels: [],
      user: this.$attrs.user,
    };
  },
  methods: {
    dateFormat(date){
      return moment(date).format("DD - MM - YYYY");
    },
    priceFormat(price) {
      price = parseInt(price)
      return price.toLocaleString()
    },
    validateDate(start, end) {

if (start == null || start == '' || end == null || end == '') {
    alert('Start and End Date are Required')
    return false;
} else {
    if (start > end) {
        alert('Start date must not be greater than End Date')
        return false;
    } else {
        return true;
    }
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
    async removedParcel() {
      var response = await axios
        .get(this.$store.state.api_url + "/report/removed")
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
    async filterParcelDate() {

var sdate = this.sdate;
var edate = this.edate;
var branch = this.branch


if (this.validateDate(sdate, edate)) {

  this.errors = "";
  this.parcel_filter = true;
  this.branch_id = 0

  var response = await axios
    .post(this.$store.state.api_url + "/report/removed-filter", {
      sdate, edate,branch
    })
    .catch((errors) => {
      this.parcel_filter = false;
      var message = "Network or Server Errors";
      this.$toast.error(message, { duration: 7000, dismissible: true });
    });

  if (response.data.success) {
    this.parcel_filter = false;
    this.parcels = response.data.parcels;
   
  } else {
    if (response.data.code == 444) {
      localStorage.removeItem("user_token");
      localStorage.removeItem("user");
      window.location.reload();
    }
    var msg = response.data.message;
    this.$toast.error(msg, { duration: 7000, dismissible: true });
    this.parcel_filter = false;
  }
}
},
  },
  created() {
    this.$store.state.page_name = "Removed Parcels";
   
    this.allBranches();
    this.removedParcel();
  },
};
</script>
