<template>
    <div>
        <v-icon :color="ReturnAvailabilityColor( Stock )">mdi-checkbox-blank-circle</v-icon> {{ Stock }} stk på lager
    </div>
</template>

<script>
export default {
    props: ['Stock'],
    data() {
        return {
            AvailabilityColors: [ 'red', 'amber', 'green' ],
        }
    },
    methods: {
        ReturnAvailabilityColor: function( amount ) {
            if( amount > 10 ) return this.AvailabilityColors[2];
            if( amount <= 10 && amount > 0 ) return this.AvailabilityColors[1];
            if( amount >= 0 ) return this.AvailabilityColors[0];
        },
    }
}
</script>

<style>

</style>