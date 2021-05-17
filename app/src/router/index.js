import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AboutUs from '../views/NotImportantSites/AboutUs.vue';
import ContactUs from '../views/NotImportantSites/ContactUs.vue';
import ReturRet from '../views/NotImportantSites/ReturRet.vue';
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
import Product from '../views/Products/Product.vue';
import Cart from '../views/Cart.vue';
import CartCheckOut from '../views/CheckOut/CartCheckOut.vue';
import Checkout from '../views/CheckOut/Checkout.vue';



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

	{ path: '/AboutUs', name: 'Om Os', component: AboutUs, 
		meta: { 
			title: 'Om Os',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Om Os', to: '/AboutUs' },
			]
		}
	},
	
	{ path: '/ContactUs', name: 'Kontakt Os', component: ContactUs, 
		meta: { 
			title: 'Kontakt Os',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Kontakt Os', to: '/ContactUs' },
			]
		}
	},
	{ path: '/ReturRet', name: 'Returret', component: ReturRet, 
		meta: { 
			title: 'Returret',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Returret', to: '/ReturRet' },
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
	{ path: '/adminpage', name: 'Administrator område', component: AdminPage,
		meta: {
			title: 'Administrator område',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Administrator område', to: '/adminpage' },
			]
		} 
	},
	{ path: '/customer_management', name: 'Administrer kunder', component: Customer_Management,
		meta: {
			title: 'Administrer kunder',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Administrator område', to: '/adminpage' },
				{ name: 'Administrer kunder', to: '/customer_management' },
			]
		} 
	},
	{ path: '/item_management', name: 'Administrer produkter', component: Item_management,
		meta: {
			title: 'Administrer produkter',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Administrator område', to: '/adminpage' },
				{ name: 'Administrer produkter', to: '/item_management' },
			]
		} 
	},
	{ path: '/support_management', name: 'Administrer support', component: Support_management,
		meta: {
			title: 'Administrer support',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Administrator område', to: '/adminpage' },
				{ name: 'Administrer support', to: '/support_management' },
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
	{ path: '/products/:id', name: 'Produkter', component: Product,
		meta: {
			title: 'Loading',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Alle Produkter', to: '/products' },
				{ name: 'Loading', to: '/products/:id' },
			]
		} 
	},
	{ path: '*', name: '404', component: NotFound },

	{ path: '/cartcheckout', name: 'CartCheckOut', component: CartCheckOut, 
	meta: { 
		title: 'CartCheckOut',
		breadcrumb: [
			{ name: 'Forside', to: '/' },
			
		]
	}
},

{ path: '/checkout', name: 'CheckOut', component: Checkout, 
	meta: { 
		title: 'CheckOut',
	}
},

];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
