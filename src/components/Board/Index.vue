<template>
  <div class="board">
    <div
      class="row"
      :class="(rowIndex + 1) % 3 === 0 ? 'endOfSection' : ''"
      v-for="(row, rowIndex) of board"
      :key="'row' + rowIndex + 'board1'"
    >
      <tile
        v-for="(cell, cellIndex) of row"
        :key="'cell' + rowIndex + cellIndex"
        :num="cell.num"
        :tick="cell.tick"
        @onTileClicked="onTileClicked(board, rowIndex, cellIndex)"
      >
      </tile>
    </div>
  </div>
</template>

<script>
import Tile from "src/components/Tile/Index.vue";
export default {
  name: "Board",

  props: {
    board: {
      type: Array
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss"></style>
