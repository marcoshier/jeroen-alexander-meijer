<script setup lang="ts">
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import {settings} from "@pixi/settings";
import {SCALE_MODES} from "@pixi/constants";
import {BaseTexture} from "@pixi/core";

BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST


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
