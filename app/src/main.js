import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import Vuetify from 'vuetify/lib/framework';

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueCookies);

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount('#app')