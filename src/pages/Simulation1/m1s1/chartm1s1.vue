<template>
  <div class="charts">
    <div v-for="(item, index) in items" :key="index" class="chart" >
      <SmoothedLineChart
        :xdata="data.map((i:any) => i.Age)"
        :ydata="data.map((i:any) => i[item])"
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
  "Loss(t)",
  "PR(t)",
  "B/P",
  "inf",
  "r(t)",
  "Z2",
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
