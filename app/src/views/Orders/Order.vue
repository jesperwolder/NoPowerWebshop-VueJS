<template>
    <v-card
        flat
        class="mx-auto mw"
        style="max-width:1000px !important;"
    >
        <v-card-title class="font-weight-regular text-h4">Ordre #{{ $route.params.id }}</v-card-title>

        <v-card-text>
            <v-row no-gutters>
                <v-col
                    cols="6"
                    md="6"
                >
                    <h2 class="font-weight-regular text--primary pb-5">Fakturerings-adresse</h2>
                    <ul style="list-style-type: none;padding: 0 0 0 .7em;">
                        <li>{{ OrderData.Billing.Fullname }}</li>
                        <li>{{ OrderData.Billing.Email }}</li>
                        <li>{{ OrderData.Billing.Phone }}</li>
                        <li>{{ OrderData.Billing.Address }}</li>
                    </ul>
                </v-col>

                <v-col
                    cols="6"
                    md="6"
                >
                    <h2 class="font-weight-regular text--primary pb-5">Betalingsoplysninger</h2>

                    <ul style="list-style-type: none;padding: 0 0 0 .7em;">
                        <li>Samlet beløb {{ TotalPrice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} kr</li>
                        <li><small class="font-italic font-weight-regular text--secondary">Heraf moms (25%) {{ ( TotalPrice * .20 ).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</b> kr</small></li>
                        <li>Betalingsmetode: <b>Ingen</b></li>
                    </ul>
                </v-col>
            </v-row>

            <v-divider class="pb-3 mt-4"></v-divider>

            <h2 class="font-weight-regular text--primary">Produkter</h2>

            <v-col cols="12">
                <v-card v-for="(item, index) in OrderData.Products" :key="index" flat :class="`pb-0`+ ( index + 1 < OrderData.Products.length ? '' : ' mb-0')">
                    <v-row
                        no-gutters
                        class="py-5 pb-0"
                    >
                        <v-col 
                            cols="2"
                            sm="2"
                            md="2"
                            lg="2"
                            class=""
                        >
                            <v-img contain avatar :aspect-ratio="1/1" :src="item.Thumbnail"></v-img>
                        </v-col>

                        <v-col
                            class="px-5"
                            cols="10"
                            sm="10"
                            md="7"
                            lg="7"
                        >
                            <div class="text-h5 text--primary text-truncate">
                                {{ item.Name }}
                            </div>
                            <div class="text-h6 text--secondary text-truncate">
                                {{ item.LowerHeader }}
                            </div>
                        </v-col>

                        <v-col
                            cols="6"
                            order="2"
                            order-md="1"
                            sm="6"
                            md="1"
                            lg="1"
                            class="pt-10 pt-md-0"
                        >
                            {{ item.Quantity }}
                        </v-col>

                        <v-col
                            cols="6"
                            order="1"
                            order-md="2"
                            sm="6"
                            md="2"
                            lg="2"
                            class="text-left text-md-right pt-10 pt-md-0"
                        >
                            <h5>Pris pr. stk</h5>
                            {{ item.Price }} kr <br><br>

                            <h5>Totalt</h5>
                            {{ item.Price * item.Quantity }} kr
                        </v-col>
                    </v-row>

                    <v-divider v-if="index + 1 < OrderData.Products.length"></v-divider>
                </v-card>
            </v-col>
        </v-card-text>
    </v-card>
</template>

<script>
import { GetSingleOrderBody } from '@/Services/OrdersApi';

export default {
    data() {
        return {
            OrderData: [],
            TotalPrice: 0
        }
    },
    mounted: function() {
        GetSingleOrderBody( this.$route.params.id )
        .then( res => {
            this.OrderData = res.Order;

            this.OrderData.Products.forEach( item => {
                this.TotalPrice += ( item.Price * item.Quantity )
            })
        })
        .catch( err => {
            console.log( err.response );
        });
    }
}
</script>

<style>

</style>