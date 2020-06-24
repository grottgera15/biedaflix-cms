import Vue from 'vue';
import VueRouter from 'vue-router';
import Series from '@/views/Series.vue';
import SeriesDetails from '@/views/SeriesDetails.vue';
import SeriesAddEpisode from '@/views/SeriesAddEpisode.vue';
import SeriesEpisode from '@/views/SeriesEpisode.vue';
import Users from '@/views/Users.vue';

Vue.use(VueRouter)

const routes = [
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
        path: '/series/:seriesId/:episodeId',
        name: 'SeriesEpisode',
        component: SeriesEpisode
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
