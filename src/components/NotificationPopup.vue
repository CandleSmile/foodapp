<template>
  <Teleport to="body">
    <div class="notification-popup" v-if="isOpen">
      <div class="notification-popup__content">
        <div class="notification-popup__content-info"><slot></slot></div>
        <app-button
          class="notification-popup__content-button app-button--theme-dark"
          @click="$emit('closePopup')"
          >Close</app-button
        >
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import AppButton from "@/components/general/AppButton.vue";
defineProps(["isOpen"]);
defineEmits(["closePopup"]);
</script>
<style lang="scss">
.notification-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba($secondary-dark-color, 0.6);
  &__content {
    background: $secondary-light-color;
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    margin: 10px;
    &-info {
      padding: 20px 0;
    }
  }
}
</style>
