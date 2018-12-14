<template>
  <div class="gameoverview text-left">

    <div class="row">
      <div class="col-10">
        <h2>{{ selectedGame.title }}</h2>
      </div>
      <div class="col-2">
        <router-link tag="button" :to="'/games/edit/' + this.$route.params.id" type="button" class="btn btn-primary float-right">Edit Game</router-link>
      </div>
    </div>

    <div class="row">
      
      <div class="col-4">
        <img class="img-fluid float-left" style="width:100%" :src="'data:image/png;base64,' + selectedGame.cover" />
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

    <div class="row">
      <div class="col-12">
        <router-link tag="button" :to="'/games/xp/' + this.$route.params.id" type="button" class="btn btn-primary float-right">Add
          your XP!</router-link>
      </div>
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
  import axios from 'axios'

  export default Vue.extend({

    name: 'gameoverview',

    watch: {
      '$route'(to, from) {
        console.log(to.params.id)
      }
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
          releaseDate: ''
        },
        url: 'https://classicgamedb.herokuapp.com/games/' + this.$route.params.id
      }
    },

    mounted() {

      axios.get(this.url)
        .then(response => {
          this.selectedGame = response.data
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response);
          }
        })

    },

  })
</script>

<style scoped>
  .card {
    margin-bottom: 15px;
  }

  .row {
    margin-bottom: 10px;
  }

  .btn {
    margin-bottom: 10px;
  }
</style>