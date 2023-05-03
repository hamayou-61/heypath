<template>
  <div class="advice" v-if="getInputStatus.error" @click="close">
    <span
      v-for="(text, index) in adviceText"
      :key="index"
      class="advice__txt"
      :style="{ animationDelay: index * 100 + 'ms' }"
      v-text="text"
    />
    <i class="advice__ico"></i>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AdviceBubble",

  computed: {
    ...mapGetters(["getResultPath", "getInputStatus"]),
  },

  data: function() {
    return {
      adviceText: "パス、なんか違うよ。",
    };
  },

  methods: {
    close: function() {
      this.$store.commit("mutateInputStatus", {
        inputed: false,
        error: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.advice {
  z-index: 9999;
  position: absolute;
  right: 0;
  bottom: 108px;
  width: 300px;
  height: auto;
  margin-right: -150px;
  background: #434169;
  border: 3px solid #fff;
  padding: 20px 20px 40px;
  cursor: pointer;
  animation: advice-in 0.3s;
  border-radius: 10px;

  &__txt {
    color: #fff;
    display: inline-block;
    min-width: 0.3em;
    font-size: 1.6rem;
    animation: text-in 0.3s cubic-bezier(0.22, 0.15, 0.25, 1.43) 0s backwards;
  }

  &__ico {
    left: 0;
    right: 0;
    bottom: 20px;
    margin: 0 auto;
    animation: flash2 1s infinite;
    width: 2px;
    height: 2px;
    box-shadow: 2px 2px 0 rgb(255, 255, 255), 4px 2px 0 rgb(255, 255, 255),
      6px 2px 0 rgb(255, 255, 255), 8px 2px 0 rgb(255, 255, 255), 10px 2px 0 rgb(255, 255, 255),
      12px 2px 0 rgb(255, 255, 255), 14px 2px 0 rgb(255, 255, 255), 16px 2px 0 rgb(255, 255, 255),
      18px 2px 0 rgb(255, 255, 255), 2px 4px 0 transparent, 4px 4px 0 rgb(255, 255, 255),
      6px 4px 0 rgb(255, 255, 255), 8px 4px 0 rgb(255, 255, 255), 10px 4px 0 rgb(255, 255, 255),
      12px 4px 0 rgb(255, 255, 255), 14px 4px 0 rgb(255, 255, 255), 16px 4px 0 rgb(255, 255, 255),
      6px 6px 0 rgb(255, 255, 255), 8px 6px 0 rgb(255, 255, 255), 10px 6px 0 rgb(255, 255, 255),
      12px 6px 0 rgb(255, 255, 255), 14px 6px 0 rgb(255, 255, 255), 16px 6px 0 transparent,
      18px 6px 0 transparent, 2px 8px 0 transparent, 4px 8px 0 transparent, 6px 8px 0 transparent,
      8px 8px 0 rgb(255, 255, 255), 10px 8px 0 rgb(255, 255, 255), 12px 8px 0 rgb(255, 255, 255),
      14px 8px 0 transparent, 16px 8px 0 transparent, 18px 8px 0 transparent, 2px 10px 0 transparent,
      4px 10px 0 transparent, 6px 10px 0 transparent, 8px 10px 0 transparent,
      10px 10px 0 rgb(255, 255, 255), 12px 10px 0 transparent, 14px 10px 0 transparent,
      16px 10px 0 transparent, 18px 10px 0 transparent, 2px 12px 0 transparent,
      4px 12px 0 transparent, 6px 12px 0 transparent, 8px 12px 0 transparent,
      10px 12px 0 transparent, 12px 12px 0 transparent, 14px 12px 0 transparent,
      16px 12px 0 transparent, 18px 12px 0 transparent, 2px 14px 0 transparent,
      4px 14px 0 transparent, 6px 14px 0 transparent, 8px 14px 0 transparent,
      10px 14px 0 transparent, 12px 14px 0 transparent, 14px 14px 0 transparent,
      16px 14px 0 transparent, 18px 14px 0 transparent, 2px 16px 0 transparent,
      4px 16px 0 transparent, 6px 16px 0 transparent, 8px 16px 0 transparent,
      10px 16px 0 transparent, 12px 16px 0 transparent, 14px 16px 0 transparent,
      16px 16px 0 transparent, 18px 16px 0 transparent, 2px 18px 0 transparent,
      4px 18px 0 transparent, 6px 18px 0 transparent, 8px 18px 0 transparent,
      10px 18px 0 transparent, 12px 18px 0 transparent, 14px 18px 0 transparent,
      16px 18px 0 transparent, 18px 18px 0 transparent;
    position: absolute;
    content: "";
    background: transparent;
    cursor: pointer;
  }
}
</style>
