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
                
            <select class="form-select form-control simple-select" v-model="this.b_from" id="b_from" style="width:auto">
                      <option selected value="0">From All Destination</option>
             <option :disabled="!branch.status" class="text-capitalize"
                      v-for="branch in branches"
                      :key="branch.id"
                      :value="branch.id"
                    >
                      {{ branch.name }}
              </option>
                    </select>
                    <select class="form-select form-control simple-select" v-model="this.b_to" id="b_to" style="width:auto">
                      <option value="0">All Final Destination</option>
             <option :disabled="!branch.status" class="text-capitalize"
                      v-for="branch in branches"
                      :key="branch.id"
                      :value="branch.id"
                    >
                      {{ branch.name }}
              </option>
                    </select>
            <button id="filter_btn"  @click="this.filterParcels"
            :disabled="this.parcel_filter" class="btn btn-success text-white simple-btn">Filter</button>
            
            </div>
                
        </div>
        
        <div class="card-body">
            <!--h5 class="text-center mt-3">On Transit Parcels For All Destinations</h5-->
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
                         {{priceFormat(parcel.price)}}
                        </td>
                        <td>
                          <span class="badge border border-success text-success"
                            >{{parcel.bfname}}</span
                          >
                          
                        </td>
                        <td>
                          <span class="badge border border-danger text-danger"
                            >{{parcel.btname}}</span
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
      parcels_filter: false,
      b_from:0,
      b_to:0,
      errors: "",
      branches: [],
      parcels: [],
      og_parcels: [],
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
    filterParcels(){
      this.parcels_filter = true
      var b_from = this.b_from
      var b_to = this.b_to
        //no filtering
        if(b_from == 0 && b_to == 0){
          this.parcels = this.og_parcels
        }
        //filter by b_to
        if(b_from == 0 && b_to != 0){
          let _parcel = this.og_parcels.filter((i) => i.btid == b_to);
          this.parcels = _parcel;
        }

        //filter by b_from
        if(b_from != 0 && b_to == 0){
          let _parcel = this.og_parcels.filter((i) => i.bfid == b_from);
          this.parcels = _parcel;
        }

        //filter by b_from and b_to
        if(b_from > 0 && b_to > 0){
         if(b_from == b_to){
            alert('No parcel sent between same Destination')
         }else{

          let _parcel = this.og_parcels.filter((i) => (i.bfid == b_from && i.btid == b_to));
          this.parcels = _parcel;
         }
        }

        this.parcels_filter = false
  

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
    async onTransitParcel() {
      var response = await axios
        .get(this.$store.state.api_url + "/report/transit")
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        this.parcels = response.data.parcels;
        this.og_parcels = response.data.parcels;
        this.parcels_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.danger(message, { duration: 5000, dismissible: true });
      }
    },
  },
  created() {
    this.$store.state.page_name = "On Transit Report";
    this.allBranches();
    this.onTransitParcel();
  },
};
</script>
