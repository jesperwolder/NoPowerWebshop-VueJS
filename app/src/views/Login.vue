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
                    v-model="Login.email"
                    required
                > </v-text-field>
                
                <div class="row">
                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="Login.password"
                        required
                    > </v-text-field>
                    </div>
                <v-btn
                    block
                    color="primary"
                    v-on:click="Login()"
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
            loading: false,
            error: null,
            register: {
                email: null,

                password: null,
                
            }
        }
    },
    methods: {
        Login: function() {
            this.loading = true;

            if(!this.CheckForNullInObject(this.login)) {
                this.error = "Et eller flere felter er tomme";
                this.loading = false;
                return;
            }
           

            // Send post request om at oprette brugeren
            this.axios.post('http://server.topper144p.com:3000/login', { user: this.login})
            .then((res) => {
                // Success respons
                this.$cookies.set('jwt', res.data.jwt);
                this.$cookies.set('isAdmin', res.data.isAdmin);
                this.$router.push('/dashboard');
            }).catch(err => {
                // Fejled respons
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