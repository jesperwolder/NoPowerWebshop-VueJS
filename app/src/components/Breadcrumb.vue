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
			//-- ------ Reads the existing route in the breadcrum  -------------  -->
			bread: this.updateBC(),
		}
	},
	methods: {
	//-- ------ Global breadcrum for every site that has it where you are on the site, if the site or breadcrum is incorretly set it will overwrite to 404 -------------  -->
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
	//-- ------ overwrites (computed) if it does not exist  -------------  -->
	computed: {
		init() {
			this.bread = this.updateBC();
		}
	},
	//-- ------ Reads the existing route in the breadcrum  -------------  -->
	watch: {
		$route() {
			
			this.bread = this.updateBC();
		}
	}
}
</script>

<style>

</style>