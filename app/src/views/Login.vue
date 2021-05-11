<template>
    <v-container>
        <div class="col-md-5 col-sm-12 mx-auto">
            <v-card
                :loading="loading"
                class="pa-5"
                elevation="3"
            >
                <v-form class="col-12 pa-0">
                    <v-card-title class="px-0 pt-0">{{ meta.title }}</v-card-title>
                    <v-card-subtitle class="px-0">
                        Har du ikke en bruger, kan du oprette dig som medlem af NoPower. <br><br>
                        <v-btn 
                            to="/register"
                            color="primary"
                            outlined
                            x-small
                        >
                            Opret bruger
                        </v-btn>
                    </v-card-subtitle>

                    <v-divider class="pb-5"></v-divider>

                    <div v-if="this.error">
                        <h2 class="error-text"> {{ this.error }} </h2>
                    </div>
                
                    <v-text-field
                        label="Email"
                        type="email"
                        v-model="login.Email"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="login.Password"
                        required
                    ></v-text-field>

                    <v-btn
                        block
                        color="primary"
                        v-on:click="UserLogin()"
                    > login </v-btn>
                </v-form>
            </v-card>
        </div>
    </v-container>
</template>

<style>
    .error-text {
        color: red;
    }
</style>

<script>
import { LoginBody } from '../Services/AuthApi';
import { CurrentSession } from '@/Services/GlobalVariables';

export default {
    data() {
        return {
            loading: false,
            error: null,
            login: {
                Email: "",
                Password: "",
            },
            meta: this.$route.meta,
            CS: CurrentSession
        }
    },
    methods: {
        UserLogin: function() {
            this.loading = true;

            LoginBody({
                User:{
                    Email: this.login.Email.toLowerCase(), 
                    Password: this.login.Password
                }
            })
                .then((res) => {
                    CurrentSession.isLoggedIn = res.Authorized;
                    CurrentSession.isAdmin = res.isAdmin;
                    this.$cookies.set('jwt', res.Jwt);
                    this.$router.push('/profile');
                        
                }).catch(err => {
                    this.error = err.response.message;
                });
            
            this.loading = false;
        }
    }
}
</script>

<style>

</style>