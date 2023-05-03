<template>
  <div>
    <div class="pathForm">
      <input
        type="text"
        class="pathForm__input"
        name="txtb"
        wrap="hard"
        value=""
        @keydown.enter="changePath"
        v-model="inputPath"
        @input="activeButton"
        placeholder="変換したいNASのMacパスかWindowsパスを入力して下さい。"
        autocomplete="off"
      />
      <div class="pathForm__blockBac"></div>
    </div>

    <div class="select">
      <p class="select__convert" :class="{ active: isActive }">
        <input
          type="button"
          value="変換"
          id="convert"
          v-on:click="changePath"
          :disabled="!isActive"
        />
        <label for="convert">
          <svg
            version="1.1"
            class="convertPath"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="168px"
            height="45px"
            viewBox="0 0 168.2 45"
          >
            <g>
              <path
                class="convertPath__txt"
                d="M1,10.9V7.3h18V0.1h3.6v7.2h18v3.6H29.8v10.8h-3.6V10.9H19v10.8h-3.6v3.6h18v7.2h-3.6v3.6h-3.6v3.6h14.4v3.6H26.2v-3.6H15.4v-7.2H19v3.6h7.2v-3.6h3.6v-3.6h-18v-7.2h3.6V10.9H1z M1,21.7v-3.6h3.6v3.6H1z M1,43.3v-3.6h14.4v3.6H1z M4.6,18.1v-3.6h3.6v3.6H4.6z M4.6,32.5v-3.6h7.2v3.6H4.6z M33.4,18.1v-3.6H37v3.6h3.6v3.6H37v-3.6H33.4z"
              />
              <path
                class="convertPath__txt"
                d="M49.4,43.3v-3.6H53v-7.2h-3.6v-3.6H53V14.5h-3.6v-3.6H53V3.7h3.6v7.2h7.2V7.3h3.6v3.6h10.8V7.3H67.4V3.7h18v3.6h-3.6v3.6H89v21.6h-7.2v3.6h3.6v3.6H89v3.6h-3.6v-3.6h-3.6v-3.6h-3.6v-3.6h-3.6v3.6H71v3.6h-3.6v-3.6H71v-3.6H60.2v-3.6h3.6V14.5h-7.2v10.8h3.6v3.6h-3.6v14.4H49.4z M60.2,43.3v-3.6h7.2v3.6H60.2z M67.4,28.9h7.2v-3.6h3.6V14.5h-3.6v7.2H71v3.6h-3.6V28.9z M71,21.7v-7.2h-3.6v7.2H71z M78.2,28.9h7.2v-3.6h-7.2V28.9z M85.4,21.7v-7.2h-3.6v7.2H85.4z"
              />
              <path
                class="convertPath__txt"
                d="M93.5,14.5v-3.6h21.6V3.7h3.6v7.2h14.4v3.6h-14.4v21.6h-3.6v3.6h-3.6v-3.6h3.6v-3.6h-7.2v-3.6h7.2v-7.2h-7.2v7.2h-3.6v-7.2h3.6v-3.6h7.2v-3.6H93.5z M104.3,43.3v-3.6h7.2v3.6H104.3z"
              />
              <path
                class="convertPath__txt"
                d="M138.8,28.9v-3.6h3.6v3.6H138.8z M142.3,10.9V7.3h21.6v3.6h-3.6v3.6h-3.6v3.6h3.6v3.6h3.6v3.6h3.6v10.8h-3.6v3.6h-3.6v3.6h-14.4v-3.6h7.2v-7.2h3.6v7.2h3.6v-3.6h3.6V25.3h-3.6v-3.6h-10.8v3.6h-7.2v-3.6h7.2v-3.6h3.6v-3.6h3.6v-3.6C156.7,10.9,142.3,10.9,142.3,10.9z M145.9,39.7h-3.6v-7.2h3.6V39.7z M153.1,32.5h-7.2v-3.6h7.2V32.5z"
              />
            </g>
          </svg>
        </label>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConversionForm",

  data: function() {
    return {
      inputPath: "",
      isActive: false,
      resultPath: {},
    };
  },

  methods: {
    changePath: function() {
      const windowsPathRegex = /^([a-zA-Z]:\\)|(\\\\)/;
      let isError = false;
      let isInputed = true;

      function windowsToMacPath(windowsPath) {
        const protocol = "smb:";
        const macPath = protocol + windowsPath.replace(/\\/g, "/").replace(/^\\\\/, "//");
        return macPath;
      }

      function macToWindowsPath(macPath) {
        const protocol = "\\\\";
        const windowsPath = protocol + macPath.replace(/^smb:\/\//, "").replace(/\//g, "\\");
        return windowsPath;
      }

      if (windowsPathRegex.test(this.inputPath)) {
        // windowsの場合
        const macPath = windowsToMacPath(this.inputPath);
        this.resultPath = {
          windowsPath: this.inputPath,
          macPath: macPath,
        };
      } else if (this.inputPath.startsWith("smb://")) {
        // macの場合
        const windowsPath = macToWindowsPath(this.inputPath);
        this.resultPath = {
          windowsPath: windowsPath,
          macPath: this.inputPath,
        };
      } else {
        // それ以外の場合
        isError = true;
        isInputed = false;
      }

      this.$store.commit("mutateResultPath", this.resultPath);
      this.$store.commit("mutateInputStatus", {
        inputed: isInputed,
        error: isError,
      });

      return false;
    },

    activeButton: function() {
      this.inputPath ? (this.isActive = true) : (this.isActive = false);
    },
  },
};
</script>

