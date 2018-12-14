<template>
    <div class="login">

        <h3>Login</h3>

        <form @submit.prevent="login">

            <div class="form-group">
                <label for="username">Username</label>
                <input v-validate="'required'" type="text" name="username" id="username" class="form-control" v-model="user.username" />
                {{ errors.first('username') }}
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input v-validate="'required'" type="password" name="password" id="password" class="form-control"
                    v-model="user.password" />
                {{ errors.first('password') }}
            </div>

            <div class="row">

                <div class="col-6">
                    <button type="submit" class="w-100 btn btn-primary">Log in</button>
                </div>

                <div class="col-6">
                    <router-link to="register" tag="button" type="submit" class="w-100 btn btn-secondary">Register</router-link>
                </div>

            </div>

        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import izitoast from 'izitoast';

    export default {

        props: ['token', 'isHomePage'],

        data() {
            return {
                user: {
                    username: '',
                    password: '',
                },
            }
        },

        methods: {

            login() {

                const self = this

                this.$validator.validateAll().then((result) => {

                    // Check if validator has a result
                    if (!result) {
                        return;
                    }

                    // Login
                    axios.post('https://classicgamedb.herokuapp.com/users/login', {
                            username: this.user.username,
                            password: this.user.password,
                        })
                        .then(function (response) {
                            var newtoken = response.data.message
                            this.$cookie.set('auth', newtoken, 1);
                            if (this.isHomePage) {
                                this.$router.go(0);
                            } else {
                                this.$router.go(-1);
                            }
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                            if (error.response.status == 401) {
                                izitoast.show({
                                    title: ' ',
                                    message: 'Wrong Credentials',
                                    theme: 'dark',
                                    icon: 'fas fa-exclamation-circle',
                                    position: 'topCenter',
                                    backgroundColor: '#dc3545',
                                    progressBar: false,
                                    timeout: 2000,
                                });
                            } else
                            if (error.response.status == 404) {
                                izitoast.show({
                                    title: ' ',
                                    message: 'Username does not exist, consider creating an account',
                                    theme: 'dark',
                                    icon: 'fas fa-exclamation-circle',
                                    position: 'topCenter',
                                    backgroundColor: '#dc3545',
                                    progressBar: false,
                                    timeout: 2000,
                                });
                            } else {
                                izitoast.show({
                                    title: ' ',
                                    message: 'Someting went wrong on our end',
                                    theme: 'dark',
                                    icon: 'fas fa-exclamation-circle',
                                    position: 'topCenter',
                                    backgroundColor: '#dc3545',
                                    progressBar: false,
                                    timeout: 2000,
                                });
                            }
                        })

                }).catch(() => {
                    console.log(":(")
                });

            }

        }

    }
</script>