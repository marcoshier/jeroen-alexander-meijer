<script setup lang="ts">
import {gsap} from "gsap";
const emit = defineEmits(["animFinished"])

const props = defineProps({
  selIdx: {
    type: Number,
    default: -1
  },
})

const screen = useScreen();
const { isMobile } = useDevice()

const offsetX = reactive( { value: 0.0 } )
const offsetY = reactive( { value: 0.0 } )

watch(() => props.selIdx, async (newValue, oldValue) => {
  const nv = (newValue == 0) ? 1.0 : -1.0
  gsap.to(offsetY, {
    value: nv,
    duration: 0.5,
    ease: "power3.inOut"
  })
})

onMounted(() => {
  gsap.to(offsetX, {
    value: 1.0,
    duration: 1.0,
    ease: "power3.out",
    delay: 2.5,
    onComplete: () => emit("animFinished")
  })
})
</script>

<template>
<graphics
    :x="(isMobile || screen.width < 480) ? 0.0 : screen.width / 2.0"
    :y="(isMobile || screen.width < 480) ? screen.height / 2.0 : 0.0"
    @render="graphics => {
      graphics.clear()
      graphics.lineStyle(1, 0x00000, 1)
      graphics.moveTo(0, offsetY.value * screen.height * 0.425);
      if(isMobile || screen.width < 480) {
        graphics.lineTo(offsetX.value * screen.width,  offsetY.value * screen.height * 0.425)
      } else {
        graphics.lineTo(0, offsetX.value * screen.height)
      }
    }"
></graphics>
</template>

<style scoped>

</style>