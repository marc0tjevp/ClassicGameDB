<template>
  <div class="home">
    <welcome />
    <login :isHomePage="true" v-if="!token" />
    <div v-else>
      <i>Welcome back {{ user.username }}!</i>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Login from '@/components/Login.vue';
  import Welcome from '@/components/Welcome.vue'
  import axios from 'axios'

  export default Vue.extend({

    name: 'home',

    props: ['token'],

    data() {
      return {
        user: {
          _id: '',
          username: ''
        }
      }
    },

    methods: {
      getUser() {
        if (this.token) {
          axios.get('https://classicgamedb.herokuapp.com/users', {
              headers: {
                Authorization: this.token
              }
            })
            .then(response => {
              this.user = response.data
              console.log(this.user)
            })
            .catch(function (error) {
              if (error.response) {
                console.log(error.response);
              }
            })
        }
      }
    },

    watch: {
      'token'(to, from) {
        this.getUser()
      }
    },

    components: {
      Welcome,
      Login,
    },

    mounted() {
      this.getUser();
    },

  })
  
</script>