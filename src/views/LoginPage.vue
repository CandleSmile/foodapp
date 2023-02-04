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
      <div class="login-form__error" v-if="error != null">
        {{ error }}
      </div>
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
import { required, email, minLength, maxLength } from "@vuelidate/validators";
import {
  LOGIN_ACTION,
  LOGGED_IN,
  ERROR,
  LOADING,
  CLEAN_ERROR_ACTION,
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

const { [LOGIN_ACTION]: doLogin, [CLEAN_ERROR_ACTION]: cleanError } =
  useActions([LOGIN_ACTION, CLEAN_ERROR_ACTION]);
const {
  [LOGGED_IN]: isLoggedIn,
  [ERROR]: error,
  [LOADING]: loading,
} = useGetters([LOGGED_IN, ERROR, LOADING]);

const rules = {
  user: { required, email },
  password: { required, minLength: minLength(6), maxLength: maxLength(255) },
};
const v$ = useVuelidate(rules, { user, password });

const onSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  await doLogin({ user: user.value, password: password.value });
  if (isLoggedIn.value) router.push(route.query.redirect ?? "/");
};

onMounted(() => {
  if (isLoggedIn.value) {
    router.push("/");
  }
  cleanError();
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
    &__error {
      color: $errors-color;
      font-size: 10px;
    }
  }
}
</style>
