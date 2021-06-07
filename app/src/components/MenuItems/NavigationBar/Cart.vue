<template>
    <v-menu 
        v-if="$globalData.CartCount > 0"
        offset-y 
        class="pa-0"
        :close-on-content-click="false"
        transition="slide-y-transition"
    >
<!-- --------------------------- Vores kurv--------------------------------- -->
        <template v-slot:activator="{ on, attrs }">
            <v-badge :content="$globalData.CartCount" color="#F7941D" overlap bordered offset-x="2em">
                <v-btn 
                    class="buttons" 
                    depressed 
                    text 
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon left>mdi-cart</v-icon>
                    Kurv
                </v-btn>
            </v-badge>
        </template>
        <v-card
            class="ma-0"
            style="min-width: 300px;max-width: 600px;"
        >
            <v-card-title class="font-weight-regular">Indkøbskurv</v-card-title>
            <v-card-text>
                <div v-if="$globalData.CartCount < 0" class="pt-5 text-center">
                    <div class="text-h3">ಠ▃ಠ</div><br>
                    <h3 class="font-weight-light">Ingen produkter i kurven</h3>
                </div>

                <div
                    v-for="( item, index ) in $globalData.Cart"
                    :key="index"
                >
                    <v-row no-gutters>
                        <v-col cols="3">
                            <v-img contain avatar :aspect-ratio="1/1" :src="item.Thumbnail"></v-img>
                        </v-col>
                        <v-col cols="9" class="px-3">
                            <h3 class="text-body-1">{{ item.Name }}</h3>
                            <div class="text-caption">{{ item.Quantity }} stk</div>
                            <div class="text-button">{{ item.Price * item.Quantity }} kr</div>
                        </v-col>
                    </v-row>

                    <v-divider class="mb-5"></v-divider>
                </div>

                <div>
                    Samlet beløb <span class="font-weight-bold">{{ $globalData.CartTotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span> kr
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    block
                    color="#F7941D"
                    to="/cart"
                    class="cartButton"
                >
                    Til indkøbskurven
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
export default {

}
</script>

<style>

</style>