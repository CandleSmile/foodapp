<template>
  <article class="change-password">
    <form
      class="change-password__form"
      name="change-password"
      @submit.prevent="onSubmit"
    >
      <AppTextField
        placeholder="Enter your password"
        v-model="password"
        :errors="v$.password.$errors"
        :is-password="true"
        class="change-password__form-password"
      />
      <AppTextField
        placeholder="Confirm your password"
        v-model="confirmPassword"
        :errors="v$.confirmPassword.$errors"
        :is-password="true"
        class="change-password__form-confirm-password"
      />

      <AppButton class="change-password__form-button app-button--theme-dark"
        >Change password</AppButton
      >
    </form>
  </article>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, sameAs } from "@vuelidate/validators";

import AppButton from "@/components/general/AppButton.vue";
import AppTextField from "@/components/general/AppTextField.vue";
const emits = defineEmits(["changePassword"]);
const password = ref("");
const confirmPassword = ref("");

const rules = {
  password: { required, minLength: minLength(6) },
  confirmPassword: { required, sameAsPassword: sameAs(password) },
};
const v$ = useVuelidate(rules, { password, confirmPassword });

const onSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }
  await emits("changePassword", {
    password: password.value,
    passwordConfirmation: confirmPassword.value,
  });
};
</script>
<style lang="scss">
.change-password {
  &__title {
    font-size: 1em;
    font-weight: 600;
    text-align: left;
    padding-bottom: 20px;
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &-button {
      width: 150px;
    }
  }
}
</style>
