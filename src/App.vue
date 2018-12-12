<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/platforms">Platforms</router-link> |
      <router-link to="/games">Games</router-link> |
      <div v-if="loggedin">
        <a @click="logout()">Log out</a>
      </div>
    </div>
    <div class="container">
      <router-view :token="token" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({

    name: 'App',

    data() {
      return {
        token: '',
        loggedin: false,
      }
    },

    watch: {
      'token'(to, from) {

        // Log
        console.log('new token found: ' + to)

        // Set the new token
        this.getToken()

        // Check if logged in
        if (this.token.length > 0) {
          this.loggedin = true
        } else {
          this.loggedin = false
        }

      }
    },

    mounted() {
      this.getToken()
    },

    methods: {

      logout() {
        const self: any = this
        self.$cookie.delete('auth');
        this.token = ''
      },

      getToken() {

        const self: any = this

        // Get token from cookie
        var cookie = self.$cookie.get('auth');

        this.token = cookie || ''

      }

    }

  })
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .gameslist tbody tr,
  .platformlist tbody tr {
    cursor: pointer;
  }

  .table-hover tbody tr:hover {
    background-color: rgba(155, 159, 163, 0.55)
  }

  #nav {
    padding: 30px;
    text-align: center;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>