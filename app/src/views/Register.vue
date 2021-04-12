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
                        v-model="register.fullname"
                        required
                    > </v-text-field>
                    <v-text-field
                        label="Email"
                        type="email"
                        v-model="register.email"
                        required
                    > </v-text-field>
                    <v-text-field
                        label="Telefon nummer"
                        type="text"
                        v-model="register.phone"
                        required
                    > </v-text-field>
                    <div class="row ma-0">
                        <v-text-field
                            label="Password"
                            type="password"
                            v-model="register.password"
                            required
                            class="pr-2"
                        > </v-text-field>
                        <v-text-field
                            label="Gentag password"
                            type="password"
                            v-model="register.confirmPassword"
                            required
                        > </v-text-field>
                    </div>
                    <div class="row ma-0">
                        <v-text-field
                            label="Vej"
                            type="text"
                            v-model="register.address.street"
                            class="pr-2"
                        > </v-text-field>
                        <v-text-field
                            label="Husnummer"
                            type="text"
                            v-model="register.address.number"
                        > </v-text-field>
                    </div>
                    <div class="row ma-0">
                        <v-text-field
                            label="Postnummer"
                            type="number"
                            v-model="register.address.zip"
                            class="pr-2"
                        > </v-text-field>
                        <v-text-field
                            label="By"
                            type="text"
                            v-model="register.address.city"
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
import { RegisterBody } from '../Services/AuthService'

export default {
    data() {
        return {
            loading: false,
            error: null,
            register: {
                email: null,
                fullname: null,
                password: null,
                confirmPassword: null,
                phone: null,
                address: {
                    street: null,
                    number: null,
                    zip: null,
                    city: null
                }
            },
            meta: this.$route.meta,
        }
    },
    methods: {
        SignUp: function() {
            this.loading = true;

            if(!this.CheckForNullInObject(this.register)) {
                this.error = "Et eller flere felter er tomme";
                this.loading = false;
                return;
            }
            // Validere om passwords matcher
            if(this.register.password != this.register.confirmPassword) {
                this.error = "Passwords matcher ikke";
                this.loading = false;
                return;
            }

            // Send post request om at oprette brugeren
            RegisterBody({ user: this.register })
                .then((res) => {
                    // Success respons
                    this.$cookies.set('jwt', res.jwt);
                    this.$cookies.set('isAdmin', res.isAdmin);
                    this.$router.push('/dashboard');
                }).catch(err => {
                    // Fejled respons
                    this.error = err.response.data.message;
                }
            );
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

