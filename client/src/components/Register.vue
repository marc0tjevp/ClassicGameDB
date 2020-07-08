<template>
    <div class="register">
        <form @submit.prevent="register">

            <h3 class="text-center">Register</h3>

            <div class="form-group">
                <label for="username">Username</label>
                <input v-validate="'required'" name="username" type="text" id="username" class="form-control" v-model="user.username" />
                {{ errors.first('username') }}
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input v-validate="'required|min:6'" name="password" type="password" id="password" class="form-control"
                    v-model="user.password" />
                {{ errors.first('password') }}
            </div>

            <button type="submit" class="btn btn-primary">Register</button>

        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import izitoast from 'izitoast';

    export default {

        data() {
            return {
                user: {
                    username: '',
                    password: '',
                },
            };
        },

        methods: {

            register() {

                const self = this;

                this.$validator.validateAll().then((result) => {

                    // Check if validator has a result
                    if (!result) {
                        return;
                    }

                    // Register
                    axios.post('http://localhost:8080/users/register', {
                            username: this.user.username,
                            password: this.user.password,
                        })
                        .then(function(response) {
                            this.$router.push('games');
                        }.bind(this))
                        .catch((error) => {
                            if (error.response.status === 422) {
                                izitoast.show({
                                    title: ' ',
                                    message: 'This username is already taken, is someone trying to impersonate you? :o',
                                    theme: 'dark',
                                    icon: 'fas fa-exclamation-circle',
                                    position: 'topCenter',
                                    backgroundColor: '#dc3545',
                                    progressBar: false,
                                    timeout: 2000,
                                });
                                console.log(error);
                            }
                        });

                }).catch(() => {
                    console.log(':(');
                });

            },
        },
    };
</script>