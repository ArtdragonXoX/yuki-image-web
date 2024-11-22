<template>
    <el-button class="DataButton" type="primary" :icon="iconToDisplay" circle @click="open_info">
    </el-button>
    <AlbumData :album-id="props.albumId" ref="albumDataRef" @updateAlbum="onUpdateAlbum" />
</template>

<script setup lang="ts">
import { InfoFilled, DocumentAdd } from '@element-plus/icons-vue';
import { ref, computed } from 'vue';
import AlbumData from '@/components/album/AlbumData.vue';

const props = defineProps<{
    albumId?: number
}>();

const albumDataRef = ref<InstanceType<typeof AlbumData>>();

const iconToDisplay = computed(() => {
    return props.albumId ? InfoFilled : DocumentAdd; // 替换为你的其他图标名称
});

const open_info = () => {
    if (albumDataRef.value) {
        albumDataRef.value.openDialog();
    }
};

const emit = defineEmits(['updateAlbum']);

const onUpdateAlbum = () => {
    emit('updateAlbum');
};

</script>


<style>
.DataButton {
    color: aliceblue;
    width: 100% !important; /* 设置具体的宽度 */
    height: 100% !important; /* 设置与宽度相同的高度 */
}
.DataButton .el-icon {
    width: 100% !important; /* 设置图标宽度为 100% 以填充按钮 */
    height: 100% !important; /* 设置图标高度为 100% 以填充按钮 */
    font-size: 24px !important; /* 或者通过 font-size 来调整图标大小 */
}
</style>