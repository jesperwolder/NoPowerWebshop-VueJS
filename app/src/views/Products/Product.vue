<template>
    <ProductPage
        :Product="product"
        :Slides="slides"
    />
</template>

<script>

import ProductPage from '@/components/Products/ProductPage'

import { GetProductBody } from '@/Services/ProductApi';
import { CurrentSession } from '@/Services/GlobalVariables';
import { AddToCart, RemoveItemFromCart, GetCart, GetCartCount, GetCartTotal } from '@/Services/GlobalMethods';
//----------------- Imported methods Getproduct, and functionalty AddToCart and RemoveFromCart  ------------------------
export default {
    components: {
        ProductPage
    },

    data() {
//----------------- Gets the _id, metalink, Products in a array, slides, current session and Availabillitycoloers on stock  ------------------------
        return {
            _id: this.$route.params.id,
            meta: this.$route.meta,
            product: [],
            slides: [],
            msg: [],
            CS: CurrentSession,
        }
    },
//----------------- Mounted function that get the correct product by id, meta title, our images and slide function, and our breadcrumb ------------------------
    mounted: function() {
        GetProductBody( this.$route.params.id )
        .then( res => {
            this.product = res.Products[0];
            this.$route.meta.title = this.product.Name
            this.slides = this.product.Images
        })
        .catch( err => {
            const res = err.response;
//----------------- If the sites goes down------------------------
            if( res.status === 404 ) {
                CurrentSession.PageFound = false;
            }
        });
    },

    methods: {
//----------------- Add to cart method adds the id by the product and adds 1 in quantity and keeps adding 1 in quantity in another method if the id is the same------------------ 
        
    }
}
</script>