<!-- AlbumList.vue -->
<template>
    <div>
        <h2>Album List</h2>
        <ul>
            <!-- 使用 v-for 指令遍历 albumIds，为每个 albumId 渲染一个 AlbumListItem 组件 -->
            <li v-for="albumId in albumIds" :key="albumId">
                <AlbumListItem :album-id="albumId" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GetAlbums } from '@/stores/album';
import type { Album } from '@/types/Album';

const albumIds = ref<number[]>([]);

GetAlbums().then((res:Album[]) => {
    for (const album in res) {
        if (res[album].id) {
            albumIds.value.push(res[album].id)
        }
    }
});
</script>