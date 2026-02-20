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
    <div v-if="this.message_fetch" class="mt-5">
      <div class="text-center">
        <div class="spinner-grow text-success" role="status"></div>
        <div class="spinner-grow text-danger" role="status"></div>
        <div class="spinner-grow text-warning" role="status"></div>
      </div>
    </div>
    <div v-if="!this.message_fetch">
          <!-- Row start -->
           <div class="m-3">
    <div v-if="this.user.role == 2" class="row gx-3">
      <div class="col-xl-3 col-sm-6">
        <div class="bg-danger mb-3 p-3 text-white rounded-2">
          <div class="mb-2 d-flex align-items-center justify-content-between">
             <p class="m-0 small">
            Last 7Day's SMS<!--span class="badge float-end bg-danger-subtle text-danger">50%</span-->
          </p>
            <h2><span>{{this.priceFormat(this.sms_data.day7)}}</span></h2>
        </div>
         
        </div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="bg-info mb-3 p-3 text-white rounded-2">
          <div class="mb-2 d-flex align-items-center justify-content-between">
            <p class="m-0 small">
            Last 30Day's SMS<!--span class="badge float-end bg-info-subtle text-info">60%</span-->
          </p>
            <h2><span>{{this.priceFormat(this.sms_data.day30)}}</span></h2>
        </div>
          
        </div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="bg-primary mb-3 p-3 text-white rounded-2">
          <div class="mb-2 d-flex align-items-center justify-content-between">
            <p class="m-0 small">
            SMS Balance<!--span class="badge float-end bg-primary-subtle text-primary">70%</span-->
          </p>
            <h2><span>{{this.priceFormat(this.sms_data.sms_balance)}}</span></h2>
        </div>
          
        </div>
        <div>
</div>
      </div>
      <div class="col-xl-3 col-sm-6">
        <div class="bg-warning mb-3 p-3 text-white rounded-2">
          <div class="mb-2 d-flex align-items-center justify-content-between">
            <p class="m-0 small">
            Life Time Message<!--span class="badge float-end bg-warning-subtle text-warning">80%</span-->
          </p>
            <h2><span>{{this.priceFormat(this.sms_data.sms_lifetime)}}</span></h2>
        </div>
         
        </div>
      </div>
    </div>
           </div>
    <!-- Row end -->
      <div v-if="!this.messages" class="text-center m-5">
        <img
          src="/assets/images/empty_box.png"
          width="200px"
          height="200px"
          alt=""
          srcset=""
        />
        <h5 class="text-danger mt-3">No Report Found !</h5>
      </div>
      <div v-if="this.messages" class="card mb-3">
        <div class="card-header d-flex justify-content-between table-responsive">
           
            <select
            class="form-select form-control simple-select"
            name="branch_select"
            id="branch_select"
            v-on:change="filterParcel()"
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
        
            <div class="d-flex">
              <input type="date" class="form-control simple-select" v-model="this.sdate" id="sdate">
              <input type="date" class="form-control simple-select" v-model="this.edate" id="edate">
              <button id="filter_btn"  @click="this.filterMessageDate"
              :disabled="this.message_filter" class="btn btn-success text-white simple-btn">Filter</button>
            </div>
                
        </div>
        
        <div class="card-body">
            <h5 class="text-center mt-3">{{ heading }}</h5>
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
                        <th>Message</th>
                        <th>SMS's</th>
                        <th>Recvs</th>
                        <th>Sender</th>
                        <th>Branch</th>
                        <th>Created_at</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="" v-for="message, index in messages" :key="message.id">
                        <td class="sorting_1">{{ index+1 }}</td>
                        <td>{{ this.subString(60, message.message)}}</td>
                       
                        <td>
                          <span class="badge border border-success text-success"
                            >{{message.messages}}</span
                          >
                        </td>
                       <td>
                        <span class="badge border border-danger text-danger"
                        >
                        {{message.receivers}}
                        </span>
                      </td>
                       <td>{{message.fulname}}</td>
                       <td>{{message.name}}</td>
                       <td>{{this.dataFormat(message.created_at)}}</td>
                       <td>
                          <a class="btn btn-info btn-sm"
                            data-bs-toggle="modal"
                            href="#messageDetails"
                            @click="this.readMore(message)"
                            ><i class="ri-mark-pen-line"></i></a
                          >
                        </td>
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
            <h5>Total Messages : {{ this.priceFormat(this.total_messages) }}</h5>
            <h5>Receivers : {{ priceFormat(this.total_receivers) }}</h5>
           
          </div>
        </div>
      </div>
    </div>

    <div
    class="modal fade"
    id="messageDetails"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="messageDetailsLabel"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="messageDetailsLabel">
            Message details
          </h5>
          <button
            
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="">
           <h5>Message</h5>
           <p>{{ this.message.message }}</p>
