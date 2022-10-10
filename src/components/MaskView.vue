<template>
  <div class="mask">

  </div>
</template>

<script>
export default {
  name: 'MaskModal'
}
</script>

<style lang="scss" scoped>

.mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(22, 22, 22, 0.5);
  z-index: 100;
}

</style>