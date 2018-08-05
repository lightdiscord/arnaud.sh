import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';

import 'milligram/dist/milligram.min.css'

import './themes/index.styl'
import './themes/night/index.styl'

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');
