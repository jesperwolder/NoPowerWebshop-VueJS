<template>
	<v-card
		class="mb-5 pa-4"
	>
		<h1 class="pb-5">{{ title }}</h1>
		<v-divider></v-divider>
  		
		<v-card v-for="(product, index) in products" :key="index" flat :class="`pb-0`+ ( index + 1 < products.length ? '' : ' mb-0')">

			<v-row
				no-gutters
				class="py-5 pb-0"
			>

				<v-col 
					cols="2"
				>
					<v-img contain avatar :aspect-ratio="1/1" :src="product.Thumbnail"></v-img>
				</v-col>

				<v-col
					cols="7"
					class="px-5"
				>
					<div class="text-h5 text--primary text-truncate">
						{{ product.Name }}
					</div>
					<div class="text-h6 text--secondary text-truncate">
						{{ product.LowerHeader }}
					</div>
				</v-col>

				<v-col
					cols="1"
				>
					<v-text-field 
						outlined
						label="Quantity" 
						type="number" 
						reverse 
						v-model="product.Quantity"
						min="1"
						:onchange="CartUpdate()"
					></v-text-field>
				</v-col>

				<v-col
					cols="2"
					class="text-right"
				>
					<h5>Pris pr. stk</h5>
					{{ product.Price }} kr <br><br>

					<h5>Totalt</h5>
					{{ product.Price * product.Quantity }} kr
				</v-col>
			</v-row>

			<v-card-actions :class="`px-0` + ( index + 1 < products.length ? ' pb-5' : ' pb-0')">
				<v-spacer></v-spacer>
				<v-btn
					color="error"
					class="ml-4"
					text
					small
					@click="RemoveProduct(product._id)"
				>
					<v-icon small class="pr-2">mdi-minus</v-icon> Fjern
				</v-btn>
			</v-card-actions>

			<v-divider v-if="index + 1 < products.length"></v-divider>
		</v-card>

  	</v-card>
</template>

<script>
// -------- imports globalmethodes updatecart getcart and removeitemfromcart  ------------------
	import { UpdateCart, RemoveItemFromCart, GetCartCount } from '@/Services/GlobalMethods';

	export default {
// -------- Get product in a array ------------------
		data: () => ({
			//products: [],
		}),

		props: ['title', 'products'],

		mounted: function() {
		
		},
//------updates the cartcashout the product or quantity everytime we change the quantity in the texfield---------
		methods: {
			CartUpdate: function() {
				let cart = [];

				this.products.forEach( item => {
					cart.push({
						_id: item._id,
						Quantity: parseInt(item.Quantity)
					});
				});

				UpdateCart( cart );

				this.$globalData.CartCount = GetCartCount();
			},
//------- Removes the product on ID, this happens on bottom event click ---------
			RemoveProduct: function( id ) {
				this.products.splice( this.products.findIndex( x => x._id === id ), 1 );
				RemoveItemFromCart( id );
			}
		}
	}
</script>

<style scoped>
	.truncate-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: unset !important;
        display: -webkit-box;
    }
</style>