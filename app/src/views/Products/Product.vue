<template>
    <v-card
        class="pa-5 ma-0"
        elevation="2"
    >
        <!-- Alerts -->
        <v-alert
            type="warning"
            text
            v-if="!product.isActive"
        >
            Dette produkt findes ikke længere i vores sortiment.
        </v-alert>
<!------------ our alet v-if the stock is 0 or is not active-------------   -->
        <v-alert
            type="info"
            text
            prominent
            v-if="product.Stock == 0 && product.isActive"
        >
        <!------------ I our alert has been trigged is display this message-------------   -->
            <v-row align="center">
                <v-col class="grow">
                    Dette produkt er desværre udsolgt!
                </v-col>
                <v-col class="shrink">
                    <v-tooltip top transition="scroll-y-reverse-transition">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                                v-bind="attrs"
                                v-on="on"
                                dense 
                                href="https://i2.wp.com/totalsportsblog.com/wp-content/uploads/2014/01/kid-w-middle-finger.jpg?ssl=1" 
                                target="_blank"
                            >
                                Se mere
                            </v-btn>
                        </template>
                        <span>Klik her for at se mere information omkring, hvornår produktet forventes at være på lager igen.</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-alert>

        <!----------------- Product headings on inscepting product ------------------------>
        <v-card-title class="headline px-0 pt-0">
            {{ product.Name }}
        </v-card-title>
        <v-card-subtitle class="px-0">
            {{ product.LowerHeader }}
        </v-card-subtitle>

        <v-row>
            <v-col
                cols="12"
                sm="12"
                md="8"
            >
    <!----------------- Switches automatikcly pictures when you inscept product ------------------------>
                <v-carousel
                    cycle
                    height="auto"
                    hide-delimiter-background
                    show-arrows-on-hover
                    class="caro"
                > 
                    <v-responsive :aspect-ratio="4/3">
                        <v-carousel-item
                            v-for="( slide, index ) in slides"
                            :key="index"
                        >
                            <v-img contain :src="slide" :aspect-ratio="4/3"></v-img>
                        </v-carousel-item>
                    </v-responsive>
                </v-carousel>
            </v-col>
            <v-col
                cols="12"
                sm="12"
                md="4"
            >
            <!----------------- Price box on the right side ------------------------>
                <v-card
                    outlined
                    class="pa-5"
                >
                    <v-card-title class="headline px-0 pt-0">
                        {{ product.Price }},-
                    </v-card-title>
                    <v-card-subtitle class="px-0">
                        + 39,- fragt
                    </v-card-subtitle>
                    <v-card-actions class="pa-0">
        <!----------------- Bottons buying or removing from cart ------------------------>
                        <v-btn
                            color="#F7941D"
                            class="mb-0"
                            text
                            @click="AddProduct(1)"
                        >
                            Læg i indkøbskurven
                        </v-btn>
                    </v-card-actions>
                    <v-card-text class="px-0 pb-0">
        <!----------------- Checks the stock on the product ------------------------>
                        <v-icon :color="ReturnAvailabilityColor( product.Stock )">mdi-checkbox-blank-circle</v-icon> {{ product.Stock }} stk på lager
                    </v-card-text>
                </v-card>

                <v-card flat>
                    <v-card-title class="pa-0 pb-2">
                        Kategori(er)
                    </v-card-title>
                    <v-card-text class="px-0 pt-0">
     <!----------------- Prints out every category on cat ------------------------>
                        <v-chip
                            outlined
                            link
                            class="mr-2 mb-2"
                            small
                            v-for="( cat, index ) in product.Categories"
                            :key="index"
                            :to="`/products/?category=` + cat"
                        >
                            {{ cat }}
                        </v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-divider class="my-5"></v-divider>

        <v-row>
            <v-col 
                cols="6"
                sm="12"
                md="6"
            >
                <v-card
                    outlined
                >
  <!----------------- Our header technicol details left side ------------------------>                
                    <v-card-title class="tech-header">
                        Tekniske detaljer
                    </v-card-title>
                    <v-card-text class="mt-5 pb-0">
                        <v-card
                            outlined 
                            v-for="( details, index ) in product.TechnicalDetails"
                            :key="index"
                            class="tech-item"
                        >
                            <v-card-title class="px-5 my-0 text-subtitle-1 tech-header">{{ details.Header }}</v-card-title>
                            <v-divider class=""></v-divider>
                            <v-row
                                no-gutters
                                v-for="( item, index_items ) in details.Items"
                                :key="index_items"
                                class="tech-items"
                                tile
                            >
                                <v-col
                                    cols="6"
                                    outlined
                                    class="tech-item-name"
                                >
                                    {{ item.Name }}
                                </v-col>
                                <v-col
                                    cols="6"
                                >
                                    {{ item.Value }}
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col 
                cols="6"
                sm="12"
                md="6"
            >
