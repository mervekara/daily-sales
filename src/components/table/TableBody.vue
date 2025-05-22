<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr v-for="(row, index) in data" :key="index">
      <td class="px-6 py-4 text-sm text-gray-900">{{ row.sku.sku }}</td>
      <td class="px-6 py-4 text-sm text-gray-900">{{ row.sku.productName }}</td>
      <td
        v-for="(_, colIndex) in columns"
        :key="colIndex"
        class="px-6 py-4 text-sm text-gray-900"
      >
        {{ row.sku.sortingAmount }} / {{ row.refundAmount }}
      </td>
      <td class="px-6 py-4 text-sm text-gray-900">{{ row.refundRate }}</td>
    </tr>
  </tbody>
</template>

<script setup lang="ts">
defineProps<{
  data: any[];
  columns: { date: string }[];
}>();
</script>
