import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StudioSeries from '@/views/Studio/Series.vue';

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
                // components: StudioSeries
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
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
