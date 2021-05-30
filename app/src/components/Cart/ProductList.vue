<template>
	<v-card
		class="pa-4 mb-0"
	>
		<h1 class="font-weight-regular">{{ title }}</h1>
		
		<v-divider class="pb-8 mt-3"></v-divider>

		<div v-if="CartProducts.length == 0" class="pt-5 text-center">
			<div class="text-h1">ಠ▃ಠ</div><br>
			<h1 class="font-weight-light">Ingen produkter i kurven</h1>
		</div>
  		
		<v-card v-for="(product, index) in CartProducts" :key="index" flat :class="`pb-0`+ ( index + 1 < CartProducts.length ? '' : ' mb-0')">

			<v-row
				no-gutters
				class="py-5 pb-0"
			>

				<v-col 
					cols="2"
					sm="2"
					md="2"
					lg="2"
					class=""
				>
					<v-img contain avatar :aspect-ratio="1/1" :src="product.Thumbnail"></v-img>
				</v-col>

				<v-col
					class="px-5"
					cols="10"
					sm="10"
					md="7"
					lg="7"
				>
					<div class="text-h5 text--primary text-truncate">
						{{ product.Name }}
					</div>
					<div class="text-h6 text--secondary text-truncate">
						{{ product.LowerHeader }}
					</div>
				</v-col>

				<v-col
					cols="6"
					order="2"
					order-md="1"
					sm="6"
					md="1"
					lg="1"
					class="pt-10 pt-md-0"
				>
					<v-text-field 
						outlined
						dense
						label="Antal" 
						type="number" 
						reverse 
						v-model="product.Quantity"
						min="1"
						:onchange="CartUpdate()"
						style="width:4em;"
					></v-text-field>
				</v-col>

				<v-col
					cols="6"
					order="1"
					order-md="2"
					sm="6"
					md="2"
					lg="2"
					class="text-left text-md-right pt-10 pt-md-0"
				>
					<h5>Pris pr. stk</h5>
					{{ product.Price }} kr <br><br>

					<h5>Totalt</h5>
					{{ product.Price * product.Quantity }} kr
				</v-col>
			</v-row>

			<v-card-actions :class="`px-0` + ( index + 1 < CartProducts.length ? ' pb-5' : ' pb-0')">
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

			<v-divider v-if="index + 1 < CartProducts.length"></v-divider>
		</v-card>

  	</v-card>
</template>

<script>
// -------- imports globalmethodes updatecart getcart and removeitemfromcart  ------------------
	import { UpdateCart, RemoveItemFromCart, GetCart, GetCartCount, GetCartTotal } from '@/Services/GlobalMethods';

	export default {
		props: ['title', 'products'],

// -------- Get product in a array ------------------
		data: () => ({
			CartProducts: []
		}),

		mounted: function() {
			this.CartProducts = this.products
		},
//------updates the cartcashout the product or quantity everytime we change the quantity in the texfield---------
		methods: {
			CartUpdate: function() {
				let cart = [];

				this.CartProducts.forEach( item => {
					cart.push({
						_id: item._id, 
						Quantity: parseInt(item.Quantity),
						Thumbnail: item.Thumbnail,
						Price: item.Price,
						LowerHeader: item.LowerHeader,
						Name: item.Name
					});
				});

				UpdateCart( cart );

				this.$globalData.CartCount = GetCartCount();
				this.$globalData.CartTotal = GetCartTotal();
            	this.$globalData.Cart = GetCart();
			},
//------- Removes the product on ID, this happens on bottom event click ---------
			RemoveProduct: function( id ) {
				this.products.splice( this.products.findIndex( x => x._id === id ), 1 );
				RemoveItemFromCart( id );

				this.$globalData.CartCount = GetCartCount();
				this.$globalData.CartTotal = GetCartTotal();
            	this.$globalData.Cart = GetCart();
				
				this.CartProducts = this.$globalData.Cart;
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