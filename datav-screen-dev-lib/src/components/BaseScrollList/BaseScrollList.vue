<template>
  <div class="base-scroll-list" :id="id">
    <div class="base-scroll-list-header" :style="{
      backgroundColor: finalConfig.headerBg,
      height: `${finalConfig.headerHeight}px`,
      fontSize: `${finalConfig.headerFontSize}px`,
      color: finalConfig.headerColor
    }">
      <div
        class="header-item base-scroll-list-text"
        v-for="(headerItem, i) in headerTitle"
        :key="headerItem + i"
        :style="{
          width: `${columnWidths[i]}px`,
          ...headerTitleStyle[i]
        }"
        :align="aligns[i]"
        v-html="headerItem"
      />
    </div>
    <div
      class="base-scroll-list-body"
      :style="{
        height: `${height - finalConfig.headerHeight}px`
      }"
    >
      <div
        class="base-scroll-list-rows"
        v-for="(rowData, index) in currentRowData"
        :key="rowData.rowIndex"
        :style="{
          height: `${rowHeights[index]}px`,
          lineHeight: `${rowHeights[index]}px`,
          backgroundColor: rowData.rowIndex % 2 === 0 ? rowBg[1] : rowBg[0],
          fontSize: `${finalConfig.rowFontSize}px`,
          color: finalConfig.rowColor
        }"
      >
        <div
          class="base-scroll-list-columns base-scroll-list-text"
          v-for="(columnData, columnIndex) in rowData.data"
          :key="columnData + columnIndex"
          :style="{
            width: `${columnWidths[columnIndex]}px`,
            ...rowStyle[columnIndex]
          }"
          :align="aligns[columnIndex]"
          v-html="columnData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import useScreen from '../../hooks/useScreen';
import cloneDeep from 'lodash/cloneDeep';
import assign from 'lodash/assign';

const defaultConfig = {
  // 标题 ['t1', 't2']
  headerTitle: [],
  // 标题样式 [{color: 'red'}, {}]
  headerTitleStyle: [],
  headerBg: 'rgb(90, 90, 90)',
  headerHeight: 40,
  headerIndex: false,
  headerIndexContent: '#',
  headerIndexData: [],
  headerIndexStyle: {
    width: '50px'
  },
  headerFontSize: 24,
  headerColor: '#fff',
  rowStyle: [],
  rowIndexStyle: {
    width: '50px'
  },
  rowBg: [],
  rowFontSize: 20,
  rowColor: '#000',
  aligns: [],
  rowNum: 5,
  data: [],
  stepNum: 1,   // 每次移动的步长
  duration: 2000,   // 动画的时长 - 应该小于 transition 中设置的时间
  heightSetZeroTime: 300,
}

