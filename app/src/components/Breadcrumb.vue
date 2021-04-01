<template>
    <v-card>
        <v-breadcrumbs :items="breadItems">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
    </v-card>
</template>

<script>
export default {
    data: () => ({
		breadItems: [
			{
				text: 'Forside',
				disabled: false,
				link: true,
				to: '/'
			},
			{
				text: 'Registrer',
				disabled: false,
				link: true,
				to: '/register'
			},
		]
	}),
}
</script>

<style>

</style>