<template>
  <RouterLink class="login-link" v-if="!loggedIn" :to="{ name: 'login' }">
    Login
  </RouterLink>
  <a class="logout-link" v-else @click="$emit('onLogout')">Logout</a>
</template>
<script setup>
import { computed, defineEmits } from "vue";
import { useStore } from "vuex";
const store = useStore();
defineEmits(["onLogout"]);
const loggedIn = computed(() => {
  return store.state.auth.status.loggedIn;
});
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
