<template>
    <div class="logout-button">
        <ElButton type="danger" @click="handleLogout" style="width: 30%;">
            Logout
        </ElButton>
    </div>
</template>

<script lang="ts">
import { Logout } from "@/stores/admin";
import router from '@/router'
export default {
    setup() {
        const handleLogout = () => {
            Logout();
            location.reload();
        };

        return { handleLogout };
    },
};
</script>