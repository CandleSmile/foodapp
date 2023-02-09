<template>
  <div class="app-datepicker">
    <label class="app-datepicker__title">{{ title }}</label>

    <Datepicker
      v-if="showAvailableDates"
      :allowed-dates="availableDates"
      auto-apply
      :close-on-auto-apply="true"
      :enable-time-picker="enableTimePicker"
      :modelValue="modelValue"
      @update:model-value="updateData"
      class="app-datepicker__date"
      :placeholder="placeholder"
    />
    <Datepicker
      v-else
      auto-apply
      :close-on-auto-apply="true"
      :enable-time-picker="enableTimePicker"
      :modelValue="modelValue"
      @update:model-value="updateData"
      class="app-datepicker__date"
    />
  </div>
</template>
<script setup>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { defineProps, defineEmits } from "vue";
defineProps({
  title: String,
  availableDates: Array,
  showAvailableDates: Boolean,
  modelValue: [Date, String],
  placeholder: String,
  enableTimePicker: Boolean,
});
const emits = defineEmits(["handleDate"]);
const updateData = (modelData) => {
  emits("handleDate", modelData);
};
</script>
<style lang="scss">
.dp__input {
  padding-top: 5px;
  padding-bottom: 5px;
  border: 1px solid $secondary-dark-color;
  border-radius: 5px;
  color: $secondary-dark-color;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  &::placeholder {
    color: $secondary-dark-color;
    font-size: 16px;
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
  }
}
.dp__main {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}
</style>
