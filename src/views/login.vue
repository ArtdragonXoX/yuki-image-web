<template>
    <div class="layout">
    <ElForm :model="admin" label-width="auto" >
        <ElFormItem label="Name" :label-position="itemLabelPosition">
            <ElInput v-model="admin.name" />
        </ElFormItem>
        <ElFormItem label="Password" :label-position="itemLabelPosition">
            <ElInput v-model="admin.pwd" type="password" />
        </ElFormItem>
        <ElFormItem>
            <ElButton type="primary" @click="handleLogin" style="width: 100%;">
                Login
            </ElButton>
        </ElFormItem>
    </ElForm>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Login } from '@/stores/admin';
import router from '@/router'
import { ElMessage, type FormItemProps } from 'element-plus';


const admin = ref({
    name: '',
    pwd: ''
});

const itemLabelPosition = ref<FormItemProps['labelPosition']>('right')

const handleLogin = async () => {
    let token: any;
    try {
        token = await Login(admin.value);
    } catch (e: Error | any) {
        ElMessage.error(e.message);
        return
    }
    if (typeof token === 'string') {
        localStorage.setItem('token', token)
        router.push({ name: 'home' });
    }
};
</script>

<style>
.layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>