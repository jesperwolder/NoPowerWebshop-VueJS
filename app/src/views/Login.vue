<template>
  <v-container>
        <div class="col-md-5 col-sm-12 mx-auto">
            <v-card
                :loading="loading"
                class=""
                elevation="3"
            >
            <v-form class="col-11">
                <h1> Login </h1>
                <div v-if="this.error">
                    <h2 class="error-text"> {{ this.error }} </h2>
                </div>
               
                <v-text-field
                    label="Email"
                    type="email"
                    v-model="login.email"
                    required
                > </v-text-field>
                
                <div class="row">
                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="login.password"
                        required
                    > </v-text-field>
                    </div>
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

export default {
    data() {
        return {
            loading: false,
            error: null,
            login: {
                email: "",
                password: "",
                
            }
        }
    },
    methods: {
        UserLogin: function() {
            this.loading = true;

               this.axios.post('http://localhost:3000/login', {... this.login}) 
                
                    .then((res) =>{
                    this.$cookies.set('jwt', res.data.jwt);
                    this.$cookies.set('isAdmin', res.data.isAdmin);
                    this.$router.push('/dashboard');
                   
                    }).catch(err => {
                        //fejl
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