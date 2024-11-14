<template>
    <div class="layout">
        <ElContainer>
            <ElMain>
                <ElText class="mx-1" size="large">我是主页</ElText>
            </ElMain>
            <ElFooter class="text-center">
                <LogoutButton />
            </ElFooter>
        </ElContainer>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({});
</script>