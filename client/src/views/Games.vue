<template>
  <div class="games">

    <div class="row">
      <div class="col-10">
        <h1>{{ $route.params.abb }} Games</h1>
      </div>
      <div class="col-2">
        <router-link tag="button" to="/games/add" type="button" class="btn float-right btn-primary">Add Game</router-link>
      </div>
    </div>

    <games-list />

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import GamesList from '@/components/GamesList.vue';

  export default Vue.extend({
    name: 'home',
    components: {
      GamesList,
    },
  })
</script>