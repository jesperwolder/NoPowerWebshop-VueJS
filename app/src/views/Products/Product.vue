<template>
    <v-card
        class="pa-5 ma-0"
        elevation="2"
    >
        <h1>{{ $route.path }}</h1>
        {{ meta.breadcrumb[2].name }}
        {{ this.$route.meta.breadcrumb.length - 1 }}
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
            CS: CurrentSession,
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

    method: {

    }
}
</script>

<style>

</style>