<template>
  <div class="gameslist">
    <div class="row">
      <div class="col-12">
        <table class="table table-dark shadow table-hover table-bordered">
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
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';

  export default Vue.extend({

    name: 'GamesList',

    data() {
      return {
        games: [],
        url: () => {
          if (this.$route.params.abb) {
            return 'https://classicgamedb.herokuapp.com/games/platform/' + this.$route.params.abb;
          } else {
            return 'https://classicgamedb.herokuapp.com/games';
          }
        },
      };
    },

    watch: {
      $route(to, from) {
        this.loadGames();
      },
    },

    methods: {

      overview(id: any) {
        this.$router.push({
          name: 'gameoverview',
          params: { id },
        });
      },

      loadGames() {
        axios.get(this.url())
          .then((response) => {
            this.games = response.data;
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response);
            }
          });
      },
    },

    mounted() {
      this.loadGames();
    },

  });
</script>