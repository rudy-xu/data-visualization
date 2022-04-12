<template>
  <div class="scroll-list">
    <base-scroll-list
      :config="config"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'ScrollList',
  setup () {
    const config = ref({});
    const headerTitle = ['姓名', '年龄', '月薪'];
    // const headerTitleStyle = [{ color: 'white' }, { width: '100px' }];
    const headerBg = 'rgb(80, 80, 80)';
    const headerFontSize = 24;
    const headerColor = '#fff';
    const headerIndexContent = '';
    // const rowStyle = [{ color: 'blue' }];
    const rowBg = ['rgb(40,40,40)', 'rgb(55,55,55)'];
    const rowFontSize = 24;
    const rowColor = '#fff';
    const aligns = ['center', 'center', 'center'];
    const tableData = [];
    const headerIndexData = [];
    for (let i = 0; i < 10; ++i) {
      tableData.push([
        '测试员' + (i + 1),
        `<div style="color: rgb(178,209,126)">${Math.floor(Math.random() * 10 + 20)}</div>`,
        Math.floor(Math.random() * 1000 + 2000)
      ]);

      if (i % 2 === 0) {
        headerIndexData[i] = `
          <div style="width: 100%; height:100%; display: flex; align-items: center; justify-content: center; background: rgb(40,40,40)">
            <div style="width: 15px; height: 15px; background: rgb(72,122,72); border-radius: 50%; border: 1px solid #fff" />
          </div>
        `;
      } else {
        headerIndexData[i] = `
          <div style="width: 100%; height:100%; display: flex; align-items: center; justify-content: center; background: rgb(40,40,40)">
            <div style="width: 15px; height: 15px; background: rgb(38,88,250); border-radius: 50%; border: 1px solid #fff" />
          </div>
        `;
      }
    }

    config.value = {
      headerTitle,
      // headerTitleStyle,
      headerHeight: 55,
      headerIndex: true, // 是否需要索引
      headerBg,
      headerFontSize,
      headerColor,
      headerIndexContent,
      headerIndexData,
      // rowStyle,
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
.scroll-list {
  width: 100%;
  height: 100%;
}
</style>
