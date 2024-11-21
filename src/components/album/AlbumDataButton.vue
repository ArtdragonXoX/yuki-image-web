<template>
    <el-button type="primary" :icon="iconToDisplay" circle @click="open_info">
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
.DataButtonIcon {
    color: aliceblue;
    size: 18px;
}
</style>