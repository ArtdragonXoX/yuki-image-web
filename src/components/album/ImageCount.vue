<template>
    <div class="image-count">
        <el-container class="dash-board">
            <el-header>
                <el-text class="dash-title">图片总数</el-text>
            </el-header>
            <el-footer>
                <el-statistic class="dash-statistic" :value="outputCount" />
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTransition } from '@vueuse/core';
import { GetAlbumCount } from '@/stores/album';
import { ElMessage } from 'element-plus';

const props = defineProps<{
    albumId: number | null;
}>();

const count = ref(0);
const outputCount = useTransition(count, {
    duration: 400
});

GetAlbumCount(props.albumId).then((res: any) => {
    count.value = res;
}).catch(err => {
    ElMessage.error(err);
});

</script>

<style>
.dash-board {
    border: 1px solid #eaeaea;
}

.el-header {
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
}
</style>