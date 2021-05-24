<template>
<!----------------- Checks if the user is loggedin in the session------------------> 
  <v-container :onload="isUserLoggedIn()">
        <div class="col-md-5 col-sm-12 mx-auto">
            <v-card
                :loading="loading"
                class="pa-5"
                elevation="3"
            >
<!----------------- Register Form and validation with rules------------------> 
                <v-form class="col-12 pa-0">
                    <v-card-title class="px-0 pt-0">{{ meta.title }}</v-card-title>
                    <v-card-subtitle class="px-0">
                        Hos NoPower Webshoppen tilbyder vi alle og en hver, at være medlem hos os. <br>
                        Det er gratis at være medlem, og som en bonus, kan du benytte dig af alle medlems fordelene. <br><br>
                        <v-btn 
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            color="primary"
                            outlined
                            x-small
                            target="_blank"
                        >
                            Læs mere
                        </v-btn>
                    </v-card-subtitle>

                    <v-divider class="pb-5"></v-divider>

                    <div v-if="this.error">
                        <h2 class="error-text"> {{ this.error }} </h2>
                    </div>
                    <v-text-field
                        label="Fulde navn"
                        type="text"
                        v-model="Register.Fullname"
                        :rules="nameRules"
                        required
                    > </v-text-field>
                    <v-text-field
                        label="Email"
                        type="email"
                        v-model="Register.Email"
                        :rules="emailRules"
                        required
                    > </v-text-field>
                    <v-text-field
                        label="Telefon nummer"
                        type="text"
                        v-model="Register.Phone"
                        required
                    > </v-text-field>
                    <div class="row ma-0">
                        <v-text-field
                            label="Password"
                            type="password"
                            v-model="Register.Password"
                            required
                            class="pr-2"
                        > </v-text-field>
                        <v-text-field
                            label="Gentag password"
                            type="password"
                            v-model="Register.ConfirmPassword"
                            required
                        > </v-text-field>
                    </div>
                    <div class="row ma-0">
                        <v-text-field
                            label="Vej"
                            type="text"
                            v-model="Register.Address.Street"
                            class="pr-2"
                        > </v-text-field>
                        <v-text-field
                            label="Husnummer"
                            type="text"
                            v-model="Register.Address.Number"
                        > </v-text-field>
                    </div>
                    <div class="row ma-0">
                        <v-text-field
                            label="Postnummer"
                            type="number"
                            v-model="Register.Address.Zip"
                            class="pr-2"
                        > </v-text-field>
                        <v-text-field
                            label="By"
                            type="text"
                            v-model="Register.Address.City"
                        > </v-text-field>
                    </div>
                    <v-btn
                        block
                        color="primary"
                        v-on:click="SignUp()"
                    >
                        Opret
                    </v-btn>
                </v-form>

                <v-card-subtitle class="px-0 pb-0">
                    <v-divider class="pb-5 mt-5"></v-divider>
                    
                    Er du allerede medlem? <br>
                    <v-btn 
                        to="/login"
                        color="primary"
                        outlined
                        x-small
                        class="mt-2"
                    >
                        Log ind
                    </v-btn>
                </v-card-subtitle>
            </v-card>
        </div>
  </v-container>
</template>

<style scoped>
    .error-text {
        color: red;
    }

    .row {
        /* margin: 0 !important; */
    }
</style>

<script>
import { RegisterBody } from '../Services/AuthApi.js';
import { CurrentSession } from '@/Services/GlobalVariables';

export default {
    data() {
//----------------- Data on Register------------------
        return {
            loading: false,
            error: null,
            Register: {
                Email: null,
                Fullname: null,
                Password: null,
                ConfirmPassword: null,
                Phone: null,
                Address: {
                    Street: null,
                    Number: null,
                    Zip: null,
                    City: null
                }
            },
            meta: this.$route.meta,

            nameRules: [
                v => !!v || "Name is required",
                v => (v && v.length <= 10) || "Name must be less than 10 characters"
                ],
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
        }
    },
    methods: {
        isUserLoggedIn: function() {
// ----------If user is already logged in, redirect to dashboard----------------------
            if( CurrentSession.isLoggedIn ) this.$router.push('/dashboard'); 
        },
//----------------- Signup validation check for empty texfields and rules ------------------
        SignUp: function() {
            this.loading = true;

            if(!this.CheckForNullInObject(this.Register)) {
                this.error = "Et eller flere felter er tomme";
                this.loading = false;
                return;
            }
            // Validates if passwords match
            if(this.Register.Password != this.Register.ConfirmPassword) {
                this.error = "Passwords matcher ikke";
                this.loading = false;
                return;
            }

            // Sends a reuqest for Register the user and logs in and goes to dashboard
            RegisterBody({ User: this.Register })
            .then((res) => {
                // Success respons
                CurrentSession.isLoggedIn = res.Authorized;
                CurrentSession.isAdmin = res.isAdmin;
                this.$cookies.set('jwt', res.Jwt, 2592000);
                this.$router.push('/dashboard');
            }).catch( err => {
                // fail respons
                
                this.error = err.response.data.Message;
            });
            this.loading = false;
        },
        //----------------- Checks nullobjects------------------
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

