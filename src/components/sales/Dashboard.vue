<template>
  <div class="p-6">
    <!-- Header Row: Title + Select -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Daily Sales</h2>
      <div>
        <label
          for="days"
          class="block text-sm font-medium text-gray-700 sr-only"
          >Select Days</label
        >
        <select
          id="days"
          v-model="selectedDays"
          @change="updateChartData"
          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="7">Last 7 Days</option>
          <option value="14">Last 14 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="60">Last 60 Days</option>
        </select>
      </div>
    </div>

    <!-- Chart and Table -->
    <ChartComponent
      @bar-selected="handleBarSelected"
      :selectedDate="selectedDate"
    />
    <TableComponent ref="tableRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import ChartComponent from "../charts/ChartComponent.vue";
import TableComponent from "../table/TableComponent.vue";

const store = useStore();
const selectedDays = ref(7);
const selectedDate = ref<string | null>(null);
const tableRef = ref<any>();

const updateChartData = async () => {
  try {
    await store.dispatch("chart/fetchChartInformation", {
      days: selectedDays.value,
    });
  } catch (error) {
    console.error("Error updating chart data:", error);
  }
};

const handleBarSelected = (date: string) => {
  selectedDate.value = date;
  if (tableRef.value) {
    tableRef.value.selectedColumns = [{ date }];
  }
};

onMounted(() => {
  updateChartData();
});
</script>
