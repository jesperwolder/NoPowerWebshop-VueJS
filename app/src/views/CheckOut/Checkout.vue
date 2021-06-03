<template>

	<v-card flat class="d-flex justify-center" color="transparent">
		<v-stepper v-model="step" style="max-width:40rem;width:100%;" class="pb-0" vertical>
<!-------- A stepper thats goes tough every checkoutInfo  -------------->
			<v-stepper-step step="1" :complete="step > 1">Kontakt informaton</v-stepper-step>
<!-------- Contactinfo  step1-------------->
			<ContactInfo
				:data="data"
				:rules="rules"
				:next="next"
			/>

			<v-divider></v-divider>

			<v-stepper-step :complete="step > 2" step="2">Regnings- og leveringsadresse</v-stepper-step>
<!-------- ShippingInfo step 2 -------------->
			<ShippingInfo
				:data="data"
				:rules="rules"
				:next="next"
				:previous="previous"
			/>

			<v-divider></v-divider>

			<v-stepper-step :complete="step > 3" step="3">Betalingsløsning</v-stepper-step>
<!-------- Payment  step3-------------->
			<Payment
				:data="data"
				:rules="rules"
				:next="next"
				:previous="previous"
			/>

			<v-divider></v-divider>

			<v-stepper-step step="4">Gennemgang af ordre</v-stepper-step>
<!-------- Review step 4  -------------->
			<Review
				:data="data"
				:submitOrder="submitOrder"
				:previous="previous"
			/>
		</v-stepper>
	</v-card>
</template>

<script>
	import { CurrentSession } from '@/Services/GlobalVariables';
	import ContactInfo from '@/components/CheckoutInfo/ContactInfo.vue';
	import ShippingInfo from '@/components/CheckoutInfo/ShippingInfo.vue';
	import Review from '@/components/CheckoutInfo/Review.vue';
	import Payment from '@/components/CheckoutInfo/Payment.vue';
	import { CreateOrderBody } from '@/Services/OrdersApi'
	import { GetCart, ClearCart, GetCartTotal, GetCartCount } from '@/Services/GlobalMethods'

	export default {
		components: {
			ContactInfo,
			ShippingInfo,
			Review,
			Payment,
		},
		//-------- Data though contactinfo  --------------
		data() {
			return {
				error: null,
					meta: this.$route.meta,
					CS: CurrentSession,
				step: 1,
				checkoutForm: false,
				data: {
					Email: '',
					Name: '',
					Phone: '',
					Street: '',
					Zip: '',
					City: '',
					State: '',
				},
//--------------------- Rules  -----------------------------	
				rules: {
					required: value => !!value || 'Required.',
					zip: value => value.length == 4 || 'Must be four characters',
					email: value => {
						const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						return pattern.test(value) || 'Invalid e-mail.'
					},
					phone: value => {
						const pattern = /\d{8}/
						return pattern.test(value) || 'Invalid phone number.'
					}
				}
			}
		},
		mounted: function() {
			//this.$globalData.Breadcrump = false;
			//this.$globalData.AppDrawer = false;
		},
		methods: {
//-------- The steps in the stepping that can go back and next and then the sumbit  --------------
			next() {
				this.step += 1
			},
			previous() {
				this.step -= 1
			},
			submitOrder() {
				
	//-------- Prints out Orderdetails  --------------
				const OrderDetailsBody = {
					Products: [],
					Billing: {
						Fullname: this.data.Name,
						Email: this.data.Email,
						Phone: this.data.Phone,
						Address: this.data.Street + ', ' + this.data.zip + ' ' + this.data.city,
						State: this.data.State
					},
					Total: this.$globalData.CartTotal,
					OrderId: null
				}

				GetCart().forEach( item => {
					OrderDetailsBody.Products.push( {
						_id: item._id,
						Name: item.Name,
						Thumbnail: item.Thumbnail,
						Price: item.Price,
						Quantity: item.Quantity
					});
				})

				console.log(this.data)
				console.log(OrderDetailsBody);
				return;
				// Process order

				// Order success
				ClearCart(); // Clears cart if order is a success 👍
				this.$globalData.Cart = GetCart();
				this.$globalData.CartTotal = GetCartTotal();
				this.$globalData.CartCount = GetCartCount();

				// Order failed
				return;

				CreateOrderBody( {}, this.$cookies.get( 'jwt' ) )

				this.$router.push({name: 'ThankYou'})
			}
		}
	}
</script>