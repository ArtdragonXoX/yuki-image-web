<template>
    <div class="image-count">
        <el-container class="dash-container">
                <div class="dash-board">
                <el-header class="dash-header">
                    <el-text class="dash-title">图片总数</el-text>
                </el-header>
                <el-main class="dash-main">
                    <el-statistic class="dash-statistic" :value="outputCount" />
                </el-main>
                </div>
            <StatisticsAreaChart class="AreaChart" :-func="Func" :album-id="albumId" :date-picker-flag="datePickerFlag" />
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTransition } from '@vueuse/core';
import { GetAlbumCount } from '@/stores/album';
import { ElMessage } from 'element-plus';
import { GetAlbumCountStatistics } from "@/stores/album";

const props = withDefaults(defineProps<{
    albumId: number | null;
    datePickerFlag?: boolean;
}>(),{
    albumId: null,
    datePickerFlag:true,
});

const Func = GetAlbumCountStatistics;

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
@import '../../assets/album.css'
</style>