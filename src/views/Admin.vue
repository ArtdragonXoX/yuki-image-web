<template>
    <div class="login">
        <div>管理员登录</div>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="name">用户名:</label>
                <input type="text" id="name" v-model="admin.name" required>
            </div>
            <div>
                <label for="pwd">密码:</label>
                <input type="password" id="pwd" v-model="admin.pwd" required class="mx-auto">
            </div>
            <button class="mx-auto" type="submit">登录</button>
        </form>
        <div v-if="loginData">
            <h2>登录成功，返回数据：</h2>
            <pre>{{ loginData }}</pre>
        </div>
        <div v-if="error" class="error">
            <p>{{ error }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Login } from '@/stores/admin'; // 假设Login函数在api.js文件中

export default {
    data() {
        return {
            admin: {
                name: '',
                pwd: ''
            },
            loginData: null,
            error: null
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await Login(this.admin);
                this.loginData = response;
                this.error = null;
            } catch (err) {
                this.error = err.message;
                this.loginData = null;
            }
        }
    }
};
</script>

<style>
.error {
    color: red;
}
</style>