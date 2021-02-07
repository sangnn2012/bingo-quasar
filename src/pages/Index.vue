<template>
  <q-page class="game-wrapper">
    <div class="game-wrapper__title">
      Chào mừng mấy con giời đến với Lô tô 2021
    </div>
    <div class="game-wrapper__main">
      <div
        class="row"
        :class="(rowIndex + 1) % 3 === 0 ? 'endOfSection' : ''"
        v-for="(row, rowIndex) of board"
        :key="'row' + rowIndex"
      >
        <tile
          v-for="(cell, cellIndex) of row"
          :key="'cell' + rowIndex + cellIndex"
          :num="cell.num"
          :tick="cell.tick"
          @onTileClicked="onTileClicked(rowIndex, cellIndex)"
        ></tile>
      </div>
      <!-- <tile v-for="cell of row" :num="cell.num" :tick="cell.tick"></tile> -->
    </div>
  </q-page>
</template>

<script>
import Tile from "src/components/Tile/Index.vue";
export default {
  name: "PageIndex",
  components: {
    Tile
  },
  mounted() {
    this.generateBoard();
  },
  data() {
    return {
      board: [
        [
          { num: -1 },
          { num: 18, tick: false },
          { num: 22, tick: false },
          { num: -1 },
          { num: -1 },
          { num: 55, tick: false },
          { num: -1 },
          { num: 76, tick: true },
          { num: 83, tick: true }
        ],
        [
          { num: -1 },
          { num: 12, tick: true },
          { num: -1 },
          { num: 38, tick: false },
          { num: 40, tick: false },
          { num: -1 },
          { num: 66, tick: true },
          { num: -1 },
          { num: 82, tick: false }
        ],
        [
          { num: 1, tick: false },
          { num: -1 },
          { num: 27, tick: true },
          { num: -1 },
          { num: 42, tick: false },
          { num: -1 },
          { num: -1 },
          { num: 73, tick: false },
          { num: 85, tick: false }
        ],
        [
          { num: -1 },
          { num: 18, tick: false },
          { num: 22, tick: false },
          { num: -1 },
          { num: -1 },
          { num: 55, tick: false },
          { num: -1 },
          { num: 76, tick: true },
          { num: 83, tick: true }
        ],
        [
          { num: -1 },
          { num: 12, tick: true },
          { num: -1 },
          { num: 38, tick: false },
          { num: 40, tick: false },
          { num: -1 },
          { num: 66, tick: true },
          { num: -1 },
          { num: 82, tick: false }
        ],
        [
          { num: 1, tick: false },
          { num: -1 },
          { num: 27, tick: true },
          { num: -1 },
          { num: 42, tick: false },
          { num: -1 },
          { num: -1 },
          { num: 73, tick: false },
          { num: 85, tick: false }
        ],
        [
          { num: -1 },
          { num: 18, tick: false },
          { num: 22, tick: false },
          { num: -1 },
          { num: -1 },
          { num: 55, tick: false },
          { num: -1 },
          { num: 76, tick: true },
          { num: 83, tick: true }
        ],
        [
          { num: -1 },
          { num: 12, tick: true },
          { num: -1 },
          { num: 38, tick: false },
          { num: 40, tick: false },
          { num: -1 },
          { num: 66, tick: true },
          { num: -1 },
          { num: 82, tick: false }
        ],
        [
          { num: 1, tick: false },
          { num: -1 },
          { num: 27, tick: true },
          { num: -1 },
          { num: 42, tick: false },
          { num: -1 },
          { num: -1 },
          { num: 73, tick: false },
          { num: 85, tick: false }
        ]
      ]
    };
  },
  methods: {
    onTileClicked(rowIndex, cellIndex) {
      this.board[rowIndex][cellIndex].tick = !this.board[rowIndex][cellIndex]
        .tick;
    },
    generateBoard() {

    }
  }
};
</script>

<style lang="scss" scoped>
.game-wrapper {
  &__title {
    text-align: center;
    font-size: 24px;
  }
  &__main {
    width: 90%;
    margin: auto;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .row {
      width: 100%;
      margin: auto;
      justify-content: center;
      &.endOfSection {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
