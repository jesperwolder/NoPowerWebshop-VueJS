<template>
    <v-card
        outlined
    >
<!----------------- Our header technicol details left side ------------------------>                
        <v-card-title class="tech-header">
            Tekniske detaljer
        </v-card-title>
        <v-card-text class="mt-5 pb-0">
            <v-card
                outlined 
                v-for="( details, index ) in data"
                :key="index"
                class="tech-item"
            >
                <v-card-title class="px-5 my-0 text-subtitle-1 tech-header">{{ details.Header }}</v-card-title>
                <v-divider class=""></v-divider>
                <v-row
                    no-gutters
                    v-for="( item, index_items ) in details.Items"
                    :key="index_items"
                    class="tech-items"
                    tile
                >
                    <v-col
                        cols="6"
                        outlined
                        class="tech-item-name"
                    >
                        {{ item.Name }}
                    </v-col>
                    <v-col
                        cols="6"
                    >
                        {{ item.Value }}
                    </v-col>
                </v-row>
            </v-card>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['data']
}
</script>

<style scoped>
    .tech-header {
        background-color: rgba(247, 148, 29, .1);
    }

    .tech-item .tech-items {
        border-bottom: 1px solid transparent;
    }

    .tech-item.theme--dark .tech-items,
    .tech-item.theme--dark .tech-items .tech-item-name {
        border-color: rgba(255, 255, 255, 0.12);
    }

    .tech-item.theme--light .tech-items,
    .tech-item.theme--light .tech-items .tech-item-name {
        border-color: rgba(0, 0, 0, 0.12);
    }

    .tech-item .tech-items:last-child {
        border: 0;
    }

    .tech-items .col {
        padding: 1em !important;
    }

    .tech-item-name {
        border-right: 1px solid transparent;
    }
</style>