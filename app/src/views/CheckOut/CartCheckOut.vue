<template>
  <v-container>
    <v-row>
      <v-col sm="4" offset-sm="2" xl="4" offset-xl="2">
        <div>
    <v-card
      outlined
    >
      <v-card-title>Payment Details</v-card-title>

      <v-card-text>
        <p>Total: $999</p>
        <v-btn
          color="primary"
          @click="goToCheckout"
        >
          Checkout
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
      </v-col>
      <v-col sm="4" xl="3" order="first" order-sm="last">
                    <div>
                <v-row v-for="(product, i) in products" :key="i">
                <HorizontalProduct
                    :product="product"
                    :i="i"
                    :updateCart="removeFromCart"
                    btnAction="remove"
                />
                </v-row>
            </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      checkoutForm: null,
      nameRules: [],
      name: '',
      emailRules: [],
      email: ''
    }
  },
  methods: {
    goToCheckout() {
      this.$router.push({ name: 'checkout' })
    }
  }
}
</script>