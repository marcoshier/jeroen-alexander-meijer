<script setup lang="ts">
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

gsap.registerPlugin(PixiPlugin);
</script>

<template>


  <Header></Header>
  <NuxtPage />

</template>

<style>
body {
  top: 0;
  left: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: white;
}
</style>
