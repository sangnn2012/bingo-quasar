<template>
  <div
    class="tile flex flex-center"
    :style='num=== -1 ? `background-color:${mainColor}` : ""'
    :class="num !== -1 ? 'hasNum' : ''"
    @click="$emit('onTileClicked')"
  >
    <div class="num" :class="num !== -1 ? 'hasNum' : ''">
      {{ num }}
    </div>
    <q-icon v-show="tick && num !== -1" class="tick" :name="mainIcon"/>
  </div>
</template>

<script>
export default {
  name: "Tile",
  emits: ['onTileClicked'],
  props: {
    num: {
      type: Number,
      default: -1
    },
    tick: {
      type: Boolean,
      default: false
    },
    mainColor: String,
    mainIcon: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.tile {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */

  user-select: none;
  text-align: center;
  position: relative;
  border: 2px solid gray;
  width: 8vw;
  height: 10vw;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  // background-color: #fa86c4;
  pointer-events: none;
  &.hasNum {
    background-color: white;
    cursor: pointer;
    pointer-events: all;
  }
  .num {
    font-size: 5vw;
    color: transparent;

    &.hasNum {
      color: black;
    }
  }
  .tick {
    position: absolute;
    color: green;
    font-size: 8vw;
    width: 100%;
    top: 10%;
    left: 0;
    opacity: 0.8;
  }
}
</style>
