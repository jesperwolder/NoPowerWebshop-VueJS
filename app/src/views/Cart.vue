<template>
    <v-card
        class="pa-5 ma-0"
        elevation="2"
    >
        <h1>{{ meta.title }}</h1>

        <v-divider class="pb-3 mt-3"></v-divider>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            meta: this.$route.meta,
        }
    }
}
</script>

<style>

</style>