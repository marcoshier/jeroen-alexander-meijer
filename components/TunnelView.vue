<script setup lang="ts">
const screen = useScreen()

const props = defineProps({
  type: String,
});

function offsetX() {
  if(props.type == "words") {
    return screen.value.width / 2.0
  } else {
    return 0.0
  }
}


const glob = import.meta.glob('@/assets/pav/*', { eager: true })
const imagePaths: string[] = []

const uimg = useImage()
const images: string[] = ["hello"]

let imagesLoaded = false

onBeforeMount(() => {
  console.log(props.type)
  Object.entries(glob).forEach(([key, value]) => {
    const imgPath = (value as { default: string }).default;
    imagePaths.push(imgPath)
    images.push(uimg(imgPath, { width: 400 }))
  })

  imagesLoaded = true
})
</script>

<template>
  <container
  :x="offsetX()"
  >
    <work-item
        v-if="type=='works' && imagesLoaded"
        v-for="(img, i) in imagePaths"
       :img="img"
       :idx="i">
    ></work-item>
    <blog-item
        v-else-if="type=='words' && imagesLoaded"
        v-for="(img, i) in imagePaths"
        :idx="i">
      ></blog-item>
  </container>
</template>

<style scoped>

</style>