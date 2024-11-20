<template>
    <el-container class="album-list-item">
        <AlbumInfo :album-id="albumId" />
        <el-container direction="vertical">
            <ImageCount :album-id="albumId" :date-picker-flag="false" />
            <ImageSize :album-id="albumId" :date-picker-flag="false" />
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
const props = defineProps<{
    albumId: number;
}>();

</script>

<style>
.album-list-item {
    height: 45vh;
}
</style>