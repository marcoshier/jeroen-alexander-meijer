<script setup lang="ts">
import {useScriptTag} from "@vueuse/core";
import Quaternion from "quaternion";
import { gsap } from "gsap";
import LoadingBar from "~/components/splash/loadingBar.vue";
import type {GraphicsInst} from "vue3-pixi";

const leapis = `${location.protocol}//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`
useScriptTag(leapis).load()

const fontsLoaded = ref(false);

// @ts-expect-error
window.WebFontConfig = {
  google: { families: ['Inter'] },
  active: () => {
    fontsLoaded.value = true
  },
}

const { isMobile, isIos } = useDevice();

let motionData = reactive({
  active: false,
  xAngle: 0.0,
  yAngle: 0.0,
})


function handleMotion(data: { active: boolean, xAngle: number, yAngle: number }) {
  motionData.active = data.active
  motionData.xAngle = data.xAngle
  motionData.yAngle = data.yAngle
}

const indexSelected = ref(-1)

let opacities = reactive({
  first: 0.0,
  second: 0.0,
})

const animFirst =  gsap.to(opacities, {
  paused: true,
  first: 1.0,
  duration: 0.4,
})
const animSecond =  gsap.to(opacities, {
  paused: true,
  second: 1.0,
  duration: 0.4,
})

function handleClick(event: MouseEvent) {
  indexSelected.value = 6969
  if (event.y < window.innerHeight / 2.0) {
    indexSelected.value = 0
    animFirst.play()
  } else {
    indexSelected.value = 1
    animSecond.play()
  }

  event.stopPropagation()
}

const appRef=ref()
let animFinished = ref(false)

onMounted(() => {
  watch(animFinished, async (newState, oldState) => {
    if (newState == true) {
      if (!isMobile)  {
        let last = -1;
        window.addEventListener("mousemove", (event) => {
          if (event.x < window.innerWidth / 2.0) {
            if(last != 0) {
              console.log("0")
              last = 0;
              animSecond.reverse()
              animFirst.play()
            }
          } else {
            if(last != 1) {
              console.log("1")
              last = 1;
              animFirst.reverse()
              animSecond.play()
            }
          }
        })
      }
    }
  })
})

const w = window

function drawLaser(graphics: GraphicsInst) {

  graphics.clear()
  graphics.lineStyle(1, 0xFF00CC, 1)
  graphics.moveTo(w.innerWidth / 2.0, w.innerHeight / 2.0);
  graphics.lineTo(w.innerWidth / 2.0 + motionData.xAngle * 150.0, w.innerHeight / 2.0 + -motionData.yAngle * 150.0)

}

function isAnimFinished() {
  animFinished.value = true
}


</script>

<template>

  <div id="titles-cnt" @click="handleClick">
    <h1 id="title-works" class="section-title" :class="{ 'works-works-selected': (indexSelected == 0), 'works-words-selected': (indexSelected == 1) }">
      WORKS
    </h1>

    <h1 id="title-words" class="section-title" :class="{ 'words-words-selected': (indexSelected == 1), 'words-works-selected': (indexSelected == 0) }">
      WORDS
    </h1>
  </div>


  <AccelerometerPermissionDialog v-show="(isMobile && isIos) && !motionData.active" @accmotion="handleMotion"></AccelerometerPermissionDialog>
    <Application ref="appRef" v-if="fontsLoaded" :backgroundAlpha="0.0" :antialias="true" :resolution="2*w.devicePixelRatio" :resize-to="w">
      <SplashScreen>
      </SplashScreen>

      <TunnelView type="works" :show="animFinished" :motionData="motionData" :cnt-opacity="opacities.first" :selected="indexSelected"></TunnelView>
      <TunnelView type="words" :show="animFinished" :motionData="motionData" :cnt-opacity="opacities.second" :selected="indexSelected"></TunnelView>
      <LoadingBar @anim-finished="isAnimFinished()" :sel-idx="indexSelected"></LoadingBar>

      <Graphics v-if="isMobile" @render="drawLaser">
      </Graphics>
    </Application>



</template>


<style scoped>
#titles-cnt {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 999;
}

.section-title {
  position: absolute;
  padding: 20px;
}

h1 {
  font-family: Inter, sans-serif;
  font-size: 28px;
  color: black;
}

@media screen and (max-width: 480px) {
  .works-works-selected {
    animation-name: center-works;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes center-works {
    from {
      right: 20px;
      top: 40px;
      transform: translate(0, 0);
    }
    to {
      right: 50%;
      top: 35%;
      transform: translate(50%, -0%);
    }
  }

  .words-words-selected {
    animation-name: center-words;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  @keyframes center-words {
    from {
      bottom: 80px;
      left: 20px;
      transform: translate(0, 0);
    }
    to {
      bottom: 50%;
      left: 50%;
      transform: translate(-50%, -0%);
    }
  }

  .words-works-selected {
    bottom: 50px !important;
    left: 5px !important;
  }

  .works-words-selected {
    top: -30px !important;
    right: -5px !important;
  }

  #title-works {
    right: 20px;
    top: 40px;
  }

  #title-words {
    bottom: 80px;
    left: 20px;
  }
}

@media screen and (min-width: 480px) {
  #title-works {
    bottom: 0;
    left: 0;
  }

  #title-words {
    top: 40px;
    right: 20px;
  }
}
</style>