<template>
    <el-container direction="vertical">
        <div class="statistics-area-chart" ref="chartDom"></div>
        <el-date-picker v-model="value" type="daterange" range-separator="To" :size="size" :defaultTime="defaultTime"
            format="YYYY-MM-DD"></el-date-picker>
    </el-container>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, onMounted, onUnmounted } from "vue"
import * as echarts from "echarts"
import type { StatisticsFunc } from "@/types/func";
const props = defineProps<{
    albumId: number | null;
    Func: StatisticsFunc<number | null, Date, Date, Promise<{ [key: string]: number }>>;
}>();

const size = ref<'default'>('default');

function getTodayRange() {
    const now = new Date(); // 获取当前日期和时间
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7,);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return [startOfDay, endOfDay] as [Date, Date];
}

const value = ref<[Date, Date]>(getTodayRange());
const defaultTime = ref(getTodayRange());

type EChartsOption = echarts.EChartsOption;

const myChart = ref<echarts.ECharts | null>(null);
const chartDom = ref<HTMLElement | null>(null);
let option: EChartsOption | null = null;

onMounted(() => {
    // 确保 DOM 元素已经渲染
    // const chartDom = document.getElementById('area-chart');
    if (chartDom.value) {
        // 初始化 ECharts 实例
        myChart.value = echarts.init(chartDom.value);
        updateOption();
    } else {
        console.error('无法找到用于初始化 ECharts 的 DOM 元素');
    }
});

onUnmounted(() => {
    if (myChart.value) {
        myChart.value.dispose(); // 调用ECharts的dispose方法
    }
});


watch(value, (newVal) => {
    if (newVal) {
        updateOption();
    };
});

const updateOption = async () => {
    if (myChart.value != null && value.value != null) {
        const statistics = await props.Func(props.albumId, value.value[0], value.value[1]);
        const xAxisData: string[] = Object.keys(statistics);
        option = {
            grid: {
                width: '80%',
                height: '70%',
                top: 20,
                left: 60,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: Object.values(statistics),
                    type: 'line',
                    areaStyle: {}
                },
            ],
            animationDuration: 300,
            animationEasing: 'linear',
            animationDurationUpdate: 300,
            animationEasingUpdate: 'linear',
        }

        myChart.value.setOption(option, {
            replaceMerge: ['xAxis', 'yAxis', 'series'],
        });
    }
}
window.addEventListener('resize', function () {
    if (myChart.value) {
        updateOption();
    }
});

</script>

<style>
.statistics-area-chart {
    width: 100%;
    height: 100%;
}
</style>