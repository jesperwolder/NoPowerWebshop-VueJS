<template>
    <v-container>
        <div class="col-md-5 col-sm-12 mx-auto">
            <v-card
                class="pa-5"
                elevation="3"
            >
 <!-- ------------Profile information and changes if there is written input on click event---------------------- -->
                <v-form class="col-12 pa-0"> 
                    <h2 class="text-center">Profile Page {{ Fullname }}</h2>
                    
                    <v-text-field
                        type="text"
                        v-model="UpdateProfile.Fullname"
                        :placeholder="Fullname"
                        
                    ></v-text-field>
                    <v-text-field
                        
                        type="email"
                        v-model="UpdateProfile.Email"
                        :placeholder="Email"
                    > </v-text-field>
                    
                    <v-text-field
                        
                        type="text"
                        v-model="UpdateProfile.Phone"
                        :placeholder="Phone"
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
                            v-model="UpdateProfile.Street"
                            class="pr-2"
                            :placeholder="Address.Street"
                        > </v-text-field>

                        <v-text-field
                            
                            type="text"
                            v-model="UpdateProfile.Number"
                            :placeholder="Address.Number"
                        > </v-text-field>
                    </div>

                    <div class="row ma-0">
                        <v-text-field
                            
                            type="number"
                            v-model="UpdateProfile.Zip"
                            class="pr-2"
                            :placeholder="Address.Zip.toString()"
                        > </v-text-field>

                        <v-text-field
                            
                            type="text"
                            v-model="UpdateProfile.City"
                            :placeholder="Address.City"
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
import {AuthBody} from '../Services/AuthApi';

export default{
    data() {
// ------------Data for current user information and the changeable information----------------------
        return {
            Email: null,
            Fullname: null,
            Password: null,
            Phone: null,
            Address: {
                Street: null,
                Number: null,
                Zip: '',
                City: null
            },

            UpdateProfile:{
            Email: "",
            Fullname: "",
            Password: "",
            Phone: "",
            Address: {
                Street: "",
                Number: "",
                Zip: "",
                City: ""
            } 
            }
        };
    },
    

    mounted: function() {
// ------------Gets the user information by checking the jwt ----------------------
        AuthBody(this.$cookies.get('jwt'))
        .then((res) => {
            this.Fullname = res.User.Fullname;
            this.Email = res.User.Email;
            // this.password = res.data.user.password;
            this.Phone = res.User.Phone;
            this.Address = res.User.Address;
        }).catch(err => {
            console.log(err);
        });
                        
        
    },
    

    methods: {
        onUpdateProfile: function() {
            // ------sending a post request for udating the user pushing to the dashboard if succesful---------
            this.axios.post('http://server.topper144p.com:3000/update', {User: this.UpdateProfile}, { 
            headers: { 
                jwt: this.$cookies.get('jwt'),
            }
            })
            .then((res) => {
                console.log(res)
                this.$router.push('/dashboard');
            }).catch(err => {
                // Fejled respons
                console.log(err);
                this.$router.push('/dashboard');
            });
            
        },
        
    }
}

</script>
<style>
</style>