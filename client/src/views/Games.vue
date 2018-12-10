<template>
  <div class="games">

    <div class="row">
      <div class="col-10 align-right">
        <h1>{{ $route.params.abb }} Games</h1>
      </div>
      <div class="col-2 align-left">
        <button type="button" class="btn btn-primary">Add Game</button>
      </div>
    </div>

    <games-list/>

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