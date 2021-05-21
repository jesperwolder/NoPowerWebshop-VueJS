<template>

	<v-card flat class="d-flex justify-center" color="transparent">
		<v-stepper v-model="step" style="max-width:40rem;width:100%;" class="pb-0" vertical>
			
			<v-stepper-step step="1" :complete="step > 1">Kontakt informaton</v-stepper-step>

			<ContactInfo
				:data="data"
				:rules="rules"
				:next="next"
			/>

			<v-divider></v-divider>

			<v-stepper-step :complete="step > 2" step="2">Regnings- og leveringsadresse</v-stepper-step>

			<ShippingInfo
				:data="data"
				:rules="rules"
				:next="next"
				:previous="previous"
			/>

			<v-divider></v-divider>

			<v-stepper-step :complete="step > 3" step="3">Betalingsløsning</v-stepper-step>

			<Payment
				:data="data"
				:rules="rules"
				:next="next"
				:previous="previous"
			/>

			<v-divider></v-divider>

			<v-stepper-step step="4">Gennemgang af ordre</v-stepper-step>

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
	import { GetCart } from '@/Services/GlobalMethods'

	export default {
		components: {
			ContactInfo,
			ShippingInfo,
			Review,
			Payment,
		},
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
				rules: {
					required: value => !!value || 'Required.',
					zip: value => value.length == 4 || 'Must be four characters',
					email: value => {
						const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						return pattern.test(value) || 'Invalid e-mail.'
					},
					phone: value => {
						const pattern = /\d{10}/
						return pattern.test(value) || 'Invalid phone number.'
					}
				}
			}
		},
		methods: {
			next() {
				this.step += 1
			},
			previous() {
				this.step -= 1
			},
			submitOrder() {
				//console.log(this.data)

				const OrderDetailsBody = {
					ProductIDs: []
				}

				GetCart().forEach( item => {
					OrderDetailsBody.ProductIDs.push( item._id );
				})

				console.log(OrderDetailsBody);
				return;

				CreateOrderBody( {}, this.$cookies.get( 'jwt' ) )

				this.$router.push({name: 'ThankYou'})
			}
		}
	}
</script>