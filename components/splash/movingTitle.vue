<script setup lang="ts">
import {gsap} from "gsap";
import opacity from "hex-color-opacity";

const tl = gsap.timeline();

const props = defineProps({
  text: String,
  anchorX: {
    type: Number,
    default: 0.5
  },
  anchorY: {
    type: Number,
    default: 0.5
  },
  x: Number,
  y: Number,
  targetX: Number,
  targetY: Number,
  fontFamily: {
    type: String,
    default: 'Inter'
  },
  fontWeight: {
    type: Number,
    default: 400
  },
  fill: {
    type: String,
    default: '#000000'
  }
});

const textProperties = reactive({
  x: props.x,
  y: props.y,
  opacity: 1.0
})

onMounted(() => {
  tl.to(textProperties, {
    delay: 0.75,
    duration: 2.0,
    x: props.targetX,
    y: props.targetY,
    ease: "power3.inOut"
  })
  .to(textProperties, {
    delay: 0.5,
    duration: 0.4,
    opacity: 0.0,
  })
})

</script>
  <template>
  <text
      :resolution="2"
      :anchor-x="anchorX"
      :anchor-y="anchorY"
      :x="textProperties.x"
      :y="textProperties.y"
      :style="{
        fontFamily: $props.fontFamily,
        fontWeight: $props.fontWeight,
        fill: opacity('#000000', textProperties.opacity) }"
  >
    {{ text }}
  </text>
</template>
