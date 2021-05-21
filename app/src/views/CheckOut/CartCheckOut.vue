<template>
  <v-container class="pa-0" fluid>
    <v-row>
      <v-col cols="12" sm="8">
        <ProductList :title="meta.title" />
      </v-col>
      <v-col cols="12" sm="4">
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
  },
  data() {
    return {
      meta: this.$route.meta,
    }
  }
}
</script>