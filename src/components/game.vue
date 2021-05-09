<template>
  <div v-if="game" class="tile-container">
    <div v-for="(tileRow, tileRowIndex) in game.gameMap.tiles" :key="tileRowIndex" class="tile-row">
     <div v-for="(tile, tileIndex) in tileRow" :key="tileIndex" :class="['tile', { active: tile }]">
        {{ tile }}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-plusplus */

import Game from '../models';

export default {
  data() {
    return {
      game: null,
    };
  },
  mounted() {
    this.game = new Game();
    this.game.addShape();
    // this.game.start();
  },
  destroyed() {
    this.game.destroy();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .tile-container {
    width: 500px;
    display: flex;
    flex-direction: column;
    margin: auto;
  }

  .tile-row {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
  }

  .tile {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    align-items: center;
    justify-content: center;
    line-height: 30px;

    &.active {
      background: red;
    }
  }

</style>
