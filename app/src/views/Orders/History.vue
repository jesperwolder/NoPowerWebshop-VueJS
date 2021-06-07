<template>
    <v-card
        elevation="2"
        class="mx-auto mw pa-5"
    >
        <h1 class="font-weight-regular text--primary">{{ meta.title }}</h1>
        <div class="font-weight-regular text--secondary">Her er en oversigt over alle ordre bundet til din bruger 👍 </div>

        <v-divider class="mt-5 pb-5"></v-divider>

        <div>
            <v-card flat tile color="grey" dense>
                <v-card-title class="font-weight-regular text-caption">
                    <v-row no-gutters>
                        <v-col
                            cols="2"
                        >
                            Status
                        </v-col>
                        <v-col cols="6">
                            Produkter
                        </v-col>
                        <v-col cols="2">
                            Pris
                        </v-col>
                        <v-col cols="2">
                            
                        </v-col>
                    </v-row>
                </v-card-title>
            </v-card>

            <v-card
                flat
                color="transparent"
                v-for="( item, index ) in Orders"
                :key="index"
            >
                <v-row no-gutters>
                    <v-col
                        cols="2"
                    >
                        {{ item.Status }}
                    </v-col>
                    <v-col cols="6">
                        <ul>
                            <li 
                                v-for="( product, index2 ) in item.Products"
                                :key="index2"
                            >
                                {{ product.Quantity }}x {{ product.Name }}
                            </li>
                        </ul>
                    </v-col>
                    <v-col cols="2">
                        {{ CalculateTotal( item.Products ).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} kr
                    </v-col>
                    <v-col cols="2">
                        <v-btn
                            color="#F7941D"
                            :to="`/order/` + item._id"
                        >
                            Se ordre
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider class="mt-5 pb-5"></v-divider>
            </v-card>

        </div>
    </v-card>
</template>

<script>
import { GetUserOrdersBody } from '@/Services/OrdersApi';

export default {
    data() {
        return {
            meta: this.$route.meta,
            Orders: []
        }
    },
    mounted: function() {
        GetUserOrdersBody( this.$cookies.get( 'jwt' ) )
        .then( res => {
            this.Orders = res.Orders;
        })
        .catch( err => {
            console.log( err.response )
        })
    },
    methods: {
        CalculateTotal: function( Products ) {
            let total = 0;
            
            Products.forEach( el => {
                total += ( el.Price * el.Quantity );
            })

            return total;
        }
    }
}
</script>