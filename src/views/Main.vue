<template>
  <div>
    <TheAlert v-if="alertMessage" :message="alertMessage" />
    <TheTitle />
    <ConversionForm />
    <ResultModal />
    <TheBoar />
    <TheBackground />
  </div>
</template>

<script>
import TheTitle from "../components/TheTitle.vue";
import ConversionForm from "../components/ConversionForm.vue";
import ResultModal from "../components/ResultModal.vue";
import TheAlert from "../components/TheAlert.vue";
import TheBoar from "../components/TheBoar.vue";
import TheBackground from "../components/TheBackground.vue";

export default {
  name: "Main",
  components: {
    TheTitle,
    ConversionForm,
    ResultModal,
    TheAlert,
    TheBoar,
    TheBackground,
  },

  data: function() {
    return {
      alertMessage: null,
    };
  },

  created: function() {
    this.checkWindowWidth();
  },

  methods: {
    checkWindowWidth: function() {
      const windowsWidth = window.outerWidth;
      if (windowsWidth < 600) {
        this.alertMessage = "パソコンで見てね";
      } else {
        this.alertMessage = null;
      }
    },
  },

  mounted: function() {
    window.addEventListener("resize", this.checkWindowWidth);
  },
};
</script>

<style></style>
