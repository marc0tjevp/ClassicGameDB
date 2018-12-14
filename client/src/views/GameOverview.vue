<template>
  <div class="gameoverview text-left">

    <div class="game">
      <div class="row">
        <div class="col-10">
          <h2>{{ selectedGame.title }}</h2>
        </div>
        <div class="col-2">
          <router-link tag="button" :to="'/games/edit/' + this.$route.params.id" type="button" class="btn btn-primary float-right">Edit
            Game</router-link>
        </div>
      </div>

      <div class="row">

        <div class="col-4">
          <img class="img-fluid float-left w-100" :src="'data:image/png;base64,' + selectedGame.cover" />
        </div>

        <div class="col-8">
          <p>{{ selectedGame.description }}</p>

          <dl>
            <dt>Genre</dt>
            <dd>{{ selectedGame.genre }}</dd>

            <dt>Publisher</dt>
            <dd>{{ selectedGame.publisher }}</dd>

            <dt>Release Date</dt>
            <dd>{{ selectedGame.releaseDate | moment("DD-MM-YYYY") }}</dd>
          </dl>

        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-10">
        <h2>Experiences</h2>
      </div>
      <div class="col-2">
        <router-link tag="button" :to="'/games/xp/' + this.$route.params.id" type="button" class="btn btn-primary float-right">Add
          your XP!</router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div v-for="(data, index) in selectedGame.experiences" :key="index" class="card shadow">
          <div class="card-body">
            <blockquote>
              <p>{{ data.content }}</p>
              <p>Rating: {{ data.rating }}</p>
              <footer class="blockquote-footer">By {{ data.user.username }} on <cite>{{ data.date |
                  moment("DD-MM-YYYY") }}</cite></footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import axios from 'axios';

  export default Vue.extend({

    name: 'gameoverview',

    watch: {
      $route(to, from) {
        console.log(to);
        this.url = 'https://classicgamedb.herokuapp.com/games/' + to.params.id;
        this.getGame();
      },
    },

    data() {
      return {
        games: [],
        selectedGame: {
          cover: '',
          title: '',
          description: '',
          experiences: [],
          genre: '',
          platform: '',
          publisher: '',
          releaseDate: '',
        },
        url: 'https://classicgamedb.herokuapp.com/games/' + this.$route.params.id,
      };
    },

    methods: {

      getGame() {

        axios.get(this.url)
          .then((response) => {
            this.selectedGame = response.data;
          })
          .catch((error: any) => {
            if (error.response) {
              if (error.response.status === 500) {
                this.$router.push('../404');
              }
              console.log(error.response);
            }
          });
      },
    },

    mounted() {
      this.getGame();
    },

  });
</script>

<style scoped>
  .card {
    margin-bottom: 15px;
  }

  .game {
    margin-bottom: 40px;
  }

  .row {
    margin-bottom: 10px;
  }

  .btn {
    margin-bottom: 10px;
  }
</style>