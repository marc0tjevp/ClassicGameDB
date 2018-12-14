<template>
  <div class="platform">
    <h1>Platforms</h1>
    <PlatformList />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import PlatformList from '@/components/PlatformList.vue';

  export default Vue.extend({
    name: 'home',
    components: {
      PlatformList,
    },
  });
</script>