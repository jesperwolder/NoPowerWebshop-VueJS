<template>
    <v-col
        cols="12"
        xs="12"
        sm="6"
        md="5"
        lg="4"
        xl="3"
        class="px-2 mt-0 mb-4 productCols"
        v-if="( category != undefined ? data.Categories.includes( category.toLowerCase() ) : null ) || category == undefined"
    >
        <v-card
            height="100%"
            class="pa-5 mb-0 productCard"
            outlined
            tile
        >
            <router-link
                :to="`/products/`+ data._id"
                style="text-decoration:none;"
                class="text--primary"
            >
                <div style="position:relative;">
                    <v-img
                        :aspect-ratio="1/1"
                        :src="data.Thumbnail"
                        contain
                        class="productImage"
                    ></v-img>
                </div>

                <v-card-title
                    class="productTitle pb-2 px-0"
                >
                    <div class="text-truncate">{{ data.Name }}</div>
                </v-card-title>
                <v-card-text 
                    class="pa-0 pt-0 text-caption"
                >
                    <div class="text-truncate">
                        {{ data.LowerHeader }}
                    </div>
                    <br>
                    <div class="pt-3">
                        <AvailabilityIcon :Stock="data.Stock" />
                    </div>
                </v-card-text>
            </router-link>

            <v-card-actions class="px-0 pb-0">
                <v-card-subtitle class="px-0 py-0">
                    Kun <b>{{ data.Price }}</b>,- 
                </v-card-subtitle>
                <v-spacer></v-spacer>
                <AddToCart v-if="data.Stock != 0" :data="data" />
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
import AddToCart from './AddToCart';
import AvailabilityIcon from './Product/AvailabilityIcon';

export default {
    components: {
        AddToCart,
        AvailabilityIcon
    },
    props: ['data', 'category'],
}
</script>

<style scoped>
    .productCols {
        flex-basis: 32em;
        flex-grow: .2;
    }

    .productCard {
        border: 3px solid rgba(0,0,0,.12);
        transition: border 200ms ease;
    }

    .productCard:hover, 
    .productCard:focus {
        border: 3px solid rgba(247, 149, 29, .8);
    }

    .truncate-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: unset !important;
        display: -webkit-box;
    }
</style>