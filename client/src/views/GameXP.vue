<template>
    <div class="gamexp">
        <form @submit.prevent="handleSubmit">

            <div class="row">
                <div class="col-12">

                    <div class="form-group">
                        <label for="content">Message</label>
                        <textarea v-validate="'required|min:12'" name="content" type="text" id="content" class="form-control"
                            v-model="xp.content" />
                        {{ errors.first('content') }}
                    </div>

                    <div class="form-group">
                        <label for="rating">Rating</label>
                        <input v-validate="'required|numeric|max_value:5|min_value:1'" name="rating" type="number" id="rating" class="form-control"
                            v-model="xp.rating" />
                        {{ errors.first('rating') }}
                    </div>

                    <button type="submit" class="btn btn-primary">Save</button>

                </div>
            </div>

        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        props: ['token'],

        data() {
            return {
                xp: {
                    content: '',
                    rating: ''
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

            handleSubmit() {

                this.$validator.validateAll().then((result) => {

                    // Check if validator has a result
                    if (!result) {
                        return;
                    }

                    // Post the game
                    axios.post('http://localhost:8080/games/' + this.$route.params.id + '/experience', {
                            content: this.xp.content,
                            rating: this.xp.rating

                        }, {
                            headers: {
                                Authorization: this.token
                            }
                        })
                        .then(function (response) {
                            this.overview(this.$route.params.id)
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
    }
</script>