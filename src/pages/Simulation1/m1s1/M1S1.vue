<template>
  <div class="charts">
    <div v-for="(item, id) in items" :key="id" class="chart">
      <SmoothedLineChart
        :xdata="data.map((i) => i.Age)"
        :ydata="data.map((i) => i[item])"
        :yname="item"
        :xname="'Age'"
      ></SmoothedLineChart>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SmoothedLineChart from "@/components/echarts/lineChart/Smoothed Line Chart.vue";

const items = [
  "W",
  "w",
  "I(t)",
  "I(t)/P",
  "B",
  "B/P",
  "inf",
  "r(t)",
  "P",
  "Pen",
];

defineProps(["data"]);
</script>

<style scoped>
.charts {
  display: flex;
  margin-left: 20px;
  flex-wrap: wrap;
}
.chart{
  margin: 10px;
}
</style>
