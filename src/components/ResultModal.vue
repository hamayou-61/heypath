<template>
  <transition name="modal">
    <div class="modal" v-if="getInputStatus.inputed">
      <div class="modal__box">
        <div class="modalPath">
          <div class="modalPath__item">【Windows】{{ getResultPath.windowsPath }}</div>
          <div class="modalPath__item">【Mac】{{ getResultPath.macPath }}</div>
          <button class="modal__copyBtn" :class="{ copied: isCopied }" v-on:click="copyPath">
            {{ copyText }}
          </button>
        </div>
        <span class="modal__closeBtn" @click="close"></span>
      </div>
      <div class="modal__overlay" @click="close"></div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ResultModal",
  data: function() {
    return {
      copyText: "コピーする",
      isCopied: false,
    };
  },

  computed: {
    ...mapGetters(["getResultPath", "getInputStatus"]),
  },

  methods: {
    close: function() {
      this.$store.commit("mutateInputStatus", { inputed: false, error: false });
    },

    copyPath: function() {
      const copytext =
        "【Windows】" + this.getResultPath.windowsPath + " \n【Mac】" + this.getResultPath.macPath;
      const copyTextarea = document.createElement("textarea");
      copyTextarea.value = copytext;
      document.body.appendChild(copyTextarea);
      copyTextarea.select();
      document.execCommand("Copy");
      document.body.removeChild(copyTextarea);

      this.copyText = "コピーしました";
      this.isCopied = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &__box {
    display: block;
    background: #000;
    width: 90%;
    max-width: 1200px;
    position: fixed;
    top: 30%;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 100;
    box-shadow: 0 0 0 4px #fff;
    border-radius: 10px;
    padding: 25px;
    text-align: center;
  }

  &__overlay {
    transition: 0.8s;
    display: block;
    background-color: rgba(17, 17, 25, 0.85);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    cursor: pointer;
  }

  &__closeBtn {
    content: "";
    position: absolute;
    top: 23px;
    right: 44px;
    width: 28px;
    height: 28px;
    position: absolute;
    content: "";
    background: transparent;
    cursor: pointer;
    &::before {
      display: block;
      content: "";
      width: 3px;
      height: 3px;
      background: transparent;
      box-shadow: 3px 3px 0 rgb(255, 255, 255), 6px 3px 0 transparent, 9px 3px 0 transparent,
        12px 3px 0 transparent, 15px 3px 0 transparent, 18px 3px 0 transparent,
        21px 3px 0 rgb(255, 255, 255), 3px 6px 0 transparent, 6px 6px 0 rgb(255, 255, 255),
        9px 6px 0 transparent, 12px 6px 0 transparent, 15px 6px 0 transparent,
        18px 6px 0 rgb(255, 255, 255), 21px 6px 0 transparent, 3px 9px 0 transparent,
        6px 9px 0 transparent, 9px 9px 0 rgb(255, 255, 255), 12px 9px 0 transparent,
        15px 9px 0 rgb(255, 255, 255), 18px 9px 0 transparent, 21px 9px 0 transparent,
        3px 12px 0 transparent, 6px 12px 0 transparent, 9px 12px 0 transparent,
        12px 12px 0 rgb(255, 255, 255), 15px 12px 0 transparent, 18px 12px 0 transparent,
        21px 12px 0 transparent, 3px 15px 0 transparent, 6px 15px 0 transparent,
        9px 15px 0 rgb(255, 255, 255), 12px 15px 0 transparent, 15px 15px 0 rgb(255, 255, 255),
        18px 15px 0 transparent, 21px 15px 0 transparent, 3px 18px 0 transparent,
        6px 18px 0 rgb(255, 255, 255), 9px 18px 0 transparent, 12px 18px 0 transparent,
        15px 18px 0 transparent, 18px 18px 0 rgb(255, 255, 255), 21px 18px 0 transparent,
        3px 21px 0 rgb(255, 255, 255), 6px 21px 0 transparent, 9px 21px 0 transparent,
        12px 21px 0 transparent, 15px 21px 0 transparent, 18px 21px 0 transparent,
        21px 21px 0 rgb(255, 255, 255);
    }
  }

  &__copyBtn {
    background-color: transparent;
    outline: none;
    padding: 0;
    appearance: none;
    border-radius: 5px;
    border: 2px solid #fff;
    min-height: 20px;
    padding: 8px 8px;
    margin: 0 auto;
    font-size: 1.6rem;
    cursor: pointer;
    background: none;
    color: #fff;
    &.copied {
      border: 2px solid #333;
      color: #666;
    }
  }
}

.modalPath {
  color: #fff;
  font-size: 2rem;

  &__item {
    margin: 20px 0;
  }
}
</style>
