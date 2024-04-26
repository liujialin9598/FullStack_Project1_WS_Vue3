<template>
  <div class="charts">
    <div v-for="(item, index) in Baritems" :key="index" class="chart">
      <BasicBar
        :xdata="getUniqueSortedValues(data, item[0], item[1])"
        :ydata="getCountListForValues(data, item[0], item[1])"
        :xname="item[0]"
      ></BasicBar>
    </div>
    <VirtualizedTable :data="data" :columns="col" class="table" />

    <div v-for="(item, index) in sactter" :key="index" class="DataTransformSimpleAggregate">
      <DataTransformSimpleAggregate
        :xdata="data.map((i:any) => i[item[0]])"
        :ydata="data.map((i:any) => i[item[1]])"
        :yname="item[1]"
        :xname="item[0]"
      ></DataTransformSimpleAggregate>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BasicBar from "@/components/echarts/barChart/Basic Bar.vue";
import VirtualizedTable from "@/components/Elplus/Virtualized Table.vue";
import DataTransformSimpleAggregate from "@/components/echarts/boxPlot/Data Transform Simple Aggregate.vue";

import { ref } from "vue";

const col = ref<any[]>(["Age", "W", "Y", "W+Y"]);

const sactter = ref<any[]>([["Age", "W+Y"]]);

defineProps(["data"]);

const Baritems: [string, number][] = [
  ["Age", 1],
  ["W", 5],
  ["W+Y", 5],
];

function getUniqueSortedValues<T>(
  data: T[],
  key: keyof T,
  groupSize: number
): any[] {
  // 使用 map 方法提取指定属性的值
  const allValues: T[keyof T][] = data.map((item) => item[key]);

  // 去除重复值并排序
  const uniqueSortedValues: any[] = Array.from(new Set(allValues)).sort(
    (a: any, b: any) => a - b
  );
  if (groupSize === 1) {
    return uniqueSortedValues;
  } else {
    return groupData(uniqueSortedValues, groupSize);
  }
}

function getCountListForValues<T>(
  data: T[],
  key: keyof T,
  groupSize: number
): number[] {
  const countList: number[] = [];

  const SortedList = getUniqueSortedValues(data, key, groupSize);
  if (groupSize === 1) {
    SortedList.forEach((i) => {
      const count = data.reduce((acc, item) => {
        if (item[key] === i) {
          return acc + 1;
        }
        return acc;
      }, 0);
      countList.push(count);
    });
  } else {
    SortedList.forEach((i) => {
      const count = data.reduce((acc, item) => {
        if (item[key] >= i.split("-")[0] && item[key] < i.split("-")[1]) {
          return acc + 1;
        }
        return acc;
      }, 0);
      countList.push(count);
    });
  }

  return countList;
}

function groupData(data: number[], groupSize: number): string[] {
  const groupd: string[] = [];
  const group_start: number = data[0];
  const group_end: number = data[data.length - 1];
  for (let i = group_start; i < group_end; i += groupSize) {
    groupd.push(
      `${i.toFixed(0)}-${Math.min(i + groupSize, group_end).toFixed(0)}`
    );
  }
  console.log(groupd);

  return groupd;
}
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

.table {
  padding: 10px;
  width: 700px;
}

.DataTransformSimpleAggregate{
  padding: 10px;
  width: 1150px;
  height: 400px;
}
</style>
