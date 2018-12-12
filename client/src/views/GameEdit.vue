<template>
    <div class="gameedit">

        <form @submit.prevent="handleSubmit">

            <div v-if="this.token < 1" class="row">
                <div class="col-12">
                    <div class="alert alert-info" role="alert">
                        Hey there! You need to <router-link to="/login">login</router-link> to add and edit games!
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-4">
                    <div class="form-group">
                        <label for="cover">Cover</label>
                        <img class="img-fluid" :src="'data:image/png;base64,' + game.cover" />
                    </div>
                </div>
                <div class="col-8">

                    <div class="form-group d-none">
                        <label for="id">ID</label>
                        <input type="text" id="id" class="form-control" v-model="game._id" />
                    </div>

                    <div class="form-group">
                        <label for="title">Title</label>
                        <input :disabled="this.token < 1" v-validate="'required|min:3'" name="title" type="text" id="title"
                            class="form-control" v-model="game.title" />
                        {{ errors.first('title') }}
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <input :disabled="this.token < 1" v-validate="'required|min:3'" name="description" type="text"
                            id="description" class="form-control" v-model="game.description" />
                        {{ errors.first('description') }}
                    </div>

                    <div class="form-group d-none">
                        <label for="platform">Platform</label>
                        <input :disabled="this.token < 1" type="text" id="platform" class="form-control" v-model="game.platform" />
                    </div>

                    <div class="form-group">
                        <label for="genre">Genre</label>
                        <input :disabled="this.token < 1" v-validate="'required|min:3'" name="genre" type="text" id="genre"
                            class="form-control" v-model="game.genre" />
                        {{ errors.first('genre') }}
                    </div>

                </div>
            </div>

            <div class="row">
                <div class="col-12">

                    <div class="form-group">
                        <label for="publisher">Publisher</label>
                        <input :disabled="this.token < 1" v-validate="'required|min:3'" name="publisher" type="text" id="publisher"
                            class="form-control" v-model="game.publisher" />
                        {{ errors.first('publisher') }}
                    </div>

                    <div class="form-group">
                        <label for="releaseDate">Release Date</label>
                        <input :disabled="this.token < 1" v-validate="'required'" name="releaseDate" type="text" id="releaseDate"
                            class="form-control" v-model="game.releaseDate" />
                        {{ errors.first('releaseDate') }}
                    </div>
                    <button :disabled="this.token < 1" type="submit" class="btn btn-primary">Save</button>
                </div>
            </div>

            <div v-if="this.token" style="margin-top: 20px;" class="row">
                <div class="col-12">
                    <p>Came here to change the Platform? Create a new game entry instead!</p>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import Base64Upload from 'vue-base64-upload'

    export default {

        components: {
            Base64Upload
        },

        props: ['token'],

        data() {
            return {
                game: {
                    _id: '',
                    cover: '',
                    title: '',
                    description: '',
                    platform: '',
                    genre: '',
                    publisher: '',
                    releaseDate: ''
                },
                url: 'https://classicgamedb.herokuapp.com/games/' + this.$route.params.id
            }
        },

        methods: {

            loadGame() {
                axios.get(this.url)
                    .then(response => {
                        this.game = response.data
                        console.log(response.data)
                    })
                    .catch(function (error) {
                        if (error.response) {
                            console.log(error.response);
                        }
                    })
            },

            handleSubmit() {

                const self = this

                this.$validator.validateAll().then((result) => {

                    // Check if validator has a result
                    if (!result) {
                        return;
                    }

                    // Post the game
                    axios.put('https://classicgamedb.herokuapp.com/games', {
                            id: this.game._id,
                            title: this.game.title,
                            cover: this.game.cover,
                            description: this.game.description,
                            genre: this.game.genre,
                            platform: this.game.platform,
                            publisher: this.game.publisher,
                            releaseDate: this.game.releaseDate
                        }, {
                            headers: {
                                Authorization: this.token
                            }
                        })
                        .then(function (response) {
                            self.$router.push('../');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }).catch(() => {
                    console.log(":(")
                });
            }
        },

        mounted() {
            this.loadGame()
        },

    }
</script>