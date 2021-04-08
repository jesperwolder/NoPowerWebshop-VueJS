<template>
    <v-card>
        <v-breadcrumbs :items="bread">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
    </v-card>
</template>

<script>
export default {
    data() {
		return {
			bread: this.updateBC(),
		}
	},
	methods: {
		updateBC: function() {
			let items = this.$route.meta.breadcrumb;

			let output = [];
			
			if(items != undefined) {		
				for(let i = 0; i < items.length; i++) {
					output.push(
						{
							text: items[i].name,
							to: items[i].to,
						}
					);
				}
			} else {
				output.push(
					{
						text: '404 – Siden kunne ikke findes',
						to: '/',
						disabled: true
					}
				);
			}
			
			return output;
		},
	},
	computed: {
		init() {
			this.bread = this.updateBC();
		}
	},
	
	watch: {
		$route() {
			
			this.bread = this.updateBC();
		}
	}
}
</script>

<style>

</style>