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
                            :items-per-page="25"
                            :search="search"
                            >

                            <template v-slot:top>
                                <v-toolbar
                                    flat
                                >
                                    <v-toolbar-title>Thomas er gay</v-toolbar-title>
                                    <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                    ></v-divider>
                                    <v-spacer></v-spacer>
                                    <v-dialog
                                    v-model="dialog"
                                    max-width="500px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        color="primary"
                                        dark
                                        class="mb-2"
                                        v-bind="attrs"
                                        v-on="on"
                                        >
                                        New Item
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                        <span class="headline">{{}}</span>
                                        </v-card-title>

                                        <v-card-text>
                                        <v-container>
                                            <v-row>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                v-model="editItem.fullname"
                                                label="Fullname"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                
                                                label="email"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                
                                                label="Fat (g)"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                
                                                label="Carbs (g)"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                
                                                label="Protein (g)"
                                                ></v-text-field>
                                            </v-col>
                                            </v-row>
                                        </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="close"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="save"
                                        >
                                            Save
                                        </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                    <v-dialog v-model="dialogDelete" max-width="500px">
                                    <v-card>
                                        <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                                        <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                        <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                    </v-dialog>
                                </v-toolbar>
                                </template>







                            <template v-slot:item.actions="{users}">
                                <v-icon
                                    small
                                    class="mr-2"
                                    @click="editItem(item)"
                                >
                                    mdi-pencil
                                </v-icon>
                                <v-icon
                                    small
                                
                                >
                                    mdi-delete
                                </v-icon>
                                </template>
                            </v-data-table>
                        
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
            dialog: false,
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
          { text: 'Actions', value: 'actions', sortable: false },
       
        ],
        users: [
          
              
        ],
        editedIndex: -1,
        editItem: {
            fullname: '',
            email: '',
            phone: '',
            street: '',
            number: '',
            zip: 0,
            city: '',
        }
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

        editItem(item){
            this.editedIndex = this.users.indexOf(item)
            this.editItem = Object.assign({}, item)
            this.dialog = true
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
            
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },
    }

}
</script>