<br/>
           <h5>Phone List</h5>
           <p>{{ this.message.receiver_list }}</p>
          </div>
          <div class="d-flex justify-content-between">
            <h6>{{  this.dataFormat(this.message.created_at) }}</h6>
            <h6>By {{ this.message.fulname }}</h6>
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
      sdate:"",
      edate:"",
      message_filter: false,
      filter_btn: true,
      message_fetch: true,
      errors: "",
      heading:"To Day's All Branches Messages",
      messages: [],
      sms_data: {},
      message:{},
      og_messages: [],
      branch_id:"",
      branches: [],
      total_messages:0,
      total_receivers:0,
      user: this.$attrs.user,
    };
  },
  methods: {
    dataFormat(date){
      if(date == null || date == undefined || date == ""){
        return "xxxx-xx-xx"
      }
      return moment(date).format("DD - MM - YYYY");
    },
    priceFormat(price) {
      if(price == null || price == undefined || price == ""){
        return 0.0
      }
      return price.toLocaleString()
    },
    subString(len, context) {
      if (context.length > len) {
        return context.substring(0, len) + "...";
      } else {
        return context;
      }
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
    
    async messageReport() {
      var response = await axios
        .get(this.$store.state.api_url + "/report/messages")
        .catch((errors) => {
          var message = "Network or Server Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {

        this.messages = response.data.messages;
        this.sms_data = response.data.sms_data;
        this.og_messages = response.data.messages;
        this.total_messages = response.data.total_messages;
        this.total_receivers = response.data.total_receivers;
        this.message_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
    async filterMessageDate() {

      var sdate = this.sdate;
      var edate = this.edate;

      if (this.validateDate(sdate, edate)) {
      
        this.errors = "";
        this.message_filter = true;
        this.branch_id = 0

        var response = await axios
          .post(this.$store.state.api_url + "/report/messages-filter", {
            sdate, edate
          })
          .catch((errors) => {
            this.message_filter = false;
            var message = "Network or Server Errors";
            this.$toast.error(message, { duration: 7000, dismissible: true });
          });

        if (response.data.success) {
          this.message_filter = false;
          this.messages = response.data.messages;
          this.og_messages = response.data.messages;
          this.total_messages = response.data.total_messages;
          this.total_receivers = response.data.total_receivers;
          this.heading = "All Branches Messages "+this.sdate+" To "+this.edate
        } else {
          if (response.data.code == 444) {
            localStorage.removeItem("user_token");
            localStorage.removeItem("user");
            window.location.reload();
          }
          var msg = response.data.message;
          this.$toast.error(msg, { duration: 7000, dismissible: true });
          this.message_filter = false;
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
    sumMessage(messages){
       var sum = 0
       if(messages.length == 0){
         return sum
       }else{
        for (let index = 0; index < messages.length; index++) {
          sum += messages[index].messages;
          
        }
        return sum
       }
    },
    sumReceivers(messages){
       var sum = 0
       if(messages.length == 0){
         return sum
       }else{
        for (let index = 0; index < messages.length; index++) {
          sum += messages[index].receivers;
          
        }
        return sum
       }
    },
    filterParcel() {
        var bid = this.branch_id
        //let level = this.levels.find((i) => i.id === level_id);
        if(this.og_messages.length > 0){
          if(bid == 0){
          this.messages = this.og_messages
        }else{
          let _message = this.og_messages.filter((i) => i.branch_id == bid);
          this.messages = _message;
          this.total_messages = this.sumMessage(_message)
          this.total_receivers = this.sumReceivers(_message)
        }
        }else{
          alert('No messages found')
        }
  
    },
    readMore(message){
      this.message = message
    }
  },
  created() {
    this.$store.state.page_name = "Messaging Reports";
    this.messageReport();
    this.allBranches()
  },
};
</script>
