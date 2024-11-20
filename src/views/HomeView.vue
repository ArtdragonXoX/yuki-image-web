<template>
    <ElContainer class="home-container">
        <ImageCount :album-id=null />
        <ImageSize :album-id=null />
    </ElContainer>
</template>

<script lang="ts" setup>


</script>

<style>
.home-container {
    height: 40vh;
    display: flex;
    flex-direction: column;
}
</style>