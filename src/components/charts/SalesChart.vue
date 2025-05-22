<template>
  <div class="p-4 bg-white rounded-lg shadow">
    <ApexChart
      ref="chartRef"
      type="bar"
      :options="computedOptions"
      :series="series"
      height="350"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ApexOptions } from "apexcharts";
import { ChartDataItem } from "src/types/chart";

const props = defineProps<{
  chartData: ChartDataItem[];
}>();

const emit = defineEmits<{
  (e: "bar-selected", date: string): void;
}>();

const chartRef = ref(null);

const validData = computed(() =>
  props.chartData.filter((item) => !isNaN(new Date(item.date).getTime()))
);

const series = computed(() => [
  {
    name: "Profit",
    data: validData.value.map((item) => Number(item.profit ?? 0)),
  },
  {
    name: "FBA Sales",
    data: validData.value.map((item) => Number(item.fbaAmount ?? 0)),
  },
  {
    name: "FBM Sales",
    data: validData.value.map((item) => Number(item.fbmAmount ?? 0)),
  },
]);

const computedOptions = computed<ApexOptions>(() => ({
  chart: {
    id: "sales-chart",
    type: "bar",
    stacked: true,
    toolbar: { show: false },
    events: {
      dataPointSelection: (event, chartContext, config) => {
        const category =
          computedOptions.value.xaxis?.categories?.[config.dataPointIndex];
        if (typeof category === "string") {
          emit("bar-selected", category);
        }
      },
    },
  },
  xaxis: {
    categories: validData.value.map((item) =>
      new Date(item.date).toLocaleDateString()
    ),
  },
  colors: ["#3b82f6", "#10b981", "#f59e0b"],
  tooltip: {
    shared: true,
    intersect: false,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "50%",
    },
  },
}));
</script>
