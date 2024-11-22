<template>
    <el-container class="album-info" direction="vertical">
        <el-text class="album-info-text" type="info">ID:{{ album.id }}</el-text>
        <el-text class="album-info-text" style="font-size:30px" type="primary" tag="b">{{ album.name }}</el-text>
        <el-text class="album-info-text">CreateTime:</el-text>
        <el-text class="album-info-text" type="success">{{ album.create_time }}</el-text>
        <el-text class="album-info-text">UpdateTime:</el-text>
        <el-text class="album-info-text" type="success">{{ album.update_time }}</el-text>
        <el-container class="album-info-button-container">
            <div style="height: 3vh;width: 3vh;">
                <AlbumDataButton :album-id="albumId" @updateAlbum="onUpdateAlbum" />
            </div>
            <div style="height: 3vh;width: 3vh;">
                <AlbumDeleteButton :album-id="albumId" @delete="DeleteAlbum" />
            </div>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { GetAlbum } from '@/stores/album';
import type { Album } from '@/types/Album';
import { ElMessage } from 'element-plus';

const props = defineProps<{
    albumId: number;
}>();

const album = ref<Album>(
    { id: 0, name: '', create_time: '', update_time: '' } as Album
);

onMounted(() => {
    onUpdateAlbum();
});

const emit = defineEmits(['updateAlbum']);

const onUpdateAlbum = () => {
    GetAlbum(props.albumId).catch((e) => {
        ElMessage.error(e);
    }).then((res) => {
        album.value = res as Album;
    })
};

const DeleteAlbum = () => {
    emit('updateAlbum');
};

</script>

<style>
.album-info-text {
    margin: 2px;
    font-size: 18px;
}

.album-info {
    border: solid 1px #eee;
    width: 2vh;
    height: 100%;
}

.album-info-button-container {
    height: 4vh;
    margin: 1px;
    display: flex;
    justify-content: flex-end;
    overflow: auto;
}

.album-info-button-container>div {
    margin-right: 1vh;
    /* 设置button之间的间隔 */
}
</style>