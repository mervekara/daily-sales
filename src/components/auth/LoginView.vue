<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
      <h1 class="mb-6 text-xl font-bold text-center">Login</h1>
      <AuthForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthForm from "../forms/AuthForm.vue";
</script>
