<template>
    <el-button type="danger" @click="dialogVisible = true" circle :icon="Delete" />
    <el-dialog title="Confirm" v-model="dialogVisible">
        <el-row>
            <el-text type="warning" style="font-size: 18px;"> Are you sure you want to delete the album? </el-text>
        </el-row>
        <el-row justify="end">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="danger" @click="AlbumDelete">Delete</el-button>
        </el-row>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DeleteAlbum } from '@/stores/album';
import { ElMessage } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';


const props = defineProps<{
    albumId: number;
}>();

const dialogVisible = ref(false);

const emit = defineEmits(['delete']);

const AlbumDelete = () => {
    DeleteAlbum(props.albumId).then(() => {
        emit('delete');
    }).catch((e) => { ElMessage.error(e.message); });
    ElMessage.success('Album deleted successfully');
    dialogVisible.value = false;
    emit('delete');
};

</script>