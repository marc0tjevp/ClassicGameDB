<template>
  <div class="platformlist">

    <div v-if="platforms.length > 0" class="row">
      <div class="col-4" v-for="(data, index) in platforms" :key="index" @click="overview(data.abb)">
        <div class="card">
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
  import axios from 'axios'

  export default Vue.extend({

    name: 'PlatformList',

    methods: {

      overview(abb) {
        this.$router.push({
          name: 'gamesbyplatform',
          params: {
            abb: abb
          }
        })
      }

    },

    data() {
      return {
        platforms: [],
        url: 'https://classicgamedb.herokuapp.com/platforms'
      }
    },

    mounted() {

      axios.get(this.url)
        .then(response => {
          this.platforms = response.data
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response);
          }
        })

    },

  });
</script>