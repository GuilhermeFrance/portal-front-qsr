import LoginPage from 'src/pages/LoginPage.vue';
import RegisterPage from 'src/pages/RegisterPage.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'Login' },
    component: () => import('layouts/MainLayout.vue'),
    children: [

      { path: 'inicio', component: () => import('src/pages/HomePage.vue') },
      { path: 'solicitacoes', component: () => import('src/pages/RequestsPage.vue') },
      { path: 'funcionarios', component: () => import('src/pages/EmployeePage.vue') },
      { path: 'solicite', component: () => import('src/pages/FormPage.vue'), name: 'Form' },
      { path: 'perfil', component: () => import('src/pages/ProfilePage.vue'), name: 'Profile' },
      {
        path: '/login',
        component: LoginPage,
        name: 'Login',
      },
      {
        path: '/register',
        component: RegisterPage,
        name: 'Register',
      },
    ],
  },


  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
