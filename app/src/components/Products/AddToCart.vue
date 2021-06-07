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
    props: ['data'],
    methods: {
        AddProduct: function( quantity ) {
            AddToCart( { 
                _id: this.data._id, 
                Quantity: quantity,
                Thumbnail: this.data.Thumbnail,
                Price: this.data.Price,
                LowerHeader: this.data.LowerHeader,
                Name: this.data.Name
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