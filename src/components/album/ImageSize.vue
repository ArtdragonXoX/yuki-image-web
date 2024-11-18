<template>
    <div class="image-size">
        <el-container class="dash-board">
            <el-header class="dash-header">
                <el-text class="dash-title">图片占用</el-text>
            </el-header>
            <el-footer>
                <el-statistic class="dash-statistic" :value="outputsize" :formatter="formatSize" suffix="MB" />
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTransition } from '@vueuse/core';
import { GetAlbumSize } from '@/stores/album';
import { ElMessage } from 'element-plus';

const props = defineProps<{
    albumId: number | null;
}>();

const size = ref(0.0);
const outputsize = useTransition(size, {
    duration: 400
});

GetAlbumSize(props.albumId).then((res: any) => {
    size.value = res/(1024*1024);
}).catch(err => {
    ElMessage.error(err);
});

const formatSize = (value: number) => {
    // 根据需要格式化 value，例如保留两位小数
    return value.toFixed(2);
};
</script>

<style>
/* .dash-board {
    border: 1px solid #eaeaea;
}

.dash-header {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dash-title {
    font-size: 20px;
}

.dash-statistic {
    --el-statistic-content-font-size: 28px;
} */
</style>