<script setup lang="ts">

</script>

<template>
<header>
  <h1>J:A:M</h1>
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

@media screen and (max-width: 480px) {
  header {
    padding: 10px;
    top: -25px;
  }
}
</style>