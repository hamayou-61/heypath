<template>
  <div class="boar">
    <div class="boar__wrap">
      <AdviceBubble />
      <p class="boar__img" :class="{ 'is-error': getInputStatus.error }"></p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AdviceBubble from "@/components/AdviceBubble.vue";
export default {
  name: "TheBoar",

  components: {
    AdviceBubble,
  },

  computed: {
    ...mapGetters(["getInputStatus"]),

    isError() {
      return this.getInputStatus.error;
    },
  },
};
</script>

<style lang="scss" scoped>
.boar {
  position: fixed;
  width: 100%;
  height: 16%;
  bottom: 0;
  left: 0;
  z-index: 12;
  &__wrap {
    width: 80px;
    display: block;
    position: absolute;
    right: -40%;
    left: 0;
    margin: 0 auto;
    top: -70px;
    z-index: 999;
  }
  &__img {
    background: url("../assets/img/img-ushi.gif");
    width: 110px;
    height: 80px;
    background-size: auto 100% !important;
    &.is-error {
      animation: 0.2s jump;
    }
  }
}
</style>
