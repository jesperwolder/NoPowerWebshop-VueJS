<template>
<!-- Checks if the user is admin and loggedin, this page controlls user and can see orders -->
    <v-container v-if="CS.isAdmin" class="pa-0">
       	<div
           v-if="CS.isLoggedIn" 
           >
            <v-card
                class="pa-5 ma-0"
                elevation="3"
                 v-if="CS.isAdmin" 
                 
            >
            <h1 class="font-weight-regular">{{ meta.title }}</h1>
            
            <v-form class="col-12 pa-0"> 
<!----- Json board over every user you can search and sort the users and change their information and see their products ------>
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
                                <v-toolbar-title>Oversigt</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog
                                    v-model="dialog"
                                    max-width="500px"
                                    persistent
                                >
                                
                                <v-card class="ma-0" :loading="isLoading" :disabled="isLoading">
                                    <v-card-title>
                                        Administrer kunde '<i>{{ editedItem.Fullname }}</i>'
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
                                                        v-model="editedItem.Fullname"
                                                        label="Fullname"
                                                        :placeholder="editedItem.Fullname"
                                                    
                                                        
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.Email"
                                                        label="Email"
                                                        :placeholder="editedItem.Email"
                                                    
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.Phone"
                                                        label="Phone"
                                                        :placeholder="editedItem.Phone"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.Address.Street"
                                                        label="Street"
                                                        :placeholder="editedItem.Address.Street"
                                                    ></v-text-field>
                                                </v-col>
                                                    <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="4"
                                                    >
                                                    <v-text-field
                                                        v-model="editedItem.Address.Number"
                                                        label="Number"
                                                        :placeholder="editedItem.Address.Number"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                
                                                    <v-text-field
                                                        v-model="editedItem.Address.Zip"
                                                        label="Zip"
                                                        :placeholder="editedItem.Address.Zip.toString()"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.Address.City"
                                                        label="City"
                                                        :value="editedItem.Address.City"
                                                        :placeholder="editedItem.Address.City"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col
                                                    cols="6"
                                                    sm="2"
                                                    md="1"
                                                >
                                                    <v-container
                                                        class="px-0"
                                                        fluid
                                                    >
                                                        <v-switch    
                                                            v-model="editedItem.isAdmin"
                                                            :label="`isAdmin: ${editedItem.isAdmin.toString()}`"
                                                        ></v-switch>
                                                    </v-container>
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
    <!---------- this changes the user information and and checks if the user should be admin -------------------->
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                    
                                            v-on:click=" ChangeAdminRole(), onUpdateProfileAdminChange()"
                                        >
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                                </v-dialog>
                                <v-dialog  max-width="500px">
                                <v-card>
                                    
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text>Cancel</v-btn>
                                    
                                    <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>

                        <template v-slot:[`item.actions`]="{ item }">
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
                                mdi-cart-check
                            </v-icon>
                        </template>
                    </v-data-table>
                    
                </v-form>
            </v-card>
        </div>
    </v-container>

    <div v-else>
<!-- If the user is not admin and or gets demoted he will get denied -->
        <PermissionDenied />
    </div>
</template>
 
<script>

import { CurrentSession } from '@/Services/GlobalVariables';
import { GetAllUsersBody, UpdateUserAdminBody, ChangePrivilegeBody } from '@/Services/AuthApi';
import PermissionDenied from '@/views/ErrorPages/403.vue';

export default {
    components: {
        PermissionDenied
    },
	data() {
        return {
//-------- Data on users on json table  --------------
            error: null,
            meta: this.$route.meta,
            isLoading: false,
            isAdminswitch: false,
            CS: CurrentSession,
            dialog: false,
            search: '',
        headers: [
            {
                text: 'Fulde navn',
                align: 'start',
                filterable: true,
                value: 'Fullname',
            },
            { text: 'Email', value: 'Email' },
            { text: 'Telefonnummer', value: 'Phone' },
            { text: 'Adresse', value: 'Address.Street' },
            { text: 'Nummer', value: 'Address.Number' },
            { text: 'Postnummer', value: 'Address.Zip' },
            { text: 'By', value: 'Address.City' },
            { text: 'Actions', value: 'actions', sortable: false },
       
        ],
 //-------- User information  --------------
        users: [],
        editedIndex: -1,
        editedItem: {
            _id: "",
            Email: "",
            Fullname: "",
            password: "",
            Phone: "",
            Address: {
                Street: "",
                Number: "",
                Zip: 0,
                City: "",
            },
            isAdmin: false,
        },
        defaultItem: {
            _id: "",
            Email: "",
            Fullname: "",
            password: "",
            Phone: "",
            Address: {
                Street: "",
                Number: "",
                Zip: 0,
                City: "",
            },
            isAdmin: false,
        },
        

         
      }    
    },
    mounted: function() {
//-------- Pushes all the users information though the jwt and pushes the obj data info --------------
        GetAllUsersBody(this.$cookies.get('jwt'))
        .then((res) => {
            let obj = res.Users;

          obj.forEach(element => {
              this.users.push({
                _id: element._id,
                Fullname: element.Fullname,
                Email: element.Email,
                Phone: element.Phone,
                Address:{
                    Street: element.Address.Street,
                    Number: element.Address.Number,
                    Zip: element.Address.Zip,
                    City: element.Address.City,
                },
                isAdmin: element.isAdmin,
            })
          });
        }).catch(err => {
            console.log(err);
            
        });
                        
        
    },
    
    watch: {
        dialog (val) {
            val || this.close();
        },
    },

    methods: {
        //-------- Changes the user information thouh the jwt  --------------
        onUpdateProfileAdminChange: function() {
            this.isLoading = true;

            UpdateUserAdminBody( { User: this.editedItem }, this.$cookies.get('jwt') )
            .then((res) => {
                this.UpdateUserData()
                console.log(res)
                this.close();
            }).catch(err => {
               console.log(err.response.data)    
            });
           
        },
// deletes the users data and then pushes the new information 
        UpdateUserData: function() {             
            delete this.users[this.editedIndex];             
            this.users.push(this.editedItem); 
        },
//Assigns the item in editCustomer and click event
        editItem(item){
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
//closes the editCustomer
        close() {
            this.dialog = false
            this.isLoading = false;

            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
//changes the admin role on the user though a switch
        ChangeAdminRole: function() {
            ChangePrivilegeBody({UserID: this.editedItem._id}, this.editedItem.isAdmin, this.$cookies.get('jwt') )
            .then((res) => {
                console.log(res)
                
            }).catch(err => {
                // Fejled respons
                console.log(err);
                
            });
            
        },
        }
    }


</script>
