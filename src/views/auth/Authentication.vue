<template>
    <div class="login-bg">
       <!-- Auth wrapper starts -->
<div class="auth-wrapper">

<!-- Form starts -->
<form @submit.prevent="login">

  <!-- Authbox starts -->
  <div class="auth-box">

    <!-- Logo starts -->
    <a href="https://kagopoint.com/" class="auth-logo mb-4">
      <img src="assets/images/Kagopoint.png" alt="Bootstrap Gallery" />
    </a>
    <!-- Logo ends -->

    <h4 class="mb-4">Login</h4>

    <div class="mb-3">
      <label class="form-label" for="phone">Your phone <span class="text-danger">*</span></label>
      <input type="text" v-model="this.form.phone" id="phone" class="form-control" placeholder="Enter Phone number">
    </div>

    <div class="mb-2">
      <label class="form-label" for="pwd">Your password <span class="text-danger">*</span></label>
      <input type="password" v-model="this.form.password" id="pwd" class="form-control" placeholder="Enter password">
    </div>

    <div class="d-flex justify-content-end mb-4">
      <a href="/forget_password" class="text-decoration-underline">Forgot password?</a>
    </div>

    <p class="text-danger">
      {{ this.$store.state.errors }}
    </p>

    <div class="mb-3 d-grid gap-2">
      <button type="submit" class="btn btn-dark">Login</button>
      <!--a href="signup.html" class="btn btn-outline-dark">Not registered? SignUp</a-->
    </div>

     <div class="d-flex justify-content-center mb-4">
      Don't have Account? <a href="https://kagopoint.com/create-account" class="text-decoration-underline"> Register</a>
    </div>

  </div>
  <!-- Authbox ends -->

</form>
<!-- Form ends -->

</div>
<!-- Auth wrapper ends -->
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      errors: "",
      alert_danger:false,
      alert_success:false,
      alert_load:false,
      change_pass_btn: true,
      message:"",
      username:"",
      auth:true,
      form: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    async forgetPassword(){
        var username = this.username

        this.alert_load = true
        this.alert_danger = false
        this.alert_success = false

        var response = await axios.post(this.$store.state.api_url + "/forget-password-request",{username})
        .catch((errors) => {
        this.alert_load = false
        var message = "Network or Server Errors";
        this.$toast.error(message,{duration: 7000,dismissible: true,})
        });
    
        if (response.data.success) {
            this.alert_load = false
            if(response.data.status == 1){
                this.alert_success = true
                this.alert_danger = false
                this.message = response.data.message
            }
            if(response.data.status == 2){
                this.alert_danger = true
                this.alert_success = false
                this.message = response.data.message
            }
            if(response.data.status == 3){
              alert(response.data.message)
                //alert("If you don't receive SMS, Wait for 10min then try again")
            }   
    
        } else {
            this.alert_load = false
            console.log(response.data.errors)
        }
                
    
    },
    login() {
      this.$store.dispatch("loginUser", this.form);
    },
  },
  created() {},
};
</script>