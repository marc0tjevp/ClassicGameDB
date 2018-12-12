<template>
    <div class="login">

        <h3 class="text-center">Login</h3>

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

    export default {

        props: ['token'],

        data() {
            return {
                user: {
                    username: '',
                    password: '',
                },
                notificationSystem: {
                        success: {
                            theme: 'dark',
                            icon: 'fas fa-check-circle',
                            position: 'topCenter',
                            backgroundColor: '#28a745',
                            progressBar: false,
                            timeout: 2000,
                        },
                        error: {
                            theme: 'dark',
                            icon: 'fas fa-exclamation-circle',
                            position: 'topCenter',
                            backgroundColor: '#dc3545',
                            progressBar: false,
                            timeout: 2000,
                        }
                }
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
                            self.$toast.show(' ',
                                    'Logged in as ' + this.user.username,
                                    self.notificationSystem.success);
                            this.$router.go(0);
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                            if (error.response.status == 401) {
                                self.$toast.show(' ',
                                    'Wrong Credentials',
                                    self.notificationSystem.error);
                            } else
                            if (error.response.status == 404) {
                                self.$toast.show(' ',
                                    'Username does not exist, consider creating an account',
                                    self.notificationSystem.error);
                            } else {
                                self.$toast.show(' ',
                                    'Something went wrong on our end :(',
                                    self.notificationSystem.error);
                            }
                        })

                }).catch(() => {
                    console.log(":(")
                });

            }

        }

    }
</script>