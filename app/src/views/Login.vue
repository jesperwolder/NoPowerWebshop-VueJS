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
                        v-model="login.email"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="login.password"
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
import { LoginBody } from '../Services/AuthService';

export default {
    data() {
        return {
            loading: false,
            error: null,
            login: {
                email: "",
                password: "",
            },
            meta: this.$route.meta,
        }
    },
    methods: {
        UserLogin: function() {
            this.loading = true;

            LoginBody({
                email: this.login.email, 
                password: this.login.password
            }).then((res) =>{
                    this.$cookies.set('jwt', res.data.jwt);
                    this.$cookies.set('isAdmin', res.data.isAdmin);
                    this.$router.push('/profile');
                    location.reload(); // Forces refresh (Bad fix, but it works xD)
                }).catch(err => {
                    this.error = err.response.data.message;
                });
            
            this.loading = false;
        },
        
        CheckForNullInObject: function(obj) {
            for (let key in obj) {
                if(obj[key] == null || obj[key] == "") return false;
            }
            return true;
        }
    }
}
</script>

<style>

</style>