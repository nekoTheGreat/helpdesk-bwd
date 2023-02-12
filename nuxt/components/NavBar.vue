<script setup lang="ts">;
import { Collapse } from 'bootstrap/dist/js/bootstrap.esm.js';
import { useAuthStore } from '~~/stores/authStore';

const authStore = useAuthStore();
onMounted(() => {
    new Collapse('#mainNavBarDropdown');
});
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
        <div class="container-fluid">
            <div class="me-1" style="position:relative; width:50px;height:50px;">
                <a class="navbar-brand" style="position:absolute; top: -5px;width:100%" href="/"><img
                        src="~/assets/bwd.png" style="width:50px;" /></a>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavBarDropdown"
                aria-controls="mainNavBarDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mainNavBarDropdown">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Tickets</a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <template v-if="!authStore.authenticated">
                        <li>
                            <a class="nav-link">Login</a>
                        </li>
                        <li>
                            <a class="nav-link">Signup</a>
                        </li>
                    </template>
                    <li class="nav-item dropdown" v-else>
                        <a class="nav-link dropdown-toggle" href="#" id="mainNavBarAccountDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Account
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="mainNavBarAccountDropdown">
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>