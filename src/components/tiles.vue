<template>
  <div v-if="show" class="tile-container">
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
</template>

<script>
export default {
  props: ['show', 'tiles', 'showTileIds'],
};
</script>

<style lang="scss">
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
</style>
