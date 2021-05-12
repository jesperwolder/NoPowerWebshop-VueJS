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

                    <div 
                        v-for="( err, index ) in error"
                        :key="err"
                    >
                        <v-alert
                            text
                            dismissible
                            border="bottom"
                            color="red"
                            type="error"
                            transition="scroll-x-reverse-transition"
                            :id="`error-` + index"
                            :onload="RemoveAlert(index)"
                        >
                            {{ err }}
                        </v-alert>
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

<script>
import { LoginBody } from '../Services/AuthApi';
import { CurrentSession } from '@/Services/GlobalVariables';

export default {
    data() {
        return {
            loading: false,
            error: [],
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
                User: {
                    Email: this.login.Email.toLowerCase(), 
                    Password: this.login.Password
                }
            })
                .then((res) => {
                    CurrentSession.isLoggedIn = res.Authorized;
                    CurrentSession.isAdmin = res.isAdmin;
                    this.$cookies.set('jwt', res.Jwt);
                    this.$router.push('/dashboard');
                        
                }).catch(err => {
                    this.error.push(err.response.data.Message);
                });
            
            this.loading = false;
        },

        RemoveAlert: function( id ) {
            setTimeout( () => {
                const err = document.getElementById( 'error-' + id );
                if( err != null|undefined ) err.remove();
            }, 7069 );
        }
    }
}
</script>

<style>

</style>