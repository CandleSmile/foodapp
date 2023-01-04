<template>
  <header class="header">
    <div class="header-info-wrapper">
      <router-link to="/" class="logo-title-block">
        <img class="logo" src="@/assets/images/logo1.svg" alt="THE BEST FOOD" />
        <h1 class="site-title logo-title-block__site-title">
          THE <span>BEST </span>FOOD
        </h1>
      </router-link>
    </div>
  </header>
  <main class="main-block">
    <slot />
  </main>
</template>
