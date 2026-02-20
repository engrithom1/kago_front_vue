<template>
  <div class="spacer"></div>
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
              v-model="this.parcel.sender_name"
              placeholder="Enter fulname"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Receiver name *</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel.receiver_name"
              placeholder="Enter fulname"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Transporter name</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel.transporter_name"
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
              v-model="this.parcel.sender_phone"
              placeholder="0xxxxxxxxx"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Receiver phone *</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel.receiver_phone"
              placeholder="0xxxxxxxxx"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Transporter phone</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel.transporter_phone"
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
            <label class="form-label" for="abc">Package Label *</label>
            <input
              type="text"
              class="form-control"
              v-model="this.parcel.name"
              placeholder="Parcel label"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Package Size *</label>
            <select
              class="form-select"
              v-model="this.parcel.package_size"
              aria-label="Default select example"
            >
              <option selected disabled value="">Parcel size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Package Name *</label>
            <select
              class="form-select"
               v-model="this.parcel.package_tag"
              aria-label="Default select example"
            >
             <option selected disabled value="">Parcel Name</option>
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
               v-model="this.parcel.package_value"
              placeholder="parcel value"
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Parcel Weight (in Kg)</label>
            <input
              type="number"
              class="form-control"
              v-model="this.parcel.package_weight"
              placeholder="weight in kgs"
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
              v-model="this.parcel.branch_to"
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
             v-model="this.parcel.price"
              placeholder="Price"
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
              v-model="this.parcel.specific_location"
              placeholder=""
            />
          </div>

          <div class="col-md-3">
            <label class="form-label" for="abc">Description (option)</label>
            <input
              type="text"
              class="form-control"
             v-model="this.parcel.description"
              placeholder=""
            />
          </div>
        </div>
        <div class="mt-3">
          <div class="d-flex justify-content-center">
            <p class="text-danger">{{ this.errors }}</p>
          </div>

          <div class="d-flex justify-content-center">
            <button v-if="this.add_btn" @click="addParcel" type="button" class="btn btn-success btn-create">
             <i class="ri-add-circle-line"></i>
              Submit Parcel
            </button>

            <button v-if="!this.add_btn" class="btn btn-success" type="button">
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

export default {
  data() {
    return {
      add_btn: true,
      errors: "",
      tags: [],
      branches: [],
      search_errors: [],
      user:this.$attrs.user,
      parcel: {
        sender_name: "",
        sender_phone: "",
        receiver_name: "",
        receiver_phone: "",
        transporter_name: "",
        transporter_phone: "",
        name: "",
        price: "",
        branch_to: "",
        description: "",
        package_value: "",
        package_size: "",
        package_weight: "",
        package_tag: "",
        specific_location:""
      },
    };
  },
  methods: {
    async allTags() {
      var response = await axios.get(this.$store.state.api_url + "/tag/all-tags");
      if (response.data.success) {
           this.tags = response.data.tags;
         } else {
          var message = response.data.message;
          this.$toast.success(message,{duration: 5000,dismissible: true,})
         }
      
    },

    async otherBranches() {
      var response = await axios.get(this.$store.state.api_url + "/branch/other-branches");
      if (response.data.success) {
           this.branches = response.data.branches;
         } else {
          var message = response.data.message;
          this.$toast.success(message,{duration: 5000,dismissible: true,})
         }
      
    },

    async addParcel() {
      this.errors = "";
      this.add_btn = false;

      var response = await axios
        .post(this.$store.state.api_url + "/parcel/create", this.parcel)
        .catch((errors) => {
          this.add_btn = true;
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
        this.errors = response.data.message;
        this.$toast.error(response.data.message, { duration: 3000, dismissible: true });
        this.add_btn = true;
      }
    }
    
  },
  created() {
    this.$store.state.page_name = "Add Parcel" 
    this.allTags();
    this.otherBranches();
    
  },
};
</script>
