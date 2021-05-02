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
                                    <v-toolbar-title>Thomas er gay i items, uses a placeholder lige nu</v-toolbar-title>
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
                                    <v-card class="ma-0">
                                        <v-card-title>
                                        <span class="headline">thomas er gay er super gay 🍆✊💦</span>
                                        </v-card-title>

                                        <v-card-text>
                                        <v-container>
                                            <v-row>
                                             

                                            <v-col
                                                cols="12"
                                                class="px-0"
                                            >
                                                <v-text-field
                                                    v-model="editedItem.name"
                                                    label="name" 
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                class="px-0"
                                            >
                                                <v-textarea
                                                    v-model="editedItem.description"
                                                    label="Description"
                                                ></v-textarea>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="6"
                                                class="pl-0"
                                            >
                                                <v-text-field
                                                    v-model="editedItem.price"
                                                    type="number"
                                                    label="price"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                sm="6"
                                                md="6"
                                                class="pr-0"
                                            >
                                                <v-text-field
                                                    v-model="editedItem.stock"
                                                    type="number"
                                                    label="stock"
                                                ></v-text-field>
                                            </v-col>
                                             <v-col
                                                cols="12"
                                                sm="6"
                                                md="6"
                                                class="pl-0"
                                            >
                                                <v-text-field
                                                v-model="editedItem.isActive"
                                                label="IsActive"
                                               
                                                ></v-text-field>
                                            </v-col>

                                             <v-col
                                                cols="12"
                                                sm="6"
                                                md="6"
                                                class="pr-0"
                                            >
                                                <v-text-field
                                                    disabled
                                                    v-model="editedItem.Creator.creatorFullname"
                                                ></v-text-field>
                                                </v-col>
                                                
                                                <!-- Technical Details -->
                                                
                                                <v-card
                                                    width="100%"
                                                    elevation="0"
                                                    class="technicalDetails"
                                                >
                                                    <v-divider class="mb-5" ></v-divider>
                                                    <v-card-subtitle class="px-0">Technical Details</v-card-subtitle>

                                                    <v-card
                                                        outlined
                                                        v-for="(item, index) in editedItem.TechnicalDetails"
                                                        :key="'A' + index"
                                                        class="pa-2"
                                                        v-bind:class="[index !== editedItem.TechnicalDetails.length - 1 ? 'mb-12' : '']"
                                                    >
                                                        <v-btn
                                                            fab
                                                            color="red"
                                                            x-small
                                                            absolute
                                                            right
                                                            top
                                                        >
                                                            <v-icon>
                                                                mdi-minus
                                                            </v-icon>
                                                        </v-btn>

                                                        <v-card-title class="mt-4">
                                                            <v-text-field
                                                                outlined
                                                                v-model="item.header"
                                                                label="Header"
                                                            ></v-text-field>
                                                        </v-card-title>

                                                        <v-card-text>
                                                            <v-row
                                                                v-for="(row, indx) in item.items"
                                                                :key="'B' + indx"
                                                            >
                                                                <v-col
                                                                    col="12"
                                                                    sm="6"
                                                                    md="6"
                                                                >
                                                                    <v-text-field
                                                                        v-model="row.name"
                                                                        label="Name"
                                                                    ></v-text-field>
                                                                </v-col>

                                                                <v-col
                                                                    col="12"
                                                                    sm="6"
                                                                    md="6"
                                                                >
                                                                    <v-text-field
                                                                        v-model="row.value"
                                                                        label="Value"
                                                                        append-outer-icon="mdi-minus"
                                                                        @click:append-outer="DeleteThisFieldMethod()"
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>

                                                            <v-card-actions class="justify-center align-center">
                                                                <v-btn
                                                                    fab
                                                                    color="primary"
                                                                    small
                                                                >
                                                                    <v-icon>
                                                                        mdi-plus
                                                                    </v-icon>
                                                                </v-btn>
                                                            </v-card-actions>
                                                        </v-card-text>
                                                    </v-card>

                                                    <v-card-subtitle class="pb-0 text-center">Add more technical details categories.</v-card-subtitle>
                                                    <v-card-actions class="justify-center align-center">
                                                        <v-btn
                                                            fab
                                                            color="primary"
                                                            small
                                                        >
                                                            <v-icon>
                                                                mdi-plus
                                                            </v-icon>
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>

                                                <!-- Categories -->

                                                <v-card
                                                    width="100%"
                                                    elevation="0"
                                                >
                                                    <v-divider class="mb-5" ></v-divider>
                                                    <v-card-subtitle class="px-0">Categories</v-card-subtitle>

                                                    <div>
                                                        <v-text-field
                                                            v-model="editedItem.Categories"
                                                        >
                                                        </v-text-field>
                                                    </div>

                                                    <!-- <div
                                                        v-for="(item, index) in editedItem.Categories"
                                                        :key="index"
                                                        :id="'cat-' + index"
                                                    >
                                                        <v-text-field
                                                            v-model="editedItem.Categories[index]"
                                                        >
                                                            <v-icon
                                                                slot="append"
                                                                color="red"
                                                                v-on:click="test( index )"
                                                            >mdi-minus</v-icon>
                                                        </v-text-field>
                                                    </div> -->

                                                </v-card>

                                                <!-- Images -->

                                                <v-card
                                                    width="100%"
                                                    elevation="0"
                                                >
                                                    <v-divider class="mb-5" ></v-divider>
                                                    <v-card-subtitle class="px-0">Images</v-card-subtitle>

                                                    <v-text-field
                                                        v-model="editedItem.Image"
                                                        placeholder="URL-link"
                                                    ></v-text-field>
                                                </v-card>

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
import { GetAllProductsBody } from '@/Services/ProductApi';



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
            Categories:[],
            Creator:{
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
            Image: "",
            stock: "",
            isActive:"",
            
        },

        defaultItem: {
            _id: "",
            Categories:[],
            Creator:{
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
            Image: "",
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
                        Image: element.Image,
                        TechnicalDetails: element.TechnicalDetails,
                        Categories: element.Categories,
                        Creator: {
                            createdBy: element.Creator.creatorFullname,
                            creatorEmail: element.Creator.creatorEmail,
                            creatorFullname: element.Creator.creatorFullname,
                        }
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
        DeleteThisFieldMethod: function() {
            alert('🤌');
        },

        test: function( index ) {
            let cat = document.getElementById('cat-' + index);
            cat.remove();
        },

        AddCategoryField() {
            let cat = document.getElementById('newcat');
            // cat.append('<v-divider></v-divider>');
            cat.innerHTML += '<v-card>test</v-card>';
        },

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