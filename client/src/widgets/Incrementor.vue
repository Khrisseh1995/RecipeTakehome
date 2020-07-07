<template>
  <div class="incrementor_container">
    <i
      @click="decrementValue"
      style="font-size: 25px"
      class="fa fa-minus cursor-pointer minus_icon"
      aria-hidden="true"
    ></i>
    <input :disabled="disabled" :value="value" class="incrementor_style" label="Click Me!" />
    <i
      @click="incrementValue"
      style="font-size: 25px"
      class="fa fa-plus cursor-pointer plus_icon"
      aria-hidden="true"
    ></i>
  </div>
</template>

<script>
export default {
  name: "Incrememtor",
  data() {
    return {
      value: this.incrementorValue
    };
  },
  methods: {
    incrementValue() {
      this.value += 1;
      this.$emit("valueChanged", { value: this.value });
    },
    decrementValue() {
      const changedValue = this.value - 1;

      if (changedValue < 1) {
        return;
      }

      this.value -= 1;
      this.$emit("valueChanged", { value: this.value });
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    incrementorValue: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.incrementor_container {
  display: grid;
  grid-template-columns: 1.5rem 4fr 1fr;
  width: 300px;    
}

.minus_icon {
  color: #2c3e50;
  margin-left: 100%;
  padding: 0.5rem;
  grid-row: 1;
  grid-column: 1/2;
  z-index: 2;
}

.plus_icon {
  color: #2c3e50;
  margin-right: 100%;
  padding-top: 0.5rem;
  grid-row: 1;
  grid-column: 3/5;
  z-index: 2;
}

.incrementor_style {
  grid-column: 2/6;
  grid-row: 1;
  color: #2c3e50;  
  background-color: #e6fafc;
  height: 40px;
  width: 250px;
  font-family: American Typewriter;
  font-size: 30px;
  border-radius: 20px;
  text-align: center;
}
</style>