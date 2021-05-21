<template>
<!-- Checks if the user is admin, this page controlls items -->
    <v-container v-if="CS.isAdmin" class="pa-0" fluid>
        <v-card
            class="pa-5 ma-0"
            elevation="2"
            v-if="CS.isAdmin" 
                
        >
<!----- Json board over every items you can search and sort the items and change their information ------>  
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
                            :items-per-page="15"
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
                                <v-card class="ma-0" :loading="isLoading" :disabled="isLoading">
                                    <v-card-title>
                                    <span class="headline">Administrer '<b><i>{{ editedItem.Name }}</i></b>'</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                            <!---------- Items information -------------->  
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
                                                <v-text-field
                                                    v-model="editedItem.LowerHeader"
                                                    label="Kort beskrivelse (140 tegn)"
                                                    outlined
                                                    max-length="140"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                class="px-0"
                                            >
                                                <v-textarea
                                                    v-model="editedItem.Description"
                                                    label="Lang beskrivelse"
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
                                                <v-switch
                                                    v-model="editedItem.isActive"
                                                    label="Active"
                                                ></v-switch>
                                            </v-col>
                                                
                                    <!------------ Technical Details ---------------->
                                                
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
                                                            @click="AddFieldTechnicalDetails()"
                                                        >
                                                            <v-icon>
                                                                mdi-plus
                                                            </v-icon>
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>

                              <!----------------- Categories ---------------------->

                                                <v-card
                                                    width="100%"
                                                    elevation="0"
                                                >
                                                    <v-divider class="mb-5" ></v-divider>
                                                    <v-card-subtitle class="px-0">Categories</v-card-subtitle>

                                                    <div
                                                        v-for="( cat, index ) in editedItem.Categories"
                                                        :key="index"
                                                    >
                                                        <v-text-field
                                                            v-model="editedItem.Categories[index]"
                                                            :label="`Kategori ` + ( index + 1 )"
                                                            append-outer-icon="mdi-minus"
                                                            @click:append-outer="RemoveFieldCategory( index )"
                                                        >
                                                        </v-text-field>
                                                    </div>

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

                         <!----------------- Images ------------------------>

                                                <v-card
                                                    width="100%"
                                                    elevation="0"
                                                >
                                                    <v-divider class="mb-5"></v-divider>
                                                    <v-card-subtitle class="px-0">Images</v-card-subtitle>

                                                    <v-card
                                                        class="pa-2"
                                                        outlined
                                                    >
                                                        <v-text-field
                                                            v-model="editedItem.Thumbnail"
                                                            label="Thumbnail image"
                                                        ></v-text-field>

                                                        <v-divider class="mb-5"></v-divider>

                                                        <div
                                                            v-for="( image, index ) in editedItem.Images"
                                                            :key="index"
                                                        >
                                                            <v-text-field
                                                                v-model="editedItem.Images[index]"
                                                                :label="`Image url ` + ( index + 1 )"
                                                                append-outer-icon="mdi-minus"
                                                                @click:append-outer="RemoveFieldImage( index )"
                                                            >
                                                            </v-text-field>
                                                        </div>

                                                        <v-card-actions class="justify-center align-center">
                                                            <v-btn
                                                                fab
                                                                color="primary"
                                                                small
                                                                @click="AddFieldImage()"
                                                            >
                                                                <v-icon>
                                                                    mdi-plus
                                                                </v-icon>
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
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
<!-- If the user is not admin and or gets demoted he will get denied -->
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
//------ alle metoder i jason table -------
        return {
            error: null,
            meta: this.$route.meta,
            isLoading: false,
            CS: CurrentSession,
            dialog: false,
            search: '',
            state: null,
            pagination: {
              rowsPerPage: 69
            },
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    filterable: true,
                    value: 'Name',
                },
            
                { text: 'Kort beskrivelse', value: 'LowerHeader' },
                { text: 'Price', value: 'Price' },
                { text: 'Stock', value: 'Stock' },
                { text: 'Active', value: 'isActive' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
//------ all products we either create, update og read -------
            products: [],
            editedIndex: -1,
            editedItem: {
                _id: "",
                Categories:[],
                Creator: {
                    CreatedBy: "",
                    CreatorEmail: "",
                    CreatorFullname: "",
                },
                SalePercentage: "",
                TechnicalDetails:[],
                Name: "",
                LowerHeader: "",
                Description: "",
                Price: 0,
                Thumbnail: "",
                Images: [],
                Stock: 0,
                isActive: false,
            },

            defaultItem: {
                _id: "",
                Categories:[],
                Creator: {
                    CreatedBy: "",
                    CreatorEmail: "",
                    CreatorFullname: "",
                },
                SalePercentage: "",
                TechnicalDetails:[],
                Name: "",
                LowerHeader: "",
                Description: "",
                Price: 0,
                Thumbnail: "",
                Images: [],
                Stock: 0,
                isActive: false,
            },
        }    
    },
 //------henter produktet gennem et obj og printer dem ud ved jwten------------------
    mounted: function() {
        GetAllProductsBody(this.$cookies.get('jwt'))
        .then((res) => {
            let obj = res.Products;

            obj.forEach(element => {
                this.products.push( {
                    _id: element._id,
                    Name: element.Name,
                    LowerHeader: element.LowerHeader,
                    Description: element.Description,
                    Price: element.Price,
                    SalePercentage: element.SalePercentage,
                    Stock: element.Stock,
                    isActive: element.isActive,
                    Thumbnail: ( element.Thumbnail != undefined ? element.Thumbnail : '' ),
                    Images: ( element.Images != undefined ? element.Images : [] ),
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

//-------opdater Products localt-------
        UpdateProductsData: function() {             
            delete this.products[this.editedIndex];             
            this.products.push(this.editedItem); 
        },
//-------Kigger på om den skal tilføje et produkt ellers updater den produktet--------
        SaveItems: function( ) {
            if( this.state === 'insert' ) {
                this.AdminCreateItem();
                return;
            } else if( this.state === 'update' ) {
                this.onUpdateItem()
                return;
            }
            return false; // error
        },

        //------updater item------
        onUpdateItem: function() {
            this.isLoading = true;
            UpdateProductBody( { Product: this.editedItem }, this.$cookies.get('jwt') )
            .then((res) => {
                this.UpdateProductsData();
                console.log(res)
                this.close();
            }).catch(err => {
               console.log(err.response.data)
            });
           
        },

        //---------create item------------
        AdminCreateItem: function() {
            this.editedItem.Price = parseFloat( this.editedItem.Price );
            this.editedItem.Stock = parseInt( this.editedItem.Stock );
            this.editedItem.SalePercentage = parseInt( this.editedItem.SalePercentage );

            CreateProductBody( { Product: this.editedItem }, this.$cookies.get('jwt') )
            .then((res) => {                
                this.products.push( res.Product );
                console.log(res)
                this.close();
            }).catch(err => {
                console.log( err.response.data );
            });
        },
//---------edit item------------
        editItem(item){
            this.state = 'update'
            this.editedIndex = this.products.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
//----------closes the editItem--------
        close () {
            this.dialog = false
            this.isLoading = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },
//-------Add an exstra TechnicalDetails on item--------
        AddFieldTechnicalDetails: function() {
            this.editedItem.TechnicalDetails.push( { Header: '', Items: [ { Name: '', Value: '' } ] } );
        },
//-------Add an exstra TechnicalDetails innerfields(smaller information) on item--------
        AddFieldInner: function( header ) {
            if( header != '' ) {
                console.log(this.editedItem);
                this.editedItem.TechnicalDetails.find( x => x.Header === header ).Items.push( { Name: '', Value: '' } )
            } else {
                console.log( 'header must be defined before adding new fields.' );
            }
        },
//-------Add an exstra Category--------
        AddFieldCategory: function() {
            this.editedItem.Categories.push("");
        },
//-------Removes an exstra Category--------
        RemoveFieldCategory: function( index ) {
            this.editedItem.Categories.splice( index, 1 );
        },
//-------Add an a picture or another--------
        AddFieldImage: function() {
            this.editedItem.Images.push("http://");
        },
//-------Removes an a picture or more-------
        RemoveFieldImage: function( index ) {
            this.editedItem.Images.splice( index, 1 );
        },
//-------Removes an a Fieldinner or more--------
        RemoveFieldInner: function( header, index ) {
            this.editedItem.TechnicalDetails.find( x => x.Header === header ).Items.splice(index, 1);
        },
//-------Removes an a picture or more--------
        RemoveTechnicalDetailsHeader: function( index ) {
            this.editedItem.TechnicalDetails.splice( index, 1 );
        }

    }
}


</script>