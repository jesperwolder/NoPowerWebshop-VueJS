<template>
  <v-container>
    <v-card
            class="pa-5 ma-0"
            elevation="3" 
        >
    <v-row>
      <v-col sm="6" offset-sm="3" xl="4" offset-xl="4">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step > 1"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 2" step="2"></v-stepper-step>

            <v-divider></v-divider>

             <v-stepper-step :complete="step > 3" step="3"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="4"></v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <ContactInfo
              :data="data"
              :rules="rules"
              :next="next"
            />

            <ShippingInfo
              :data="data"
              :rules="rules"
              :next="next"
              :previous="previous"
            />

            <Payment
              :data="data"
              :rules="rules"
              :next="next"
              :previous="previous"
            />

            <Review
              :data="data"
              :submitOrder="submitOrder"
              :previous="previous"
            />
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { CurrentSession } from '@/Services/GlobalVariables';
import ContactInfo from '@/components/CheckoutInfo/ContactInfo.vue';
import ShippingInfo from '@/components/CheckoutInfo/ShippingInfo.vue';
import Review from '@/components/CheckoutInfo/Review.vue';
import Payment from '@/components/CheckoutInfo/Payment.vue';
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
        Address: '',
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
      this.$router.push({name: 'ThankYou'})
    }
  }
}
</script>