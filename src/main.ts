import Vue from 'vue';
import App from './App.vue';
import router from './router';

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

import DateInput from './components/MaterialDesign/DateInput.vue';
Vue.component('v-date-input', DateInput);

import DefaultLayout from '@/layouts/Default.vue';
Vue.component('v-default-layout', DefaultLayout);

const vue = new Vue({
    router,
    vuetify,
    render: h => h(App)
});

vue.$mount('#app')
