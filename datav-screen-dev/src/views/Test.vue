<template>
  <div style="width: 500px; height: 400px">
    <base-scroll-list
      :config="config"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'Test',
  setup () {
    const config = ref({});
    const headerTitle = ['姓名', '年龄', '月薪'];
    const headerTitleStyle = [{ color: 'white' }, { width: '100px' }];
    const headerBg = 'rgb(90, 90, 90)';
    const headerFontSize = 24;
    const headerColor = '#fff';
    const rowStyle = [{ color: 'blue' }];
    const rowBg = ['rgb(200,200,200)', 'rgb(255,255,255)'];
    const rowFontSize = 20;
    const rowColor = '#000';
    const aligns = ['center', 'center', 'center'];
    const tableData = [];

    for (let i = 0; i < 10; ++i) {
      tableData.push([
        '测试员' + (i + 1),
        Math.floor(Math.random() * 10 + 20),
        Math.floor(Math.random() * 1000 + 2000)
      ]);
    }

    config.value = {
      headerTitle,
      headerTitleStyle,
      headerIndex: true, // 是否需要索引
      headerBg,
      headerFontSize,
      headerColor,
      rowStyle,
      rowBg,
      rowFontSize,
      rowColor,
      aligns,
      rowNum: 10,
      data: tableData
    };

    return {
      config
    };
  }
};
</script>

<style lang="scss" scoped>

</style>
