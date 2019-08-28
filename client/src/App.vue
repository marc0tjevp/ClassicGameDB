<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand">Classic Games Database</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link active-class="active" class="nav-link" to="/" exact><i class="fas fa-home"></i> Home</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active" class="nav-link" to="/games"><i class="fas fa-gamepad"></i> Games</router-link>
          </li>
          <li class="nav-item">
            <router-link active-class="active" class="nav-link" to="/platforms"><i class="fas fa-microchip"></i> Platforms</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li v-if="loggedin" class="nav-item">
            <a class="nav-link clickable" @click="logout()"><i class="fas fa-sign-out-alt"></i> Log out</a>
          </li>
          <li v-else class="nav-item">
            <router-link to="login" class="nav-link"><i class="fas fa-sign-in-alt"></i> Log In</router-link>
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
      };
    },

    watch: {
      token(to, from) {

        // Set the new token
        this.getToken();

        // Check if logged in
        if (this.token.length > 0) {
          this.loggedin = true;
        } else {
          this.loggedin = false;
        }

      },
    },

    mounted() {
      this.getToken();
    },

    methods: {

      logout() {
        const self: any = this;
        self.$cookie.delete('auth');
        this.token = '';
      },

      getToken() {

        const self: any = this;

        // Get token from cookie
        const cookie = self.$cookie.get('auth');

        this.token = cookie || '';

      },

    },

  });
</script>

<style>
  body {
    background-color: #1B2326;
    color: #fafafa;
  }

  a {
    color: #fafafa;
  }

  .table thead {
    background-color: #222D32;
  }

  .table tbody {
    background-color: #263238;
  }
  
  .nav-link i {
    margin-right: 7.5px;
  }

  .nav-link {
    margin-right: 15px;
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
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
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
</style>