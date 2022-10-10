<template>
  <div class="add-payment-button">
    <font-awesome-icon class="icon" icon="fas fa-plus" />
  </div>
</template>

<script>

export default {
  name: 'AddPaymentButton'
}

</script>

<style lang="scss" scoped>

$size: 36px;

.add-payment-button {

  width: $size;
  height: $size;
  border-radius: 100%;
  background-color: #E2E8F0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > .icon {
    color: #1D4ED8;
  }

}

</style>