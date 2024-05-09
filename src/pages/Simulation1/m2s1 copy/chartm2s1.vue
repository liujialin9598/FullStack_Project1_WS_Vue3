<template>
  <div class="charts">
    <div v-for="(item, index) in items" :key="index" class="chart">
      <div v-if="item == 'B'">
        <Smoothed3LinesChart
          :xdata="data.map((i:any) => i.Age)"
          :ydata="data.map((i:any) => i[item])"
          :yname="item"
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
          :ydata="data.map((i:any) => i[item])"
          :yname="item"
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
  "W",
  "w",
  "I(t)",
  "I(t)/P",
  "B",
  "Loss(t)",
  "PR(t)",
  "B/P",
  "inf",
  "r(t)",
  "P",
  "Pen",
  "Y",
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
