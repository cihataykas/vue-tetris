<template>
  <div
    v-if="show"
    ref="menu"
    class="start-menu animate__animated animate__bounceInDown"
  >
    <button
      v-if="type === 1"
      class="button"
      @click="$emit('click-play')"
    >
      Click to Play!
    </button>
    <div v-if="type === 2">
      <div :style="{ fontSize: '28px', fontWeight: 'bold', color: 'white', background: 'black', padding: '10px' }">
        Your Score is {{ score }}
      </div>
      <button
        class="button"
        @click="$emit('click-play-again')"
      >
        Play Again!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show', 'type', 'score'],
  methods: {
    onClickPlay() {
      this.$emit('menu-click');
    },
  },
};
</script>

<style lang="scss">
.start-menu {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.button {
  font-size: 50px;
  padding: 10px;
  background: transparent;
  font-weight: bold;
  color: black;
  cursor: pointer;
  border: none;
  outline: none;
}
</style>
