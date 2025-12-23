<template>
  <q-page class="game-wrapper q-ma-md">
    <div class="game-wrapper__title">
      Chào mừng mấy con giời đến với Lô tô 2021
    </div>
    <div class="fullwidth text-center">
      <q-btn
        @click="isIntroModal = true"
        color="primary"
        label="Chọn lại màu và icon"
        class="q-ma-lg"
      />


    </div>
    <div class="game-wrapper__main">
      <div
        class="row"
        :class="(rowIndex + 1) % 3 === 0 ? 'endOfSection' : ''"
        v-for="(row, rowIndex) of board1"
        :key="'row' + rowIndex + 'board1'"
      >
        <tile
          v-for="(cell, cellIndex) of row"
          :key="'cell' + rowIndex + cellIndex"
          :num="cell.num"
          :tick="cell.tick"
          @onTileClicked="onTileClicked(board1, rowIndex, cellIndex)"
          :mainColor="mainColor"
          :mainIcon="mainIcon"
        >
        </tile>
      </div>

      <div>-----------------------------------------------------------</div>

      <div
        class="row"
        :class="(rowIndex + 1) % 3 === 0 ? 'endOfSection' : ''"
        v-for="(row, rowIndex) of board2"
        :key="'row' + rowIndex + 'board2'"
      >
        <tile
          v-for="(cell, cellIndex) of row"
          :key="'cell' + rowIndex + cellIndex"
          :num="cell.num"
          :tick="cell.tick"
          @onTileClicked="onTileClicked(board2, rowIndex, cellIndex)"
          :mainColor="mainColor"
          :mainIcon="mainIcon"
        >
        </tile>
      </div>
    </div>
    <div class="game-wrapper__footer">
      Chúc các bạn CT năm mới vui vẻ - Sang.
    </div>

    <q-dialog
      class="game-wrapper__pickers"
      v-model="isIntroModal"
      persistent
      transition-show="scale"
      transition-hide="scale"
      maximized
    >
      <div class="picker-wrapper text-center bg-white q-pa-xl">
        <div class="color-picker">
          <div class="text-h5">
            Theo yêu cầu của con phò Tăn thì mời các bạn chọn màu nền cho ô và
            icon đánh dấu
          </div>
          <div class="currentColor q-ma-lg flex justify-center items-center">
            <div class="q-mr-xl">Màu đang chọn:</div>
            <div
              :style="
                `background-color:${mainColor}; width: 50px; height: 50px; display: inline-block;`
              "
            ></div>
          </div>
          <div class="fullwidth text-center">
                      <q-color
            v-model="mainColor"
            no-header
            no-footer
            default-view="palette"
            class="q-mx-auto"
          />
          </div>


          <div class="currentColor q-ma-lg flex justify-center items-center">
            <div class="q-mr-xl">
              Icon đang chọn
            </div>
            <q-icon
              style="
                width: 50px;
                height: 50px;
                font-size: 34px;
                border: 2px dotted black;
              "
              :name="mainIcon"
            />
          </div>
          <div class="icon-picker">
            <q-icon
              style="
                width: 50px;
                height: 50px;
                font-size: 34px;
              "
              v-for="icon of iconList"
              :key="icon"
              :name="icon"
              @click="mainIcon = icon"
            />
          </div>
        </div>
        <q-btn
          @click="isIntroModal = false"
          color="primary"
          label="OK"
          class="q-mt-md"
        >
        </q-btn>
      </div>
    </q-dialog>
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
    this.generate2Board();

    // for (let i = 0; i < this.board1.length; i++) {
    //   let length = this.board1[i].filter(x => x.num !== -1).length;
    //   if (length !== 5) {
    //     this.generate2Board();
    //   }
    // }

    while (this.isNotPerfect) {
      console.log("run");
      this.generate2Board();
    }
  },
  data() {
    return {
      iconList: ["done", "pets", "eco", "bolt", "clear", "sentiment_neutral"],
      mainIcon: "done",
      mainColor: "#fa86c4",
      isIntroModal: true,
      board1: [
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
      ],
      board2: [
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
    onTileClicked(board, rowIndex, cellIndex) {
      board[rowIndex][cellIndex].tick = !board[rowIndex][cellIndex].tick;
    },
    generate2Board() {
      //create an array from 1-90
      let mainArray = [...Array(90).keys()].map(num => ++num);
      //shuffle array
      mainArray = this.$helpers.shuffle(mainArray);
      //divide into 2 halves
      const half = Math.round(mainArray.length / 2);
      const firstHalf = mainArray.splice(0, half);
      const secondHalf = mainArray.splice(-half);
      let sortedBoard1 = this.sortBoard(firstHalf);
      let sortedBoard2 = this.sortBoard(secondHalf);

      sortedBoard1.forEach((row, rowIndex) => {
        while (row.length < 9) {
          row.push(-1);
        }
        while (row.length > 9) {
          sortedBoard2[rowIndex].push(row.pop());
        }
      });

      sortedBoard2.forEach((row, rowIndex) => {
        while (row.length < 9) {
          row.push(-1);
        }
        while (row.length > 9) {
          sortedBoard1[rowIndex].push(row.pop());
        }
      });

      //shuffle
      sortedBoard1 = sortedBoard1.map(row => this.$helpers.shuffle(row));
      sortedBoard2 = sortedBoard2.map(row => this.$helpers.shuffle(row));

      //transpose
      this.board1 = this.$helpers.transpose(sortedBoard1);
      this.board2 = this.$helpers.transpose(sortedBoard2);

      // this.board1 = [
      //   [3, -1, 28, 38, -1, 54, 62, 72, -1],
      //   [7, -1, -1, -1, 42, 52, 66, 78, -1],
      //   [-1, -1, -1, -1, -1, -1, -1, 79, 86],
      //   [6, 18, 27, 30, -1, 56, 63, -1, 87],
      //   [-1, 14, -1, 36, -1, -1, -1, 70, 81],
      //   [-1, -1, 25, -1, 49, 57, 68, 74, -1],
      //   [-1, 10, 23, -1, -1, 59, 67, 71, -1],
      //   [2, -1, 24, 34, -1, 58, 65, 75, 90],
      //   [-1, 12, -1, 33, -1, -1, 61, 73, -1]
      // ];
      this.board1 = this.generateSingleBoard(this.board1);
      this.board2 = this.generateSingleBoard(this.board2);
    },
    generateSingleBoard(board) {
      const tempArr = [];
      for (let i = 0; i < board.length; i++) {
        let notEmptyTile = board[i].filter(x => x !== -1).length;
        if (notEmptyTile === 5) continue;
        if (notEmptyTile > 5) {
          for (let j = 0; j < board[0].length; j++) {
            let temp = board[i][j];
            if (temp === -1) continue;
            // cell = -1, shift number downwards in an empty cell
            board[i][j] = -1;
            tempArr.push(temp);
            // check current not empty length, if 5, break
            let currentLength = board[i].filter(x => x !== -1).length;
            if (currentLength === 5) break;
          }
        }
      }
      tempArr.sort((a, b) => a - b);

      //push back to board
      for (let i = 0; i < board.length; i++) {
        let notEmptyTile = board[i].filter(x => x !== -1).length;
        if (notEmptyTile === 5) continue;

        //empty columns indexes

        if (notEmptyTile < 5) {
          let colIndexes = [];
          board[i].forEach((x, index) => {
            if (x === -1) {
              colIndexes.push(index);
            }
          });

          for (let k = 0; k < tempArr.length; k++) {
            if (tempArr[k] === -1) continue;
            let getTens = Math.floor(tempArr[k] / 10);
            if (colIndexes.includes(getTens)) {
              board[i][getTens] = tempArr[k];
              tempArr[k] = -1;

              //remove getTens value from colIndexes
              let tempIndex = colIndexes.indexOf(getTens);
              if (tempIndex !== -1) {
                colIndexes.splice(tempIndex, 1);
              }
            }

            let currentLength = board[i].filter(x => x !== -1).length;
            if (currentLength === 5) break;
          }
        }
      }

      return board.map(row => {
        return row.map(x => {
          return { num: x, tick: false };
        });
      });
    },
    sortBoard(array) {
      let mainArray = [...array];
      let firstCol = mainArray.filter(num => num <= 9);
      let secondCol = mainArray.filter(num => num >= 10 && num <= 19);
      let thirdCol = mainArray.filter(num => num >= 20 && num <= 29);
      let fourthCol = mainArray.filter(num => num >= 30 && num <= 39);
      let fifthCol = mainArray.filter(num => num >= 40 && num <= 49);
      let sixthCol = mainArray.filter(num => num >= 50 && num <= 59);
      let senventhCol = mainArray.filter(num => num >= 60 && num <= 69);
      let eighthCol = mainArray.filter(num => num >= 70 && num <= 79);
      let ninthCol = mainArray.filter(num => num >= 80 && num <= 90);

      let sortedBoard = [
        firstCol,
        secondCol,
        thirdCol,
        fourthCol,
        fifthCol,
        sixthCol,
        senventhCol,
        eighthCol,
        ninthCol
      ];
      return sortedBoard;
    }
  },
  computed: {
    computedBoard() {
      return this.board;
    },
    isNotPerfect() {
      for (let i = 0; i < this.board1.length; i++) {
        let length = this.board1[i].filter(x => x.num !== -1).length;
        if (length !== 5) {
          return true;
        }
      }

      return false;
    }
  }
};
</script>

<style lang="scss">
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
  &__footer {
    font-size: 12px;
    color: gray;
    text-align: center;
  }
  &__pickers {
    background: red;
    .picker-wrapper {
      background-color: white !important;
    }
  }
}
</style>