<style lang="scss" scoped>
.pathForm {
  animation: 1s fade 1s forwards;
  opacity: 0;
  display: block;
  position: fixed;
  width: 90%;
  max-width: 1700px;
  left: 0;
  right: 0;
  top: 48%;
  margin: 0 auto;
  z-index: 12;

  &__input {
    position: relative;
    width: 98%;
    height: 70px;
    margin: 13px 1%;
    background: rgba(0, 0, 0, 1);
    line-height: 50px;
    font-size: 2.2rem;
    color: #fff;
    text-align: center;
    z-index: 99;
    padding: 0;
    border: none;
    border-radius: 0;
    outline: none;

    &:focus::-webkit-input-placeholder {
      color: transparent;
    }
  }

  &__blockBac {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background-image: url("data:image/svg+xml;charset=utf8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20id%3D%22%E3%83%AC%E3%82%A4%E3%83%A4%E3%83%BC_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%220px%22%20y%3D%220px%22%20width%3D%22126.6px%22%20height%3D%22122.8px%22%20viewBox%3D%220%200%20126.6%20122.8%22%20style%3D%22enable-background%3Anew%200%200%20126.6%20122.8%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%20.st0%7Bfill%3A%238E593F%3B%7D%20.st1%7Bfill%3A%23BE8F5E%3B%7D%20.st2%7Bfill%3A%2356362A%3B%7D%3C%2Fstyle%3E%3Crect%20x%3D%224.9%22%20y%3D%228.2%22%20class%3D%22st0%22%20width%3D%22127%22%20height%3D%22113%22%2F%3E%3Cpolygon%20class%3D%22st1%22%20points%3D%22136%2C8.3%20136%2C0%203.7%2C0%203.7%2C8.3%2033.4%2C8.3%2033.4%2C42%209%2C42%209%2C51%2031.4%2C51%2031.4%2C61.2%2031%2C61.2%2031%2C73.2%2040%2C73.2%2040%2C82.2%2049%2C82.2%2049%2C91.2%2058%2C91.2%2058%2C114%2067%2C114%2067%2C109%2091.2%2C109%2091.2%2C100%20100.2%2C100%20100.2%2C91%20114.1%2C91%20114.1%2C82%20127%2C82%20127%2C73%20114%2C73%20114%2C82%20100%2C82%20100%2C91%2091%2C91%2091%2C100%2067%2C100%2067%2C91%2058%2C91%2058%2C82%2049%2C82%2049%2C73%2040%2C73%2040%2C61%2031%2C61%2034.8%2C8.3%20%22%2F%3E%3Cpolygon%20class%3D%22st2%22%20points%3D%22127%2C0%20127%2C64%20114%2C64%20114%2C73%20100%2C73%20100%2C82%2091%2C82%2091%2C91%20100.1%2C91%20100.1%2C82%20114.1%2C82%20114.1%2C73%20127%2C73%20127%2C114%2076%2C114%2076%2C100%2091%2C100%2091%2C91%2067%2C91%2067%2C114%209%2C114%209%2C42%2031%2C42%2031%2C61%2039.6%2C61%2039.6%2C73%2048.9%2C73%2048.9%2C82%2057.9%2C82%2057.9%2C91%2067%2C91%2067%2C82%2058%2C82%2058%2C73%2049%2C73%2049%2C61%2040%2C61%2040%2C-0.6%2032.5%2C-0.6%2032.5%2C33%209%2C33%209%2C0%200%2C0%200%2C64%200%2C122.9%20136.2%2C122.9%20136.2%2C0%22%2F%3E%3C%2Fsvg%3E");
    background-size: auto 100%;
    background-position: left top;
  }
}
#convert {
  opacity: 0;
  display: none;
}

.select {
  display: block;
  position: fixed;
  width: 280px;
  left: 0;
  right: 0;
  top: 63%;
  margin: 0 auto;
  padding-left: 0;
  z-index: 12;
  background: #000;
  box-shadow: 0 0 0 4px #fff;
  border-radius: 10px;
  animation: 1s fade 1.2s forwards;
  opacity: 0;

  &__convert {
    position: relative;
    width: 168px;
    height: 44px;
    text-align: center;
    margin: 22px auto;

    &.active {
      label {
        opacity: 1;
      }
      svg {
        cursor: pointer;
      }
      &:hover:before {
        display: block;
        position: absolute;
        left: -30px;
        top: 50%;
        margin-top: -7px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 9px 0 9px 12.6px;
        border-color: transparent transparent transparent #fff;
        content: "";
      }
      &:hover {
        animation: flash2 1s infinite;
      }
    }

    svg {
      cursor: auto;
    }
    label {
      opacity: 0.5;
      width: 168px;
      margin: auto;
    }
  }
}
.convertPath {
  &__txt {
    fill: #fff;
  }
}
</style>
