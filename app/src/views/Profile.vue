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
                        placeholder="user.fullname"
                        v-model="UpdateProfile.fullname"
                    ></v-text-field>
                    <v-text-field
                        
                        type="email"
                        v-model="email"
                        placeholder="$user.email"
                    > </v-text-field>
                    
                    <v-text-field
                        
                        type="text"
                        v-model="phone"
                        placeholder="$user.phone"
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
                            v-model="address.street"
                            class="pr-2"
                            placeholder="$user.street"
                        > </v-text-field>

                        <v-text-field
                            
                            type="text"
                            v-model="address.number"
                            placeholder="$user.address.number"
                        > </v-text-field>
                    </div>

                    <div class="row ma-0">
                        <v-text-field
                            
                            type="number"
                            v-model="address.zip"
                            class="pr-2"
                            placeholder="$user.address.zip"
                        > </v-text-field>

                        <v-text-field
                            
                            type="text"
                            v-model="address.city"
                            placeholder="$user.address.city"
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
    

    mounted: function() {
        this.axios.post('http://server.topper144p.com:3000/auth', null, { 
            headers: { 
                jwt: this.$cookies.get('jwt'),
            }
        })
        .then((res) =>{
            console.log(res)
            this.fullname = res.data.user.fullname;
            this.email = res.data.user.email;
            // this.password = res.data.user.password;
            this.phone = res.data.user.phone;
            this.address = res.data.user.address;
            

        }).catch(err => {
            console.log(err);
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
            this.axios.post('http://server.topper144p.com:3000/update', {user: this.UpdateProfile}, { 
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
                this.$router.push('/*');
            });
            
        },
        
    }
}

</script>
<style>
</style>