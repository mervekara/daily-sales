<template>
  <div
    v-if="message"
    class="rounded-md bg-red-100 p-4 text-red-700 text-sm border border-red-300"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>
