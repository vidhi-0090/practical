import { createRouter, createWebHistory } from "vue-router";
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Logout from "./components/Logout.vue";
import Dashboard from "./components/Dashboard.vue";
import Todo from "./components/TodoApp.vue";
import Notes from "./components/Notes.vue";
import store from "./store/auth.js";

const routes = [
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/logout",
        name: "Logout",
        component: Logout,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/",
        name: "home",
        component: Login,
    },
    {
        path: "/dashboard/:user_id",
        name: "dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/todo",
        name: "Todo",
        component: Todo,
    },
    {
        path: "/notes",
        name: "notes",
        component: Notes,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth && store.getters.getIsAuthenticated == false) {
        return { name: "Login" };
    }
    if ( to.meta.requiresAuth == false && store.getters.getIsAuthenticated != false ) {
        return { name: "dashboard", params: 1 };
    }
});
export default router;
