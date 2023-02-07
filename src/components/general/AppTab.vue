<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>
<script setup>
import { ref, watch, onBeforeMount, inject } from "vue";
const index = ref(0);
const isActive = ref(false);
const tabs = inject("TabsProvider");
watch(
  () => tabs.selectedIndex,
  () => {
    isActive.value = index.value === tabs.selectedIndex;
  }
);
onBeforeMount(() => {
  index.value = tabs.count;
  tabs.count++;
  isActive.value = index.value === tabs.selectedIndex;
});
</script>
<style scoped></style>
