<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarNav from './components/asideNav.vue'
</script>

<template>
  <SidebarNav />
  <el-container>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
