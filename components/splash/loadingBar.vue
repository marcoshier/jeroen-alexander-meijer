<script setup lang="ts">
import {gsap} from "gsap";
const emit = defineEmits(["animFinished"])

const screen = useScreen();

const height = reactive( { value: 0.0 } )

onMounted(() => {
  gsap.to(height, {
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
    :x="screen.width / 2.0"
    :y="0.0"
    @render="graphics => {
      graphics.clear()
      graphics.lineStyle(1, 0x00000, 1)
      graphics.moveTo(0, 0);
      graphics.lineTo(0, height.value * screen.height)
    }"
></graphics>
</template>

<style scoped>

</style>