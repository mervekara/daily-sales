<template>
  <div class="flex justify-between items-center mt-4">
    <button
      @click="$emit('prev')"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span class="text-sm text-gray-700"
      >Page {{ currentPage }} of {{ totalPages }}</span
    >
    <button
      @click="$emit('next')"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

defineEmits<{
  (e: "prev"): void;
  (e: "next"): void;
}>();
</script>