export default {
  name: "BaseScrollList",
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  setup(ctx) {
    const id = `base-scroll-list-${uuidv4()}`;
    const { width, height } = useScreen(id);
    const finalConfig = ref([]);
    const headerTitle = ref([]);
    const headerTitleStyle = ref([]);
    const columnWidths = ref([]);
    const rowsData = ref([]);         // 实际存在的数据
    const currentRowData = ref([]);   // 真实在页面上渲染的数据
    const currentIndex = ref(0);      // 指向当前发生动画的元素(比如即将消失的第一行元素)
    const rowStyle = ref([]);
    const rowNum = ref(defaultConfig.rowNum);
    const rowHeights = ref([]);
    const rowBg = ref([]);
    const aligns = ref([]);
    const isAnimationStart = ref(true);

    let avgHeight;  // 平均行高

    const hadleHeader = (config) => {
      const tempHeaderTitle = cloneDeep(config.headerTitle);
      const tempHeaderTitleStyle = cloneDeep(config.headerTitleStyle);
      const tempRowsData = cloneDeep(config.data || []);
      const tempRowStyle = cloneDeep(config.rowStyle);
      const tempAligns = cloneDeep(config.aligns);

      if(tempHeaderTitle.length === 0) {
        return;
      }

      if(config.headerIndex) {
        tempHeaderTitle.unshift(config.headerIndexContent);
        tempHeaderTitleStyle.unshift(config.headerIndexStyle);
        tempRowStyle.unshift(config.rowIndexStyle);
        tempRowsData.forEach((rows, index) => {
          // 序号列显示的内容
          if (config.headerIndexData && config.headerIndexData.length > 0 && config.headerIndexData[index]) {
            rows.unshift(config.headerIndexData[index]);
          } else {
            // 默认
            rows.unshift(index+1);
          }

        });
        tempAligns.unshift('center');
      }

      /**
       * 计算每一列宽度
       */
      // 计算含有自定义的列
      let usedWidth = 0;
      let usedColumnNum = 0;
      tempHeaderTitleStyle.forEach(style => {
        if (style.width) {
          usedWidth += +style.width.replace('px', '');
          ++usedColumnNum;
        }
      });

      // 计算平均宽度
      const avgWidth = ( width.value - usedWidth ) / (tempHeaderTitle.length - usedColumnNum);
      // 所有列宽统一为 平均宽度
      const tempColumnWidth = new Array(tempHeaderTitle.length).fill(avgWidth);
      // 将自定以的 width 重新覆盖
      tempHeaderTitleStyle.forEach(( style, index ) => {
        if (style.width) {
          const headerWidth = +style.width.replace('px', '');
          tempColumnWidth[index] = headerWidth
        }
      });


      // 扩充数据，如果数据长度等于展示长度，则无法正常显示动画
      // 因为没有多余的条数可以展示
      const { rowNum } = config;
      if ( tempRowsData.length >= rowNum && tempRowsData.length < rowNum * 2) {
        const newRowData = [...tempRowsData, ...tempRowsData];
        rowsData.value = newRowData.map((item, index) => ({
          // 保证后期做数据首位相连的时候, 每个数据的索引不变
          data: item,
          rowIndex: index
        }))
      } else {
        rowsData.value = tempRowsData.map((item, index) => ({
          data: item,
          rowIndex: index
        }))
      }

      columnWidths.value = tempColumnWidth;
      headerTitle.value = tempHeaderTitle;
      headerTitleStyle.value = tempHeaderTitleStyle;
      rowStyle.value = tempRowStyle;
      aligns.value = tempAligns;
    }

    // 动态计算行属性
    const handleRows = (config) => {
      const { headerHeight } = config;
      rowNum.value = config.rowNum;
      const unusedHeight = height.value - headerHeight;

      if (rowNum.value > rowsData.value.length) {
        rowNum.value = rowsData.value.length;
      }
      avgHeight = unusedHeight / rowNum.value;
      rowHeights.value = new Array(rowNum.value).fill(avgHeight);

      if (config.rowBg) {
        rowBg.value = config.rowBg;
      }

    }

    /**
     * 列表动画展示
     * 实现原理
     *   - 利用 css3 的 transition 实现
     *   - 改变 消失和出现的行 的高度，即可以出现动画效果
     * 实现步骤
     *  0.将数据头尾连接，形成轮询的效果(滚动播出) --- [a, b, c, d, e, f]  ->  [c, d, e, f, a, b]
     *  1. 将所有行的高度还原
     *  2. 设置高度消失时间，要和 transiton 的时间匹配
     *  3. 将 stepNum 行的高度设置为 0
     *  4. 修改 currentIndex 值
     *
     */
    const startAnimation = async () => {
      if (!isAnimationStart) return;

      const { rowNum, stepNum, duration, heightSetZeroTime } = finalConfig.value;
      const totalLength = rowsData.value.length;

      // 如果数据总长度小于展示的行数，则不需要动画
      if ( totalLength < rowNum ) return;

      // 将数据头尾连接，形成轮询的效果(滚动播出)
      // [a, b, c, d, e, f]  ->  [c, d, e, f, a, b]
      const index = currentIndex.value;
      const rowsDataCopy = cloneDeep(rowsData.value);
      const tempRows = rowsDataCopy.slice(index);
      tempRows.push(...rowsDataCopy.slice(0, index));
      currentRowData.value = tempRows;

      /**
       * 实现动画， 改变高度
       * 1. 将所有行的高度还原
       * 2. 设置高度消失时间，要和 transiton 的时间匹配
       * 3. 将 stepNum 行的高度设置为 0
       * 4. 修改 currentIndex 值
       */
      // 1. 将所有行的高度还原
      rowHeights.value = new Array(totalLength).fill(avgHeight);
      if (!isAnimationStart) return;
      await new Promise(resolve => setTimeout(resolve, heightSetZeroTime));
      // 3. 将 stepNum 行的高度设置为 0
      rowHeights.value.splice(0, stepNum, ...new Array(stepNum).fill(0));
      // 4. 修改 currentIndex 值
      currentIndex.value += stepNum;
      // 是否到达最后的元素，如果是把 currentIndex 重新指向 最新的元素
      const isLast = currentIndex.value - totalLength;
      if (isLast >=0 ) {
        currentIndex.value = isLast
      }

      // 每隔多久滚动一次
      // 模拟 Sleep
      if (!isAnimationStart) return;
      await new Promise(resolve => setTimeout(resolve, duration - heightSetZeroTime));
      startAnimation();
    }

    const update = () => {
      stopAnimation();

      const tempFinalConfig = assign(defaultConfig, ctx.config);
      hadleHeader(tempFinalConfig);
      handleRows(tempFinalConfig);
      finalConfig.value = tempFinalConfig;

      isAnimationStart.value = true;
      startAnimation();
    }

    const stopAnimation = () => {
      isAnimationStart.value = false;
    }

    /**
     * 使用 watch 而不是 onMounted 原因是：
     * 如果父组件在 onMounted 中传入数据，子组件使用 onMounted 会接收不到数据
     */
    watch(() => ctx.config, () => {
      update();
    });

    onMounted(() => {
      update();
    })

    return {
      id,
      height,
      finalConfig,
      headerTitle,
      headerTitleStyle,
      columnWidths,
      rowsData,
      currentRowData,
      rowHeights,
      rowStyle,
      rowBg,
      aligns
    };
  }
}
</script>

<style lang="scss" scoped>
.base-scroll-list {
  width: 100%;
  height: 100%;

  .base-scroll-list-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }

  .base-scroll-list-header {
    display: flex;
    align-items: center;
    font-size: 15px;
  }

  .base-scroll-list-body {
    overflow: hidden;

    .base-scroll-list-rows {
      display: flex;
      align-items: center;
      transition: all 0.3s linear;

      .base-scroll-list-columns {
        height: 100%;
      }
    }
  }
}
</style>
