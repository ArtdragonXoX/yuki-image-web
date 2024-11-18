<template>
  <BaseHeader />
  <el-container  class="flex main-container">
      <AsideNav />
        <el-main class="app-main">
          <RouterView />
        </el-main>
  </el-container>
</template>

<style>
.app-main {
  text-align: center;
}

.main-container {
  height: 100vh;
}
</style>