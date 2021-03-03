<template>
  <router-view />
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    
  },
  mounted() {
    
  },
  destroyed() {
    
  }
}
</script>

<style lang="css">
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden !important;
}

body {
  font-family: Poppins-Regular, sans-serif;
  margin: 0px;
  font-size: 12px;
}

.v-list {
  padding:0px !important;
}

.window {
  z-index: 9999 !important;
}

::-webkit-scrollbar {
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
}
</style>
