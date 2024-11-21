<template>
    <el-container class="album-list-item">
        <AlbumInfo :album-id="albumId" @updateAlbum="emit('updateAlbum')" />
        <el-container direction="vertical">
            <ImageCount :album-id="props.albumId" :date-picker-flag="false" />
            <ImageSize :album-id="props.albumId" :date-picker-flag="false" />
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
const props = defineProps<{
    albumId: number;
}>();

const emit = defineEmits(['updateAlbum']);

</script>

<style>
.album-list-item {
    height: 25vh;
}
</style>