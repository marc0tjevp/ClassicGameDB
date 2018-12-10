<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/platforms">Platforms</router-link> |
      <router-link to="/games">Games</router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

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