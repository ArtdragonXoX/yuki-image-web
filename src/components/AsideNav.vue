<template>
    <el-menu :default-active="activeIndex" class="el-menu-vertical" background-color="#545c64" text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item v-for="(link, index) in menuLinks" :key="index" :index="String(index + 1)"
            @click="handleNavigate(link.to)">
            {{ link.name }}
        </el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, watchEffect } from "vue";
import { useRouter,useRoute } from "vue-router";

const activeIndex = ref('1'); // 默认激活的菜单项索引

const route = useRoute();

const token = localStorage.getItem('token');
let tokenState =!(token == null || token === '') ;

const menuLinks = computed(() => {
    let links = [
    ];
    if (!tokenState) {
        links.push({
            name: "登录",
            to: "/login"
        }, {
            name: "注册",
            to: "/register"
        });
    }
    if (tokenState) {
        links.push({
            name: "仪表盘",
            to: "/"
        },
            {
                name: "相册",
                to: "/album"
            },
            {
                name: "设置",
                to: "/setting"
            },
            {
                name: "管理员",
                to: "/admin"
            }
        );
    }
    return links;
});
watchEffect(() => {
    // 根据当前路由的path来设置activeIndex
    // 这里假设你的路由path和菜单项的to属性是匹配的
    const currentPath = route.path;
    const index = menuLinks.value.findIndex(link => link.to === currentPath);
    if (index !== -1) {
        activeIndex.value = String(index + 1);
    }
});
const router = useRouter();
const handleNavigate = (to: string) => {
    router.push(to);
};

</script>

<style>
.el-menu-vertical:not(.el-menu--collapse) {
    width: 150px;
    min-height: 400px;
}
</style>