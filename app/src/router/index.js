import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/ErrorPages/404.vue';
import Profile from '../views/Profile.vue';


Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'Home', component: Home, 
		meta: { 
			breadcrumb: [
				{ name: 'Forside', to: '/' },
			]
		}
	},
	{ path: '/register', name: 'Register', component: Register, 
		meta: { 
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Bliv medlem', to: '/register' }			
			]	
		}
	},
	{ path: '/login', name: 'Login', component: Login, 
		meta: { 
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Log Ind', to: '/login' }
			]
		}
	},
	{ path: '/profile', name: 'Profile', component: Profile,
	meta: { 
		breadcrumb: [
			{ name: 'Forside', to: '/' },
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
