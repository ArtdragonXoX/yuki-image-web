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
      component: () => import('../views/login.vue'),
    },
  ],
})

export default router

router.beforeEach((to, from, next) => {
  //to到哪儿  from从哪儿离开  next跳转 为空就是放行  
  if (to.path === '/login') {
    //如果跳转为登录，就放行 
    next();
  } else {
    //取出localStorage判断
    let token = localStorage.getItem('token');
    if (token == null || token === '') {
      console.log('请先登录')
      next({ name: 'login' });
    } else {
      next();
    }
  }
});
