<template>
    <div class="gameadd">
        <form @submit.prevent="handleSubmit">

            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="cover">Cover</label>
                        <base64-upload imageSrc="http://www.markweb.in/primehouseware/images/noimage.png" @change="onChangeImage"></base64-upload>
                        {{ errors.first('cover') }}
                    </div>
                </div>
                <div class="col-8">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input v-validate="'required|min:3'" type="text" name="title" id="title" class="form-control"
                            v-model="game.title" />
                        {{ errors.first('title') }}
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <input v-validate="'required|min:3'" name="description" type="text" id="description" class="form-control"
                            v-model="game.description" />
                        {{ errors.first('description') }}
                    </div>

                    <div class="form-group">
                        <label for="platform">Platform</label>
                        <select v-validate="'required'" name="platform" class="form-control" id="platform" v-model="game.platform">
                            <option v-for="platform in platforms" v-bind:key="platform.abb" v-bind:value="platform.abb">
                                {{ platform.name }} - {{ platform.description }}
                            </option>
                        </select>
                        {{ errors.first('platform') }}
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="form-group">
                        <label for="genre">Genre</label>
                        <input v-validate="'required|min:3'" name="genre" type="text" id="genre" class="form-control"
                            v-model="game.genre" />
                        {{ errors.first('genre') }}
                    </div>

                    <div class="form-group">
                        <label for="publisher">Publisher</label>
                        <input v-validate="'required|min:2'" name="publisher" type="text" id="publisher" class="form-control"
                            v-model="game.publisher" />
                        {{ errors.first('publisher') }}
                    </div>

                    <div class="form-group">
                        <label for="releaseDate">Release Date</label>
                        <input v-validate="'required'" name="releaseDate" type="date" id="releaseDate" class="form-control"
                            v-model="game.releaseDate" />
                        {{ errors.first('releaseDate') }}
                    </div>
                    <button type="submit" style='margin-top: 15px;' class="btn w-100 btn-primary">Save</button>
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
                platforms: [],
                game: {
                    cover: '',
                    title: '',
                    description: '',
                    platform: '',
                    genre: '',
                    publisher: '',
                    releaseDate: ''
                }
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

            onChangeImage(file) {
                this.game.cover = file.base64
            },

            loadPlatforms() {
                axios.get('https://classicgamedb.herokuapp.com/platforms')
                    .then(response => {
                        this.platforms = response.data
                        console.log(response.data)
                    })
                    .catch(function (error) {
                        if (error.response) {
                            console.log(error.response);
                        }
                    })
            },

            handleSubmit() {

                this.$validator.validateAll().then((result) => {

                    // Check if validator has a result
                    if (!result) {
                        return;
                    }

                    // Post the game
                    axios.post('https://classicgamedb.herokuapp.com/games', {
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
                            this.overview(response.data._id)
                            console.log(response);
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        })
                }).catch(() => {
                    console.log(":(")
                });

            }
        },

        mounted() {
            if (!this.token) {
                this.$router.push({
                    name: 'login',
                })
            }
            this.loadPlatforms()
        }
    }
</script>