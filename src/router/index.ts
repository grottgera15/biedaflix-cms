import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Series from '@/views/Series.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Series',
        name: 'Series',
        component: Series
    }
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

export default router;
