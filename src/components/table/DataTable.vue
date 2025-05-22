<template>
  <table class="min-w-full divide-y divide-gray-200">
    <TableHeader :columns="columns" />
    <TableBody :data="data" :columns="columns" />
  </table>
</template>

<script setup lang="ts">
import TableHeader from "@/components/table/TableHeader.vue";
import TableBody from "@/components/table/TableBody.vue";

defineProps<{
  columns: { date: string }[];
  data: any[];
}>();
</script>
