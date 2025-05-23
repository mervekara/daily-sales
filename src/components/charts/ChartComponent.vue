<template>
  <SalesChart :chart-data="chartData" @bar-selected="onBarSelected" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import SalesChart from "./SalesChart.vue";

const emit = defineEmits(["bar-selected"]);

const store = useStore();

const chartData = computed(() => store.state.chart.chartData || []);

function onBarSelected(event: any) {
  emit("bar-selected", event);
}
</script>
