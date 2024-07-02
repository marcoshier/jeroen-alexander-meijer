<script setup lang="ts">
const emit = defineEmits(['permission-response'])

interface DeviceOrientationEventiOs extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

const permission = ref("")

function requestOrientationPermission() {
  const doe = DeviceOrientationEvent as unknown as DeviceOrientationEventiOs
  if (typeof doe.requestPermission === 'function') {
    doe.requestPermission()
        .then(permissionState => {
          permission.value = permissionState
          if (permissionState === 'granted') {
            emit('permission-response', permissionState)
          }
        })
        .catch(console.error);
  }
}
</script>

<template>
<div id="dialog-area" @click="requestOrientationPermission">
  <p>{{ permission }}</p>
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