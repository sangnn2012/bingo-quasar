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
        :key="'row' + rowIndex + 'board1'"
        class="row"
        :class="(rowIndex + 1) % 3 === 0 ? 'endOfSection' : ''"
      >
        <Tile
          v-for="(cell, cellIndex) of row"
          :key="'cell' + rowIndex + cellIndex"
          :num="cell.num"
          :tick="cell.tick"
          :main-color="mainColor"
          :main-icon="mainIcon"
          @on-tile-clicked="toggleTile(board1, rowIndex, cellIndex)"
        />
      </div>

      <div class="board-separator">
        <q-separator />
        <span class="board-separator__text">Vé 2</span>
        <q-separator />
      </div>

      <div
        v-for="(row, rowIndex) of board2"
        :key="'row' + rowIndex + 'board2'"
        class="row"
        :class="(rowIndex + 1) % 3 === 0 ? 'endOfSection' : ''"
      >
        <Tile
          v-for="(cell, cellIndex) of row"
          :key="'cell' + rowIndex + cellIndex"
          :num="cell.num"
          :tick="cell.tick"
          :main-color="mainColor"
          :main-icon="mainIcon"
          @on-tile-clicked="toggleTile(board2, rowIndex, cellIndex)"
        />
      </div>
    </div>
    <div class="game-wrapper__footer">Chúc các bạn CT năm mới vui vẻ - Sang.</div>

    <q-dialog
      v-model="isSettingsOpen"
      class="game-wrapper__pickers"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="picker-dialog">
        <!-- Header -->
        <q-card-section class="picker-dialog__header">
          <div class="text-h5 text-weight-bold text-center">Tùy chỉnh giao diện</div>
          <div class="text-subtitle2 text-grey-7 text-center q-mt-sm">
            Chọn màu nền cho ô trống và icon đánh dấu
          </div>
        </q-card-section>

        <q-separator />

        <!-- Main Content - Responsive Grid -->
        <q-card-section class="picker-dialog__content">
          <div class="row q-col-gutter-lg">
            <!-- Color Picker Card -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="picker-card">
                <q-card-section class="picker-card__header bg-grey-2">
                  <div class="row items-center">
                    <q-icon name="palette" size="24px" class="q-mr-sm text-primary" />
                    <span class="text-subtitle1 text-weight-medium">Màu nền ô trống</span>
                  </div>
                </q-card-section>

                <q-card-section class="text-center">
                  <!-- Current Color Preview -->
                  <div class="color-preview-wrapper q-mb-md">
                    <div class="text-caption text-grey-7 q-mb-xs">Màu đang chọn</div>
                    <div class="color-preview" :style="`background-color: ${mainColor}`"></div>
                  </div>

                  <!-- Color Picker -->
                  <q-color
                    v-model="mainColor"
                    no-header
                    no-footer
                    default-view="palette"
                    class="color-picker-component"
                  />
                </q-card-section>
              </q-card>
            </div>

            <!-- Icon Picker Card -->
            <div class="col-12 col-md-6">
              <q-card flat bordered class="picker-card">
                <q-card-section class="picker-card__header bg-grey-2">
                  <div class="row items-center">
                    <q-icon name="star" size="24px" class="q-mr-sm text-primary" />
                    <span class="text-subtitle1 text-weight-medium">Icon đánh dấu</span>
                  </div>
                </q-card-section>

                <q-card-section class="text-center">
                  <!-- Current Icon Preview -->
                  <div class="icon-preview-wrapper q-mb-lg">
                    <div class="text-caption text-grey-7 q-mb-xs">Icon đang chọn</div>
                    <div class="icon-preview" :style="`border-color: ${mainColor}`">
                      <q-icon :name="mainIcon" :style="`color: ${mainColor}`" size="42px" />
                    </div>
                  </div>

                  <!-- Icon Grid -->
                  <div class="icon-grid">
                    <div
                      v-for="icon of iconList"
                      :key="icon"
                      class="icon-option"
                      :class="{ 'icon-option--selected': mainIcon === icon }"
                      @click="mainIcon = icon"
                    >
                      <q-icon
                        :name="icon"
                        size="32px"
                        :color="mainIcon === icon ? 'primary' : 'grey-7'"
                      />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Live Preview Section -->
          <q-card flat bordered class="preview-card q-mt-lg">
            <q-card-section class="picker-card__header bg-grey-2">
              <div class="row items-center justify-center">
                <q-icon name="visibility" size="24px" class="q-mr-sm text-primary" />
                <span class="text-subtitle1 text-weight-medium">Xem trước</span>
              </div>
            </q-card-section>

            <q-card-section>
              <div class="live-preview">
                <div class="preview-label text-caption text-grey-7 q-mb-sm text-center">
                  Đây là cách các ô sẽ hiển thị trong trò chơi
                </div>
                <div class="preview-tiles">
                  <!-- Empty tile preview -->
                  <div
                    class="preview-tile preview-tile--empty"
                    :style="`background-color: ${mainColor}`"
                  >
                    <span class="preview-tile__label">Ô trống</span>
                  </div>

                  <!-- Number tile preview (unmarked) -->
                  <div class="preview-tile preview-tile--number">
                    <span class="preview-tile__number">42</span>
                    <span class="preview-tile__label">Chưa đánh</span>
                  </div>

                  <!-- Number tile preview (marked) -->
                  <div class="preview-tile preview-tile--number preview-tile--marked">
                    <span class="preview-tile__number">77</span>
                    <q-icon
                      :name="mainIcon"
                      class="preview-tile__icon"
                      :style="`color: ${mainColor}`"
                    />
                    <span class="preview-tile__label">Đã đánh</span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-separator />

        <!-- Footer with Action Button -->
        <q-card-actions align="center" class="q-pa-md">
          <q-btn
            color="primary"
            label="Bắt đầu chơi"
            size="lg"
            unelevated
            class="start-btn"
            icon-right="play_arrow"
            @click="isSettingsOpen = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import Tile from 'src/components/Tile/Index.vue';
