<template>
    <v-card
        class="pa-5 ma-0 mx-auto mw"
        elevation="2"
    >
        <!-- Alerts -->
        <Alerts 
            :isActive="Product.isActive"
            :Stock="Product.Stock"
            :msg="msg"
        />

        <!----------------- Product headings on inscepting product ------------------------>
        <v-card-title class="headline px-0 pt-0">
            {{ Product.Name }}
        </v-card-title>
        <v-card-subtitle class="px-0">
            {{ Product.LowerHeader }}
        </v-card-subtitle>

        <v-row>
            <v-col
                cols="12"
                sm="12"
                md="8"
            >
    <!----------------- Switches automatikcly pictures when you inscept product ------------------------>
                <Slideshow 
                    :Slides="Slides"
                />
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
                        {{ Product.Price }},-
                    </v-card-title>
                    <v-card-subtitle class="px-0">
                        + 39,- fragt
                    </v-card-subtitle>
                    <v-card-actions class="pa-0">
        <!----------------- Bottons buying or removing from cart ------------------------>
                        <div v-if="Product.Stock != 0">
                            <AddToCartBtn
                                :data="Product"
                            />
                        </div>
                        <div v-else>
                            <v-btn
                                disabled
                                class="mb-0"
                            >
                                Produktet er udsolgt
                            </v-btn>
                        </div>
                    </v-card-actions>

                    <v-card-text class="px-0 pb-0">
        <!----------------- Checks the stock on the product ------------------------>
                        <AvailabilityIcon :Stock="Product.Stock" />
                    </v-card-text>
                </v-card>

                <Categories 
                    :data="Product.Categories"
                />
            </v-col>
        </v-row>

        <v-divider class="my-5"></v-divider>

        <v-row>
            <v-col 
                cols="6"
                sm="12"
                md="6"
            >
                <TechnicalDetails 
                    :data="Product.TechnicalDetails"
                />
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
                        {{ Product.Description }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import { AddToCart, GetCart, GetCartCount, GetCartTotal } from '@/Services/GlobalMethods';
import Alerts from './Product/Alerts';
import TechnicalDetails from './Product/TechnicalDetails';
import Categories from './Product/Categories';
import Slideshow from './Product/Slideshow';
import AvailabilityIcon from './Product/AvailabilityIcon';
import AddToCartBtn from './AddToCart';

export default {
    props: ['Product', 'Slides'],
    components: {
        Alerts,
        TechnicalDetails,
        Categories,
        Slideshow,
        AddToCartBtn,
        AvailabilityIcon
    },
    data() {
        return {
            msg: [],
        }
    },
    methods: {
        
        AddProduct: function( quantity ) {
            AddToCart( { 
                _id: this.Product._id, 
                Quantity: quantity,
                Thumbnail: this.Product.Thumbnail,
                Price: this.Product.Price,
                LowerHeader: this.Product.LowerHeader,
                Name: this.Product.Name
            } );
            this.$globalData.CartCount = GetCartCount();
            this.$globalData.CartTotal = GetCartTotal();
            this.$globalData.Cart = GetCart();
            this.msg.push('Produktet blev føjet til indkøbskurven 😁 👍')
        },
    }
}
</script>

<style>
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