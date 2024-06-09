<script setup lang="ts">
import {useMouse} from '@vueuse/core'
import {type ContainerInst, type GraphicsInst} from "vue3-pixi";
import {MASK_TYPES, MaskData, Texture} from "@pixi/core";

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
  img: String
})


const width = ref(Math.pow(0.9, props.idx!) * screen.value.width / 2.0)
const height = ref(Math.pow(0.9, props.idx!) * screen.value.height)

const containerRef = ref<ContainerInst>()

function clamp(num: number, lower: number, upper: number) {
  return Math.min(Math.max(num, lower), upper);
}

function drawRect(graphics: GraphicsInst) {

  const uvpos = {
    x: clamp(mouse.x / (screen.value.width * 0.5), 0.0, 1.0),
    y: clamp(mouse.y / (screen.value.height), 0.0, 1.0)
  }

  const rect = useRectangleFromUV(1.0 - uvpos.x, 1.0 - uvpos.y, 0.0, 0.0, screen.value.width / 2.0, screen.value.height, width.value, height.value)
  frect.x = rect.x
  frect.y = rect.y
  frect.width = rect.width
  frect.height = rect.height

  graphics.clear()
  graphics.lineStyle(1, 0x00000, 1)
  graphics.beginFill("#FFFFFF")
  graphics.drawRect(0.0, 0.0, rect.width, rect.height)
  graphics.endFill()
}

</script>

<template>
  <container
      ref="containerRef"
      :x="frect.x"
      :y="frect.y"
      :width="frect.width"
      :height="frect.height"
  >
    <Graphics @render="drawRect">
    </Graphics>
  </container>
</template>

<style scoped>

</style>