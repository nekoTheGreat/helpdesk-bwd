<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" v-if="auth.isAuthenticated" />
        <q-toolbar-title>
          <EssentialLink title="Helpdesk" link="/"></EssentialLink>
        </q-toolbar-title>
        <div v-if="!auth.isAuthenticated">
          <q-btn color="secondary" text-color="primary" label="Signup" type="a" :to="{ path: '/register' }"
            class="q-ml-sm" style="width: 80px" />
          <q-btn color="secondary" text-color="primary" label="Login" class="q-ml-sm" type="a" :to="{ path: '/login' }"
            style="width: 80px" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered v-if="auth.isAuthenticated">
      <q-list>
        <q-item-label header>
          Menu
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';
import { useRouter } from 'vue-router';
import { useAuth } from 'src/stores/auth';

const router = useRouter();
const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Home',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Tickets',
    icon: 'confirmation_number',
    link: router.resolve({ path: '/tickets' }).href,
  },
  {
    title: 'Create a Ticket',
    icon: 'add_circle',
    link: router.resolve({ path: '/tickets/new' }).href,
  },
  {
    title: 'Profile',
    icon: 'account_circle',
    link: router.resolve({ path: '/profile' }).href,
  },
  {
    title: 'Logout',
    icon: 'logout',
    link: router.resolve({ path: '/logout' }).href,
  },
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const auth = useAuth();
</script>
