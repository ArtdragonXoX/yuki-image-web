<template>
    <div class="flex">
        <aside class="bg-gray-800 text-white w-64 min-h-screen flex flex-col p-4">
            <h2 class="text-2xl font-bold mb-4">侧边栏导航</h2>
            <nav>
                <ul>
                    <li v-for="item in navItems" :key="item.path" class="mb-2">
                        <router-link :to="item.path"
                            class="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                            {{ item.name }}
                        </router-link>
                    </li>
                </ul>
            </nav>
        </aside>
        <div class="flex-1">
            <el-container>
                <el-main>
                    <!-- RouterView will be rendered here -->
                </el-main>
            </el-container>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
    name: 'SidebarNav',
    components: {
        RouterLink,
    },
    data() {
        return {
            navItems: [
                { name: '首页', path: '/' },
                { name: '登录', path: '/login' },
                { name: '产品介绍', path: '/products' },
                { name: '联系我们', path: '/contact' },
            ],
        };
    },
});
</script>

<style scoped>
.aside {
  width: 200px; /* 或者任何你想要的宽度 */
}
</style>