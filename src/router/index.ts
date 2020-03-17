import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StudioSeries from '@/views/Studio/Series';

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
