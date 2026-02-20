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

    <div v-if="!this.chat_show_btn" class="m-3">
        <div class="row">
          <div class="col-sm-12 col-md-4">
            <textarea placeholder="Message goes here...." class="form-control" v-model="this.message" id="message" cols="30" rows="3"></textarea>
            
          </div>
          <div class="col-sm-12 col-md-8">
            <textarea placeholder="0768448525,0614928525......" class="form-control" v-model="this.phone_list" id="message" cols="30" rows="3"></textarea>
            
          </div>
        </div>
        <div class="row">
          <div class="col-4 col-sm-4 col-md-4">
            <div class="d-flex justify-content-end">
              <button @click="this.sendMessages" v-if="this.send_btn" class="btn btn-success">Send message</button>
              <button
                v-if="!this.send_btn"
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
          <div class="col-8 col-sm-8 col-md-8">
            <div class="d-flex justify-content-start">
              <button @click="this.chatShow" class="btn btn-danger">Close Chats</button>
              <span class="m-1"></span>
              <button v-if="this.phone_list" @click="this.clearChat" class="btn btn-dark">Clear List</button>
            </div>
          </div>
        </div>  
    </div>


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
          <select
            class="form-select form-control simple-select"
            name="branch_select"
            id="branch_select"
            v-on:change="filterParcel()"
            v-model="this.branch_id"
            style="width: auto"
          >
            <option selected disabled value="">Filter by Destination</option>
            <option selected value="0">All Destination (branch)</option>
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
                   
            
          <button @click="this.chatShow" v-if="this.chat_show_btn" id="sms_btn" class="btn btn-dark text-white simple-btn">
            SendSMS
          </button>
          <button @click="this.chatShow" v-if="!this.chat_show_btn" id="sms_btn" class="btn btn-danger text-white simple-btn">
            Close Chats
          </button>
                
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
                        <th>Parcel Name</th>
                        <th>price</th>
                        <th>Parcel Label</th>
                        <th>Receiver Name</th>
                        <th>Receiver Phone</th>
                        <th>Sender branch</th>
                        <th>Date issue</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="" v-for="parcel, index in parcels" :key="parcel.id">
                        <td class="sorting_1">{{ index+1 }}</td>
                        <td>{{parcel.tag_name}}</td>
                        <td>
                         {{this.priceFormat(parcel.price)}}
                        </td>
                        <td>
                          <span class="badge border border-success text-success"
                            >{{ parcel.name }}</span
                          >
                        </td>
                        <td>{{ parcel.receiver_name }}</td>
                        <td>
                          <a href="#" @click="this.addPhoneList(parcel.receiver_phone)">
                            <i class="ri-message-2-line"></i>
                            {{ parcel.receiver_phone }}
                          </a>
                        </td>
                        <td><span class="badge border border-danger text-danger"
                          >{{ parcel.bname }}</span></td>
                          <td>{{ dataFormat(parcel.created_at) }}</td>
                        <td>
                          <a class="btn btn-info btn-sm"
                            data-bs-toggle="modal"
                            href="#receiveParcel"
                            @click="this.receiveInfo(parcel)"
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
        </div>
      </div>
    </div>

    <div
    class="modal fade"
    id="receiveParcel"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="receiveParcelLabel"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="receiveParcelLabel">
            Receive Parcel
          </h5>
          <button
            :disabled="!this.receive_btn"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-center">
            <h4>{{ this.receive_data.name }}</h4>
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <h5>Destination</h5>
              <p>{{ this.receive_data.bname }}</p>
              <h5>Sender Info</h5>
              <p>{{ this.receive_data.sname }} <br/>{{ this.receive_data.sphone }} </p>
            </div>
            <div>
              <h5>Receiver Info</h5>
              <p>{{ this.receive_data.rname }}<br/>
              {{ this.receive_data.rphone }}</p>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="abc">Receive Description</label>
            <input
              type="text"
              class="form-control"
              v-model="this.receive_data.closed_description"
              placeholder="Enter fulname"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :disabled="!this.receive_btn"
            class="btn btn-danger"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            v-if="this.receive_btn"
            @click="receiveParcel"
            type="button"
            class="btn btn-success"
          >
            Receive
          </button>
          <button v-if="!this.receive_btn" class="btn btn-success" type="button">
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
      filter_btn: true,
      receive_btn: true,
      parcels_fetch: true,
      phone_list:"",
      message:"",
      send_btn: true,
      chat_show_btn:true,
      errors: "",
      tags: [],
      branches: [],
      branch_id:"",
      parcels: [],
      og_parcels: [],
      parcel_data: {},
      receive_data: {
        closed_description:"Mzigo umepokelewa",
        id:"",
        barcode_id:"" 
      },
      user: this.$attrs.user,
    };
  },
  methods: {
    dataFormat(date){
      return moment(date).format("DD - MM - YYYY");
    },
    priceFormat(price) {
      price = parseInt(price)
      return price.toLocaleString()
    },
    chatShow(){
        this.chat_show_btn = !this.chat_show_btn
    },
    clearChat(){
      if (confirm('Are you sure want to clear phone list?')) {
        this.phone_list = ""
      }
    },
    checkInArray(arry_phone, phone) {
        var res = false
        for (let index = 0; index < arry_phone.length; index++) {
            const element = arry_phone[index];

            if (element == phone) {
                res = true
            }

        }
        return res
    },
    addPhoneList(phone){
      this.chat_show_btn = false

        var str_phone = this.phone_list;

        if (str_phone == "" || str_phone == undefined || str_phone == null) {
            this.phone_list = phone+","

        } else {
            var arry_phone = str_phone.split(',')
            //alert(arry_phone.length)
            if (this.checkInArray(arry_phone, phone)) {
                if (confirm(phone + ' aleady exist, do you want to remove it?')) {
                    const index = arry_phone.indexOf(phone);
                    if (index > -1) {
                        arry_phone.splice(index, 1);
                        this.phone_list = arry_phone.toString();
                    }

                }
            } else {
              this.phone_list = str_phone + phone + ",";
            }
        }
    },
    async allTags() {
      var response = await axios.get(
        this.$store.state.api_url + "/tag/all-tags"
      );
      if (response.data.success) {
        this.tags = response.data.tags;
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
    async receiveParcel() {
      this.errors = "";
      this.receive_btn = false;

      var response = await axios
        .post(this.$store.state.api_url + "/parcel/receive", this.receive_data)
        .catch((errors) => {
          this.receive_btn = true;
          var message = "Network or Request Errors";
          this.$toast.error(message, { duration: 7000, dismissible: true });
        });

      if (response.data.success) {
        var message = response.data.message;
        this.$toast.success(message, { duration: 7000, dismissible: true });
        window.location.reload();
      } else {
        if(response.data.code == 444){
            localStorage.removeItem("user_token")
            localStorage.removeItem("user")
            window.location.reload(); 
        }
        var _errors = response.data.message;
          this.$toast.error(_errors, { duration: 7000, dismissible: true });
        this.receive_btn = true;
      }
    },
    async sendMessages() {
      this.errors = "";
      this.send_btn = false;

      var msg = this.message
      var phone_list = this.phone_list

      var response = await axios
        .post(this.$store.state.api_url + "/sms/multiple", {message:msg, phone_list})
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
        if(response.data.code == 444){
            localStorage.removeItem("user_token")
            localStorage.removeItem("user")
            window.location.reload(); 
        }
        var _errors = response.data.message;
          this.$toast.error(_errors, { duration: 7000, dismissible: true });
        this.send_btn = true;
      }
    },
    filterParcel() {
        var bid = this.branch_id
        //let level = this.levels.find((i) => i.id === level_id);
        if(bid == 0){
          this.parcels = this.og_parcels
        }else{
          //alert(bid)
          let _parcel = this.og_parcels.filter((i) => i.branch_from == bid);
          this.parcels = _parcel;
        }
  
    },
    receiveInfo(parcel){

this.receive_data.name = parcel.name
this.receive_data.rname = parcel.receiver_name
this.receive_data.rphone = parcel.receiver_phone
this.receive_data.sname = parcel.sender_name
this.receive_data.sphone = parcel.sender_phone
this.receive_data.bname = parcel.bname
this.receive_data.id = parcel.id
this.receive_data.barcode_id = parcel.barcode_id

console.log(parcel)
},

    async otherBranches() {
      var response = await axios.get(
        this.$store.state.api_url + "/branch/other-branches"
      );
      if (response.data.success) {
        this.branches = response.data.branches;
      } else {
        var message = response.data.message;
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
    async incomingParcel() {
      var response = await axios
        .get(this.$store.state.api_url + "/parcel/incomming")
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
        this.$toast.error(message, { duration: 5000, dismissible: true });
      }
    },
  },
  created() {
    this.$store.state.page_name = "Incoming Parcel";
    this.allTags();
    this.otherBranches();
    this.incomingParcel();
  },
};
</script>
