<template>
    <!-- Products container -->
    <v-card
        class="pa-5 ma-0"
        elevation="2"
    >
        <h1 class="font-weight-regular text--primary">{{ title }}</h1>
        <h3 v-if="category !== undefined" class="font-weight-regular font-italic text--secondary">I kategori: {{ category }}</h3>

        <v-divider class="pb-8 mt-3"></v-divider>

        <!-- Displays products error if no products is found -->
        <ProductsOverviewError v-if="products.length < 1" />

        <!-- Displays all products, if any -->
        <v-row
            v-if="products.length > 1"
            no-gutters
        >
            <!-- Product card -->
            <ProductItem 
                v-for="( item, index ) in products"
                :key="index"
                :data="item" 
            />
        </v-row>

        <!-- <div class="text-center mt-5">
            <v-pagination
                v-model="Page"
                :length="PagesTotal"
                :total-visible="7"
            ></v-pagination>
        </div> -->

    </v-card>
</template>

<script>
import ProductItem from './ProductItem';
import ProductsOverviewError from './ProductsOverviewError';

export default {
    props: ['title', 'products', 'category'],

    components: {
        ProductItem,
        ProductsOverviewError
    },

    data: function() {
        return {
            Page: 1,
            PagesTotal: 10,
        }
    },

    mounted: function() {
        console.log('hey x')
    }
}
</script>

<style scoped>
    .productCols {
        flex-basis: 32em;
        flex-grow: .2;
    }
</style>