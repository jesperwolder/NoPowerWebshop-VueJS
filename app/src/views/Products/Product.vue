<template>
    <v-card
        class="pa-5 ma-0"
        elevation="2"
    >
        <v-card-title class="headline px-0 pt-0">
            {{ product.Name }}
        </v-card-title>
        <v-card-subtitle class="px-0">
            {{ product.Description }}
        </v-card-subtitle>    

        <v-row
            no-gutters
        >
            <v-col
                cols="6"
                sm="12"
                md="8"
                class="pr-5"
            >
                <v-carousel
                    cycle
                    height="300"
                    hide-delimiter-background
                    show-arrows-on-hover
                >
                    <v-carousel-item
                        v-for="( slide, index ) in slides"
                        :key="index"
                    >
                        {{ slide }}
                    </v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col
                cols="6"
                sm="12"
                md="4"
            >
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
                        <v-btn
                            color="#F7941D"
                            class="mb-0"
                            text
                            :to="`/products/`+ product._id"
                        >
                            Læg i indkøbskurven
                        </v-btn>
                    </v-card-actions>
                    <v-card-text class="px-0 pb-0">
                        <v-icon :color="ReturnAvailabilityColor( product.Stock )">mdi-checkbox-blank-circle</v-icon> {{ product.Stock }} stk på lager
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col
                cols="6"
            >
                More content
            </v-col>
        </v-row>

        <v-divider></v-divider>
    </v-card>
</template>

<script>

import { GetProductBody } from '@/Services/ProductApi';
import { CurrentSession } from '@/Services/GlobalVariables';

export default {
    data() {
        return {
            _id: this.$route.params.id,
            meta: this.$route.meta,
            product: [],
            slides: [
                "hey",
                "x"
            ],
            CS: CurrentSession,
            AvailabilityColors: [ 'red', 'amber', 'green' ]
        }
    },

    mounted: function() {
        GetProductBody( this.$route.params.id )
        .then( res => {
            this.product = res.Product;
            this.$route.meta.title = this.product.Name
            this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length - 1].name = this.product.Name
            this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length - 1].to = this.$route.path
        })
        .catch( err => {
            const res = err.response;

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
        ReturnAvailabilityColor: function( amount ) {
            if( amount > 10 ) return this.AvailabilityColors[2];
            if( amount <= 10 && amount > 0 ) return this.AvailabilityColors[1];
            if( amount >= 0 ) return this.AvailabilityColors[0];
        }
    }
}
</script>

<style>

</style>