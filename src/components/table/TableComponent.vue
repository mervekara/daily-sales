<template>
  <div class="mt-6">
    <DataTable :columns="selectedColumns" :data="displayedTableData" />

    <PaginationControls
      :current-page="currentPage"
      :total-pages="totalPages"
      @prev="prevPage"
      @next="nextPage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import DataTable from "../table/DataTable.vue";
import PaginationControls from "../table/Pagination.vue";

const store = useStore();
const selectedColumns = ref<Array<{ date: string }>>([]);
const tableData = ref<any[]>([]);
const currentPage = ref(1);
const itemsPerPage = 5;

const displayedTableData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return tableData.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(tableData.value.length / itemsPerPage)
);

const fetchTableData = async () => {
  try {
    if (!selectedColumns.value.every((col) => col && col.date)) return;

    await store.dispatch("chart/fetchTableData", {
      columns: selectedColumns.value,
      pageNumber: currentPage.value,
    });
    tableData.value = store.state.chart.tableData;
  } catch (error) {
    console.error("Error fetching table data:", error);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchTableData();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchTableData();
  }
};

watch(
  selectedColumns,
  () => {
    currentPage.value = 1;
    fetchTableData();
  },
  { deep: true }
);

defineExpose({ selectedColumns });
</script>
