<template>
    <div class="platformadd">
        <form @submit.prevent="handleSubmit">

            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="image">Image</label>
                        <base64-upload imageSrc="http://www.markweb.in/primehouseware/images/noimage.png" @change="onChangeImage"></base64-upload>
                        {{ errors.first('image') }}
                    </div>
                </div>
                <div class="col-8">
                    <div class="form-group">
                        <label for="title">Abbreviation</label>
                        <input v-validate="'required|min:2'" type="text" name="abb" id="abb" class="form-control"
                            v-model="platform.abb" />
                        {{ errors.first('abb') }}
                    </div>

                    <div class="form-group">
                        <label for="name">Name</label>
                        <input v-validate="'required|min:3'" name="name" type="text" id="name" class="form-control"
                            v-model="platform.name" />
                        {{ errors.first('name') }}
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <input v-validate="'required|min:3'" name="description" type="text" id="description" class="form-control"
                            v-model="platform.description" />
                        {{ errors.first('description') }}
                    </div>

                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary btn-large">Save</button>
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
                platform: {
                    image: '',
                    abb: '',
                    name: '',
                    description: ''
                }
            }
        },

        methods: {

            overview(id) {
                this.$router.push({
                    name: 'platforms'
                })
            },

            onChangeImage(file) {
                this.platform.image = file.base64
            },

            handleSubmit() {

                this.$validator.validateAll().then((result) => {

                    // Check if validator has a result
                    if (!result) {
                        return;
                    }

                    // Post the game
                    axios.post('https://classicgamedb.herokuapp.com/platforms', {
                            image: this.platform.image,
                            name: this.platform.name,
                            abb: this.platform.abb,
                            description: this.platform.description

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
        }
    }
</script>