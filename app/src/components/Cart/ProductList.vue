<template>
	<v-card
		outlined
		class="mb-5 pa-4"
	>
		<h2 class="display-2 mb-4">Basket</h2>
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
					<v-text-field label="Quantity" type="number" reverse v-model="product.Quantity"></v-text-field>
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
			products: []
		}),

		mounted: function() {
			const cart = GetCart();

			cart.forEach( async item => {
				const res = await GetProductBody( item._id );

				if( res.Message === 'success' ) {
					const p = res.Product;					

					this.products.push({
						_id: p._id,
						Name: p.Name,
						Thumbnail: p.Thumbnail,
						LowerHeader: p.LowerHeader,
						Price: p.Price,
						Quantity: item.Quantity
					})
				}
			});
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