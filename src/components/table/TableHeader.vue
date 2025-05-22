<template>
  <thead class="bg-gray-50">
    <tr>
      <th
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
      >
        SKU
      </th>
      <th
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
      >
        Product Name
      </th>
      <th
        v-for="(column, index) in columns"
        :key="index"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
      >
        {{ column.date }} Sales / Units Avg. Selling Price
      </th>
      <th
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
      >
        SKU Refund Rate
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
defineProps<{
  columns: { date: string }[];
}>();
</script>
