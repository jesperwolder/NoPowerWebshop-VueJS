<template>
    <v-container v-if="CS.isAdmin" class="pa-0">
        <v-card
            class="pa-5 ma-0"
            elevation="3"
            v-if="CS.isAdmin" 
                
        >
            <h1>{{ meta.title }}</h1>

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
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                    v-on:click="InsertState()"
                                    >
                                    Tilføj produkt
                                    </v-btn>
                                </template>
                                <v-card class="ma-0">
                                    <v-card-title>
                                    <span class="headline">Administrer '<b><i>{{ editedItem.Name }}</i></b>'</span>
                                    </v-card-title>

                                    <v-card-text>
                                    <v-container>
                                        <v-row>

                                        <v-col
                                            cols="12"
                                            class="px-0"
                                        >
                                            <v-text-field
                                                v-model="editedItem.Name"
                                                label="Name" 
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            class="px-0"
                                        >
                                            <v-textarea
                                                v-model="editedItem.Description"
                                                label="Description"
                                                outlined
                                            ></v-textarea>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="6"
                                            class="pl-0"
                                        >
                                            <v-text-field
                                                v-model="editedItem.Price"
                                                type="number"
                                                label="Price"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="6"
                                            class="pr-0"
                                        >
                                            <v-text-field
                                                v-model="editedItem.Stock"
                                                type="number"
                                                label="Stock"
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
                                                        @click="RemoveTechnicalDetailsHeader( index )"
                                                    >
                                                        <v-icon>
                                                            mdi-minus
                                                        </v-icon>
                                                    </v-btn>

                                                    <v-card-title class="mt-4">
                                                        <v-text-field
                                                            outlined
                                                            v-model="item.Header"
                                                            label="Header"
                                                        ></v-text-field>
                                                    </v-card-title>

                                                    <v-card-text>
                                                        <v-row
                                                            v-for="(row, indx) in item.Items"
                                                            :key="'B' + indx"
                                                            :id="indx + item.Header"
                                                        >
                                                            <v-col
                                                                col="12"
                                                                sm="6"
                                                                md="6"
                                                            >
                                                                <v-text-field
                                                                    v-model="row.Name"
                                                                    label="Name"
                                                                ></v-text-field>
                                                            </v-col>

                                                            <v-col
                                                                col="12"
                                                                sm="6"
                                                                md="6"
                                                            >
                                                                <v-text-field
                                                                    v-model="row.Value"
                                                                    label="Value"
                                                                    append-outer-icon="mdi-minus"
                                                                    @click:append-outer="RemoveFieldInner( item.Header, indx )"
                                                                ></v-text-field>
                                                            </v-col>
                                                        </v-row>

                                                        <v-card-actions class="justify-center align-center">
                                                            <v-btn
                                                                fab
                                                                color="primary"
                                                                small
                                                                @click="AddFieldInner( item.Header )"
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
                                                        @click="AddFieldCategory()"
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
                                        v-on:click="SaveItems()"
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
                                @click="editItem( item )"
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
    </v-container>

    <div v-else>
        <PermissionDenied />
    </div>
</template>

<script>

import { CurrentSession } from '@/Services/GlobalVariables';
import { GetAllProductsBody, UpdateProductBody, CreateProductBody } from '@/Services/ProductApi';
import PermissionDenied from '@/views/ErrorPages/403.vue';

export default {
    components: {
        PermissionDenied
    },
	data() {
        return {
            error: null,
            meta: this.$route.meta,
            
            CS: CurrentSession,
            dialog: false,
            search: '',
            state: null,
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    filterable: true,
                    value: 'Name',
                },
            
                { text: 'Description', value: 'Description' },
                { text: 'Price', value: 'Price' },
                { text: 'SalePercentage', value: 'SalePercentage' },
                { text: 'Stock', value: 'Stock' },
                { text: 'Active', value: 'isActive' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            products: [],
            editedIndex: -1,
            editedItem: {
                _id: "",
                Categories:[],
                Creator:{
                    CreatedBy: "",
                    CreatorEmail: "",
                    CreatorFullname: "",
                },
                SalePercentage: "",
                TechnicalDetails:[],
                Name: "",
                Description: "",
                Price: 0,
                Image: "",
                Stock: 0,
                isActive: false,
                
            },

            defaultItem: {
                _id: "",
                Categories:[],
                Creator:{
                    CreatedBy: "",
                    CreatorEmail: "",
                    CreatorFullname: "",
                },
                SalePercentage: "",
                TechnicalDetails:[],
                Name: "",
                Description: "",
                Price: 0,
                Image: "",
                Stock: 0,
                isActive: false,
                
            },
        }    
    },
    mounted: function() {
        GetAllProductsBody(this.$cookies.get('jwt'))
        .then((res) => {
            let obj = res.Products;
            
            obj.forEach(element => {
                this.products.push( {
                    _id: element._id,
                    Name: element.Name,
                    Description: element.Description,
                    Price: element.Price,
                    SalePercentage: element.SalePercentage,
                    Stock: element.Stock,
                    isActive: element.isActive,
                    Image: element.Image,
                    TechnicalDetails: element.TechnicalDetails,
                    Categories: element.Categories,
                    Creator: {
                        _id: null,
                        CreatedBy: null,
                        CreatorEmail: null,
                        CreatorFullname: null,
                    }
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
        InsertState: function() {
            this.state = 'insert'
        },

        //opdater Products localt
        UpdateProductsData: function() {             
            delete this.products[this.editedIndex];             
            this.products.push(this.editedItem); 
        },

        SaveItems: function( ) {
            console.log(this.state);

            if( this.state === 'insert' ) {
                this.AdminCreateItem();
                return;
            } else if( this.state === 'update' ) {
                this.onUpdateItem()
                return;
            }
            return false; // error
        },

        //updater item
        onUpdateItem: function() {
            UpdateProductBody( { Product: this.editedItem }, this.$cookies.get('jwt') )
            .then((res) => {
                this.UpdateProductsData();
                console.log(res)
                this.close();
            }).catch(err => {
               console.log(err.response.data)
            });
           
        },

        //create item
        AdminCreateItem: function() {
            
            this.editedItem.Price = parseFloat( this.editedItem.Price );
            this.editedItem.Stock = parseInt( this.editedItem.Stock );
            this.editedItem.SalePercentage = parseInt( this.editedItem.SalePercentage );
            this.editedItem.isActive = ( this.editedItem.isActive === 'true' );

            CreateProductBody( { Product: this.editedItem }, this.$cookies.get('jwt') )
            .then((res) => {
                console.log(res)
                
                this.products.push( res.Product );

                this.close();
            }).catch(err => {
                console.log( err.response.data );
            });
        },

        editItem(item){
            this.state = 'update'
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

        AddFieldCategory: function() {
            this.editedItem.TechnicalDetails.push( { Header: '', Items: [ { Name: '', Value: '' } ] } );
        },

        AddFieldInner: function( header ) {
            if( header != '' ) {
                console.log(this.editedItem);
                this.editedItem.TechnicalDetails.find( x => x.Header === header ).Items.push( { Name: '', Value: '' } )
            } else {
                console.log( 'header must be defined before adding new fields.' );
            }
        },

        RemoveFieldInner: function( header, index ) {
            this.editedItem.TechnicalDetails.find( x => x.Header === header ).Items.splice(index, 1);
        },

        RemoveTechnicalDetailsHeader: function( index ) {
            this.editedItem.TechnicalDetails.splice( index, 1 );
        }

    }
}


</script>