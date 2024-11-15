<template>
    <div class="layout">
    <ElForm :model="admin" label-width="auto" >
        <ElFormItem label="Name" :label-position="itemLabelPosition">
            <ElInput v-model="admin.name" />
        </ElFormItem>
        <ElFormItem label="Password" :label-position="itemLabelPosition">
            <ElInput v-model="admin.pwd" type="password" />
        </ElFormItem>
        <ElFormItem label="Confirm Password" :label-position="itemLabelPosition">
            <ElInput v-model="rePwd" type="password" />
        </ElFormItem>
        <el-alert v-if="rePwd !== admin.pwd"  type="error">Passwords do not match</el-alert>
        <ElFormItem>
            <ElButton type="primary" @click="handleRegister" style="width: 100%;">
                Register
            </ElButton>
        </ElFormItem>
    </ElForm>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Register } from '@/stores/admin';
import router from '@/router'
import { ElMessage, type FormItemProps } from 'element-plus';


const admin = ref({
    name: '',
    pwd: '',
});
const rePwd = ref('')

const itemLabelPosition = ref<FormItemProps['labelPosition']>('right')

const handleRegister = async () => {
    let data: any = {};
    if (rePwd.value !== admin.value.pwd) {
        ElMessage.error('Passwords do not match');
        return;
    }
    try {
        data = await Register(admin.value);
    } catch (e: Error | any) {
        ElMessage.error(e.message);
        return
    }
    if (typeof data === 'string') {
        ElMessage.success(data);
        router.push('/login')
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