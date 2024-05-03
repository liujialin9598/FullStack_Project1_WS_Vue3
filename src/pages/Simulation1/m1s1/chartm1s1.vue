<template>
  <div class="charts">
    <div v-for="(item, index) in items" :key="index" class="chart">
      <div v-if="item[0] == 'B(t)'">
        <Smoothed3LinesChart
          :xdata="data.map((i:any) => i.Age)"
          :ydata="data.map((i:any) => i[item[0]])"
          :yname="item[0]"
          :y1data="data.map((i:any) => i['AT_min'])"
          :y1name="'AT_min'"
          :y2data="data.map((i:any) => i['AT_max'])"
          :y2name="'AT_max'"
          :xname="'Age'"
        ></Smoothed3LinesChart>
      </div>
      <div v-else>
        <SmoothedLineChart
          :xdata="data.map((i:any) => i.Age)"
          :ydata="data.map((i:any) => i[item[0]])"
          :yname="item[0]"
          :yAxisMinMax="item[1]"
          :xname="'Age'"
        ></SmoothedLineChart>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SmoothedLineChart from "@/components/echarts/lineChart/Smoothed Line Chart.vue";
import Smoothed3LinesChart from "@/components/echarts/lineChart/Smoothed 3 Lines Chart.vue";
const items = [
  ["Inf(t)", [-0.2, 0.2]],
  ["Z1",[-4,4]],
  ["W"],
  ["w"],
  ["I(t)"],
  ["I(t)/P"],
  ["B(t)"],
  ["Loss(t)"],
  ["PR(t)"],
  ["B/P"],
  ["r(t)"],
  ["Z2"],
  ["P(t)"],
  ["Pen(t)"],
  ["Y"],
];

defineProps(["data"]);
</script>

<style scoped>
.charts {
  display: flex;
  margin-left: 20px;
  flex-wrap: wrap;
}
.chart {
  margin: 10px;
}
</style>
