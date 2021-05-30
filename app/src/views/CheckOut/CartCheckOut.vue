<template>
<!-- The Cartcheckout with items and final price and then the stepper afterwards if you click sumbit -->
	<v-container class="pa-0 mx-auto mw" fluid>
		<v-row>
			<v-col cols="12" sm="12" md="8" lg="8" xl="9">
				<ProductList :title="meta.title" :products="this.$globalData.Cart" />
			</v-col>
			<v-col cols="12" sm="12" md="4" lg="4" xl="3">
				<CheckoutBox :totalPrice="$globalData.CartTotal" />
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
			TotalPrice: 0,
		}
	},
}
</script>