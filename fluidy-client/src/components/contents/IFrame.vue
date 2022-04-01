<template>
  <div style="width: 100%; height: 100%" ref="test">
    <v-system-bar window height="24" color="rgb(122,122,122)">
      <v-icon small>mdi-information-outline</v-icon>
      <span>you can load specific datum.</span>
      <v-spacer></v-spacer>
      <!-- <v-icon
        color="red"
        small
        @click="
          () => {
            this.meta.loadUrl = '';
            this.iframe_height = 0;
          }
        "
        >mdi-close-thick</v-icon
      > -->
    </v-system-bar>
    <div
      style="height: calc(100% - 24px); width: 100%; overflow: auto;display:flex;justify-content:center;align-items;"
    >
      <iframe
        v-if="meta.loadUrl != ''"
        @load="loadedData"
        :src="meta.loadUrl"
        frameborder="0"
        marginwidth="0"
        marginheight="0"
        scrolling="auto"
        style="width: 100%; height: 100%"
        ref="iframe"
      >
      </iframe>
    </div>
  </div>
</template>
<script>
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";

export default {
  props: ["meta"],
  data() {
    return {
      iframe_height: 0,
    };
  },
  methods: {
    loadedData(e) {
      e.target.contentDocument.documentElement.style.color =
        "rgba(155,155,155,1)";
      var css = document.createElement("style");
      css.type = "text/css";
      var styles = `::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
      }

      ::-webkit-scrollbar-corner {
      }

      ::-webkit-scrollbar-thumb {
        transition: 0.3s ease all;
        border-color: transparent;
        background-color: rgba(151, 151, 151, 0.12);
        z-index: 40;
      }`;
      if (css.styleSheet) css.styleSheet.cssText = styles;
      else css.appendChild(document.createTextNode(styles));
      e.target.contentDocument.documentElement.appendChild(css);
      this.iframe_height =
        e.target.contentDocument.documentElement.scrollHeight == 0
          ? e.target.parentElement.scrollHeight
          : e.target.contentDocument.documentElement.scrollHeight;
    },
    resizeHandler() {
      console.log(this.$refs.test.clientHeight);
      // this.iframe_height =
      //   this.$ref.iframe.contentDocument.documentElement.scrollHeight == 0
      //     ? this.$ref.iframe.parentElement.scrollHeight
      //     : this.$ref.iframe.contentDocument.documentElement.scrollHeight;
    },
  },
  created() {},
  mounted() {
    this._resizeHandler = debounce(this.resizeHandler, 100, {
      leading: true,
    });

    addListener(this.$refs.test, this._resizeHandler);
  },
};
</script>
<style scoped>
</style>