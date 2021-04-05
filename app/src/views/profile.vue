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
                        v-model="fullname"
                        placeholder="$user.fullname"
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
                        label="Password"
                        type="password"
                        v-model="password"
                        class="pr-2"
                    > </v-text-field>

                    <div class="row ma-0">
                        <v-text-field
                            
                            type="text"
                            v-model="address.street"
                            class="pr-2"
                            placeholder="$user.address.street"
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
                        Update
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
            }
        };
    },

    mounted: function() {
        this.axios.post("http://localhost:3000/auth", null, { 
            headers: { 
                jwt: this.$cookies.get('jwt'),
            }
        })
        .then((res) =>{
            console.log(res)
            this.fullname = res.data.user.fullname;

        }).catch(err => {
            console.log(err);
            this.$router.push('/*');
        });
                        
        
    },

    methods: {
        async onUpdateProfile() {
            try {
                let data = {
                    email: this.email,
                    fullname: this.email,
                    password: this.password,
                    phone: this.phone,
                    address: {
                        street: this.street,
                        number: this.number,
                        zip: this.zip,
                        city: this.city
                    }
                };

                let response = await this.axios.put("", data);

                if (response.success) {
                    this.email = "";
                    this.fullname = "";
                    this.password = "";
                    this.phone = "";
                    this.adress.street = "";
                    this.adress.number = "";
                        this.adress.zip = "";
                        this.adress.city = "";
                    await this.user.fetchUser();
                }
            } catch (err) {
                console.log(err);
            }
        },
        
        async onLogout() {
            await this.user.logout();
        }
    }
};

</script>
