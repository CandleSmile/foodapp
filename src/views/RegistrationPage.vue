<template>
  <article class="login">
    <AppLoader v-if="loading" :is-dark="true" />
    <h2 class="login-title">Please input your email to log in</h2>
    <form class="login-form" @submit.prevent="onSubmit">
      <AppTextField
        placeholder="Enter your email"
        v-model="user"
        :errors="v$.user.$errors"
        class="login-form__email"
      />
      <AppTextField
        placeholder="Enter your password"
        v-model="password"
        :errors="v$.password.$errors"
        :is-password="true"
        class="login-form__password"
      />
      <AppTextField
        placeholder="Confirm your password"
        v-model="confirmPassword"
        :errors="v$.confirmPassword.$errors"
        :is-password="true"
        class="login-form__confirmPassword"
      />
      <div class="login-form__error" v-if="error != null">{{ error }}</div>
      <AppButton class="login-form__button app-button--theme-dark"
        >Register</AppButton
      >
    </form>
  </article>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import {
  REGISTRATION_ACTION,
  LOGGED_IN,
  LOADING,
  ERROR,
} from "@/store/storeConstants";

import AppButton from "@/components/general/AppButton.vue";
import AppTextField from "@/components/general/AppTextField.vue";
import AppLoader from "../components/general/AppLoader.vue";

import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useGetters, useActions } = createNamespacedHelpers("auth");

const router = useRouter();
const route = useRoute();
const user = ref("");
const password = ref("");
const confirmPassword = ref("");
const { [REGISTRATION_ACTION]: doRegistration } = useActions([
  REGISTRATION_ACTION,
]);
const {
  [LOGGED_IN]: isLoggedIn,
  [LOADING]: loading,
  [ERROR]: error,
} = useGetters([LOGGED_IN, LOADING, ERROR]);
const rules = {
  user: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: { required, sameAsPassword: sameAs(password) },
};
const v$ = useVuelidate(rules, { user, password, confirmPassword });
const onSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }

  await doRegistration({
    user: user.value,
    password: password.value,
    passwordConfirmation: confirmPassword.value,
  });
  console.log(isLoggedIn.value);
  if (isLoggedIn.value) router.push(route.query.redirect ?? "/");
};

onMounted(() => {
  if (isLoggedIn.value) {
    router.push("/");
  }
});
</script>
<style></style>
