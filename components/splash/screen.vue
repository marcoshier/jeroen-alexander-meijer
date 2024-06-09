<script setup lang="ts">
import MovingTitle from "~/components/splash/movingTitle.vue";

const findPosition = (rowIdx: number, offset: number) => {
  let nPos = useRandomPosition(
      offset,
      (screen.value.height + offset) / 3.0 * rowIdx,
      (screen.value.width / 2.0) - offset * 2.4,
      (screen.value.height - offset * 2.0) / 3.0
  )

  let f = Math.random()
  if (f > 0.5) {
    if (rowIdx == 1) nPos.x = screen.value.width - nPos.x
  } else {
    if (rowIdx != 1) nPos.x = screen.value.width - nPos.x
  }

  return nPos
}

const screen = useScreen();
const targets:{ x: number, y: number }[] = new Array(3)

for(let i = 0; i<targets.length; i++) {
  targets[i] = findPosition(i, screen.value.width * 0.05)
}


</script>

<template>
 <moving-title
     text="JEROEN"
     :x="screen.width / 2.0"
     :y="screen.height / 2.0 - 40.0"
     :target-x="targets[0].x"
     :target-y="targets[0].y"
 ></moving-title>
 <moving-title
     text="ALEXANDER"
     :x="screen.width / 2.0"
     :y="screen.height / 2.0"
     :target-x="targets[1].x"
     :target-y="targets[1].y"
 ></moving-title>
 <moving-title
     text="MEIJER"
     :x="screen.width / 2.0"
     :y="screen.height / 2.0 + 40.0"
     :target-x="targets[2].x"
     :target-y="targets[2].y"
 ></moving-title>

</template>

<style scoped>
</style>