import Vue from 'vue';
import App from './App.vue';
import router from './router';

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

import NumericInput from './components/MaterialDesign/NumericInput.vue';
import DateInput from './components/MaterialDesign/DateInput.vue';

Vue.component('v-numeric-input', NumericInput);
Vue.component('v-date-input', DateInput);

const vue = new Vue({
    router,
    vuetify,
    render: h => h(App)
});

vue.$mount('#app')
