<template>
    
       	<div
           v-if="CS.isLoggedIn" 
           >
            <v-card
                class="pa-5 ma-0"
                elevation="3"
                 v-if="CS.isAdmin" 
                 
            >
            <h1>Admin Page, Only Admin's Can See This!</h1>
            
                <v-form class="col-12 pa-0"> 
                    
                    <v-divider class="pb-3 mt-3"></v-divider>
                       <v-card-title>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                            </v-card-title>
                            <v-data-table
                            :headers="headers"
                            :items="users"
                            :search="search"
                            ></v-data-table>
                        
                </v-form>
            </v-card>
        </div>

</template>
<script>

import { CurrentSession } from '@/Services/GlobalVariables';
import {GetAllUsersBody} from '@/Services/AuthApi';
export default {
	data() {
        return {
            error: null,
            meta: this.$route.meta,
            CS: CurrentSession,
            search: '',
        headers: [
          {
            text: 'Fullname',
            align: 'start',
            filterable: true,
            value: 'fullname',
          },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Street', value: 'street' },
          { text: 'Number', value: 'number' },
          { text: 'Zip', value: 'zip' },
          { text: 'City', value: 'city' },
       
        ],
        users: [
          
              
        ],
      }    
    },
    mounted: function() {
        GetAllUsersBody(this.$cookies.get('jwt'))
        .then((res) => {
            let obj = res.users;

          obj.forEach(element => {
              this.users.push(
                  {
                      fullname: element.fullname,
                      email: element.email,
                      phone: element.phone,
                      street: element.address.street,
                      number: element.address.number,
                      zip: element.address.zip,
                      city: element.address.city,

                  }
              )
          });
        }).catch(err => {
            console.log(err);
            
        });
                        
        
    },
    

    methods: {
        onUpdateProfile: function() {
            
            this.axios.post('http://server.topper144p.com:3000/changeprivilege', {}, { 
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
