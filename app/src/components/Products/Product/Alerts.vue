<template>
    <div>
        <v-alert
            type="warning"
            text
            v-if="!isActive"
        >
            Dette produkt findes ikke længere i vores sortiment.
        </v-alert>
    <!------------ our alet v-if the stock is 0 or is not active-------------   -->
        <v-alert
            type="info"
            text
            prominent
            v-if="Stock == 0 && isActive"
        >
        <!------------ I our alert has been trigged is display this message-------------   -->
            <v-row align="center">
                <v-col class="grow">
                    Dette produkt er desværre udsolgt!
                </v-col>
                <v-col class="shrink">
                    <v-tooltip top transition="scroll-y-reverse-transition">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                                v-bind="attrs"
                                v-on="on"
                                dense 
                                href="https://i2.wp.com/totalsportsblog.com/wp-content/uploads/2014/01/kid-w-middle-finger.jpg?ssl=1" 
                                target="_blank"
                            >
                                Se mere
                            </v-btn>
                        </template>
                        <span>Klik her for at se mere information omkring, hvornår produktet forventes at være på lager igen.</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-alert>

        <div 
            v-for="( err ) in msg"
            :key="err"
        >
            <v-alert
                text
                icon="mdi-cart-check"
                dismissible
                prominent
                border="bottom"
                color="green"
                type="success"
                transition="scroll-x-reverse-transition"
                class="pb-7"
            >
                {{ err }}
                <v-divider
                    class="my-4 success"
                    style="opacity: 0.22"
                ></v-divider>
                <v-btn
                    color="green"
                    to="/cart"
                >
                    Gå til indkøbskurven
                </v-btn>
            </v-alert>
        </div>
    </div>
</template>

<script>
export default {
    props: ['msg', 'isActive', 'Stock']
}
</script>

<style>

</style>