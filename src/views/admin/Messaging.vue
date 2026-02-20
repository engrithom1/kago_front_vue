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
    <div class="row">
      <div class="col-sm-6 col-md-3 mt-3">
        <div class="border border-primary-subtle rounded-2 p-3">
          <div class="d-flex align-items-center">
            <div class="fs-4 fw-bold text-danger">75</div>
            <span class="badge float-end bg-danger text-white ms-auto"
              >70% <i class="ri-arrow-right-down-line"></i
            ></span>
          </div>
          <small class="text-dark">To Day's Messages</small>
        </div>
      </div>
      <div class="col-sm-6 col-md-3 mt-3">
        <div class="border border-primary-subtle rounded-2 p-3">
          <div class="d-flex align-items-center">
            <div class="fs-4 fw-bold text-info">257</div>
            <span class="badge float-end bg-info text-white ms-auto"
              >60% <i class="ri-arrow-right-up-line"></i
            ></span>
          </div>
          <small class="text-dark">Last 7 Day's Messages</small>
        </div>
      </div>
      <div class="col-sm-6 col-md-3 mt-3">
        <div class="border border-primary-subtle rounded-2 p-3">
          <div class="d-flex align-items-center">
            <div class="fs-4 fw-bold text-dark-green">1,750</div>
            <span class="badge float-end bg-primary text-white ms-auto"
              >50% <i class="ri-arrow-right-up-line"></i
            ></span>
          </div>
          <small class="text-dark">Last 30 Day's Messages</small>
        </div>
      </div>
      <div class="col-sm-6 col-md-3 mt-3">
        <div class="border border-primary-subtle rounded-2 p-3">
          <div class="d-flex align-items-center">
            <div class="fs-4 fw-bold text-warning">15,000</div>
            <span class="badge float-end bg-warning text-white ms-auto"
              >40% <i class="ri-arrow-right-up-line"></i
            ></span>
          </div>
          <small class="text-dark">Life Time Messages</small>
        </div>
      </div>
    </div>

    <div v-if="this.revenue_fetch" class="mt-5">
      <div class="text-center">
        <div class="spinner-grow text-success" role="status"></div>
        <div class="spinner-grow text-danger" role="status"></div>
        <div class="spinner-grow text-warning" role="status"></div>
      </div>
    </div>
    <div v-if="!this.revenue_fetch">
      <div v-if="!this.revenues" class="text-center m-5">
        <img
          src="/assets/images/empty_box.png"
          width="200px"
          height="200px"
          alt=""
          srcset=""
        />
        <h5 class="text-danger mt-3">No Report Found !</h5>
      </div>
      <div v-if="this.revenues" class="card mb-3">
        <div
          class="card-header d-flex justify-content-between table-responsive"
        >
          <div>
            <div v-if="this.messages_filter" class="text-center">
              <div class="spinner-grow text-success" role="status"></div>
              <div class="spinner-grow text-danger" role="status"></div>
              <div class="spinner-grow text-warning" role="status"></div>
            </div>

            <select
            v-if="!this.messages_filter"
            class="form-select form-control simple-select"
            name="branch_select"
            id="branch_select"
            style="width: auto"
          >
            <option selected disabled value="">Filter by Messaging</option>
            <option selected value="0">Low to High</option>
            <option selected value="1">High to Low</option>
          </select>

          </div>
          <div class="d-flex">
            <input
              type="date"
              class="form-control simple-select"
              v-model="this.sdate"
              id="sdate"
            />
            <input
              type="date"
              class="form-control simple-select"
              v-model="this.edate"
              id="edate"
            />
            <button
              id="filter_btn"
              @click="this.filterRevenue"
              :disabled="this.messages_filter"
              class="btn btn-success text-white simple-btn"
            >
              Filter
            </button>
            <!--button :disabled="this.messages_filter" id="export_btn" class="btn btn-dark text-white simple-btn">Export</button-->
          </div>
        </div>

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
                        <th>No</th>
                        <th>#ID</th>
                        <th>Branch Name</th>
                        <th>Parcels</th>
                        <th>Average(m/p)</th>
                        <th>Messages</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class=""
                        v-for="(revenue, index) in revenues"
                        :key="revenue.id"
                      >
                        <td class="sorting_1">{{ index + 1 }}</td>
                        <td>3456</td>
                        <td>{{ revenue.name }}</td>
                        <td>
                          {{ revenue.packages }}
                        </td>
                        <td>
                          <span
                            class="badge border border-success text-success"
                            >{{ this.priceFormat(revenue.average) }}</span
                          >
                        </td>
                        <td>{{ this.priceFormat(revenue.revenue) }}</td>
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
            <h5>Total parcel : {{ this.priceFormat(this.summary.parcels) }}</h5>
            <h5>
              Average (message/parcel) : {{ priceFormat(this.summary.average) }}
            </h5>
            <h5>Total Messages : {{ priceFormat(this.summary.revenue) }}</h5>
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
      sdate: "",
      edate: "",
      messages_filter: false,
      filter_btn: true,
      revenue_fetch: true,
      errors: "",
      heading: "To Day's All Branches Revenue",
      revenues: [],
      summary: {
        revenue: 0,
        parcels: 0,
        average: 0,
      },
      user: this.$attrs.user,
    };
  },
  methods: {
    dataFormat(date) {
      return moment(date).format("DD - MM - YYYY");
    },
    priceFormat(price) {
      return price.toLocaleString();
    },
    validateDate(start, end) {
      if (start == null || start == "" || end == null || end == "") {
        alert("Start and End Date are Required");
        return false;
      } else {
        if (start > end) {
          alert("Start date must not be greater than End Date");
          return false;
        } else {
          return true;
        }
      }
    },

    async revenueReport() {
      var response = await axios
        .get(this.$store.state.api_url + "/report/revenue")
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        this.revenues = response.data.revenues;
        this.summary = response.data.summary;
        this.revenue_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
    async filterRevenue() {
      var sdate = this.sdate;
      var edate = this.edate;

      if (this.validateDate(sdate, edate)) {
        this.errors = "";
        this.messages_filter = true;

        var response = await axios
          .post(this.$store.state.api_url + "/report/revenue-filter", {
            sdate,
            edate,
          })
          .catch((errors) => {
            this.messages_filter = false;
            var message = "Network or Server Errors";
            this.$toast.error(message, { duration: 7000, dismissible: true });
          });

        if (response.data.success) {
          this.messages_filter = false;
          this.revenues = response.data.revenues;
          this.summary = response.data.summary;
          this.heading =
            "All Branches Revenue " + this.sdate + " To " + this.edate;
        } else {
          if (response.data.code == 444) {
            localStorage.removeItem("user_token");
            localStorage.removeItem("user");
            window.location.reload();
          }
          var msg = response.data.message;
          this.$toast.error(msg, { duration: 7000, dismissible: true });
          this.messages_filter = false;
        }
      }
    },
  },
  created() {
    this.$store.state.page_name = "Masseging Report";
    this.revenueReport();
  },
};
</script>
