<template>
    <v-breadcrumbs :items="breadItems" style="padding-left:0;padding-top:0;">
        <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
        </template>
    </v-breadcrumbs>
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