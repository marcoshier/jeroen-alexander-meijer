<script setup lang="ts">

</script>

<template>
<header>
  <h1>J:A:M</h1>

  <ul>
    <li><NuxtLink to="/"><h1>WORKS</h1></NuxtLink></li>
    <li><NuxtLink to="/"><h1>WORDS</h1></NuxtLink></li>
    <li><NuxtLink to="/about"><h1>ABOUT</h1></NuxtLink></li>
  </ul>

</header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100px;
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 40px 55px;
  z-index: 999;
}

h1 {
  font-family: Inter, sans-serif;
  font-size: 21px;
  color: black;
}

ul {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

li {
  padding: 0 40px;
}
</style>