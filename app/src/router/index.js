import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AboutUs from '../views/NotImportantSites/AboutUs.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/ErrorPages/404.vue';
import Profile from '../views/Profile.vue';
import DashBoard from '../views/DashBoard.vue';
import AdminPage from '../views/AdminPages/AdminPage.vue';
import Customer_Management from '../views/AdminPages/Customer_Management.vue';
import Item_management from '../views/AdminPages/Item_management.vue';
import Support_management from '../views/AdminPages/Support_tickets.vue';
import Products from '../views/Products/Index.vue';
import Cart from '../views/Cart.vue';



Vue.use(VueRouter)

const routes = [
	{ path: '/', name: 'Forside', component: Home, 
		meta: { 
			title: 'Forside',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
			]
		}
	},
	{ path: '/AboutUs', name: 'AboutUs', component: AboutUs, 
		meta: { 
			title: 'AboutUs',
			breadcrumb: [
				{ name: 'AboutUs', to: '/AboutUs' },
			]
		}
	},
	{ path: '/', name: 'Forside', component: Home, 
		meta: { 
			title: 'Forside',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
			]
		}
	},
	{ path: '/', name: 'Forside', component: Home, 
		meta: { 
			title: 'Forside',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
			]
		}
	},
	{ path: '/register', name: 'Bliv medlem', component: Register, 
		meta: {
			title: 'Bliv medlem',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Bliv medlem', to: '/register' }			
			]	
		}
	},
	{ path: '/login', name: 'Log ind', component: Login, 
		meta: {
			title: 'Log ind',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Log Ind', to: '/login' }
			]
		}
	},
	{ path: '/cart', name: 'Kurv', component: Cart, 
		meta: {
			title: 'Indkøbskurv',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Kurv', to: '/cart' }
			]
		}
	},
	{ path: '/dashboard', name: 'DashBoard', component: DashBoard,
		meta: {
			title: 'Dashboard',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Dashboard', to: '/dashboard' },
			]
		} 
	},
	{ path: '/profile', name: 'Profil', component: Profile,
		meta: { 
			title: 'Profil',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Dashboard', to: '/dashboard' },
				{ name: 'Profil', to: '/profile' },
			]
		} 
	},
	{ path: '/adminpage', name: 'AdminPage', component: AdminPage,
		meta: {
			title: 'AdminPage',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'AdminPage', to: '/adminpage' },
				{ name: 'Item_management', to: '/item_management' },	
				{ name: 'Customer_Management', to: '/customer_management' },
				{ name: 'Support_management', to: '/support_management' },
			]
		} 
	},
	{ path: '/customer_management', name: 'Customer_Management', component: Customer_Management,
		meta: {
			title: 'Customer_Management',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'AdminPage', to: '/adminpage' },
				{ name: 'Item_management', to: '/item_management' },	
				{ name: 'Customer_Management', to: '/customer_management' },
				{ name: 'Support_management', to: '/support_management' },
			]
		} 
	},
	{ path: '/item_management', name: 'Item_management', component: Item_management,
		meta: {
			title: 'Customer_Management',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'AdminPage', to: '/adminpage' },
				{ name: 'Item_management', to: '/item_management' },
				{ name: 'Customer_Management', to: '/customer_management' },
				{ name: 'Support_management', to: '/support_management' },
			]
		} 
	},
	{ path: '/support_management', name: 'Support_management', component: Support_management,
		meta: {
			title: 'Customer_Management',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'AdminPage', to: '/adminpage' },
				{ name: 'Item_management', to: '/item_management' },
				{ name: 'Customer_Management', to: '/customer_management' },
				{ name: 'Support_management', to: '/support_management' },
			]
		} 
	},
	{ path: '/products', name: 'Produkter', component: Products,
		meta: {
			title: 'Alle Produkter',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Alle Produkter', to: '/products' },
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
