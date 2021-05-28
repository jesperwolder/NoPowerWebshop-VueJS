<template>
<!-- The Cartcheckout with items and final price and then the stepper afterwards if you click sumbit -->
	<v-container class="pa-0" fluid>
		<v-row>
			<v-col cols="12" sm="8">
				<ProductList :title="meta.title" :products="products" />
			</v-col>
			<v-col cols="12" sm="4">
				<CheckoutBox :totalPrice="this.TotalPrice" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ProductList from '@/components/Cart/ProductList.vue'
import CheckoutBox from '@/components/Cart/CheckoutBox.vue'
import { GetCart } from '@/Services/GlobalMethods';
import { GetProductBody } from '@/Services/ProductApi';

export default {
	components: {
		ProductList,
		CheckoutBox
	},
	data() {
		return {
			meta: this.$route.meta,
			products: [],
			TotalPrice: 0
		}
	},
	mounted: function() {
		//GetCart() (items put in cart from localstorage, if its not found it puts a empty array in)
		//---------------- Prints out the current items in localstorage, then prints all the variables from the item though ID
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

				this.TotalPrice += ( item.Price * cart.find( x => x._id === item._id ).Quantity )
			} )
			this.$globalData.AppDrawer = false;
		})
		.catch( err => {
			console.log(err)
		})
	}
}
</script>