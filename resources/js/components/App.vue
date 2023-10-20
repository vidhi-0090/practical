<!-- js/components/app.vue -->
<template>
    <router-view></router-view>
</template>

<script setup>
import authStore from "../store/auth.js";
if (localStorage.getItem("token")) {
    authStore.dispatch("setAuthenticated", localStorage.getItem("token"));
} else if (!localStorage.getItem("token")) {
    authStore.dispatch("removeAuthenticated");
}
</script>
