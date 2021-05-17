<template>
  <v-container>
    <v-row>
      <v-col sm="10" offset-sm="5" xl="5" offset-xl="2">
        <ProductList />
      </v-col>
      <v-col sm="4" xl="3">
        <CheckoutBox />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductList from '@/components/Cart/ProductList.vue'
import CheckoutBox from '@/components/Cart/CheckoutBox.vue'
export default {
  components: {
    ProductList,
    CheckoutBox
  }
}
</script>