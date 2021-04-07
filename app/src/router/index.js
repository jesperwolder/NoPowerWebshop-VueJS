import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/ErrorPages/404.vue';
import Profile from '../views/Profile.vue';
import Products from '../views/Products/Index.vue';


Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'Forside', component: Home, 
		meta: { 
			breadcrumb: [
				{ name: 'Forside', to: '/' },
			]
		}
	},
	{ path: '/register', name: 'Bliv medlem', component: Register, 
		meta: { 
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Bliv medlem', to: '/register' }			
			]	
		}
	},
	{ path: '/login', name: 'Log ind', component: Login, 
		meta: { 
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Log Ind', to: '/login' }
			]
		}
	},
	{ path: '/profile', name: 'Profil', component: Profile,
		meta: { 
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Profil', to: '/profile' },
			]
		} 
	},
	{ path: '/products', name: 'Produkter', component: Products,
		meta: { 
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Produkter', to: '/products' },
			]
		} 
	},
	{ path: '*', name: '404', component: NotFound },

];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
