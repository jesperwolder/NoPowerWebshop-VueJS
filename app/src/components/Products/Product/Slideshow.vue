<template>
    <v-carousel
        cycle
        height="auto"
        hide-delimiter-background
        show-arrows-on-hover
        class="caro"
    > 
        <v-responsive :aspect-ratio="4/3">
            <v-carousel-item
                v-for="( slide, index ) in Slides"
                :key="index"
            >
                <v-img contain :src="slide" :aspect-ratio="4/3"></v-img>
            </v-carousel-item>
        </v-responsive>
    </v-carousel>
</template>

<script>
export default {
    props: ['Slides']
}
</script>

<style>

</style>