<template>
    <ElForm :model="admin" label-width="auto" style="width: 30%;">
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Login } from '@/stores/admin';
import router from '@/router'
import { ElMessage, type FormItemProps } from 'element-plus';

export default defineComponent({
    setup() {
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
        return {
            admin,
            itemLabelPosition,
            handleLogin
        };
    }
});
</script>