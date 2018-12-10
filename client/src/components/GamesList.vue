<template>
  <div class="gameslist">
    <div class="row">
      <table class="table table-hover table-bordered table-striped">
        <thead>
          <tr>
            <th>Cover Art</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in games" :key="index" @click="overview(data._id)">
            <td>
              <img class="img-thumbnail" style="max-width: 100px" :src="'data:image/png;base64,' + data.cover" />
            </td>
            <td>{{ data.title }}</td>
            <td>{{ data.genre }}</td>
            <td>{{ data.publisher }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios'

  export default Vue.extend({

    name: 'GamesList',

    data() {
      return {
        games: [],
        url: function () {
          if (this.$route.params.abb) {
            return 'http://localhost:8080/games/platform/' + this.$route.params.abb
          } else {
            return 'http://localhost:8080/games'
          }
        }
      }
    },

    watch: {
      '$route'(to, from) {
        this.loadGames()
      }
    },

    methods: {

      overview(id) {
        this.$router.push({
          name: 'gameoverview',
          params: {
            id: id
          }
        })
      },

      loadGames() {
        axios.get(this.url())
          .then(response => {
            this.games = response.data
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response);
            }
          })
      }

    },

    mounted() {
      this.loadGames()
    },

  });
</script>