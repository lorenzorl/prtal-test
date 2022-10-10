<template>
  <div class="modal__wrapper">
    <div class="modal">
      <header class="modal__header">
        <h2 class="modal__title">Modificar estado</h2>
      </header>
      <main class="modal__main">
        <p>Selecciona el estado en que se encuentra el pago.</p>
        <CustomSelect
          label="Estado"
          :options="options"
          :defaultOption="options[0]"
          @change="(val) => status = val"
        />
        <InputDate
          v-if="isPaid"
          label="Fecha de pago"
          :date="date"
          @change="(val) => date = val"
        />
      </main>
      <footer class="modal__footer">
        <font-awesome-icon
          class="modal__icon"
          icon="fas fa-trash-alt"
          @click="removePayment"
        />
        <CustomButton
          @click.native="saveData"
          class="modal__button"
          title="Guardar"
        />
      </footer>
      <div class="modal__close" @click="close">
        <font-awesome-icon icon="fas fa-times" />
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from './Form/CustomSelect.vue';
import CustomButton from './CustomButton.vue';
import InputDate from './Form/InputDate.vue';

export default {
  name: "ModalWindow",
  components: { CustomSelect, CustomButton, InputDate },
  data() {
    const options = [
      {
        name: 'Pendiente',
        value: 'pending'
      },
      {
        name: 'Pagado',
        value: 'paid'
      }
    ]

    return {
      options,
      status: null,
      date: null
    }
  },
  computed: {
    payment() {
      return this.$store.state.modal.paymentData
    },
    isPaid() {
      return this.status === 'paid'
    }
  },
  methods: {
    close() {
      this.$store.dispatch("close");
    },
    saveData() {
      this.$store.dispatch('editPaymentDate', {
        date: this.date,
        id: this.payment.id
      });
      this.$store.dispatch('editPaymentStatus', {
        status: this.status,
        id: this.payment.id
      });
      this.$store.dispatch('updateAllPayments')
      this.$store.dispatch('calculateTotal')
      this.close()
    },
    removePayment() {
      if (this.payment.status === 'paid') return
      this.$store.dispatch('removePayment', this.payment.id)
      this.close()
    }
  },
  created() {
    this.status = this.options.find(option => option.value === this.payment.status)
    this.date = this.payment.paymentDate
  }
}
</script>

<style lang="scss" scoped>

.modal {
  position: relative;
  width: 90%;
  max-width: 700px;
  max-height: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 24px;

  &__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(22, 22, 22, 0.5);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    margin: 0;
    margin-bottom: 16px;
    font-weight: 600;
    font-size: 23px;
    line-height: 28px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  &__main {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
    
    & > p {
      margin-bottom: 16px;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #0F172A;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__icon {
    cursor: pointer;
    color: #CBD5E1;

    &:hover {
      color: red;
    }
  }

  &__button {
    margin-left: 25px;
  }

  &__close {
    width: 30px;
    height: 30px;
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: red;
    border-radius: 100%;
    color: #fff;
    padding: 5px 10px 5px;
    cursor: pointer;
  }
}

</style>