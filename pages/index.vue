<script setup lang="ts">
import {Application} from "vue3-pixi";
import LoadingBar from "~/components/splash/loadingBar.vue";
import TunnelView from "~/components/TunnelView.vue";

import {useScriptTag} from "@vueuse/core";

const fontsLoaded = ref(false)

// @ts-expect-error
window.WebFontConfig = {
  google: { families: ['Inter'] },
  active: () => {
    fontsLoaded.value = true
  },
}

const leapis = `${location.protocol}//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`
useScriptTag(leapis).load()

let w = window
</script>

<template>

  <Application v-if="fontsLoaded" :backgroundAlpha="0.0" :antialias="true" :resize-to="w">
    <SplashScreen>
    </SplashScreen>

    <TunnelView type="works"></TunnelView>
    <TunnelView type="words"></TunnelView>
    <LoadingBar ></LoadingBar>
  </Application>
</template>

<style scoped>

</style>