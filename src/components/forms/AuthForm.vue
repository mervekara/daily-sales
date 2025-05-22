<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <BaseInput label="Email" id="email" type="text" v-model="email" />
    <BaseInput
      label="Password"
      id="password"
      type="password"
      v-model="password"
    />
    <BaseButton>Login</BaseButton>
    <BaseAlert v-if="errorMessage" :message="errorMessage" />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";
import BaseAlert from "./BaseAlert.vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const store = useStore();
const router = useRouter();

const onSubmit = async () => {
  errorMessage.value = "";
  try {
    await store.dispatch("auth/login", {
      email: email.value,
      password: password.value,
    });

    await store.dispatch("auth/fetchUserInformation", email.value);
    await store.dispatch("chart/fetchChartInformation");

    router.push("/daily-sales");
  } catch (error: any) {
    errorMessage.value =
      error?.response?.data?.message || "Login failed. Please try again.";
  }
};
</script>
