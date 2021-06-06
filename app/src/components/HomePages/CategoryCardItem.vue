<template>
    <v-col
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
        class="productCols px-2"
    >
        <v-card
            height="100%"
            class="mb-0 productCard"
            outlined
            tile
        >
            <v-img
                class="white--text align-end"
                :src="data.Image"
                :aspect-ratio="5/3" 
            >
                <v-card-title class="font-weight-regular text-overline cat-title">{{ data.Title }}</v-card-title>
            </v-img>

            <v-card-text class="text--primary text-center">
                {{ data.Description }}
            </v-card-text>

            <v-card-actions>
                <v-btn
                    :to="data.Route"
                    text
                    color="#F7941D"
                    block
                >
                    Udforsk
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
export default {
    props: ['data']
}
</script>

<style scoped>
	.productCols {
        flex-basis: 32em;
        flex-grow: .2;
    }
	
	.cat-title {
		background-color: rgba(0,0,0,.6);
		backdrop-filter: blur( 4px );

		padding: .5em 1em;
	}

	.productCard {
        border: 3px solid rgba(0,0,0,.12);
        transition: border 200ms ease;
    }

    .productCard:hover, 
    .productCard:focus {
        border: 3px solid rgba(247, 149, 29, .8);
    }
</style>