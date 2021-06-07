<template>
    <v-card flat>
        <v-card-title class="pa-0 pb-2">
            Kategori(er)
        </v-card-title>
        <v-card-text class="px-0 pt-0">
<!----------------- Prints out every category on cat ------------------------>
            <v-chip
                outlined
                link
                class="mr-2 mb-2"
                small
                v-for="( cat, index ) in data"
                :key="index"
                :to="`/products/?category=` + cat"
            >
                {{ cat }}
            </v-chip>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['data']
}
</script>

<style>

</style>