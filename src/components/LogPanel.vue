<template>
  <RouterLink class="login-link" v-if="!loggedIn" :to="{ name: 'login' }">
    Login
  </RouterLink>
  <a class="logout-link" v-else @click="$emit('logout')">Logout</a>
</template>
<script setup>
import { defineEmits } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { LOGGED_IN } from "@/store/storeConstants";

const { useGetters } = createNamespacedHelpers("auth");
defineEmits(["logout"]);
const { [LOGGED_IN]: loggedIn } = useGetters([LOGGED_IN]);
</script>
<style lang="scss">
.login-link,
.logout-link {
  align-self: center;
  color: $login-link-color;

  &:hover {
    cursor: pointer;
  }
}
</style>
