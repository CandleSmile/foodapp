<template>
  <nav class="nav header__nav">
    <router-link to="/">Home</router-link>
  </nav>
</template>
<script>
export default {
  name: "navigation-comp",
};
</script>
<style lang="scss">
.header__nav {
  margin: 30px 10px;
}

.nav__link {
  padding: 10px;
  text-decoration: none;
  color: #000; //$nav-color;
  &:hover {
    color: rgb(0, 61, 66); // $nav-hover-color;
  }
}
</style>
