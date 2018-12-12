<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/platforms">Platforms</router-link> |
      <router-link to="/games">Games</router-link>
      <p v-if="loggedin">Logged in</p>
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

    mounted() {
      this.getToken()
      if(this.token.length > 0) {
        this.loggedin = true
      }
    },

    methods: {

      getToken() {
        this.token = document.cookie
          .split(';')
          .map((c) => c.trim())
          .filter((cookie) => {
            return cookie.substring(0, 'Auth'.length + 1) === `${'Auth'}=`;
          })
          .map((cookie) => {
            return decodeURIComponent(cookie.substring('Auth'.length + 1));
          })[0] || ''
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