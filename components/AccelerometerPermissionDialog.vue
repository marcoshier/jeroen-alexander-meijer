<script setup lang="ts">
import Quaternion from "quaternion";

const emit = defineEmits(['accmotion'])

interface DeviceOrientationEventiOs extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const motionData = reactive({
  active: false,
  xAngle: 0.0,
  yAngle: 0.0,
})

const permission = ref("Please allow accelerometer permission")

function requestOrientationPermission() {
  const doe = DeviceOrientationEvent as unknown as DeviceOrientationEventiOs
  if (typeof doe.requestPermission === 'function') {
    doe.requestPermission()
        .then(permissionState => {
          permission.value = permissionState
          if (permissionState === 'granted') {

            motionData.active = true;
            const deg = Math.PI / 180;

            window.addEventListener("deviceorientation", event => {

              const q = Quaternion.fromEulerLogical((event.alpha ?? 0.0) * deg, (event.beta ?? 0.0) * deg, -(event.gamma ?? 0.0) * deg, 'ZXY');
              const mat = q.toMatrix(false);

              motionData.xAngle = motionData.xAngle * 0.5 + mat[6] * 0.5;
              motionData.yAngle = motionData.yAngle * 0.5 + mat[8] * 0.5;

              emit("accmotion",  { active: motionData.active, xAngle: motionData.xAngle, yAngle: motionData.yAngle })
            }, true)


          }
        })
        .catch(console.error);
  }
}
</script>

<template>
<div id="dialog-area" @click="requestOrientationPermission">
  <p>{{ permission}}</p>
</div>
</template>

<style scoped>
#dialog-area {
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

#dialog-area p {
  color: white;
  text-align: center;
}
</style>