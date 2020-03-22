import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import StudioSeries from '@/views/Studio/Series.vue';
import StudioSources from '@/views/Studio/Sources.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/studio',
        name: 'Studio',
        component: () => import('@/views/Studio.vue'),
        children: [
            {
                path: '/studio/series',
                name: 'Seriale',
                component: StudioSeries
            },
            {
                path: '/studio/sources',
                name: 'Źródła',
                component: StudioSources
            },
            {
                path: '/studio/users',
                name: 'Użytkownicy',
                // components: StudioSeries
            },
            {
                path: '/studio/roles',
                name: 'Role',
                // components: StudioSeries
            }
        ]
    }
] as RouteConfig[];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
