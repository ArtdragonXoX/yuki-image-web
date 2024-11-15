<template>
    <div class="layout">
        <ElContainer>
            <el-row>
                <el-col :span="40">
                    <ImageCount :album-id=null />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="40">
                    <ImageSize :album-id=null />
                </el-col>
            </el-row>
        </ElContainer>
    </div>
</template>

<script lang="ts" setup>


</script>

<style>
</style>