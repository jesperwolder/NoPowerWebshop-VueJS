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
import Products from '../views/Products/ProductsOverview.vue';
import Product from '../views/Products/Product.vue';
import CartCheckOut from '../views/CheckOut/CartCheckOut.vue';
import Checkout from '../views/CheckOut/Checkout.vue';
import ThankYou from '../views/CheckOut/Thankyoupage.vue';
import Order from '../views/Orders/Order.vue';
import Logout from '@/components/Logout.vue';

Vue.use(VueRouter)
///------- Every route for every site and meta tags and breadcrumbs --------

///------- Homepage Nopower --------
const routes = [
	{ path: '/', name: 'Forside', component: Home, 
		meta: { 
			title: 'Forside',
			breadcrumb: false
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

	///--------------------------- User Controll---------------------------------
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

	{ path: '/dashboard', name: 'DashBoard', component: DashBoard,
		meta: {
			title: 'Min side',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Min side', to: '/dashboard' },
			]
		} 
	},

	{ path: '/profile', name: 'Profil', component: Profile,
		meta: { 
			title: 'Profil',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Min side', to: '/dashboard' },
				{ name: 'Profil', to: '/profile' },
			]
		} 
	},


	///--------------------------- Admin control---------------------------------
	{ path: '/adminpage', name: 'Administrator område', component: AdminPage,
		meta: {
			title: 'Administrator område',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Administrator område', to: '/adminpage' },
			],
			appDrawer: false
		} 
	},
	{ path: '/customer_management', name: 'Administrer kunder', component: Customer_Management,
		meta: {
			title: 'Administrer kunder',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Administrator område', to: '/adminpage' },
				{ name: 'Administrer kunder', to: '/customer_management' },
			],
			appDrawer: false
		} 
	},
	{ path: '/item_management', name: 'Administrer produkter', component: Item_management,
		meta: {
			title: 'Administrer produkter',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Administrator område', to: '/adminpage' },
				{ name: 'Administrer produkter', to: '/item_management' },
			],
			appDrawer: false
		} 
	},
	


	///--------------------------- Products---------------------------------
	{ path: '/products', name: 'Produkter', component: Products,
		meta: {
			title: 'Alle Produkter',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Alle Produkter', to: '/products' },
			]
		} 
	},
	{ path: '/products/categories/:category', name: 'Produkter', component: Products,
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
			]
		} 
	},

	///--------------------------- Cart and checkout---------------------------------
	{ path: '/cart', name: 'Indkøbskurv', component: CartCheckOut, 
		meta: { 
			title: 'Indkøbskurv',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				{ name: 'Indløbskurv', to: '/cart' },
			],
			appDrawer: false
		}
	},
	{ path: '/checkout', name: 'CheckOut', component: Checkout, 
		meta: { 
			title: 'CheckOut',
			breadcrumb: false,
			appDrawer: false
		}
	},
	{ path: '/ThankYou', name: 'ThankYou', component: ThankYou, 
		meta: { 
			title: 'ThankYou',
			breadcrumb: [
				{ name: 'Forside', to: '/' },
				
			]
		}
	},
	/// Orders
	{ path: '/order/:id', name: 'Ordre', component: Order,
		meta: {
			title: 'Order',
			breadcrumb: false,
			appDrawer: false,
		}
	},

	/// Logout
	{ path: '/logout', name: 'Logud', component: Logout,
		meta: {
			title: '',
			breadcrumb: false,
			appDrawer: false,
		}
	},

	///--------------------------- 404 page, dont do new routes or paths below here---------------------------------
	{ path: '*', name: '404', component: NotFound },
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
