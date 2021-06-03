<template>
    <div>
        <v-card
            class="pa-5 ma-0"
            elevation="2"
        >
        <!---------- Our all products site -------------  --> 
            <h1 class="font-weight-regular">{{ meta.title }}</h1>

            <v-divider class="pb-3 mt-3"></v-divider>
        <!---------- If we have 0 products on our page -------------  --> 
            <v-card v-if="products.length <= 0" class="text-center" elevation="0">
                <div class="py-5 text-h2 text-center">
                    ¯\_(ツ)_/¯
                </div>
                <v-card-subtitle class="text-subtitle-1">
                    Der blev ikke fundet nogle produkter i vores katalog.
                </v-card-subtitle>
            </v-card>

            <v-row v-if="products.length != 0">
                <!-- //-- ------ Prints out every product in all of our products on our site in v-for in our obj/data  -------------  --> 
                <v-col
                    v-for="( product, index ) in products"
                    :key="index"
                    cols="12"
                    xs="12"
                    sm="6"
                    md="5"
                    lg="3"
                    xl="2"
                    class="px-2 my-0 productCols"
                >
                    <v-card
                        height="100%"
                        class="pa-5 mb-0 productCard"
                        outlined
                        tile
                        :to="`/products/`+ product._id"
                    >
         <!---------- Prints every picture for our products and syling  -------------  -->
                        <div style="position:relative;">
                            <v-img
                                :aspect-ratio="1/1"
                                :src="product.Thumbnail"
                                contain
                                class="productImage"
                            ></v-img>
                        </div>
  <!---------- Our information about the product below the picture  -------------  -->
                        <v-card-title
                            class="productTitle text-truncate pb-2 px-0"
                        >
                            {{ product.Name }}
                        </v-card-title>
                        <v-card-text class="pa-0 pt-0 text-caption text-truncate truncate-2">
                            {{ product.LowerHeader }}
                            <br>
                            <div class="pt-3">
                                <v-icon :color="ReturnAvailabilityColor( product.Stock )" dense>mdi-checkbox-blank-circle</v-icon> {{ product.Stock }} stk på lager
                            </div>
                        </v-card-text>

 <!---------- Buttom link for inspectiting the produc and more information -------------  -->
                        <v-card-actions class="px-0 pb-0">
                            <v-card-subtitle class="px-0 py-0">
                                Kun <b>{{ product.Price }}</b>,- 
                            </v-card-subtitle>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="#F7941D"
                                class="mb-0"
                                text
                                
                            >
                                Læg i kurv
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <div class="text-center mt-5">
                <v-pagination
                    v-model="Page"
                    :length="PagesTotal"
                    :total-visible="5"
                ></v-pagination>
            </div>
        </v-card>
    </div>
</template>

<script>

import { GetAllProductsBody } from '@/Services/ProductApi';

export default {
    methods: {
        //----------------- Returns stock color if above 10 is green, 10 or less its yellow, red is the stock is 0------------------------
        ReturnAvailabilityColor: function( amount ) {
            if( amount > 10 ) return this.AvailabilityColors[2];
            if( amount <= 10 && amount > 0 ) return this.AvailabilityColors[1];
            if( amount >= 0 ) return this.AvailabilityColors[0];
        },
    },
    data() {
    //---------- Gets all our products in a array  -------------  
        return {
            meta: this.$route.meta,
            products: [],
            AvailabilityColors: [ 'red', 'amber', 'green' ],
            Page: 1,
            PagesTotal: 50
        }
    },

    mounted: function() {
//---------- Gets all our products and then we print out every products details in a obj and push them, rendreing them on the site with mounted  -------------  
        GetAllProductsBody()
        .then( res => {
            const obj = res.Products;

            obj.forEach( element => {
                if( element.isActive ) {
                    this.products.push({
                        _id: element._id,
                        Stock: element.Stock,
                        Name: element.Name,
                        LowerHeader: element.LowerHeader,
                        Price: element.Price,
                        SalePercentage: element.SalePercentage,
                        Thumbnail: element.Thumbnail,
                    });
                }
            });

        })
        .catch( err => {
            console.log( err.response.data.Message );
        });

        console.log(this.$route.params.category)
    }
}
</script>

<style scoped>
 /* ------ Style Components for all Products site  -------------    */
    .productImage {
        /* background-color: #212121; */
        /* border-top-left-radius: 4px;
        border-top-right-radius: 4px; */
    }

    .productCols {
        flex-basis: 32em;
        flex-grow: .2;
    }

    .productCard {
        border: 3px solid rgba(0,0,0,.12);
        transition: border 200ms ease;

        /* border-radius: 0 !important; */
    }

    .productCard:hover, 
    .productCard:focus {
        border: 3px solid rgba(247, 149, 29, .8);
    }

    .productTitle {
        display: block;
    }

    .truncate-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: unset !important;
        display: -webkit-box;
    }
</style>