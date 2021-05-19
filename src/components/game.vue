<template>
  <div class="vue-tetris theme-light">
    <tiles :show="isGame" :tiles="tiles" :show-tile-ids="showTileIds" />
    <game-menu
      :show="menu"
      :type="menuType"
      :score="score"
      @click-play-again="onClickPlay"
      @click-play="onClickPlay"
    />
    <bottom-bar
      :show="bottomBar"
      :score="score"
    />
    <div class="bg" />
  </div>
</template>

<script>

import Game from '../models';
import GameMenu from './game-menu.vue';
import BottomBar from './bottom-bar.vue';
import Tiles from './tiles.vue';

export default {
  components: {
    GameMenu,
    BottomBar,
    Tiles,
  },
  computed: {
    isGame() {
      return !!this.game;
    },
    score() {
      return this.game?.score;
    },
    isEnd() {
      return this.game?.gameMap?.isEnd;
    },
    tiles() {
      return this.game?.gameMap.tiles;
    },
  },
  data() {
    return {
      width: 16,
      height: 20,
      bottomBar: false,
      menu: true,
      menuType: 1,
      showTileIds: false,
      game: null,
    };
  },
  mounted() {
    this.createNewGame();
  },
  destroyed() {
    this.game.destroy();
  },
  methods: {
    onClickPlay() {
      this.menu = false;
      this.bottomBar = true;

      if (this.isEnd) {
        this.createNewGame();
      }

      this.game.start();
    },
    createNewGame() {
      this.game = new Game(this.width, this.height);
    },
  },
  watch: {
    isEnd(value) {
      if (value) {
        this.menuType = 2;
        this.menu = true;
      }
    },
  },
};
</script>

<style lang="scss">

  .vue-tetris {
    margin: auto;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 850px;
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

    .start-menu {
      background: rgba(255, 255, 255, .76);
    }
  }

</style>
