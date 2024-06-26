<template>
  <div
    class="echarts-container"
    ref="echartsContainer"
    style="width: 100%; height: 100%"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import * as echarts from "echarts";
const props = defineProps([
  "ydata",
  "xdata",
  "xname",
  "yname",
  "title",
  "ρ",
  "K1",
]);
const echartsContainer = ref<HTMLElement | null>(null);

let dataArray = ref<any>([]);

onMounted(() => {
  for (let i = -0.1; i <= 50; i += 0.1) {
    dataArray.value.push([
      i.toFixed(4),
      (i ** (1 - props.ρ) / (1 - props.ρ) * props.K1).toFixed(4),
    ]);
  }

  if (echartsContainer.value) {
    // 初始化 ECharts 实例
    const myChart = echarts.init(echartsContainer.value);

    // 设置图表配置项和数据
    const option = {
      dataset: [
        {
          source: props.xdata.map((element: number, index: number) => [
            element,
            props.ydata[index],
          ]),
        },
        {
          source: dataArray.value,
        },
      ],
      title: {
        text: props.title,
        left: "center",
        textStyle: {
          fontSize: 12, // 设置标题字体大小
          // 其他样式属性
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        // formatter: function (params: never[]) {
        //   console.log(params);
        //   let data = params; // 如果 params.value 为 undefined，则将 data 设为一个空数组
        //   let max = Math.max(
        //     ...data.map((item: { [x: string]: any[] }) =>
        //       item["value"][1].toFixed(2)
        //     )
        //   );
        //   let min = Math.min(
        //     ...data.map((item: { [x: string]: any[] }) =>
        //       item["value"][1].toFixed(2)
        //     )
        //   );

        //   return "max: " + max + "<br/>min: " + min;
        // },
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
        name: props.xname,
        nameGap: 0,
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
        min: "dataMin", // 设置最小值为数据中的最小值
      },
      yAxis: {
        name: props.yname,
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
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
      series: [
        {
          name: "result",
          type: "scatter",
          datasetIndex: 0,
        },
        {
          name: "line",
          type: "line",
          datasetIndex: 1,
          symbol: "none",
        },
      ],
    };

    // 使用配置项和数据绘制图表
    myChart.setOption(option);

    // 监听数据变化
    watch(
      () => props.xdata,
      (newXdata, oldXdata) => {
        if (JSON.stringify(newXdata) !== JSON.stringify(oldXdata)) {
          let dataArray = ref<any>([]);
          for (let i = -0.1; i <= 50; i += 0.1) {
            dataArray.value.push([
              i.toFixed(2),
              (i ** (1 - props.ρ) / (1 - props.ρ) * props.K1).toFixed(2),
            ]);
          }
          // 当数据变化时重新渲染图表
          myChart.setOption({
            dataset: [
              {
                source: props.xdata.map((element: number, index: number) => [
                  element,
                  props.ydata[index],
                ]),
              },
              {
                source: dataArray.value,
              },
            ],
          });
        }
      }
    );
  }
});
</script>

<style scoped>
.echarts-container {
  /* 设置图表容器样式 */
  background-color: white;
}
</style>