import { useGameState } from 'src/composables/useGameState';
import { useUISettings } from 'src/composables/useUISettings';

// Game state
const { board1, board2, toggleTile } = useGameState();

// UI settings
const { mainIcon, mainColor, isSettingsOpen, iconList } = useUISettings();
</script>

<style lang="scss">
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

    .row {
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

  .q-separator {
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

// Picker Dialog Styles
.picker-dialog {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 16px;
  overflow: hidden;

  &__header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 24px;

    .text-h5 {
      color: white;
    }
    .text-subtitle2 {
      color: rgba(255, 255, 255, 0.85);
    }
  }

  &__content {
    padding: 24px;
    background-color: #f8f9fa;
    max-height: 60vh;
    overflow-y: auto;
  }
}

// Picker Cards
.picker-card {
  border-radius: 12px;
  height: 100%;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  &__header {
    border-radius: 12px 12px 0 0;
    padding: 12px 16px;
  }
}

// Color Preview
.color-preview-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.color-preview {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
}

.color-picker-component {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: none !important;
}

// Icon Preview
.icon-preview-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-preview {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  border: 3px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

// Icon Grid
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.icon-option {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: white;

  &:hover {
    border-color: #1976d2;
    background-color: #e3f2fd;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.2);
  }

  &--selected {
    border-color: #1976d2;
    background-color: #e3f2fd;
    box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.3);
    transform: scale(1.05);

    &:hover {
      transform: scale(1.08);
    }
  }
}

// Preview Card
.preview-card {
  border-radius: 12px;
}

.live-preview {
  padding: 8px;
}

.preview-tiles {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.preview-tile {
  width: 80px;
  height: 100px;
  border: 2px solid #424242;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &--empty {
    // Background color set via inline style
  }

  &--number {
    background-color: white;
  }

  &--marked {
    .preview-tile__icon {
      position: absolute;
      font-size: 48px;
      opacity: 0.85;
    }
  }

  &__number {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    z-index: 1;
  }

  &__label {
    position: absolute;
    bottom: -24px;
    font-size: 11px;
    color: #666;
    white-space: nowrap;
  }

  &__icon {
    font-size: 48px;
  }
}

// Start Button
.start-btn {
  min-width: 200px;
  border-radius: 25px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

// Responsive adjustments
@media (max-width: 599px) {
  .picker-dialog {
    max-width: 100%;
    margin: 8px;
    border-radius: 12px;

    &__header {
      padding: 16px;
    }

    &__content {
      padding: 16px;
    }
  }

  .icon-option {
    width: 50px;
    height: 50px;
  }

  .preview-tile {
    width: 70px;
    height: 85px;

    &__number {
      font-size: 20px;
    }

    &--marked .preview-tile__icon {
      font-size: 40px;
    }
  }
}
</style>
