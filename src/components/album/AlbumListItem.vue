<template>
    <el-container>
        <AlbumInfo :album-id="albumId"/>
        <ImageCount :album-id="albumId"/>
        <ImageSize :album-id="albumId"/>
    </el-container>
</template>

<script setup lang="ts">
const props = defineProps<{
    albumId: number;
}>();

</script>