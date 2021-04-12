<template>
    <v-container>
        <div class="col-md-5 col-sm-12 mx-auto">
            <v-card
                class="pa-5"
                elevation="3"
            >
                <v-form class="col-12 pa-0"> 
                    <h2 class="text-center">Profile Page {{ fullname }}</h2>
                    
                    <v-text-field
                        type="text"
                        v-model="UpdateProfile.fullname"
                        :placeholder="fullname"
                        
                    ></v-text-field>
                    <v-text-field
                        
                        type="email"
                        v-model="UpdateProfile.email"
                        :placeholder="email"
                    > </v-text-field>
                    
                    <v-text-field
                        
                        type="text"
                        v-model="UpdateProfile.phone"
                        :placeholder="phone"
                    > </v-text-field>
                        
                    <v-text-field
                        label="New password?"
                        type="password"
                        class="pr-2"
                    > </v-text-field>

                    <v-text-field
                        label="Reapeat password"
                        type="password"
                        class="pr-2"
                    > </v-text-field>

                    <div class="row ma-0">
                        <v-text-field
                            
                            type="text"
                            v-model="UpdateProfile.street"
                            class="pr-2"
                            :placeholder="address.street"
                        > </v-text-field>

                        <v-text-field
                            
                            type="text"
                            v-model="UpdateProfile.number"
                            :placeholder="address.number"
                        > </v-text-field>
                    </div>

                    <div class="row ma-0">
                        <v-text-field
                            
                            type="number"
                            v-model="UpdateProfile.zip"
                            class="pr-2"
                            :placeholder="'' + address.zip"
                        > </v-text-field>

                        <v-text-field
                            
                            type="text"
                            v-model="UpdateProfile.city"
                            :placeholder="address.city"
                        > </v-text-field>
                    </div>

                    <v-btn
                        block
                        color="primary"
                        v-on:click="onUpdateProfile()"
                    >
                        Update userinfo
                    </v-btn>
                </v-form>
            </v-card>
        </div>
        
    </v-container>
</template>

<script>
import { AuthMixin } from '../mixins/Auth.js';
import { GetAuthBod, UpdateBody } from '../Services/AuthService';

export default{
    
    data() {
        return {
            email: null,
            fullname: null,
            password: null,
            phone: null,
            address: {
                street: null,
                number: null,
                zip: null,
                city: null
            },

            UpdateProfile:{
            email: "",
            fullname: "",
            password: "",
            phone: "",
            address: {
                street: "",
                number: "",
                zip: "",
                city: ""
            } 
            }
        };
    },
    mounted() {
        GetAuthBody(this.$cookies.get('jwt'))
            .then(res => {
                this.fullname = res.user.fullname;
                this.email = res.user.email;
                this.phone = res.user.phone;
                this.address = res.user.address;
            }).catch(() => {
                this.$router.push('/*');
            });
    },
    

    methods: {
        onUpdateProfile: function() {
            // Validere om passwords matcher
                // if(this.register.password != this.register.confirmPassword) {
                //     this.error = "Passwords matcher ikke";
                //     this.loading = false;
                //     return;
                // }

            // Send post request om at update brugeren
            UpdateBody({user: this.UpdateProfile}, this.$cookies.get('jwt'))
                .then((res) => {
                    this.$router.push('/dashboard');
                }).catch(err => {
                    // Fejled respons
                    this.$router.push('/*');
                });
            
        },
        
    }
}

</script>
<style>
</style>