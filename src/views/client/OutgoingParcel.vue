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
        <div
          class="card-header d-flex justify-content-between table-responsive"
        >
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

          <button id="sms_btn" class="btn btn-dark text-white simple-btn">
            SendSMS
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
                        <th>Parcel Type</th>
                        <th>Receiver Name</th>
                        <th>Receiver Phone</th>
                        <th>Destination</th>
                        <th>Date issue</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class=""
                        v-for="(parcel, index) in parcels"
                        :key="parcel.id"
                      >
                        <td class="sorting_1">{{ index + 1 }}</td>
                        <td>{{ parcel.name }}</td>
                        <td>
                          {{ parcel.price }}
                        </td>
                        <td>
                          <span
                            class="badge border border-success text-success"
                            >{{ parcel.tag_name }}</span
                          >
                        </td>
                        <td>{{ parcel.receiver_name }}</td>
                        <td>{{ parcel.receiver_phone }}</td>
                        <td>
                          <span
                            class="badge border border-danger text-danger"
                            >{{ parcel.bname }}</span
                          >
                        </td>
                        <td>{{ dataFormat(parcel.created_at) }}</td>
                        <td>
                          <a
                            class="btn btn-success btn-sm"
                            data-bs-toggle="modal"
                            href="#exampleModalFullscreen"
                            @click="this.parcelInfo(parcel)"
                          >
                            <i class="ri-mark-pen-line"></i> </a
                          >|
                          <a class="btn btn-info btn-sm"
                            data-bs-toggle="modal"
                            href="#receiveParcel"
                            @click="this.receiveInfo(parcel)"
                            ><i class="ri-mark-pen-line"></i></a
                          >|
                          <!--a class="btn btn-secondary btn-sm" href="#"
                            ><i class="ri-mark-pen-line"></i></a
                        -->
                          <a class="btn btn-danger btn-sm" href="#"
                            ><i class="ri-mark-pen-line"></i
                          ></a>
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
      id="exampleModalFullscreen"
      tabindex="-1"
      aria-labelledby="exampleModalFullscreenLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title h4" id="exampleModalFullscreenLabel">
              Update Parcel info
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="m-3">
    <h5>Parcel Actors</h5>
    <div class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label class="form-label" for="abc">Sender name *</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel_data.sender_name"
              placeholder="Enter fulname"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Receiver name *</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel_data.receiver_name"
              placeholder="Enter fulname"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Transporter name</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel_data.transporter_name"
              placeholder="Enter fulname"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <label class="form-label" for="abc">Sender phone *</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel_data.sender_phone"
              placeholder="0xxxxxxxxx"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Receiver phone *</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel_data.receiver_phone"
              placeholder="0xxxxxxxxx"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Transporter phone</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel_data.transporter_phone"
              placeholder="0xxxxxxxx"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="spacer"></div>
    <h5>Parcel Details</h5>
    <div class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label class="form-label" for="abc">Package name *</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel_data.name"
              placeholder="Enter fulname"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Package Size *</label>
            <select
              class="form-select"
              v-model="this.parcel_data.package_size"
              aria-label="Default select example"
            >
              <option selected disabled value="">Parcel size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Package Type *</label>
            <select
              class="form-select"
               v-model="this.parcel_data.package_tag"
              aria-label="Default select example"
            >
             <option selected disabled value="">Parcel type (tag)</option>
             <option :disabled="!tag.status" class="text-capitalize"
                      v-for="tag in tags"
                      :key="tag.id"
                      :value="tag.id"
                    >
                      {{ tag.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <label class="form-label" for="abc">Parcel value *</label>
            <input
              type="number"
              class="form-control"
               v-model="this.parcel_data.package_value"
              placeholder="Enter fulname"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Parcel Weight (in Kg)</label>
            <input
              type="number"
              class="form-control"
              v-model="this.parcel_data.package_weight"
              placeholder="Enter fulname"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="spacer"></div>
    <h5>Shipping Details</h5>
    <div class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <label class="form-label" for="abc"
              >Destination (Location Branch) *</label
            >
            <select
              class="form-select"
              v-model="this.parcel_data.branch_to"
              aria-label="Default select example"
            >
            <option selected disabled value="">Select destination (branch)</option>
            <option :disabled="!branch.status" class="text-capitalize"
                      v-for="branch in branches"
                      :key="branch.id"
                      :value="branch.id"
                    >
                      {{ branch.name }}
            </option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Transportation Price *</label>
            <input
              type="number"
              class="form-control"
             v-model="this.parcel_data.price"
              placeholder="Enter fulname"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-3">
            <label class="form-label" for="abc"
              >Specify location (option)</label
            >
            <input
              type="text"
              class="form-control"
              v-model="this.parcel_data.specific_location"
              placeholder="Enter fulname"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Description (option)</label>
            <input
              type="text"
              class="form-control"
             v-model="this.parcel_data.description"
              placeholder="Enter fulname"
            />
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
            <button v-if="this.update_btn" @click="updateParcel" type="button" class="btn btn-success">
             <i class="ri-add-circle-line"></i>
              Update Parcel
            </button>

            <button v-if="!this.update_btn" class="btn btn-success" type="button">
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

    <div
      class="modal fade"
      id="confitmModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
      aria-labelledby="confitmModalLabel"
      tabindex="-1"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center">
            <h1 class="display-4">
              <i class="ri-delete-bin-line text-danger"></i>
            </h1>
            <h4 class="fw-bold">Confirm Delete</h4>
            <p>
              Are you sure, what to delete Branch().
            </p>
            <div class="d-flex justify-content-center">
              <button
                :disabled="!this.delete_btn"
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <span class="m-2"></span>
              <button
                v-if="this.delete_btn"
                @click="deleteBranch"
                class="btn btn-success"
              >
                Delete
              </button>

              <button
                v-if="!this.delete_btn"
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
      update_btn: true,
      receive_btn: true,
      filter_btn: true,
      delete_btn: true,
      parcels_fetch: true,
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
    dataFormat(date) {
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
        this.og_parcels = response.data.parcels;
        this.parcels_fetch = false;
      } else {
        var message = response.data.message;
        this.$toast.danger(message, { duration: 5000, dismissible: true });
      }
    },
    parcelInfo(parcel) {
      //let myTarget = JSON.parse(JSON.stringify(pac))
      this.parcel_data = parcel;
      console.log(parcel)
     
    },
    async updateParcel() {
      this.errors = "";
      this.update_btn = false;

      var response = await axios
        .post(this.$store.state.api_url + "/parcel/update", this.parcel_data)
        .catch((errors) => {
          this.update_btn = true;
          var message = "Network or Server Errors";
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
        this.update_btn = true;
      }
    },
    async receiveParcel() {
      this.errors = "";
      this.receive_btn = false;

      var response = await axios
        .post(this.$store.state.api_url + "/parcel/receive", this.receive_data)
        .catch((errors) => {
          this.receive_btn = true;
          var message = "Network or Server Errors";
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
    filterParcel() {
        var bid = this.branch_id
        //let level = this.levels.find((i) => i.id === level_id);
        if(bid == 0){
          this.parcels = this.og_parcels
        }else{
          let _parcel = this.og_parcels.filter((i) => i.branch_to == bid);
          this.parcels = _parcel;
        }
  
    },
  },
  created() {
    this.$store.state.page_name = "Outgoing Parcel";
    this.allTags();
    this.otherBranches();
    this.outgoingParcel();
  },
};
</script>
