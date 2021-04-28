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
                            :items="products"
                            :items-per-page="25"
                            :search="search"
                            >

                            <template v-slot:top>
                                <v-toolbar
                                    flat
                                >
                                    <v-toolbar-title>Thomas er gay i items, users a placeholder lige nu</v-toolbar-title>
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
                                        <span class="headline">{{"thomas er gay er super gay"}}</span>
                                        </v-card-title>

                                        <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col
                                                 cols="12"
                                                sm="6"
                                                md="4"
                                                v-for="item in editedItem.TechnicalDetails"
                                                :key="item"
                                                >
                                                    {{ item.name }}
                                                </v-col>

                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                v-model="editedItem.name"
                                                label="name"
                                                :placeholder="editedItem.name"
                                                
                                                 
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                  v-model="editedItem"
                                                label="email"
                                                :placeholder="editedItem"
                                                
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                v-model="editedItem"
                                                label="phone"
                                                :placeholder="editedItem"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                v-model="editedItem.address"
                                                label="street"
                                                :placeholder="editedItem.address"
                                                ></v-text-field>
                                            </v-col>
                                             <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                v-model="editedItem.address"
                                                label="number"
                                                :placeholder="editedItem.address"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                            
                                                <v-text-field
                                               v-model="editedItem"
                                                label="zip"
                                                :placeholder="editedItem"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                            >
                                                <v-text-field
                                                v-model="editedItem"
                                                label="city"
                                                :value="editedItem"
                                                :placeholder="editedItem"
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
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                           v-on:click="onUpdateProfileAdminChange()"
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

</template>
 
<script>

import { CurrentSession } from '@/Services/GlobalVariables';
import {GetAllProductsBody} from '@/Services/ProductApi';



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
            text: 'Name',
            align: 'start',
            filterable: true,
            value: 'name',
          },
          
          { text: 'Description', value: 'description' },
          { text: 'Price', value: 'price' },
           { text: 'Category', value: 'category' },
          { text: 'salepercentage', value: 'salepercentage' },
          { text: 'Stock', value: 'stock' },
          { text: 'Active', value: 'isActive' },
          { text: 'Actions', value: 'actions', sortable: false },
          
       
        ],
        products: [
          
              
        ],
        editedIndex: -1,
        editedItem: {
            _id: "",
            creator:{
                createdBy: "",
                creatorEmail: "",
                creatorFullname: "",
            },
            SalePercentage: "",
            TechnicalDetails:{
                
            },
            name: "",
            description: "",
            price: "",
            image: "",
            stock: "",
            isActive:"",
        },

        defaultItem: {
             _id: "",
            creator:{
                createdBy: "",
                creatorEmail: "",
                creatorFullname: "",
            },
            SalePercentage: "",
            TechnicalDetails:{
                
            },
            name: "",
            description: "",
            price: "",
            image: "",
            stock: "",
            isActive:"",
            
        },

         
      }    
    },
    mounted: function() {
        GetAllProductsBody(this.$cookies.get('jwt'))
        .then((res) => {
            let obj = res.products;

          obj.forEach(element => {
              this.products.push(
                  {
                      _id: element._id,
                      name: element.Name,
                      description: element.Description,
                      price: element.Price,
                     category: element.Category,
                     salepercentage: element.SalePercentage,
                     stock: element.Stock,
                     isActive: element.isActive,
                    TechnicalDetails: element.TechnicalDetails,
                    
                  }
              )
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
        AdminCreateItem: function() {
            
            ({user: this.editedItem},
             {headers: { 
                jwt: this.$cookies.get('jwt'),
            }})
            .then((res) => {
                console.log(res)
                 
            }).catch(err => {
               console.log(err.response.data)
                
            });
            close();
        },

        editItem(item){
            console.log(item)
            this.editedIndex = this.products.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
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
