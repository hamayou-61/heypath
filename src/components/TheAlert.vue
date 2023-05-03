<template>
  <transition name="alert">
    <div class="alert">
      <div class="alert__box">
        <p class="alert__txt">{{ errorMessage }}</p>
        <p class="alert__boar boar-img"></p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "TheAlert",
  props: {
    message: {
      type: String,
      default: "",
      required: true,
    },
  },
  computed: {
    errorMessage() {
      return this.message;
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #000;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;

  &__txt {
    color: #fff;
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 20px;
  }

  &__boar {
    margin: auto;
  }
}
.boar-img {
  background: url("../assets/img/img-ushi.gif");
  width: 110px;
  height: 80px;
  background-size: auto 100% !important;
}
</style>
