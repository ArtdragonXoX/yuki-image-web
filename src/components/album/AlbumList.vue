<!-- AlbumList.vue -->
<template>
    <div>
        <h2>Album List</h2>
        <el-row justify="end">
            <AlbumDataButton @updateAlbum="UpdateAlbum" />
        </el-row>
        <!-- 使用 v-for 指令遍历 albumIds，为每个 albumId 渲染一个 AlbumListItem 组件 -->
        <li v-for="albumId in albumIds" :key="albumId" style="list-style-type:none; margin-bottom:2vh;">
            <AlbumListItem :album-id="albumId" @updateAlbum="UpdateAlbum" />
        </li>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { GetAlbums } from '@/stores/album';
import type { Album } from '@/types/Album';

const albumIds = ref<number[]>([]);

onMounted(() => {
    UpdateAlbum();
});

const UpdateAlbum = () => {
    albumIds.value = []
    GetAlbums().then((res: Album[]) => {
        res.forEach((album: Album) => {
            if (album.id) {
                albumIds.value.push(album.id);
            }
        });
    });
};
</script>