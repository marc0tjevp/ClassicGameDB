<template>
  <div class="platformlist">
    <table class="table table-hover table-bordered table-striped">
      <thead>
        <tr>
          <th>Abb</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in platforms" :key="index" @click="overview(data.abb)">
            <td>{{ data.abb }}</td>
            <td>{{ data.name }}</td>
            <td>{{ data.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios'

  export default Vue.extend({

    name: 'PlatformList',

    methods: {

        overview(abb) {
            this.$router.push({name: 'gamesbyplatform', params: {abb: abb}})
        }

    },

    data() {
      return {
        platforms: [],
        url: 'http://localhost:8080/platforms'
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