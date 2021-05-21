<template>
    <div>
        <v-card
            class="pa-5 ma-0"
            elevation="2"
        >
        <!---------- Our all products site -------------  --> 
            <h1>{{ meta.title }}</h1>

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
                    cols="auto"
                    xs="12"
                    sm="6"
                    md="4"
                    lg="3"
                    xl="2"
                    class="px-2 my-0 productCols"
                >
                    <v-card
                        height="100%"
                        class="pb-0 mb-0 productCard rounded-lg"
                        outlined
                    >
         <!---------- Prints every picture for our products and syling  -------------  -->
                        <div style="position:relative;">
                            <v-btn
                                elevation="2"
                                fab
                                absolute
                                right
                                small
                                bottom
                            >
                                <v-icon>mdi-heart-outline</v-icon>
                            </v-btn>
                            <v-img
                                height="20rem"
                                :src="product.Thumbnail"
                                contain
                                class="productImage"
                            ></v-img>
                        </div>
  <!---------- Our information about the product below the picture  -------------  -->
                        <v-card-title
                            class="productTitle text-truncate"
                        >
                            {{ product.Name }}
                        </v-card-title>
                        <v-card-subtitle class="pb-0 text-caption text-truncate truncate-2">
                            {{ product.Description }}
                        </v-card-subtitle>
                        <v-card-subtitle class="pt-2">
                            Kun <b>{{ product.Price }}</b>,- 
                        </v-card-subtitle>
 <!---------- Buttom link for inspectiting the produc and more information -------------  -->
                        <v-card-actions>
                            <v-btn
                                color="#F7941D"
                                class="mb-0"
                                text
                                :to="`/products/`+ product._id"
                            >
                                Til produkt
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>

import { GetAllProductsBody } from '@/Services/ProductApi';
import { GlobalProducts } from '@/Services/GlobalVariables';

export default {
     //---------- uhm what does this do?  -------------  
    methods: {
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
        }
    },
    data() {
    //---------- Gets all our products in a array  -------------  
        return {
            meta: this.$route.meta,
            products: []
        }
    },

    mounted: function() {
        console.log(this.$route.params.category)
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
                        Description: element.Description,
                        Price: element.Price,
                        SalePercentage: element.SalePercentage,
                        Thumbnail: element.Thumbnail,
                    });
//---------- Categories (Jesper) -------------  
                    element.Categories.forEach( cat => {
                        if( !GlobalProducts.Categories.includes( cat ) ) {
                            GlobalProducts.Categories.push( cat );
                        }
                    } )
                }
            });

            console.log( GlobalProducts.Categories )

        })
        .catch( err => {
            console.log( err.response.data.Message );
        });
    }
}
</script>

<style scoped>
 /* ------ Style Components for all Products site  -------------    */
    .productImage {
        background-color: #212121;
    }

    .productCols {
        flex-basis: 32em;
        flex-grow: .2;
    }

    .productCard {
        border-bottom: 3px solid rgba(0,0,0,.2)
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