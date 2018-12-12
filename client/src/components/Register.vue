<template>
    <div class="register">
        <form @submit.prevent="register">

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
    import axios from 'axios'

    export default {

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

            register() {

                const self = this

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
                        .then(function (response) {
                            this.$router.push('../');
                        }.bind(this))
                        .catch(function (error) {
                            if (error.response.status == 422) {
                                self.$toast.show(' ',
                                    'This username is already taken, is someone trying to impersonate you? :o',
                                    self.notificationSystem.error);
                            }
                            console.log(error);
                        })

                }).catch(() => {
                    console.log(":(")
                });



            }

        }

    }
</script>