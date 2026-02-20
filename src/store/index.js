import { createStore } from 'vuex'
import axios from 'axios'
import * as CryptoJS from 'crypto-js';

export default createStore({
  state: {
    //back end local url 192.168.0.2
    //api_url: "http://192.168.0.2:2025/api",
    //img_url: "http://192.168.0.2:2025/images/",

    api_url: "https://kagopoint.com/api",
    img_url: "https://kagopoint.com/images/",

    page_name:"Dashbord",
    user: {},
    errors:'',
    errorsSMS: "",
    btn_clicks: false,
    menu_dialog: false,
  },

  getters: {
  },

  mutations: {
    setStatus(state, bool) {
      state.btn_clicks = bool
    },
    setUser(state, user) {
      state.user = user
    },
    setErrors(state, value) {
      state.errors = value
    },
    setZeroErrors(state) {
      state.errors = ""
    },
    setErrorsSMS(state, value) {
      state.errorsSMS = value
    },
    setZeroErrorsSMS(state) {
      state.errorsSMS = ""
    },
  },

  actions: {

    async loginUser({ state, commit }, user) {
      commit('setStatus', true)
      commit('setZeroErrors');
      commit('setZeroErrorsSMS');

      console.log(user)

      var response = await axios.post(state.api_url + '/auth/login', user)
        .catch(errors => {
          commit('setStatus', false)
          console.log(errors)
          commit('setErrors', "Network or Request Errors");

        })

      if (response.data.success) {

        commit('setUser', response.data.user)

        //console.log(response.data.user)
        
        localStorage.setItem('user', CryptoJS.AES.encrypt(JSON.stringify(response.data.user), 'user').toString())
        localStorage.setItem('user_token', CryptoJS.AES.encrypt(response.data.token.accessToken, 'user_token').toString())

        window.location.replace('/');

      } else {
        commit('setStatus', false)
        commit('setErrors', response.data.message);
        //commit('setErrorsSMS', response.data.message);

      }

    },
    /*
    async registerUser({ state, commit }, user) {
      commit('setZeroErrors');
      commit('setZeroErrorsSMS');
      commit('setStatus', true)

      var response = await axios.post(state.api_url + '/register', user)
        .catch(errors => {
          commit('setStatus', false)
          console.log(errors)
          commit('setErrorsSMS', "Network or Request Errors");

        })

      if (response.data.success) {

        commit('setUser', response.data.dataz.user)

        localStorage.setItem('user', CryptoJS.AES.encrypt(JSON.stringify(response.data.dataz.user), 'user').toString())
        localStorage.setItem('user_token', CryptoJS.AES.encrypt(response.data.dataz.token, 'user_token').toString())
        window.location.replace('/');

      } else {
        commit('setStatus', false)
        commit('setErrors', response.data.errors);
        commit('setErrorsSMS', response.data.message);
      }

    },*/
    logOut({ state, commit }, user) {

      /*localStorage.removeItem("user_token")
      localStorage.removeItem("user")
      
      commit('setUser',{})
      window.location.replace('/');*/
      axios
        .post(state.api_url + '/auth/logout',user)
        .then(response => {

          if (response.data.success) {
            //console.log("loged succsessfuly")
            localStorage.removeItem("user_token")
            localStorage.removeItem("user")
            commit('setUser', {})
            window.location.replace('/');

          }

        });
    }
  },

  modules: {
  }
})
