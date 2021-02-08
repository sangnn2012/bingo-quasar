<template>
  <q-page class="game-wrapper">
    <div class="game-wrapper__title">
      Chào mừng mấy con giời đến với Lô tô 2021
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
        >
        </tile>
      </div>

      <div>-----------------------------------------------------------</div>

      <!-- <div
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
        >
        </tile>
      </div> -->
    </div>
    <div class="game-wrapper__footer">
      Chúc các bạn CT năm mới vui vẻ - Sang.
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
    generateBoard() {
      //create an array from 1-90
      let mainArray = [...Array(90).keys()].map(num => ++num);
      //shuffle array
      mainArray = this.$helpers.shuffle(mainArray);
      //divide into 2 halves
      const half = Math.round(mainArray.length / 2);
      const firstHalf = mainArray.splice(0, half);
      const secondHalf = mainArray.splice(-half);

      // console.log(firstHalf.sort((a, b) => a-b))

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
      //transpose
      this.board1 = this.$helpers.transpose(sortedBoard1);

      this.board1 = [
        [3, -1, 28, 38, -1, 54, 62, 72, -1],
        [7, -1, -1, -1, 42, 52, 66, 78, -1],
        [-1, -1, -1, -1, -1, -1, -1, 79, 86],
        [6, 18, 27, 30, -1, 56, 63, -1, 87],
        [-1, 14, -1, 36, -1, -1, -1, 70, 81],
        [-1, -1, 25, -1, 49, 57, 68, 74, -1],
        [-1, 10, 23, -1, -1, 59, 67, 71, -1],
        [2, -1, 24, 34, -1, 58, 65, 75, 90],
        [-1, 12, -1, 33, -1, -1, 61, 73, -1]
      ];
      const tempArr = [];
      for (let i = 0; i < this.board1.length; i++) {
        let notEmptyTile = this.board1[i].filter(x => x !== -1).length;
        if (notEmptyTile === 5) continue;
        if (notEmptyTile > 5) {
          for (let j = 0; j < this.board1[0].length; j++) {
            let temp = this.board1[i][j];
            if (temp === -1) continue;
            // cell = -1, shift number downwards in an empty cell
            this.board1[i][j] = -1;
            tempArr.push(temp);
            // for(let k=i+1; k<this.board1.length; k++) {
            //   if(this.board1[k][j] !== -1) continue;
            //   this.board1[k][j] = temp;
            //   break;
            // }
            // check current not empty length, if 5, break
            let currentLength = this.board1[i].filter(x => x !== -1).length;
            if (currentLength === 5) break;
          }
        }
      }
      tempArr.sort((a,b) => a-b);
      console.log(tempArr);

      //push back to board
      for (let i = 0; i < this.board1.length; i++) {
        let notEmptyTile = this.board1[i].filter(x => x !== -1).length;
        if (notEmptyTile === 5) continue;

        //empty columns indexes
        let colIndexes = []
        this.board1[i].forEach((x, index) => {
          if(x === -1) {
            colIndexes.push(index);
          }
        })

        tempArr.forEach(x => {
          const getTens = Math.floor(x%10);
          if(colIndexes.includes(getTens)) {}
            // get x out
            //push x to board
        })
        console.log({colIndexes})
      }

      this.board1 = this.board1.map(row => {
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
  &__footer {
    font-size: 12px;
    color: gray;
    text-align: center;
  }
}
</style>
