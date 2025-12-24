<template>
  <q-page class="game-wrapper q-ma-md">
    <div class="game-wrapper__title">Chào mừng mấy con giời đến với Lô tô 2021</div>
    <div class="fullwidth text-center">
      <q-btn
        color="primary"
        label="Chọn lại màu và icon"
        class="q-ma-lg"
        @click="isSettingsOpen = true"
      />
    </div>
    <div class="game-wrapper__main">
      <div class="board-label">Vé 1</div>
      <div
        v-for="(row, rowIndex) of board1"
        :key="`board1-row-${rowIndex}`"
        class="row"
        :class="(rowIndex + 1) % 3 === 0 ? 'endOfSection' : ''"
      >
        <Tile
          v-for="(cell, cellIndex) of row"
          :key="`cell-${rowIndex}-${cellIndex}`"
          :num="cell.num"
          :tick="cell.tick"
          :main-color="mainColor"
          :main-icon="mainIcon"
          @click="toggleTile(board1, rowIndex, cellIndex)"
        />
      </div>

      <div class="board-separator">
        <q-separator />
        <span class="board-separator__text">Vé 2</span>
        <q-separator />
      </div>

      <div
        v-for="(row, rowIndex) of board2"
        :key="`board2-row-${rowIndex}`"
        class="row"
        :class="(rowIndex + 1) % 3 === 0 ? 'endOfSection' : ''"
      >
        <Tile
          v-for="(cell, cellIndex) of row"
          :key="`cell-${rowIndex}-${cellIndex}`"
          :num="cell.num"
          :tick="cell.tick"
          :main-color="mainColor"
          :main-icon="mainIcon"
          @click="toggleTile(board2, rowIndex, cellIndex)"
        />
      </div>
    </div>
    <div class="game-wrapper__footer">Chúc các bạn CT năm mới vui vẻ - Sang.</div>

    <SettingsDialog v-model="isSettingsOpen" v-model:color="mainColor" v-model:icon="mainIcon" />
  </q-page>
</template>

<script setup lang="ts">
import Tile from 'src/components/Tile/Index.vue';
import SettingsDialog from 'src/components/SettingsDialog/Index.vue';
import { useGameState } from 'src/composables/useGameState';
import { useUISettings } from 'src/composables/useUISettings';

// Game state
const { board1, board2, toggleTile } = useGameState();

// UI settings
const { mainIcon, mainColor, isSettingsOpen } = useUISettings();
</script>

<style lang="scss" scoped>
.game-wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 8px;

  &__title {
    text-align: center;
    font-size: clamp(16px, 4vw, 22px);
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }

  &__main {
    width: 100%;
    margin: auto;
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background: #f5f5f5;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

    :deep(.row) {
      width: 100%;
      margin: auto;
      display: flex;
      justify-content: center;

      &.endOfSection {
        margin-bottom: 8px;
        padding-bottom: 4px;
        border-bottom: 2px solid #e0e0e0;
      }
    }
  }

  &__footer {
    font-size: 11px;
    color: #999;
    text-align: center;
    margin-top: 16px;
  }
}

.board-label {
  width: 100%;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: #1976d2;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  padding: 6px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 6px;
}

.board-separator {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0 8px 0;
  padding: 0 8px;

  :deep(.q-separator) {
    flex: 1;
    background-color: #bdbdbd;
  }

  &__text {
    font-size: 13px;
    font-weight: 700;
    color: #1976d2;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 6px 16px;
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border-radius: 6px;
  }
}
</style>
