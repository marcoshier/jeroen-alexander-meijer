<script setup lang="ts">
import {useMouse} from '@vueuse/core'
import {type ContainerInst, type GraphicsInst} from "vue3-pixi";
import { Texture } from "@pixi/core";
import {gsap} from "gsap";
import {useDrawAnchoredBB} from "~/composables/useDrawAnchoredBB";

const screen = useScreen()
const mouse = reactive(useMouse())

const frect = reactive({
  x: 0.0,
  y: 0.0,
  width: 100.0,
  height: 100.0
})

const props = defineProps({
  idx: Number,
  img: String,
  cntSelected: Number,
  motionData: {
    type: Object,
    default: () => ({
      active: false,
      xAngle: 0.0,
      yAngle: 0.0
    })
  }
})

const texture = Texture.from(props.img as string)
const boundsRef = ref<GraphicsInst>()

const { isMobile } = useDevice();
const isScreenWidthSmall = ref(screen.value.width < 480.0)

const containerRef = ref<ContainerInst>()

const state = reactive({
  selT: 0.0
})

watch(() => props.cntSelected, (first, second) => {
  if (first == 0) {
    gsap.to(state, {
      selT: 1.0,
      duration: 0.5,
      ease: "power3.inOut"
    })
  } else if(first == 1) {
    gsap.to(state, {
      selT: -1.0,
      duration: 0.5,
      ease: "power3.inOut"
    })
  }
});

function drawRect(graphics: GraphicsInst) {

  const sw = (isMobile || isScreenWidthSmall.value) ? screen.value.width : screen.value.width / 2.0
  const sh = (isMobile || isScreenWidthSmall.value) ? screen.value.height * (0.5 + 0.425 * state.selT) : screen.value.height

  const rw = ref(Math.pow(0.9, props.idx!) * sw)
  const rh = ref(Math.pow(0.9, props.idx!) * sh)

  const pointer = props.motionData.active ? { x: props.motionData.xAngle, y: props.motionData.yAngle } : { x: mouse.x, y: mouse.y }
  const {x, y, w, h} = useDrawAnchoredBB(isMobile, pointer.x, pointer.y, sw, sh, rw.value, rh.value, graphics)
  frect.x = x
  frect.y = y
  frect.width = w
  frect.height = h
}

</script>

<template>
  <container
      ref="containerRef"
      :x="frect.x"
      :y="frect.y"
      :width="frect.width"
      :height="frect.height"
      :alpha="state.selT"
  >
    <sprite
            :mask="boundsRef"
            :texture="texture"
            :width="100.0"
            :height="100.0">
    </sprite>

    <Graphics ref="boundsRef"
              @render="drawRect">
    </Graphics>
  </container>
</template>

<style scoped>

</style>