<template>
  <SalesChart :chart-data="chartData" @bar-selected="handleBarSelected" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import SalesChart from "./SalesChart.vue";

const store = useStore();

const chartData = computed(() => store.state.chart.chartData || []);

function handleBarSelected(date: string) {
  console.log("Selected date:", date);
}
</script>
