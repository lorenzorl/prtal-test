<template>
  <div id="app">
    <section>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <Payments :startingTotal="total" :currency="currency" />
          </div>
        </div>
      </div>
    </section>
    <MaskView v-if="modalIsOpen" />
    <Modal v-if="modalIsOpen" />
  </div>
</template>

<script>
import Payments from './components/Payments.vue';
import MaskView from './components/MaskView.vue';
import Modal from './components/Modal.vue';

export default {
  name: 'App',
  components: {
    Payments,
    MaskView,
    Modal
  },
  computed: {
    modalIsOpen() {
      return this.$store.state.modal.isOpen
    }
  },
  data() {

    const TOTAL = 182;
    const CURRENCY = 'UF';

    return {
      total: TOTAL,
      currency: CURRENCY
    }
  }
}
</script>

<style lang="scss">

</style>
