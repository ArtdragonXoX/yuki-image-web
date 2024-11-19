<template>
    <div class="image-count">
        <el-container >
                <div class="dash-board">
                <el-header class="dash-header">
                    <el-text class="dash-title">图片占用</el-text>
                </el-header>
                <el-main>
                    <el-statistic class="dash-statistic" :value="outputSize" :formatter="formatSize" suffix="MB" />
                </el-main>
                </div>
            <StatisticsAreaChart class="AreaChart" :album-id="albumId" :-func="Func" />
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTransition } from '@vueuse/core';
import { GetAlbumSize } from '@/stores/album';
import { ElMessage } from 'element-plus';
import { GetAlbumSizeStatistics } from "@/stores/album";

const props = defineProps<{
    albumId: number | null;
}>();

const Func = GetAlbumSizeStatistics;

const size = ref(0.0);
const outputSize = useTransition(size, {
    duration: 400
});

GetAlbumSize(props.albumId).then((res: any) => {
    size.value = res/1024/1024;
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