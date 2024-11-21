<template>
    <el-dialog v-model="dialogVisible" title="Info" width="70vh" destroy-on-close center>
        <el-form :inline="true" :model="form" :label-position="labelPosition">
            <el-row>
                <el-form-item label="Name">
                    <el-input v-model="form.name" placeholder="Name" />
                </el-form-item>
            </el-row>
            <el-form-item label="max_height">
                <el-input v-model.number="form.max_height" placeholder="max_height" />
            </el-form-item>
            <el-form-item label="max_width">
                <el-input v-model.number="form.max_width" placeholder="max_width" />
            </el-form-item>
            <el-form-item label="format support">
                <li v-for="format in allFormat" :key="format.id">
                    <el-switch v-model="format.selected" :active-text="format.name" :inactive-text="format.name"
                        inline-prompt :label="format.id" />
                </li>
            </el-form-item>
            <el-form-item>
                <el-row type="flex" justify="end">
                    <el-button type="" @click="closeDialog">Cancel</el-button>
                    <el-button type="primary" @click="Confirm">Confirm</el-button>
                </el-row>
            </el-form-item>
        </el-form>
    </el-dialog>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from 'element-plus';
import { GetFormat, GetFormatSupport, AddFormatSupport, DeleteFormatSupport } from '@/stores/format';
import { GetAlbum, UpdateAlbum, CreateAlbum } from '@/stores/album';
import type { Album } from '@/types/Album';
import type { Format, FormatSupport } from '@/types/Format';

interface tmpFormat {
    id: number;
    name: string;
    // ... 其他属性 ...
    selected?: boolean; // 添加这个属性来表示开关状态
}

const emit = defineEmits(['updateAlbum']);

const labelPosition = 'left';

const props = withDefaults(defineProps<{
    albumId?: number;
}>(), {
});

const allFormat = ref<(tmpFormat[])>([]);
const formatSupport = ref<Format[]>([])
const form = ref<Album>({ name: '', max_height: 0, max_width: 0 });

const dialogVisible = ref(false); // 初始化为false，表示dialog默认不显示

const closeDialog = () => {
    dialogVisible.value = false;
};

const openDialog = () => {
    dialogVisible.value = true;
};

defineExpose({
    openDialog
});

onMounted(async () => {
    allFormat.value = [];
    if (props.albumId !== undefined) {
        form.value = await GetAlbum(props.albumId);
        formatSupport.value = await GetFormatSupport(props.albumId) as unknown as Format[];
    }
    const allf = await GetFormat(null);
    if (allf === null) {
        allFormat.value = [];
    } else if (!(allf instanceof Array)) {
        const index = findIndexWithId(formatSupport.value, allf.id);
        allFormat.value = [{ ...allf, selected: index !== -1 }];
    } else {
        allf.forEach(format => {
            const index = findIndexWithId(formatSupport.value, format.id);
            allFormat.value.push({ ...format, selected: index !== -1 });
        });
    }
});

const Confirm = async () => {
    if (props.albumId !== undefined) {
        let message: string = 'Fail to update';
        try {
            message = await UpdateAlbum(props.albumId, form.value);
        } catch (e) {
            ElMessage.error(message);
            return;
        }
        allFormat.value.forEach(format => {
            const tmpF: FormatSupport = { album_id: props.albumId, format_id: format.id }
            if (format.selected) {
                if (findIndexWithId(formatSupport.value, format.id) === -1) {
                    AddFormatSupport(tmpF).catch(e => ElMessage.error('Fail to add format support'));
                }
            } else {
                if (findIndexWithId(formatSupport.value, format.id) !== -1) {
                    DeleteFormatSupport(tmpF).catch(e => ElMessage.error('Fail to delete format support'));
                }
            }
        });
        ElMessage.success(message);
    } else {
        let message: string = 'Fail to create';
        try {
            message = await CreateAlbum(form.value);
        } catch (e) {
            ElMessage.error(message);
            return;
        }
        ElMessage.success(message);
        allFormat.value.forEach(format => {
            const tmpF: FormatSupport = { album_name: form.value.name, format_id: format.id }
            if (format.selected) {
                AddFormatSupport(tmpF).catch(e => ElMessage.error('Fail to add format support'));
            }
        });
    }
    closeDialog();
    emit('updateAlbum');
    // window.location.reload();
}

function findIndexWithId(array: Format[], id: number): number {
    return array.findIndex(f => f.id === id);
}

</script>