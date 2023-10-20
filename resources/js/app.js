
//js/app.js
import "./bootstrap";

import { createApp } from "vue";
import App from "./components/App.vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import router from "./router";
import jQuery from 'jquery';
import { ref, inject, provide } from 'vue';

library.add(fas);
window.$ = jQuery;
const baseUrl = ref("http://127.0.0.1:8001/");
const app = createApp(App);
app.provide('baseUrl', baseUrl);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount("#app");
