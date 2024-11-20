<template>
    <el-container class="album-info" direction="vertical">
        <el-text class="album-info-text" type="info">ID:{{ id }}</el-text>
        <el-text class="album-info-text" style="font-size:30px" type="primary" tag="b">{{ name }}</el-text>
        <el-text class="album-info-text">CreateTime:</el-text>
        <el-text class="album-info-text" type="success">{{ create_time }}</el-text>
        <el-text class="album-info-text">UpdateTime:</el-text>
        <el-text class="album-info-text" type="success">{{ update_time }}</el-text>
        <el-row justify="end">
            <el-col :span="4">
                <AlbumDataButton :album-id="albumId" />
            </el-col>
        </el-row>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GetAlbum } from '@/stores/album';
import type { Album } from '@/types/Album';

const props = defineProps<{
    albumId: number;
}>();

const id = ref(0);
const name = ref('');
const create_time = ref('');
const update_time = ref('');

GetAlbum(props.albumId).then((res: Album) => {
    if (res?.id)
        id.value = res?.id;
    if (res?.name)
        name.value = res?.name;
    if (res?.create_time)
        create_time.value = res?.create_time;
    if (res?.update_time)
        update_time.value = res?.update_time;
}).catch((err) => {
    console.log(err);
});

</script>

<style>
.album-info-text {
    margin: 2px;
    font-size: 18px;
}

.album-info {
    border: solid 1px #eee;
    width: 30vh;
    height: 100%;
}
</style>