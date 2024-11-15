<template>
    <div class="logout-button">
        <ElButton type="danger" @click="handleLogout" style="width: 30%;">
            Logout
        </ElButton>
    </div>
</template>

<script setup lang="ts">
import { Logout } from "@/stores/admin";

const handleLogout = () => {
    Logout();
    location.reload();
};

</script>