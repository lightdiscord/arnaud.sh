import Vue from 'vue';
import App from './App.vue';
import store from './store';

import Repositories from './components/remotes/Repositories'
import Organizations from './components/remotes/Organizations'

import VTooltip from 'v-tooltip'

import 'milligram/dist/milligram.min.css';

import './themes/index.styl';
import './themes/night/index.styl';

Vue.config.productionTip = false;

Vue.component(Organizations.name, Organizations)
Vue.component(Repositories.name, Repositories)

Vue.use(VTooltip)

new Vue({
    el: '#app',
    store,
    render: h => h(App),
    mounted () {
        this.$store.dispatch('fetchFromGitHub')
    }
});
