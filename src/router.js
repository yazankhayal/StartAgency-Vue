import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import SingleBlog from './views/SingleBlog.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/page/:id/:slug/details',
        name: 'Single Page',
        component: SingleBlog,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    },
});

export default router;