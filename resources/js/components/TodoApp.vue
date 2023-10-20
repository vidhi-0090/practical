<template>
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div
                    class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
                >
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <router-link
                                v-if="authStore.getters.getIsAuthenticated != 0"
                                :to="'/dashboard/' + user_id"
                                :class="{
                                    'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium':
                                        $route.path.startsWith('/dashboard'),
                                    'text-gray-300 hover:bg-gray-700 hover-text-white rounded-md px-3 py-2 text-sm font-medium':
                                        !$route.path.startsWith('/dashboard'),
                                }"
                            >
                                Dashboard
                            </router-link>

                            <router-link
                                to="/todo"
                                :class="{
                                    'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium':
                                        $route.path === '/todo',
                                    'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium':
                                        $route.path !== '/todo',
                                }"
                            >
                                ToDo
                            </router-link>

                            <button
                                v-if="authStore.getters.getIsAuthenticated != 0"
                                @click="logout"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <section class="todoapp">
                <header class="header">
                    <h1>todos</h1>
                </header>

                <div class="form_container">
                    <div class="title_container">
                        <InitialTodo></InitialTodo>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script setup>
import InitialTodo from "../Todo/InitialTodo.vue";
import authStore from "../store/auth.js";
</script>

<style lang="scss" scoped>
@import "../../css/app.css";
.form_container {
    text-align: center;
}

h1 {
    text-align: center;
    color: #99a9c0;
    font-size: 85px;
}
.view {
    width: 100%;
    text-align: left;
}
button.destroy {
    float: right !important;
}
input.toggle {
    border-radius: 50%;
    margin-right: 5px;
}

li.todo.completed {
    text-decoration: line-through;
}

ul.todo-list {
    text-align: center;
    margin-left: 343px;
    line-height: 32px;
    font-size: 18px;
    color: #28292a;
}
li.todo {
    width: 60%;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    justify-content: space-between;
}

.new-todo {
    width: 45%;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

[type="text"]:focus {
    border-color: #5f5e5e;
    --tw-ring-color: #696868;
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
        calc(1px + var(--tw-ring-offset-width)) #6c6969;
}

[type="checkbox"][data-v-4a4e98e1] {
    color: #488b48;
}

[type="checkbox"][data-v-4a4e98e1]:focus {
    --tw-ring-color: #237f23;
}
</style>
