<template>
  <div style="height: 400px">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :data="data"
          :sort-by="sortState"
          :width="width"
          :height="height"
          fixed
          @column-sort="onSort"
          class="table"
        />
      </template>
    </el-auto-resizer>
  </div>
</template>

<script lang="tsx" setup>
import { TableV2SortOrder } from "element-plus";
import type { SortBy, SortState } from "element-plus";
import { ref } from "vue";

const sheet = defineProps(["data", "columns"]);
// console.log(sheet.data[0], "sheet");
// console.log(sheet.columns, "sheet");

// 要保留的键
const keysToKeep: string[] = sheet.columns; // 例如保留 name 和 age 键

// 筛选数组中的对象，只保留指定键的键值对
let filteredArray: { [key: string]: any }[];

if (keysToKeep.length === 0) {
  filteredArray = sheet.data;
} else {
  filteredArray = sheet.data.map((obj) => {
    const newObj: { [key: string]: any } = {};
    keysToKeep.forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        switch (key) {
          case "Age":
            // 不做处理
            newObj[key] = obj[key];
            break;
          default:
            // 保留两位小数
            newObj[key] = obj[key].toFixed(2);
            break;
        }
      }
    });
    return newObj;
  });
}

const generateColumns = (
  length = Object.keys(filteredArray[0]).length,
  prefix = "column-",
  props?: any
) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `${Object.keys(filteredArray[0])[columnIndex]}`,
    width: 150,
    sortable: true,
  }));

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = Object.keys(filteredArray).length,
  prefix = "row-"
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `${
          filteredArray[rowIndex][Object.keys(filteredArray[0])[columnIndex]]
        }`;
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    );
  });

const columns = generateColumns();
let data = ref(generateData(columns));

columns[0].fixed = true;

//排序
const sortState = ref<SortState>({
  "column-0": TableV2SortOrder.DESC,
  "column-1": TableV2SortOrder.ASC,
});
let Myorder = true;
const onSort = ({ key, order }: SortBy) => {
  Myorder = !Myorder;
  if (Myorder) {
    sortState.value[key] = TableV2SortOrder.DESC;
  } else {
    sortState.value[key] = TableV2SortOrder.ASC;
  }
  console.log(sortState.value);

  data.value = data.value.sort(function (a, b) {
    // 将列值转换为数字进行比较
    var numA = parseFloat(a[key]);
    var numB = parseFloat(b[key]);

    // 如果其中一个或两个值为 NaN，则按原始字符串比较
    if (isNaN(numA) || isNaN(numB)) {
      return a[key].localeCompare(b[key]);
    }
    if (Myorder) {
      return numB - numA;
    } else {
      return numA - numB;
    }
  });
};
//排序结束
</script>

<style scoped>
.table {
  width: 100%;
}
.el-table-v2__demo-filter {
  border-top: var(--el-border);
  margin: 12px -12px -12px;
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
}
</style>
