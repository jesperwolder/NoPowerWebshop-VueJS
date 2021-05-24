<template>
    <v-card
        width="300"
        mx="auto"
        elevation="2"
    >
        <v-navigation-drawer 
            permanet
            app
            clipped
            class="drawer"
            width="256"
        >
        <!-- //-- ------ Our appdrawer on left side, contains all products and categories -------------  -->
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Produkter
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Vi har enormt mange produkter!
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                dense
                nav
            >
                <v-list-group
                    :value="true"
                    to="/products"
                >
                    <template v-slot:activator>
                        <v-list-item-title>Produkter</v-list-item-title>
                    </template>

                    <v-subheader>Produkt Kategorier</v-subheader>
                    <v-list-item
                        v-for="item in drawerItems"
                        :key="item.title"
                        link
                        :to="item.path"
                        exact
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script>
//-- ------ Global component for fetchting all our products and breadcrum to navigate though it  -------------  -->
    import { GlobalProducts } from '@/Services/GlobalVariables';

    export default {
        data: () => ({
            drawerItems: [
                { title: 'Alle produkter', path: '/products' }
            ]
        }),
     //-- ------ Does not work yet but is soppussed to print out categories-------------  -->
        mounted: function() {
            setTimeout(function() {
                this.drawerItems = [ { title: 'Alle produkter', path: '/products' } ]

                GlobalProducts.Categories.forEach( cat => {
                    this.drawerItems.push({
                        title: cat,
                        path: '/products/categories/' + cat
                    })
                })
                console.log('kørt')
            }, 5000)
        },

        watch: {
            $route() {
                this.drawerItems = [ { title: 'Alle produkter', path: '/products' } ]

                GlobalProducts.Categories.forEach( cat => {
                    this.drawerItems.push({
                        title: cat,
                        path: '/products/categories/' + cat
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .drawer {
        border-radius: 0 !important;
    }
</style>