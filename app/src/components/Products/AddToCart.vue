<template>
    <v-btn
        color="#F7941D"
        class="mb-0"
        text
        @click="AddProduct(1)"
    >
        Læg i indkøbskurven
    </v-btn>
</template>

<script>
import { AddToCart, GetCart, GetCartCount, GetCartTotal } from '@/Services/GlobalMethods';

export default {
    props: ['product'],
    methods: {
        AddProduct: function( quantity ) {
            AddToCart( { 
                _id: this.product._id, 
                Quantity: quantity,
                Thumbnail: this.product.Thumbnail,
                Price: this.product.Price,
                LowerHeader: this.product.LowerHeader,
                Name: this.product.Name
            } );
            this.$globalData.CartCount = GetCartCount();
            this.$globalData.CartTotal = GetCartTotal();
            this.$globalData.Cart = GetCart();
            //this.msg.push('Produktet blev føjet til indkøbskurven 😁 👍')
        },
    }
}
</script>

<style>

</style>