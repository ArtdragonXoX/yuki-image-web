<template>
    <div class="header">
        <el-row type="flex" justify="start">
            <el-col :span="6">
                <el-text class="mx-2" size="large" tag="ins">
                    yuki-image
                </el-text>
            </el-col>
            <el-col :span="6">

            </el-col>
            <el-col :span="6">

            </el-col>
            <el-col :span="6">
                <div v-if="isTokenExist">
                    <LogoutButton />
                </div>
                <div v-if="!isTokenExist" class="login-prompt">
                    <el-text class="mx-1" type="info">
                        未登录，请先登录！
                    </el-text>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LogoutButton from './LogoutButton.vue'; // 确保导入了LogoutButton组件

// 创建一个响应式的引用，用于存储token是否存在的状态
const isTokenExist = ref(false);

// 在组件挂载后检查localStorage中是否存在token
onMounted(() => {
    const token = localStorage.getItem('token'); // 假设token的键是'token'
    if (token) {
        isTokenExist.value = true; // 如果token存在，更新状态为true
    }
});
</script>

<style>
.header {
    background-color: #FFFFFF;
    height: 35px;
    border-bottom: 1px solid var(--el-border-color);
    display: flex;
    flex-direction: column;
}

.header .el-row {
    flex: 1;
}
</style>