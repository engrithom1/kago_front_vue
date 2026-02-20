<style>
.badge-font {
  font-size: 16px;
  font-weight: 700;
}
</style>
<template>
  <div class="">
    <div class="card-header d-flex justify-content-between m-3">
      <select class="form-select form-control simple-select" name="branch_select" id="branch_select"
        v-on:change="filterActivity()" v-model="this.company_status" style="width: auto">
        <option value="10">All Companies</option>
        <option value="1">Active</option>
        <option value="0">Closed</option>
      </select>

      <div>
        <div v-if="this.company_search" class="text-center">
          <div class="spinner-grow text-success" role="status"></div>
          <div class="spinner-grow text-danger" role="status"></div>
          <div class="spinner-grow text-warning" role="status"></div>
        </div>
      </div>
      <div class="d-flex">
        <input type="text" class="form-control" placeholder="company or sponcer name" v-model="this.search_text"
          :onkeyup="this.filterSearch()" />
        <!--button
          @click="this.searchCompany"
          :disabled="this.company_search"
          id="search_btn"
          class="btn btn-success simple-btn"
        >
          search
        </button-->
      </div>
    </div>

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
        <img src="/assets/images/empty_box.png" width="200px" height="200px" alt="" srcset="" />
        <h5 class="text-danger mt-3">No company Found !</h5>
      </div>
      <div v-if="this.companys" class="card mb-3">
        <div class="card-body">
          <!-- Table start -->
          <div class="table-responsive">
            <div id="basicExample2_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
              <div class="row"></div>
              <div class="row">
                <div class="col-sm-12">
                  <table id="basicExample2"
                    class="table table-striped table-responsive align-middle dataTable no-footer"
                    aria-describedby="basicExample2_info">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>#ID</th>
                        <th>Company Name</th>
                        <th>Sponcer Name</th>
                        <th>Sponcer Phone</th>
                        <th>Region</th>
                        <th>Location</th>
                        <th>Created At</th>
                        <th>Expire Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="" v-for="(company, index) in companys" :key="company.id">
                        <td>{{ index + 1 }}</td>
                        <td class="sorting_1">{{ company.id }}</td>
                        <td>{{ company.name }}</td>
                        <td>
                          {{ company.sponcer_name }}
                        </td>
                        <td>
                          {{ company.sponser_phone }}
                        </td>
                        <td>
                          <span class="badge border border-success text-success">{{ company.region }}</span>
                        </td>
                        <td class="text-success">
                          <span class="badge border border-danger text-danger">{{ company.location }}</span>
                        </td>
                        <td>
                          {{ company.sub_at_date }}
                        </td>
                        <td>{{ company.sub_end_date }}</td>
                        <td>
                          <a class="btn btn-success btn-sm" data-bs-toggle="modal" href="#exampleModalFullscreen"
                            @click="this.companyInfo(company)">
                            <i class="ri-mark-pen-line"></i> </a>|
                          <a class="btn btn-info btn-sm" data-bs-toggle="modal" href="#receiveParcel"
                            @click="this.subInfo(company)"><i class="ri-mark-pen-line"></i></a>
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
    <!--company details-->
    <div class="modal fade" id="exampleModalFullscreen" tabindex="-1" aria-labelledby="exampleModalFullscreenLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title h3" id="exampleModalFullscreenLabel">
              {{ this.company.name }}
            </h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!--general information-->
            <div>
              <div class="row">
                <div class="col-md-4 col-sm-6">
                  <div class="center alert alert-primary w-100">

                    <p>Sponcer : <b>{{ this.company.sponcer_name }}</b></p>
                    <p>Contacts : <b>{{ this.company.sponser_phone }}</b></p>
                    <p>Position : <b>{{ this.company.position }}</b></p>
                    <p>Location : <b>{{ this.company.location }}, {{ this.company.region }}</b></p>
                  </div>
                </div>
                <div class="col-md-5 col-sm-6">
                  <div class="center alert alert-success w-100">
                    <h5>Company Description</h5>
                    <p>{{ this.company.description }}</p>
                    <h5 class="mt-3">Company Contacts</h5>
                    <p>{{ this.company.contacts }}</p>
                    <p>SMS Code : <b>{{ this.company.sms_code }}</b></p>

                  </div>
                </div>
                <!--update company status-->
                <div class="col-md-3 col-sm-6">
                  <div v-if="this.company.status == 1" class="center alert alert-info w-100">
                    <h5>Now company is Actively</h5>
                    <button v-if="this.change_status" v-on:click="companyActivity(0)" class="btn btn-danger"> Close
                      Activities</button>
                    <button v-if="!this.change_status" class="btn btn-danger" type="button">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Please Wait...
                    </button>
                  </div>

                  <div v-if="this.company.status == 0" class="center alert alert-info w-100">
                    <h5>Now company is Closed</h5>
                    <button v-if="this.change_status" v-on:click="companyActivity(1)" class="btn btn-success"> Activate
                      now</button>
                    <button v-if="!this.change_status" class="btn btn-danger" type="button">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Please Wait...
                    </button>
                  </div>

                  <div class="center alert alert-info w-100">
                    <div class="form-group">
                      SMSCode
                      <input type="number" v-model="this.sms_code" class="form-control" id="">
                    </div>
                    <button v-if="this.smscode_status" v-on:click="smsCodeUpdate()" class="btn btn-success">Update
                      SMSCode</button>
                    <button v-if="!this.smscode_status" class="btn btn-danger" type="button">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Please Wait...
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <!--end general info-->

            <!--loading div-->
            <div v-if="this.datas_fetch" class="mt-5">
              <div class="text-center">
                <div class="spinner-grow text-success" role="status"></div>
                <div class="spinner-grow text-danger" role="status"></div>
                <div class="spinner-grow text-warning" role="status"></div>
              </div>
            </div>
            <!--end loading div-->

            <!--data div-->
            <div v-if="!this.datas_fetch">
              <!-- Row start -->
              <div class="row gx-3">
                <div class="col-md-3 col-sm-6">
                  <div class="bg-danger mb-3 p-3 text-white rounded-2">
                    <h2 class="mb-2 d-flex align-items-center justify-content-between">
                      <div class="p-3 border border-white rounded-5 d-flex">
                        <i class="ri-box-1-fill fs-4 lh-1"></i>
                      </div>
                      <span>Parcels</span>
                    </h2>
                    <p class="m-0 small">
                      Life Time pcs<span class="badge-font float-end">{{ this.priceFormat(this.life_time.parcels)
                        }}</span>
                    </p>

                    <hr>
                    <p class="m-0 small mt-2">
                      Balance pcs<span class="badge-font float-end">{{ this.priceFormat(this.company.parcels) }}</span>
                    </p>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6">
                  <div class="bg-info mb-3 p-3 text-white rounded-2">
                    <h2 class="mb-2 d-flex align-items-center justify-content-between">
                      <div class="p-3 border border-white rounded-5 d-flex">
                        <i class="ri-currency-fill fs-4 lh-1"></i>
                      </div>
                      <span>Messages</span>
                    </h2>
                    <p class="m-0 small">
                      Life Time Sms<span class="badge-font float-end">{{ this.priceFormat(this.life_time.messages)
                        }}</span>
                    </p>

                    <hr>
                    <p class="m-0 small mt-2">
                      Balance SMS<span class="badge-font float-end">{{ this.priceFormat(this.company.sms) }}</span>
                    </p>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6">
                  <div class="bg-primary mb-3 p-3 text-white rounded-2">
                    <h2 class="mb-2 d-flex align-items-center justify-content-between">
                      <div class="p-3 border border-white rounded-5 d-flex">
                        <i class="ri-currency-fill fs-4 lh-1"></i>
                      </div>
                      <span>Branches</span>
                    </h2>
                    <p class="m-0 small">
                      Total Branches<span class="badge-font float-end">{{ this.priceFormat(this.life_time.branches_)
                        }}</span>
                    </p>


                    <hr>
                    <p v-if="this.company.bundle_id < 3" class="m-0 small mt-2">
                      Balance<span class="badge-font float-end">
                        {{ this.priceFormat(this.company.branches) }}
                      </span>
                    </p>
                    <p v-if="this.company.bundle_id >= 3" class="m-0 small mt-2">
                      Balance<span class="badge-font float-end">
                        Unlimited
                      </span>
                    </p>
                  </div>
                  <div></div>
                </div>
                <div class="col-md-3 col-sm-6">
                  <div class="bg-warning mb-3 p-3 text-white rounded-2">
                    <h2 class="mb-2 d-flex align-items-center justify-content-between">
                      <div class="p-3 border border-white rounded-5 d-flex">
                        <i class="ri-currency-fill fs-4 lh-1"></i>
                      </div>
                      <span>Users</span>
                    </h2>
                    <p class="m-0 small">
                      Total Users<span class="badge-font float-end">{{ this.priceFormat(this.life_time.staffs_)
                        }}</span>
                    </p>

                    <hr>
                    <p v-if="this.company.bundle_id < 3" class="m-0 small mt-2">
                      Balance<span class="badge-font float-end">
                        {{ this.priceFormat(this.company.users) }}
                      </span>
                    </p>
                    <p v-if="this.company.bundle_id >= 3" class="m-0 small mt-2">
                      Balance<span class="badge-font float-end">
                        Unlimited
                      </span>
                    </p>

                  </div>
                </div>
              </div>
              <!-- Row end -->

              <!--sub history-->
              <div class="mt-5">
                <h4>Subscription History</h4>
                <div class="table-outer">
                  <div class="table-responsive">
                    <table class="table align-middle table-bordered table-hover m-0">
                      <thead>
                        <tr>
                          <th>Bundle</th>
                          <th>Amount</th>
                          <th>Date Issue</th>
                          <th>Expired</th>
                          <th>Desciption</th>
                          <th>Approved By</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="bundle in subs" :key="bundle.id">

                          <td class="text-capitalize">{{ bundle.bundle }}</td>
                          <td>{{ bundle.amount }}</td>
                          <td>{{ this.dateFormat(bundle.sub_at_date) }}</td>
                          <td>{{ this.dateFormat(bundle.sub_end_date) }}</td>
                          <td>{{ bundle.description }}</td>
                          <td class="text-capitalize">{{ bundle.approved_by }}</td>

                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!--staffs-->
              <div class="mt-5">
                <h4>Staffs</h4>
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

                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="staff in staffs" :key="staff.id">
                          <th scope="row">
                            <img class="rounded-circle img-2x me-2" :src="this.$store.state.img_url + staff.avator"
                              alt="Bootstrap Gallery" />
                          </th>
                          <td>{{ staff.fulname }}</td>
                          <td>{{ staff.username }}</td>
                          <td>{{ staff.bname }}</td>
                          <td>
                            <span v-if="staff.role == 2" class="badge border border-danger text-danger">Admin</span>

                            <span v-if="staff.role == 1" class="badge border border-success text-success">Staff</span>
                          </td>
                          <td>
                            <span v-if="staff.status == 1" class="badge bg-success">Active</span>
                            <span v-if="staff.status == 0" class="badge bg-danger">Disabled</span>
                          </td>
                          <td>{{ this.dateFormat(staff.create_at) }}</td>
                          <td>{{ staff.created_name }}</td>

                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!--branches-->
              <div class="mt-5">
                <h4>Branches</h4>
                <div class="table-outer">
                  <div class="table-responsive">
                    <table class="table align-middle table-bordered table-hover m-0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Region</th>
                          <th>Location</th>
                          <th>Contacts</th>
                          <th>Status</th>
                          <th>Created At</th>
                          <th>created By</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="branch in branches" :key="branch.id">

                          <td class="text-capitalize">{{ branch.name }}</td>
                          <td class="text-capitalize">{{ branch.region }}</td>
                          <td class="text-capitalize">{{ branch.location }}</td>
                          <td>{{ branch.contacts }}</td>
                          <td>
                            <span v-if="branch.status == 1" class="badge bg-success">Active</span>
                            <span v-if="branch.status == 0" class="badge bg-danger">Disabled</span>
                          </td>
                          <td class="text-capitalize">{{ this.dateFormat(branch.created_at) }}</td>
                          <td class="text-capitalize">{{ branch.created_by }}</td>

                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!--end data div-->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
              Close Details
            </button>
            <!--button
              type="button"
              class="btn btn-success"
              onclick="alert('relux Boss, man at work')"
            >
              <i class="ri-file-pdf-2-fill"></i>
              Print PDF
            </button-->
          </div>
        </div>
      </div>
    </div>

    <!--subsciption-->
    <div class="modal fade" id="receiveParcel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="receiveParcelLabel" aria-modal="true" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="receiveParcelLabel">
              Update Subscription
            </h5>
            <button :disabled="!this.subscription_btn" type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h4 class="text-capitalize">Company : {{ this.company.name }}</h4>
            <h5>Expired On : {{ this.company.sub_end_date }}</h5>
            <div class="form-group">
              <label>Amount Paid</label>
              <input class="form-control" id="amount" v-model="this.sub_details.amount" />
            </div>
            <div class="form-group">
              <label>Payment Method</label>
              <select class="form-control" v-model="this.sub_details.method" id="method">
                <option value="0" selected disabled>Select payment</option>
                <option value="1">Bank Account</option>
                <option value="2">Mobile Payment</option>
                <option value="3">Cash Payment</option>
              </select>
            </div>
            <div class="form-group">
              <label for="">Bundle</label>
              <select class="form-control" v-model="this.sub_details.bundle" id="bundle">
                <option value="0" selected disabled>Select bundle</option>
                <option value="3">Tale</option>
                <option value="4">Palapala</option>
                <option value="5">Super</option>
                <option value="2">Messages</option>
              </select>
            </div>
            <div class="form-group">
              <label for="">Month</label>
              <select class="form-control" v-model="this.sub_details.month" id="month">
                <option value="0" selected disabled>Select Period</option>
                <option value="1">1 Month</option>
                <option value="2">2 Months</option>
                <option value="3">3 Months</option>
                <option value="4">4 Months</option>
                <option value="5">5 Months</option>
                <option value="6">6 Months</option>
                <option value="7">7 Months</option>
                <option value="8">8 Months</option>
                <option value="9">9 Months</option>
                <option value="10">Year</option>
              </select>
            </div>
            <div class="form-group">
              <label>Message code</label>
              <input class="form-control" id="sms_code" v-model="this.sub_details.sms_code" />
            </div>
            <div class="form-group">
              <label>Description</label>
              <input class="form-control" id="description" v-model="this.sub_details.description" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" :disabled="!this.subscription_btn" class="btn btn-danger" data-bs-dismiss="modal"
              @click="this.clearData()">
              Close
            </button>
            <button v-if="this.subscription_btn" @click="addSubscription" type="button" class="btn btn-success">
              Subscribe
            </button>
            <button v-if="!this.subscription_btn" class="btn btn-success" type="button">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Please Wait...
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--end-->
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      company_search: false,
      companys_fetch: false,
      datas_fetch: true,
      change_status: true,
      smscode_status:true,
      subscription_btn: true,
      company_status: 10,
      errors: "",
      search_text: "",
      company: {},
      life_time: {},
      subs: [],
      staffs: [],
      branches: [],
      sms_code: 0,
      sub_details: {
        amount: 0,
        method: 0,
        description: "",
        bundle: 0,
        month: 0,
        company_id: "",
        sms_code: 0
      },
      companys: [],
      og_companys: [],
      user: this.$attrs.user,
    };
  },
  methods: {
    dataFormat(date) {
      return moment(date).format("DD - MM - YYYY");
    },
    priceFormat(price) {
      price = parseInt(price);
      return price.toLocaleString();
    },
    dateFormat(date) {
      return moment(date).format("DD - MM - YYYY");
    },
    clearData() {
      this.company = {};
      this.sub_details.amount = 0;
      this.sub_details.description = "";
      this.sub_details.bundle = 0;
      this.sub_details.month = 0;
      this.sub_details.method = 0;
      this.company_id = "";
      this.sms_code = 0
    },
    async searchCompany() {
      var phone_name = this.phone_name;

      if (phone_name == "" || phone_name == null || phone_name == undefined) {
        this.$toast.error("Enter phone or name", {
          duration: 7000,
          dismissible: true,
        });
      } else {
        this.errors = "";
        this.company_search = true;

        var response = await axios
          .post(this.$store.state.api_url + "/user/search-customers", {
            phone_name,
          })
          .catch((errors) => {
            this.company_search = false;
            var message = "Network or Server Errors";
            this.$toast.error(message, { duration: 7000, dismissible: true });
          });

        if (response.data.success) {
          this.company_search = false;
          this.customers = response.data.customers;
        } else {
          if (response.data.code == 444) {
            localStorage.removeItem("user_token");
            localStorage.removeItem("user");
            window.location.reload();
          }
          var msg = response.data.message;
          this.$toast.error(msg, { duration: 7000, dismissible: true });
          this.company_search = false;
        }
      }
    },
    companyInfo(company) {
      this.company = company;
      this.sms_code = company.sms_code;
      this.companyData(company.id);
    },
    subInfo(company) {
      this.company = company;
      this.sub_details.company_id = company.id;
      this.sub_details.sms_code = company.sms_code;
      this.sub_details.bundle = company.bundle_id;

    },
    filterActivity() {
      var bid = this.company_status;
      //let level = this.levels.find((i) => i.id === level_id);
      if (this.og_companys.length > 0) {
        if (bid == 10) {
          this.companys = this.og_companys;
        } else {
          let _company = this.og_companys.filter((i) => i.status == bid);
          this.companys = _company;
        }
      } else {
        alert("No company found");
      }
    },
    filterSearch() {
      var keyword = this.search_text;
      var _companys = this.og_companys;
      var companys = this.og_companys;

      if (keyword == null || keyword == undefined || keyword == "") {
        this.companys = _companys;
      } else {
        const filtered = companys.filter((element) => {
          for (const value of Object.values(element)) {
            if (value.toString().toLowerCase().includes(keyword.toLowerCase()))
              return true;
          }
        });

        this.companys = filtered;
      }
    },
    async activeCompanies() {
      var response = await axios
        .get(this.$store.state.api_url + "/admin/active-companies")
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        this.companys = response.data.companies;
        this.og_companys = response.data.companies;
        this.companys_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
    async companyData(company_id) {

      var response = await axios
        .post(this.$store.state.api_url + "/admin/company-data", { company_id })
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        this.life_time = response.data.dataz;
        this.subs = response.data.subs;
        this.branches = response.data.branches;
        this.staffs = response.data.staffs;
        this.datas_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
    async addSubscription() {
      if (confirm("Are you sure you provided correct information?")) {
        this.errors = "";
        this.subscription_btn = false;

        var response = await axios
          .post(
            this.$store.state.api_url + "/admin/activate-subscription",
            this.sub_details
          )
          .catch((errors) => {
            this.subscription_btn = true;
            var message = "Network or Server Errors";
            this.$toast.error(message, { duration: 7000, dismissible: true });
          });

        if (response.data.success) {
          this.subscription_btn = true;
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
          this.$toast.error(response.data.message, {
            duration: 3000,
            dismissible: true,
          });
          this.subscription_btn = true;
        }
      }
    },
     async smsCodeUpdate() {

      this.smscode_status = false;

      var company_id = this.company.id
      var smscode = this.sms_code

      var response = await axios
        .post(this.$store.state.api_url + "/admin/smscode-update", { company_id, smscode})
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {

        this.smscode_status = true;
        this.company.sms_code = smscode
        var message = response.data.message;
        this.$toast.success(message, { duration: 5000, dismissible: true });
      } else {
        this.smscode_status = true;
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },

    async companyActivity(status) {

      this.change_status = false;

      var company_id = this.company.id

      var response = await axios
        .post(this.$store.state.api_url + "/admin/company-status", { company_id, status })
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {

        this.change_status = true;
        window.location.reload();
      } else {
        this.change_status = true;
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    }
  },
  created() {
    this.$store.state.page_name = "Live Companies";
    this.activeCompanies();
    //this.isAuth();
    //this.allParents();
    //this.getGender();
  },
};
</script>
