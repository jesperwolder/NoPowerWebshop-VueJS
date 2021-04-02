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
import routes from '@/router/index.js';

let _routes = routes;
// console.log(_routes.history);

// for(var i = 0; i < _routes.options.routes.length; i++) {
// 	if(_routes.history.current.path === _routes.options.routes[i].path) {
// 		bread = {
// 			text: _routes.options.routes[i].name,
// 			disabled: false,
// 			link: true,
// 			to: _routes.options.routes[i].path,
// 		}
		
// 		break;
// 	}
// 	//console.log(_routes.options.routes[i].name);
// }
// console.log(routes.path);

export default {
	
    data() {
		return {
			bread: this.updateBC(),
		}
	},
	methods: {
		updateBC: () => {
			let items = _routes.history.current.meta.breadcrumb;

			let output = [];
			
			for(let i = 0; i < items.length; i++) {
				output.push(
					{
						text: items[i].name,
						to: items[i].to,
					}
				);
			}
				
			return output;
		}
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
/* comment */
</style>