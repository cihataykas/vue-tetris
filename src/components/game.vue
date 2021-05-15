<template>
  <div class="vue-tetris theme-light">
    <div v-if="game" class="tile-container">
      <div
        v-for="(tileRow, tileRowIndex) in tiles" :key="tileRowIndex"
        class="tile-row"
      >
      <div
        v-for="(tile, tileIndex) in tileRow" :key="tileIndex"
        :class="['tile', tile.animationClass, { active: tile.value }]"
        :style="{
          background: `linear-gradient(to right bottom, rgb(255, 255, 255) 50%, ${tile.color} 50%)`,
        }"
        >
        <div :style="{ backgroundColor: tile.color }" class="tile-part" />
        <span v-if="showTileIds">{{ tile.value }}</span>
        </div>
      </div>
    </div>
    <div class="bg" />
  </div>
</template>

<script>

import Game from '../models';

export default {
  computed: {
    tiles() {
      return this.game.gameMap.tiles;
    },
  },
  data() {
    return {
      showTileIds: false,
      game: null,
    };
  },
  mounted() {
    this.game = new Game();
    this.game.addShape();
  },
  destroyed() {
    this.game.destroy();
  },
};
</script>

<style scoped lang="scss">

  .vue-tetris {
    margin: auto;
    overflow: hidden;
    position: relative;
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    background: url('~@/assets/bg.png');
    background-size: 128px;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: .05;
  }

  .tile-container {
    display: flex;
    flex-direction: column;
  }

  .tile-row {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
  }

  .tile {
    position: relative;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    line-height: 40px;
    box-sizing: border-box;

    &.active {
      background: red;
      z-index: 1;
    }
  }

  .theme-light {
    box-shadow: 0 0 23px #e2e2e2;
    border-radius: 5px;

    .tile {
      border-radius: 5px;
      border: none;

        &.active {
        background: linear-gradient(to right bottom, rgb(255, 255, 255) 50%, rgb(254, 94, 2) 50%);
        border: 1px solid black;
        .tile-part {
          position: absolute;
          top: 10%;
          left: 10%;
          width: 80%;
          height: 80%;
          display: block;
          background-color: #fe8602;
        }
      }
    }
  }

</style>
