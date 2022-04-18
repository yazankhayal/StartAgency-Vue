import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue3Progress from "vue3-progress";

const options = {
    position: "fixed",
    height: "3px",
    color: 'red',
};

createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .use(Vue3Progress, options)
    .mount('#app');

