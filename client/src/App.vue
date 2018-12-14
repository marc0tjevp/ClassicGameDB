<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Classic Games Database</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/games">Games</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/platforms">Platforms</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item" v-if="loggedin">
            <a class="nav-link clickable" @click="logout()">Log out</a>
          </li>
        </ul>
      </div>
    </nav>

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
  body {
    background-color: #1B2326;
    color: #fafafa;
  }

  a {
    color: #fafafa;
  }

  .card {
    background-color: #222d32;
  }

  .btn-primary {
    background-color: #0B78CB !important;
  }

  .form-control {
    background-color: #222d32;
    border: 1px solid #222D32;
    color: #fafafa;
  }

  .form-control:disabled {
    background-color: #242b2e;
    color: #fafafa;
    border-color: #222d32 !important;
  }

  .alert-info {
    color: #fafafa;
    background-color: #242b2e;
    border-color: #0B78CB;
  }

  .alert-info a {
    color: #0B78CB;
    font-style: italic;
  }

  .form-control:focus {
    background-color: #222d32;
    color: #fafafa;
    border-color: #222d32 !important;
  }

  .navbar {
    margin-bottom: 50px;
    background-color: #222D32 !important;
  }

  .clickable {
    cursor: pointer;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    color: #fafafa;
  }

  .nav-link a.router-link-exact-active {
    color: #42b983;
  }
</style>