<template>
 <v-card
  outlined
  min-width="100%"
  class="mb-5 pa-4"
  >
<h2 class="display-2 mb-4">Basket</h2>
<v-divider></v-divider>
  <!-- Products udprinting -->
    <template v-for="(product, index) in products">
        <v-list-tile :key="product.product_id" avatar >
            <div class="d-flex">
                <div>
                  <!-- Products photo -->
                    <v-img
                    :src="product.photo"
                    width="170px"
                    height="140px"
                    />
                </div>
          </div>
         <!-- Products Name -->
              <v-card-title class="pt-0 pl-0 pb-0" text-truncate truncate-2>
              {{ product.name }}
              </v-card-title>
      

        <v-divider v-if="index < products.length" :key="index"></v-divider>



          <!-- Products Description -->
          <v-card-title class="pt-0 pl-0 pb-0" text-truncate truncate-2>
            {{product.Description}}
          </v-card-title>




        <v-divider v-if="index < products.length" :key="index"></v-divider>



              <!-- Products pris per unit -->
              <v-card-subtitle class="pt-7 pl-0 pb-0">
              <h2>Pris per unit</h2>
              {{product.price}}$
              </v-card-subtitle>

             <!-- Products quantity -->
            <div class="d-flex">
            <v-text-field label="Quantity" reverse :value="product.qty"></v-text-field>
            </div>
            
            <!-- Products price * quantity -->
            <div class="pt-7 pl-0 pb-0">
            <v-card-subtitle class="pl-0">
              <h2>Total</h2>
            {{product.price * product.qty}}$
            </v-card-subtitle>
            </div>


      <!-- Products REMOVE -->
        <v-col class="text-right">
        <v-list-tile-action >
            
                  <v-btn
                  color="error"
                  class="ml-4"
                  outlined
                  small
                  @click="updateCart(i)"
                >
                <v-icon small>mdi-minus</v-icon>
                  Remove from Cart
              </v-btn>
        
        </v-list-tile-action> 
        </v-col>
        </v-list-tile>


        <v-divider v-if="index + 1 < products.length" :key="index"></v-divider>



    </template>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      products: [{
        product_id: 'kitchen-1',
        name: 'somethingrandom',
        photo: 'https://cdn.vuetifyjs.com/images/cards/kitchen.png',
        Description: 'Our vintage kitchen utenils delight any chef. Made of bamboo by hand',
        price: 14.99,
        qty: 1
      },{
        product_id: 'kitchen-1',
        name: 'somethingrandom',
        photo: 'https://cdn.vuetifyjs.com/images/cards/kitchen.png',
        Description: 'Our vintage kitchen utenils delight any chef. Made of bamboo by hand',
        price: 44.99,
        qty: 2
      },{
        product_id: 'kitchen-1',
        name: 'somethingrandom',
        photo: 'https://cdn.vuetifyjs.com/images/cards/kitchen.png',
        Description: 'Our vintage kitchen utenils delight any chef. Made of bamboo by hand',
        price: 64.99,
        qty: 2
      }]
    })
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