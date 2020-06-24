import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Series from '@/views/Series.vue';
import SeriesDetails from '@/views/SeriesDetails.vue';
import SeriesAddEpisode from '@/views/SeriesAddEpisode.vue';
import Users from '@/views/Users.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/series',
        name: 'Series',
        component: Series
    },
    {
        path: '/series/:seriesId',
        name: 'SeriesDetails',
        component: SeriesDetails
    },
    {
        path: '/series/:seriesId/addEpisode',
        name: 'SeriesAddEpisode',
        component: SeriesAddEpisode
    },
    {
        path: '/users',
        name: 'Users',
        component: Users
    }
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

export default router;
