import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/user/login.vue'),
    },
    {
      path:'/register',
      name: 'register',
      component: () => import('../views/user/register.vue'),
    }
  ],
})

export default router

router.beforeEach((to, from, next) => {
  //to到哪儿  from从哪儿离开  next跳转 为空就是放行  
  const token = localStorage.getItem('token');
  let tokenState = !(token == null || token === '');
  if (to.path === '/login' || to.path === '/register') {
    if (tokenState === true) {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    if (tokenState === false) {
      console.log('请先登录')
      next({ name: 'login' });
    } else {
      next();
    }
  }
});