<!----------------- Product information right side  ------------------------>     
                <v-card outlined>
                    <v-card-title>
                        Produkt beskrivelse
                    </v-card-title>
                    <v-card-text>
                        {{ product.Description }}
                    </v-card-text>
                </v-card>
                <v-card outlined>
                    <v-card-title>
                        Kunder kiggede også på disse produkter
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>

import { GetProductBody } from '@/Services/ProductApi';
import { CurrentSession } from '@/Services/GlobalVariables';
import { AddToCart, RemoveItemFromCart } from '@/Services/GlobalMethods';
//----------------- Imported methods Getproduct, and functionalty AddToCart and RemoveFromCart  ------------------------
export default {
    data() {
//----------------- Gets the _id, metalink, Products in a array, slides, current session and Availabillitycoloers on stock  ------------------------
        return {
            _id: this.$route.params.id,
            meta: this.$route.meta,
            product: [],
            slides: [],
            CS: CurrentSession,
            AvailabilityColors: [ 'red', 'amber', 'green' ]
        }
    },
//----------------- Mounted function that get the correct product by id, meta title, our images and slide function, and our breadcrumb ------------------------
    mounted: function() {
        GetProductBody( this.$route.params.id )
        .then( res => {
            this.product = res.Products[0];
            this.$route.meta.title = this.product.Name
            this.slides = this.product.Images
            this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length - 1].name = this.product.Name
            this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length - 1].to = this.$route.path
        })
        .catch( err => {
            const res = err.response;
//----------------- If the sites goes down------------------------
            if( res.status === 404 ) {
                CurrentSession.PageFound = false;
            }
        });
    },

    watch: {
        $route() {
            this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length - 1].name = this.product.Name
        }
    },

    methods: {
//----------------- Returns stock color if above 10 is green, 10 or less its yellow, red is the stock is 0------------------------
        ReturnAvailabilityColor: function( amount ) {
            if( amount > 10 ) return this.AvailabilityColors[2];
            if( amount <= 10 && amount > 0 ) return this.AvailabilityColors[1];
            if( amount >= 0 ) return this.AvailabilityColors[0];
        },
//----------------- Add to cart method adds the id by the product and adds 1 in quantity and keeps adding 1 in quantity in another method if the id is the same------------------ 
        AddProduct: function( quantity ) {
            console.log( AddToCart( { _id: this.product._id, Quantity: quantity } ) );
        },
//----------------- Removes the product in the cart, other methed removes the id by 1 in quantity------------------
        RemoveProduct: function() {
            RemoveItemFromCart( this.product._id );
        }
    }
}
</script>

<style scoped>
/* ----------------- Style components------------------  */
    .tech-header {
        background-color: rgba(247, 148, 29, .1);
    }

    .tech-item .tech-items {
        border-bottom: 1px solid transparent;
    }

    .tech-item.theme--dark .tech-items,
    .tech-item.theme--dark .tech-items .tech-item-name {
        border-color: rgba(255, 255, 255, 0.12);
    }

    .tech-item.theme--light .tech-items,
    .tech-item.theme--light .tech-items .tech-item-name {
        border-color: rgba(0, 0, 0, 0.12);
    }

    .tech-item .tech-items:last-child {
        border: 0;
    }

    .tech-items .col {
        padding: 1em !important;
    }

    .tech-item-name {
        border-right: 1px solid transparent;
    }

    .caro {
        border-radius: 4px;
    }

    .caro.theme--dark {
        border: 1px solid rgba(255, 255, 255, 0.12);
        background-color: var(--c-dark-header);
    }

    .caro.theme--light {
        border: 1px solid rgba(0, 0, 0, 0.12);
        background-color: var(--c-light-header);
    }
</style>