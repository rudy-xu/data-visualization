import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Test from '../views/Test.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
  // {
  //   path: '/test',
  //   name: 'Test',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "test" */ '../views/proto-componsition-api/Test.vue')
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
