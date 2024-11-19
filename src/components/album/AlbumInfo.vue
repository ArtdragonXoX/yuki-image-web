<template>
    <el-container direction="vertical">
        <el-text class="mx-1" type="info">ID:{{ id }}</el-text>
        <el-text class="mx-1" type="primary">Name:{{ name }}</el-text>
        <el-row>
            <el-col :span="12">
                <el-text class="mx-1">CreateTime:{{ create_time }}</el-text>
            </el-col>
            <el-col :span="12">
                <el-text class="mx-1">UpdateTime:{{ update_time }}</el-text>
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
    console.log(res);
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