<template>
  <BaseHeader />
  <el-container  class="flex main-container">
      <AsideNav />
        <el-main>
          <RouterView />
        </el-main>
  </el-container>
</template>

<style>
.el-main {
  text-align: center;
}

.main-container {
  height: 100vh;
}
</style>