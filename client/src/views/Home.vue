<template>
  <div class="home">
    <login/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Login from '@/components/Login.vue';

  export default Vue.extend({
    name: 'home',
    components: {
    Login,
  },
  })
</script>