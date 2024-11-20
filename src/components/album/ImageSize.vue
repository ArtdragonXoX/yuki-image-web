<template>
    <div class="image-size">
        <el-container class="dash-container">
                <div class="dash-board">
                <el-header class="dash-header">
                    <el-text class="dash-title">图片占用</el-text>
                </el-header>
                <el-main class="dash-main">
                    <el-statistic class="dash-statistic" :value="outputSize" :formatter="formatSize" suffix="MB" />
                </el-main>
                </div>
            <StatisticsAreaChart class="AreaChart" :-func="Func" :date-picker-flag="datePickerFlag" />
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTransition } from '@vueuse/core';
import { GetAlbumSize } from '@/stores/album';
import { ElMessage } from 'element-plus';
import { GetAlbumSizeStatistics } from "@/stores/album";

const props = withDefaults(defineProps<{
    albumId: number | null;
    datePickerFlag?: boolean;
}>(),{
    albumId: null,
    datePickerFlag:true,
});

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
@import '../../assets/album.css'
</style>