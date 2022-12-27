import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/register', component: () => import('pages/RegisterPage.vue')},
      { path: '/login', component: () => import('pages/LoginPage.vue')},
      { path: '/tickets', component: () => import('pages/TicketsPage.vue')},
      { path: '/tickets/new', component: () => import('pages/TicketFormPage.vue')},
      { name: 'ticket-view', path: '/tickets/:id', component: () => import('pages/TicketViewPage.vue'), props: true},
      { name: 'ticket-form', path: '/tickets/:id/edit', component: () => import('pages/TicketFormPage.vue'), props: true},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
