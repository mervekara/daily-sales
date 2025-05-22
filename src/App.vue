<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { onMounted } from "vue";

import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

onMounted(() => {
  if (store && !store.state.auth.isAuthenticated) {
    router.push("/login");
  }
});
</script>
