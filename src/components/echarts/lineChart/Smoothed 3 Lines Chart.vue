<template>
  <div
    class="echarts-container"
    ref="echartsContainer"
    style="width: 350px; height: 350px"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";
const props = defineProps([
  "xdata",
  "ydata",
  "xname",
  "yname",
  "y1name",
  "y2name",
  "y1data",
  "y2data",
]);
const echartsContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (echartsContainer.value) {
    // 初始化 ECharts 实例
    const myChart = echarts.init(echartsContainer.value);

    // 设置图表配置项和数据
    const option = {
      title: {
        text: props.yname,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false,
        },
        valueFormatter: (value: number) => {
          if (value > 10) {
            return parseFloat(value.toFixed(0)).toLocaleString("en-US"); // 将大于10的数字四舍五入为整数
          } else {
            if (typeof value == "number") {
              return value.toFixed(4); // 小于等于10的数字保留一位小数
            }
          }
        },
      },
      xAxis: {
        type: "category",
        data: props.xdata,
        name: props.xname,
        nameGap: 5,
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: function (value: number) {
            if (value >= 100000) {
              return (value / 1000000).toFixed(1) + "M"; // 将大于等于100k的数字转换为M形式
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + "k"; // 将大于等于1000的数字转换为k形式
            } else {
              return value;
            }
          },
          margin: 2, // 调整纵轴标签与轴线之间的距离
        },
      },
      legend: {
        data: [props.yname, props.y1name, props.y2name],
        selected: {
          [props.y1name]: false,
          [props.y2name]: false,
        },
      },
      series: [
        {
          data: props.ydata,
          name: props.yname,
          type: "line",
          smooth: true,
        },
        {
          data: props.y1data,
          name: props.y1name,
          type: "line",
          smooth: true,
        },
        {
          data: props.y2data,
          name: props.y2name,
          type: "line",
          smooth: true,
        },
      ],
    };

    // 使用配置项和数据绘制图表
    myChart.setOption(option);

    // 监听数据变化
    watch(props, () => {
      // 当数据变化时重新渲染图表
      myChart.setOption({
        xAxis: {
          data: props.xdata,
          name: props.xname,
        },
        series: [
          {
            data: props.ydata,
          },
        ],
      });
    });
  }
});
</script>

<style scoped>
.echarts-container {
  /* 设置图表容器样式 */
  background-color: white;
}
</style>
