<template>
    <div class="image-count">
        <el-container >
                <div class="dash-board">
                <el-header class="dash-header">
                    <el-text class="dash-title">图片总数</el-text>
                </el-header>
                <el-main>
                    <el-statistic class="dash-statistic" :value="outputCount" />
                </el-main>
                </div>
            <StatisticsAreaChart class="AreaChart" :album-id="albumId" :-func="Func" />
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTransition } from '@vueuse/core';
import { GetAlbumCount } from '@/stores/album';
import { ElMessage } from 'element-plus';
import { GetAlbumCountStatistics } from "@/stores/album";

const props = defineProps<{
    albumId: number | null;
}>();

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
.image-count {
    border: #eaeaea solid 1px;
    height: 200px;
}

.dash-board {
    border: 1px solid #eaeaea;
    width: 150px;
    height: 200px;
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
}

.AreaChart {
    border: solid #eaeaea 1px;
}
</style>