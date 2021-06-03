<template>
	<div>
		<v-card>
			<v-card-text>
				<v-row no-gutters>
					<v-col class="text-h6">
						Samlet beløb
					</v-col>
					<v-col class="text--primary text-right">
						<h2>{{ totalPrice.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} kr </h2>
						<small class="font-italic font-weight-regular text--secondary">Heraf moms (25%) {{ ( totalPrice * .20 ).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</b> kr</small>
					</v-col>
				</v-row>
				{{ $globalData.CartCount }} produkt{{ ( $globalData.CartCount == 1 ? '' : 'er' ) }}
			</v-card-text>

			<v-card-actions v-if="$globalData.CartCount > 0">
				<v-btn
					color="#F7941D"
					block
					text
					@click="goToCheckout"
				>
					Gå til kassen
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
export default {
	props: ['totalPrice'],

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
			this.$router.push({ name: 'CheckOut' })
		}
	}
}
</script>