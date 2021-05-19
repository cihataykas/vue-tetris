<template>
  <div
    v-if="show"
    class="bottom-bar animate__animated animate__bounceInUp"
  >
    <div
      class="animate__animated animate__tada"
      :key="score"
    >
      SCORE: {{ score }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['score', 'show'],
};
</script>

<style lang="scss">
.bottom-bar {
    width: 100;
    min-height: 50px;
    background: black;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    font-weight: bold;
    font-size: 25px;
  }
</style>
