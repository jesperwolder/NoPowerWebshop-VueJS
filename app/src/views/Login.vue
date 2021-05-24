<template>
<!----------------- Checks if the user is loggedin in the session------------------> 
    <v-container :onload="isUserLoggedIn()">
        <div class="col-md-5 col-sm-12 mx-auto">
            <v-card
                :loading="loading"
                class="pa-5"
                elevation="3"
            >
            <!----------------- Login page------------------> 
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
<!----------------- Alert if the user login is wrong, has a timer------------------> 
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
 <!----------------- Login fomular------------------>         
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
<!----------------- Event login------------------> 
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
//<!----------------- Data for error, loading, meta currentsession and login details------------------> 
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
        isUserLoggedIn: function() {
// ------------If user is already logged in, redirect to dashboard----------------------
            if( CurrentSession.isLoggedIn ) this.$router.push('/dashboard'); 
        },
// ------------Validates the users input puts the email in lower case ----------------------
        UserLogin: function() {
            this.loading = true;

            LoginBody({
                User: {
                    Email: this.login.Email.toLowerCase(), 
                    Password: this.login.Password
                }
            })
// ------------Sets the jwt for being logged in and checks isAdmin and sets a automatic log out on 25 days estimated----------------------
                .then((res) => {
                    CurrentSession.isLoggedIn = res.Authorized;
                    CurrentSession.isAdmin = res.isAdmin;
                    this.$cookies.set('jwt', res.Jwt, 2592000);
                    this.$router.push('/dashboard');
                        
                }).catch(err => {
                    this.error.push(err.response.data.Message);
                });
            
            this.loading = false;
        },
// ------------Error display for wrong login details, has a timer on 7 sec----------------------
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