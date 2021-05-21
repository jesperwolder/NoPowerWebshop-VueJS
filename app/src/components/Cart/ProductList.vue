<template>
	<v-card
		outlined
		class="mb-5 pa-4"
	>
		<h1>{{ title }}</h1>
		<v-divider></v-divider>
  		<!-- Products udprinting -->
		<v-card v-for="(product, index) in products" :key="index" elevation="0">
			
			<div class="d-flex">
				<div>
				<!-- Products photo -->
					<v-img
						:src="product.Thumbnail"
						width="170px"
						height="140px"
					/>
				</div>
			</div>
			<!-- Products Name -->
			<v-card-title class="pt-0 pl-0 pb-0 text-truncate">
				{{ product.Name }}
			</v-card-title>
		
			<v-divider v-if="index < products.length"></v-divider>

			<!-- Products Description -->
			<v-card-title class="pt-0 pl-0 pb-0">
				{{ product.LowerHeader }}
			</v-card-title>

			<v-divider v-if="index < products.length"></v-divider>

			<!-- Products pris per unit -->
			<v-card-subtitle class="pt-7 pl-0 pb-0">
				<h2>Pris per unit</h2>
				{{ product.Price }},-
			</v-card-subtitle>

			<!-- Products quantity -->
			<div class="d-flex">
				<v-text-field label="Quantity" type="number" reverse v-model="product.Quantity" :onchange="CartUpdate()"></v-text-field>
			</div>
				
			<!-- Products price * quantity -->
			<div class="pt-7 pl-0 pb-0">
				<v-card-subtitle class="pl-0">
					<h2>Total</h2>
					{{ product.Price * product.Quantity }},-
				</v-card-subtitle>
			</div>


			<!-- Products REMOVE -->
			<v-col class="text-right">
				<v-btn
					color="error"
					class="ml-4"
					outlined
					small
					@click="RemoveProduct(product._id)"
				>
					<v-icon small>mdi-minus</v-icon>
					Remove from Cart
				</v-btn>
			</v-col>

		<v-divider v-if="index + 1 < products.length"></v-divider>

		</v-card>

		<v-btn
			color="primary"
			@click="CartUpdate()"
		>
			Opdater kurv
		</v-btn>

  	</v-card>
</template>

<script>
	import { UpdateCart, GetCart, RemoveItemFromCart } from '@/Services/GlobalMethods';
	import { GetProductBody } from '@/Services/ProductApi';

	export default {
		data: () => ({
			products: [],
		}),

		props: ['title'],

		mounted: function() {
			const cart = GetCart();
			let ids = "";
			let i = 0;

			cart.forEach( item => {
				if( (cart.length - 1) === i ) {
					ids += item._id;
				} else {
					ids += item._id + ',';
				}

				i++;
			});

			GetProductBody( ids )
			.then( res => {
				res.Products.forEach( item => {
					this.products.push({
						_id: item._id,
						Name: item.Name,
						Thumbnail: item.Thumbnail,
						LowerHeader: item.LowerHeader,
						Price: item.Price,
						Quantity: cart.find( x => x._id === item._id ).Quantity
					})
				} )
			})
			.catch( err => {
				console.log(err)
			})
		},

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
			},

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