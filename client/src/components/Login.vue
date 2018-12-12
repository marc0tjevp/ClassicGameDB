<template>
    <div class="login">
        <form @submit.prevent="login">

            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" name="username" id="username" class="form-control" v-model="user.username" />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-control" v-model="user.password" />
            </div>

            <button type="submit" class="btn btn-primary">Log in</button>

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
                }
            }
        },

        methods: {

            login() {

                axios.post('http://localhost:8080/users/login', {
                        username: this.user.username,
                        password: this.user.password,
                    })
                    .then(function (response) {
                        var token = response.data.message
                        document.cookie ='Auth='+token+';'
                        console.log(document.cookie);
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    })

            }

        }

    }
</script>