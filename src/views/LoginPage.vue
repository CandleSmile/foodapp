<template>
  <article class="login">
    <h2 class="login-title">Please input your email to log in</h2>
    <form class="login-form" @submit.prevent="onSubmit">
      <AppTextField
        placeholder="Enter your email"
        v-model="user"
        :errors="v$.user.$errors"
        class="login-form__email"
      >
      </AppTextField>
      <AppButton class="login-form__button app-button--theme-dark"
        >Login</AppButton
      >
    </form>
  </article>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { LOGIN_ACTION, LOGGED_IN } from "@/store/storeConstants";

import AppButton from "@/components/general/AppButton.vue";
import AppTextField from "@/components/general/AppTextField.vue";
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
.login {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  &-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
}
</style>
