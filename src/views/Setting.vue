<template>
    <el-text class="setting-text">Setting</el-text>
    <el-form :model="config.server" label-width="120px">
        <el-form-item label="Port">
            <el-input v-model="config.server.port" placeholder="Please input"></el-input>
        </el-form-item>
        <el-form-item label="Token">
            <el-input v-model="config.server.token" placeholder="Please input"></el-input>
        </el-form-item>
    </el-form>
    <el-form :model="config.db" label-width="120px">
        <el-form-item label="Max Open Conns">
            <el-input-number v-model="config.db.max_open_conns" placeholder="Please input"></el-input-number>
        </el-form-item>
        <el-form-item label="Max Idle Conns">
            <el-input-number v-model="config.db.max_idle_conns" placeholder="Please input"></el-input-number>
        </el-form-item>
    </el-form>
    <el-form :model="config.image" label-width="120px">
        <el-form-item label="Auto Delete Tmp">
            <el-switch v-model="config.image.auto_delete_tmp"></el-switch>
        </el-form-item>
        <el-form-item label="Compression Quality">
            <el-input-number v-model="config.image.compression_quality" placeholder="Please input"></el-input-number>
        </el-form-item>
        <el-form-item label="Image List Default Size">
            <el-input-number v-model="config.image.image_list_defalut_size"
                placeholder="Please input"></el-input-number>
        </el-form-item>
        <el-form-item label="Key Length">
            <el-input-number v-model="config.image.key_length" placeholder="Please input"></el-input-number>
        </el-form-item>
        <el-form-item label="Max Size">
            <el-input-number v-model="config.image.max_size" placeholder="Please input"></el-input-number>
        </el-form-item>
        <el-form-item label="Path">
            <el-input v-model="config.image.path" placeholder="Please input"></el-input>
        </el-form-item>
        <el-form-item label="Url">
            <el-input v-model="config.image.url" placeholder="Please input"></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm">Submit</el-button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus';
import type { Config } from '@/types/system';
import { GetConfig, UpdateConfig, UpdateToken } from '@/stores/system'
const config = ref<Config>({
    server: { port: '', token: '' }, // 示例数据，应根据实际情况填充
    db: { max_open_conns: 0, max_idle_conns: 0 }, // 示例数据
    image: { // 示例数据，填充必要的默认值
        auto_delete_tmp: false,
        compression_quality: 0,
        image_list_defalut_size: 0,
        key_length: 0,
        max_size: 0,
        path: '',
        url: '',
    },
});

onMounted(async () => {
    config.value = await GetConfig().catch((e) => {
        ElMessage.error(e);
        return {} as Config;
    }).then((res) => {
        return res;
    });
});

const submitForm = async () => {
    await UpdateConfig(config.value).then(() => {
        ElMessage.success('修改成功');
    }).catch((e) => {
        ElMessage.error(e);
    });
};

</script>

<style>
.setting-text {
    font-size: 16px;
}
</style>