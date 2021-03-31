<template>
  <v-container>
        <div class="col-md-5 col-sm-12 mx-auto">
            <v-card
                class=""
            >
            <v-form class="col-11">
                <h1> Registre en bruger </h1>
                <div v-if="this.error">
                    <h2 class="error-text"> {{ this.error }} </h2>
                </div>
                <v-text-field
                    label="Fulde navn"
                    type="text"
                    v-model="register.fullname"
                > </v-text-field>
                <v-text-field
                    label="Email"
                    type="email"
                    v-model="register.email"
                > </v-text-field>
                <v-text-field
                    label="Telefon nummer"
                    type="text"
                    v-model="register.phone"
                > </v-text-field>
                <div class="row">
                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="register.password"
                    > </v-text-field>
                    <v-text-field
                        label="Gentag password"
                        type="password"
                        v-model="register.confirmPassword"
                    > </v-text-field>
                </div>
                <div class="row">
                    <v-text-field
                        label="Vej"
                        type="text"
                        v-model="register.address.street"
                    > </v-text-field>
                    <v-text-field
                        label="Husnummer"
                        type="text"
                        v-model="register.address.number"
                    > </v-text-field>
                </div>
                <div class="row">
                    <v-text-field
                        label="Postnummer"
                        type="number"
                        v-model="register.address.zip"
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
                > Opret </v-btn>
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
export default {
    data() {
        return {
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
            }
        }
    },
    methods: {
        SignUp: function() {
            if(this.register.password != this.register.confirmPassword) {
                this.error = "Passwords matcher ikke";
                return;
            }
            console.log({ user: this.register });
            this.axios.post('http://server.topper144p.com:3000/register', { user: this.register })
            .then((res) => {
                console.log(res);
            }).catch((res) => {
                console.log(res);
            });
        }
    }
}
</script>

<style>

</style>