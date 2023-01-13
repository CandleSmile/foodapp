<template>
  <article class="login">
    <h2>Please input your email to log in</h2>
    <form @submit.prevent="onSubmit">
      <input-field
        placeholder="Enter your email"
        v-model="user"
        :errors="v$.user.$errors"
        class="login__email"
      >
      </input-field>
      <ActionButton class="login__button">Login</ActionButton>
    </form>
  </article>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { LOGIN_ACTION, LOGGED_IN } from "@/store/storeConstants";

import ActionButton from "@/components/general/ActionButton.vue";
import InputField from "@/components/general/InputField.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useGetters, useActions } = createNamespacedHelpers("auth");

const router = useRouter();
const route = useRoute();
const user = ref("");
const { [LOGIN_ACTION]: doLogin } = useActions([LOGIN_ACTION]);
const { [LOGGED_IN]: isLoggedIn } = useGetters([LOGGED_IN]);
const rules = {
  user: { required, email },
};
const v$ = useVuelidate(rules, { user });
const onSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  doLogin(user.value);
  router.push(route.query.redirect ?? "/");
};
onMounted(() => {
  if (isLoggedIn.value) {
    router.push("/");
  }
});
</script>
<style lang="scss">
.login,
.login form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}
</style>
