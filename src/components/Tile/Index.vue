<template>
  <div
    class="tile flex flex-center"
    :style="num === -1 ? `background-color:${mainColor}` : ''"
    :class="num !== -1 ? 'hasNum' : ''"
    @click="emit('click')"
  >
    <div class="num" :class="num !== -1 ? 'hasNum' : ''">
      {{ num }}
    </div>
    <q-icon v-show="tick && num !== -1" class="tick" :name="mainIcon" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  num?: number;
  tick?: boolean;
  mainColor?: string;
  mainIcon?: string;
}

withDefaults(defineProps<Props>(), {
  num: -1,
  tick: false,
  mainColor: '',
  mainIcon: '',
});

const emit = defineEmits<{
  click: [];
}>();
</script>

<style lang="scss">
.tile {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  position: relative;
  border: 1px solid #9e9e9e;
  width: calc(100% / 9);
  max-width: 50px;
  aspect-ratio: 1 / 1.1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  pointer-events: none;
  box-sizing: border-box;
  transition: transform 0.1s ease;

  &.hasNum {
    background-color: white;
    cursor: pointer;
    pointer-events: all;

    &:hover {
      transform: scale(1.05);
      z-index: 1;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  .num {
    font-size: clamp(12px, 3vw, 20px);
    font-weight: 600;
    color: transparent;

    &.hasNum {
      color: #333;
    }
  }

  .tick {
    position: absolute;
    color: green;
    font-size: clamp(24px, 5vw, 36px);
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.85;
  }
}
</style>
