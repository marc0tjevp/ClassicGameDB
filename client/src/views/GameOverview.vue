<template>
  <div class="gameoverview text-left">

    <div class="row">
      <div class="col-10">
        <h2>{{ selectedGame.title }}</h2>
      </div>
      <div class="col-2">
        <router-link tag="button" :to="'/games/edit/' + this.$route.params.id" type="button" class="btn btn-primary float-right">Edit</router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <img class="img-fluid float-left" :src="'data:image/png;base64,' + selectedGame.cover" />
      </div>

      <div class="col-8">
        <p>{{ selectedGame.description }}</p>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <dl>
          <dt>Genre</dt>
          <dd>{{ selectedGame.genre }}</dd>

          <dt>Publisher</dt>
          <dd>{{ selectedGame.publisher }}</dd>

          <dt>Release Date</dt>
          <dd>{{ selectedGame.releaseDate }}</dd>

        </dl>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div v-for="(data, index) in selectedGame.experiences" :key="index" class="card">
          <div class="card-body">
            <blockquote>
              <p>{{ data.content }}</p>
              <p>Rating: {{ data.rating }}</p>
              <footer class="blockquote-footer">By {{ data.user }} on <cite>{{ data.date }}</cite></footer>
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
        url: 'http://localhost:8080/games/' + this.$route.params.id
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
</style>