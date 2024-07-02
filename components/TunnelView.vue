<script setup lang="ts">
import {gsap} from "gsap";

const props = defineProps({
  type: String,
  show: Boolean,
  motionData: {
    type: Object,
    default: () => ({
      active: false,
      xAngle: 0.0,
      yAngle: 0.0
    })
  },
  selected: Number,
  cntOpacity: 0.0,
  fontFamily: {
    type: String,
    default: 'Inter'
  },
  fontWeight: {
    type: Number,
    default: 400
  }
});


const { isMobile } = useDevice();
const screen = useScreen()

function offsetX() {
  if(props.type == "words" && (!isMobile || screen.value.width > 480)) {
    return screen.value.width / 2.0
  } else {
    return 0.0
  }
}

function offsetY() {
  if(props.type == "words" && (isMobile || screen.value.width < 480)) {
    return screen.value.height / 2.0
  } else {
    return 0.0
  }
}

const glob = import.meta.glob('@/assets/pav/*', { eager: true })
const imagePaths: string[] = []

const uimg = useImage()
const images: string[] = ["hello"]

let imagesLoaded = false
let elOpacity = reactive({
  value: 0.0
})

let selOffsetY = reactive({
  value: 0.0
})

watch(() => props.show, (first, second) => {
  if (first == true) {
    gsap.to(elOpacity, {
      duration: 0.5,
      value: 1.0,
    })
  }
});

watch(() => props.selected, (first, second) => {
  if (first != -1) {
    gsap.to(selOffsetY, {
      duration: 0.5,
      value: 1.0,
    })
  }
});


onBeforeMount(() => {
  Object.entries(glob).forEach(([key, value]) => {
    const imgPath = (value as { default: string }).default;
    imagePaths.push(imgPath)
    images.push(uimg(imgPath, { width: 1080 }))
  })

  imagesLoaded = true
})

</script>

<template>
  <container
  :x="offsetX()"
  :y="offsetY()"
  :alpha="elOpacity.value * cntOpacity"
  >
    <work-item
        v-if="type=='works' && imagesLoaded"
        v-for="(img, i) in imagePaths"
        :motion-data="motionData"
        :cnt-selected="selected"
       :img="img"
       :idx="i">
    ></work-item>
    <blog-item
        v-else-if="type=='words' && imagesLoaded"
        v-for="(_, i) in imagePaths"
        :motion-data="motionData"
        :cnt-selected="selected"
        :idx="i">
      ></blog-item>
  </container>
</template>

<style scoped>

</style>