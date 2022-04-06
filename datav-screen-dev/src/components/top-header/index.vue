<template>
  <div class="top-header">
    <div class="logo-wrapper">
      <my-Logo stroke="white" stroke-width="50"/>
    </div>
    <div class="header-text">
      <div class="cn-text">数据大屏展示</div>
      <div class="en-text">Data big screen display</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader'
};
</script>

<style lang="scss" scoped>
.top-header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: rgb(36,31,32);
  padding: 0 64px;
  box-sizing: border-box;

  .logo-wrapper {
    width: 120px;
    height: 120px;
  }

  .header-text {
    flex: 1;
    margin-left: 40px;
    color: rgb(255,255,255);

    .cn-text {
      font-weight: bold;
      font-size: 60px;
      letter-spacing: 2px;
    }

    .en-text {
      font-size: 35px;
      letter-spacing: 1px;
    }
  }
}
</style>
