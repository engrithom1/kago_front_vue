<style>
.badge-font{
  font-size: 16px;
  font-weight: 700;
}
</style>
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
            <span>Parcels</span>
          </h2>
          <p class="m-0 small">
            To Day's Parcels<span class="badge-font float-end">{{ this.priceFormat(dataz.parcels_1) }}</span>
          </p>
          <p class="m-0 small mt-2">
            Last 30 Day's<span class="badge-font float-end">{{ this.priceFormat(dataz.parcels_30) }}</span>
          </p>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="bg-info mb-3 p-3 text-white rounded-2">
          <h2 class="mb-2 d-flex align-items-center justify-content-between">
            <div class="p-3 border border-white rounded-5 d-flex">
              <i class="ri-currency-fill fs-4 lh-1"></i>
            </div>
            <span>Messages</span>
          </h2>
          <p class="m-0 small">
            To Day's Messages<span class="badge-font float-end">{{ this.priceFormat(dataz.sms_1) }}</span>
          </p>
          <p class="m-0 small mt-2">
            Last 30 Day's<span class="badge-font float-end">{{ this.priceFormat(dataz.sms_30) }}</span>
          </p>
        </div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="bg-primary mb-3 p-3 text-white rounded-2">
          <h2 class="mb-2 d-flex align-items-center justify-content-between">
            <div class="p-3 border border-white rounded-5 d-flex">
              <i class="ri-currency-fill fs-4 lh-1"></i>
            </div>
            <span>Companies</span>
          </h2>
          <p class="m-0 small">
            Total Companies<span class="badge-font float-end">{{ this.priceFormat(dataz.companies) }}</span>
          </p>
          <p class="m-0 small mt-2">
            Branches<span class="badge-font float-end">{{ this.priceFormat(dataz.branches) }}</span>
          </p>
        </div>
        <div>
</div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="bg-warning mb-3 p-3 text-white rounded-2">
          <h2 class="mb-2 d-flex align-items-center justify-content-between">
            <div class="p-3 border border-white rounded-5 d-flex">
              <i class="ri-currency-fill fs-4 lh-1"></i>
            </div>
            <span>Users</span>
          </h2>
          <p class="m-0 small">
            Admin and Sponcer<span class="badge-font float-end">{{ this.priceFormat(dataz.admin) }}</span>
          </p>
          <p class="m-0 small mt-2">
            Agents or Staffs<span class="badge-font float-end">{{ this.priceFormat(dataz.staffs) }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- Row end -->

    <h4 class="mt-3">New Companies</h4>
    <!-- top companies -->
    <div v-if="this.companys_fetch" class="mt-5">
      <div class="text-center">
        <div class="spinner-grow text-success" role="status"></div>
        <div class="spinner-grow text-danger" role="status"></div>
        <div class="spinner-grow text-warning" role="status"></div>
      </div>
    </div>
    <div v-if="!this.companys_fetch">
      <div v-if="!this.companys" class="text-center m-5">
        <img
          src="/assets/images/empty_box.png"
          width="200px"
          height="200px"
          alt=""
          srcset=""
        />
        <h5 class="text-danger mt-3">No company Found !</h5>
      </div>
      <div v-if="this.companys" class="card mb-3">
       
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
                        <th>#ID</th>
                        <th>Company Name</th>
                        <th>Sponcer Name</th>
                        <th>Sponcer Phone</th>
                        <th>Region</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Created At</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class=""
                        v-for="(company, index) in companys"
                        :key="company.id"
                      >
                        <td class="sorting_1">{{ company.id }}</td>
                        <td>{{ company.name }}</td>
                        <td>
                          {{ company.sponcer_name }}
                        </td>
                        <td>
                          {{ company.sponser_phone }}
                        </td>
                        <td>
                          <span
                            class="badge border border-success text-success"
                            >{{ company.region }}</span
                          ></td>
                        <td class="text-success">
                          <span
                            class="badge border border-danger text-danger"
                            >{{ company.location }}</span
                          >
                        </td>
                         <td v-if="company.status == 0" class="text-danger">Inactive</td>
                         <td v-if="company.status == 1" class="text-success">Active</td>
                        <td>
                          {{ this.dateFormat(company.created_at) }}
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
    <!-- Row end -->
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  
  data() {
    return {
      add_btn: true,
      companys_fetch: false,
      errors: "",
      dataz:[],
      companys: [],
      user:this.$attrs.user
    };
  },
  methods: {
     dateFormat(date) {
      return moment(date).format("DD - MM - YYYY");
    },
     priceFormat(price) {
      price = parseInt(price);
      return price.toLocaleString();
    },
     async topCompanies() {
      var response = await axios
        .get(this.$store.state.api_url + "/admin/top-companies")
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        this.companys = response.data.companies;
        this.companys_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
     async dashbordData() {
      var response = await axios
        .get(this.$store.state.api_url + "/admin/dashbord-data")
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        this.dataz = response.data.dataz;
        this.companys_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
  },
  created() {
    this.$store.state.page_name = "Dashbord" 
    this.topCompanies();
    this.dashbordData();
    //this.allParents();
    //this.getGender();
  },
};
</script>
