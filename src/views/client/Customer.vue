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

      <div class="row">
        <div class="col-12">
          <div>
          <div v-if="this.customers_search" class="text-center">
            <div class="spinner-grow text-success" role="status"></div>
            <div class="spinner-grow text-danger" role="status"></div>
            <div class="spinner-grow text-warning" role="status"></div>
          </div>
        </div>
        </div>
        <div class="col-sm-12 col-md-6">
            <div class="d-flex">
          <input type="date" class="form-control simple-select" v-model="this.sdate" id="sdate">
          <input type="date" class="form-control simple-select" v-model="this.edate" id="edate">
           <select
            class="form-select form-control simple-select"
            name="filter_type"
            id="filter_type"
            v-model="this.filter_type"
            style="width: auto"
          >
            <option value="0">Send Parcel</option>
            <option value="1">Joined At</option>
          </select>
          <button
            @click="this.filterCustomers"
            :disabled="this.customers_search"
            id="search_btn"
            class="btn btn-success simple-btn"
          >
            filter
          </button>
        </div>
        </div>
        <div class="col-sm-12 col-md-1"></div>
      <div class="col-sm-12 col-md-5">
        
        <div class="d-flex">
          
          <button
            @click="this.chatShow"
              v-if="this.chat_show_btn"
              id="sms_btn"
            class="btn btn-info simple-btn w-100"
          >
            Send Message
          </button>
          <button
            @click="this.chatShow"
              v-if="!this.chat_show_btn"
              id="sms_btn"
            class="btn btn-danger simple-btn w-100"
          >
            Close Message
          </button>
          <span class="m-1"></span>
          <input
           class="form-control simple-select"
            type="text"
            placeholder="Enter phone or name"
            v-model="this.phone_name"
          />
          <button
            @click="this.searchCustomers"
            :disabled="this.customers_search"
            id="search_btn"
            class="btn btn-success simple-btn"
          >
            search
          </button>
        </div>
      </div>
      </div>

    <!--message view-->
      <div v-if="!this.chat_show_btn" class="m-3">
      <div class="row">
        <div class="col-sm-12 col-md-4">
          <textarea
            placeholder="Message goes here...."
            class="form-control"
            v-model="this.message"
            id="message"
            cols="30"
            rows="3"
          ></textarea>
        </div>
        <div class="col-sm-12 col-md-8">
          <textarea
            placeholder="0768448525,0614928525......"
            class="form-control"
            v-model="this.phone_list"
            id="message"
            cols="30"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-4 col-sm-4 col-md-4">
          <div class="d-flex justify-content-end">
            <button
              @click="this.sendMessages"
              v-if="this.send_btn"
              class="btn btn-success"
            >
              Send message
            </button>
            <button v-if="!this.send_btn" class="btn btn-success" type="button">
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Please Wait...
            </button>
          </div>
        </div>
        <div class="col-8 col-sm-8 col-md-8">
          <div class="d-flex justify-content-start">
            <button @click="this.chatShow" class="btn btn-danger">
              Close Chats
            </button>
            <span class="m-1"></span>
            <button
              v-if="this.phone_list"
              @click="this.clearChat"
              class="btn btn-dark"
            >
              Clear List
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--end views-->

      <div v-if="this.customers_fetch" class="">
        <div class="text-center">
          <div class="spinner-grow text-success" role="status"></div>
          <div class="spinner-grow text-danger" role="status"></div>
          <div class="spinner-grow text-warning" role="status"></div>
        </div>
      </div>
      <div v-if="!this.customers_fetch">
        <div v-if="!this.customers" class="text-center m-5">
          <img
            src="/assets/images/empty_box.png"
            width="200px"
            height="200px"
            alt=""
            srcset=""
          />
          <h5 class="text-danger mt-3">No Customer Found !</h5>
        </div>
        <div v-if="this.customers" class="mt-3">
          <div class="table-outer">
            <div class="table-responsive">
              <table class="table align-middle table-bordered table-hover m-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Fulname</th>
                    <th>Phone no</th>
                    <th>Sents</th>
                    <th>Total Paid</th>
                    <th>Created By</th>
                    <th>Joined At</th>
                    <th>Parcels</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(customer, index) in customers" :key="customer.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ customer.fulname }}</td>
                    <td>{{ customer.phone_no }}</td>
                    <td>
                      <span class="badge border border-danger text-danger">{{
                        this.nullFormat(customer.sents)
                      }}</span>
                    </td>
                    <td>
                      <span class="badge border border-success text-success">{{
                        this.priceFormat(customer.paids)
                      }}</span>
                    </td>

                    <td>{{ customer.created_by }}</td>
                    <td>{{ this.dataFormat(customer.created_at) }}</td>
                    <td>
                      <button
                        class="btn btn-success btn-sm"
                        @click="this.customerEvents(customer.phone_no)"
                        data-bs-toggle="modal"
                        href="#exampleModalFullscreen"
                        :disabled="this.customers_search"
                      >
                        <i class="ri-award-fill"></i> Parcel
                      </button>
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
      id="exampleModalFullscreen"
      tabindex="-1"
      aria-labelledby="exampleModalFullscreenLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title h4" id="exampleModalFullscreenLabel">
              Customer Report
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="this.customers_events">
              <div class="grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="text-center">
                      <div
                        class="spinner-grow text-success"
                        role="status"
                      ></div>
                      <div class="spinner-grow text-danger" role="status"></div>
                      <div
                        class="spinner-grow text-warning"
                        role="status"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!this.customers_events" class="row">
              <div
                v-for="event in events"
                :key="event.id"
                class="col-md-12 grid-margin stretch-card"
              >
                <div class="card">
                  <div class="card-body">
                    <h4 class="text-center mb-3">
                      Package Name : <b>{{ event.name }}</b>
                    </h4>
                    <div class="row">
                      <div class="col-sm-6 col-md-4 mb-3">
                        <h5>
                          Sender name: <b>{{ event.sender_name }}</b>
                        </h5>
                        <h5>
                          Sender Phone: <b>{{ event.sender_phone }}</b>
                        </h5>
                        <br />
                        <h5>
                          Receiver name: <b>{{ event.receiver_name }}</b>
                        </h5>
                        <h5>
                          Receiver Phone: <b>{{ event.receiver_phone }}</b>
                        </h5>
                      </div>

                      <div class="col-sm-6 col-md-4 mb-3">
                        <h5>
                          <b class="text-primary">{{ event.bfname }}</b> To
                          <b class="text-success">{{ event.btname }}</b>
                        </h5>

                        <h5>
                          Created at:
                          <b>{{ this.dataFormat(event.created_at) }}</b>
                        </h5>
                        <h5>
                          Transportation Price:
                          <b>{{ this.priceFormat(event.price) }}</b>
                        </h5>

                        <h5 v-if="event.status == 1">
                          Package status:
                          <label class="badge badge-primary">On Transit</label>
                        </h5>
                        <h5 v-if="event.status == 2">
                          Package status:
                          <label class="badge badge-success">Received</label>
                        </h5>
                        <h5 v-if="event.status == 3">
                          Package status:
                          <label class="badge badge-danger">Removed</label>
                        </h5>
                      </div>

                      <div class="col-sm-6 col-md-4 mb-3">
                        <h5>
                          Staff name: <b>{{ event.fulname }}</b>
                        </h5>
                        <h5>
                          Staff Phone: <b>{{ event.phone1 }}</b>
                        </h5>
                        <br />
                        <h5>
                          Transporter name: <b>{{ event.transporter_name }}</b>
                        </h5>
                        <h5>
                          Transporter Phone:
                          <b>{{ event.transporter_phone }}</b>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              onclick="alert('relux Boss, man at work')"
            >
            <i class="ri-file-pdf-2-fill"></i>
              Print PDF
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
      customers_fetch: true,
      customers_search: false,
      customers_events: false,
      customer_phone: 0,
      customer_fulname: "",
      errors: "",
      phone_name: "",
      customers: [],
      events: [],
      form: {
        name: "",
      },
      filter_type:0,
      sdate:"",
      edate:"",
      message: "",
      send_btn: true,
      chat_show_btn: true,
      phone_list: "",
      user: this.$attrs.user,
    };
  },
  methods: {
    dataFormat(date) {
      return moment(date).format("DD - MM - YYYY");
    },
    priceFormat(price) {
      if (price == null || price == undefined) {
          return 0
        }
      return price.toLocaleString();
    },
      nullFormat(sents) {
        if (sents == null || sents == undefined) {
          return 0
        }
      return sents.toLocaleString();
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
    customInfo(fulname) {
      this.customer_fulname = fulname;
    },
       async chatShow() {
      this.phone_list = await this.phoneList(this.customers)  
      this.chat_show_btn = !this.chat_show_btn;
    },
      clearChat() {
      if (confirm("Are you sure want to clear phone list?")) {
        this.phone_list = "";
      }
    },
    async phoneList(customers) {

      var lists = "";
      if(customers){
      for (let index = 0; index < customers.length; index++) {
        const element = customers[index].phone_no;
        lists += element + ",";

      }
      return lists;
      }else{
        return lists
      }
    },
      async sendMessages() {
      this.errors = "";
      this.send_btn = false;

      var msg = this.message;
      var phone_list = this.phone_list;

      var response = await axios
        .post(this.$store.state.api_url + "/sms/multiple", {
          message: msg,
          phone_list,
        })
        .catch((errors) => {
          this.send_btn = true;
          var message = "Network or Request Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        this.send_btn = true;
        var message = response.data.message;
        this.$toast.success(message, { duration: 7000, dismissible: true });
        //window.location.reload();
      } else {
        if (response.data.code == 444) {
          localStorage.removeItem("user_token");
          localStorage.removeItem("user");
          window.location.reload();
        }
        var _errors = response.data.message;
        this.$toast.error(_errors, { duration: 7000, dismissible: true });
        this.send_btn = true;
      }
    },
    async allCustomers() {
      var response = await axios.get(
        this.$store.state.api_url + "/user/top-customers"
      );
      if (response.data.success) {
        this.customers = response.data.customers;
        this.customers_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
    async searchCustomers() {
      var phone_name = this.phone_name;

      if (phone_name == "" || phone_name == null || phone_name == undefined) {
        this.$toast.error("Enter phone or name", {
          duration: 7000,
          dismissible: true,
        });
      } else {
        this.errors = "";
        this.customers_search = true;

        var response = await axios
          .post(this.$store.state.api_url + "/user/search-customers", {
            phone_name,
          })
          .catch((errors) => {
            this.customers_search = false;
            var message = "Network or Server Errors";
            this.$toast.error(message, { duration: 7000, dismissible: true });
          });

        if (response.data.success) {
          this.customers_search = false;
          this.customers = response.data.customers;
          this.phone_list = await this.phoneList(response.data.customers)  
        } else {
          if (response.data.code == 444) {
            localStorage.removeItem("user_token");
            localStorage.removeItem("user");
            window.location.reload();
          }
          var msg = response.data.message;
          this.$toast.error(msg, { duration: 7000, dismissible: true });
          this.customers_search = false;
        }
      }
    },
    async filterCustomers() {
      var sdate = this.sdate;
      var edate = this.edate;
      var filter_type = this.filter_type;

      if (this.validateDate(sdate, edate)) {
    
        this.errors = "";
        this.customers_search = true;

        var response = await axios
          .post(this.$store.state.api_url + "/user/filter-customers", {
            filter_type, sdate, edate
          })
          .catch((errors) => {
            this.customers_search = false;
            var message = "Network or Server Errors";
            this.$toast.error(message, { duration: 7000, dismissible: true });
          });

        if (response.data.success) {
          this.customers_search = false;
          this.customers = response.data.customers;
          this.phone_list = await this.phoneList(response.data.customers)  
        } else {
          if (response.data.code == 444) {
            localStorage.removeItem("user_token");
            localStorage.removeItem("user");
            window.location.reload();
          }
          var msg = response.data.message;
          this.$toast.error(msg, { duration: 7000, dismissible: true });
          this.customers_search = false;
        }
      }
    },
    async customerEvents(phone) {
      //var phone = this.customer.phone_no

      this.errors = "";
      this.customers_events = true;
      this.events = [];

      var response = await axios
        .post(this.$store.state.api_url + "/user/customer-events", { phone })
        .catch((errors) => {
          this.customers_events = false;
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        this.customers_events = false;
        this.events = response.data.events;
      } else {
        if (response.data.code == 444) {
          localStorage.removeItem("user_token");
          localStorage.removeItem("user");
          window.location.reload();
        }
        var msg = response.data.message;
        this.$toast.error(msg, { duration: 7000, dismissible: true });
        this.customers_events = false;
      }
    },
  },
  created() {
    this.$store.state.page_name = "Customers";
    this.allCustomers();
  },
};
</script>
