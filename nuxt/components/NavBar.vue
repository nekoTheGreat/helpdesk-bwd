<script setup lang="ts">;
import { Collapse } from 'bootstrap/dist/js/bootstrap.esm.js';
import { useAuthStore } from '~~/stores/authStore';

const authStore = useAuthStore();
const route = useRoute();
const isLinkActive = (link: string) => {
    return route.path == link;
};
onMounted(() => {
    new Collapse('#mainNavBarDropdown');
});
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
        <div class="container-fluid">
            <div class="me-1" style="position:relative; width:50px;height:50px;">
                <NuxtLink class="navbar-brand" style="position:absolute; top: -5px;width:100%" to="/">
                    <img src="~/assets/bwd.png" style="width:50px;" />
                </NuxtLink>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavBarDropdown"
                aria-controls="mainNavBarDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mainNavBarDropdown">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <NuxtLink class="nav-link" :class="{ 'active': isLinkActive('/tickets') }" to="/tickets">
                            Tickets</NuxtLink>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <template v-if="!authStore.authenticated">
                        <li>
                            <NuxtLink class="nav-link" :class="{ 'active': isLinkActive('/login') }" to="/login">
                                Login
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink class="nav-link" :class="{ 'active': isLinkActive('/signup') }" to="/signup">
                                Signup
                            </NuxtLink>
                        </li>
                    </template>
                    <li class="nav-item dropdown" v-else>
                        <a class="nav-link dropdown-toggle" :class="{ 'active': isLinkActive('/profile') }" href="#"
                            id="mainNavBarAccountDropdown" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Account
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="mainNavBarAccountDropdown">
                            <li>
                                <NuxtLink class="dropdown-item" :class="{ 'active': isLinkActive('/profile') }"
                                    to="/profile">
                                    Profile
                                </NuxtLink>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <NuxtLink class="dropdown-item" to="/logout">
                                    Logout
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>