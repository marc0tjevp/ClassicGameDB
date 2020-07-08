<template>
  <div class="platformlist">

    <div v-if="platforms.length > 0" class="row">
      <div class="card-bottom col-sm-6 col-md-4 col-lg-4 col-xl-3" v-for="(data, index) in platforms" :key="index" @click="overview(data.abb)">
        <div class="card h-100 shadow">
          <img class="card-img-top" style="padding: 10%;" :src="'data:image/png;base64,' + data.image" />
          <div class="card-body">
            <h5 class="card-title">
              <p>{{ data.abb }}</p>
            </h5>
            <p class="card-text">{{ data.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="row">
      <p>No Platforms found :(</p>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';

  export default Vue.extend({

    name: 'PlatformList',

    methods: {
      overview(abb: any) {
        this.$router.push({
          name: 'gamesbyplatform',
          params: { abb },
        });
      },
    },

    data() {
      return {
        platforms: [],
        url: 'http://localhost:8080/platforms',
      };
    },

    // TODO: Split function from lifecycle
    mounted() {
      axios.get(this.url)
        .then((response) => {
          this.platforms = response.data;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    },

  });
</script>

<style scoped>
  .card {
    cursor: pointer;
  }

  .card:hover {
    background-color: rgba(255,255,255,.075)
  }

  .card-bottom {
    margin-bottom: 25px;
  }
</style>
