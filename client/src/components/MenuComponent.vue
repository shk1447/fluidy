<template>
<div class="menu-bar-container">
  <!-- <v-btn @click="onExpandNav" class="menu-bar-item" icon>
    <v-icon>mdi-menu</v-icon>
  </v-btn>
  <v-btn @click="onFullScreen" class="menu-bar-item" icon>
    <v-icon>mdi-arrow-expand-all</v-icon>
  </v-btn> -->
  <!-- <v-img src="./static/images/logo.png" style="cursor:pointer;margin:0.5em" width="10em" contain height="100%"></v-img> -->
  <div style="height:100%; margin-left:1em; width:125px;background: url('./static/images/logo.png') no-repeat 50% 50%;background-size:contain;"></div>
  <v-spacer />
  <v-btn class="menu-bar-item" icon @click="onToggleStatus">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">mdi-information-outline</v-icon>
      </template>
      <span>User Profile</span>
    </v-tooltip>
  </v-btn>
  <v-btn class="menu-bar-item" icon @click="onLogout">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">mdi-logout</v-icon>
      </template>
      <span>Logout</span>
    </v-tooltip>
  </v-btn>
</div>
</template>

<script>
export default {
  props: ['onAction'],
  data() {
    return {
      expand: true,
      action_items: []
    }
  },
  watch: {},
  methods: {
    onToggleStatus() {
      
    },
    onLogout() {
      var me = this;
      this.$common.api.app.logout().then(function() {
        me.$router.push("/");
      })
    },
    onFullScreen() {
      if (document.webkitIsFullScreen) {
        document.webkitCancelFullScreen();
      } else {
        document.documentElement.webkitRequestFullScreen();
      }
    },
    onExpandNav() {
      this.$emit('onAction', {
        name: 'expandNav'
      });
      this.expand = !this.expand;
    }
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  },
  destroyed() {
    console.log('destroyed')
  }
}
</script>

<style>
.menu-bar-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.menu-bar-item {
  margin-left: 1em
}

.menu-item-wrapper {
  vertical-align: middle !important;
  padding: 0em 1em 0em 1em !important;
}

.hidden-menu {
  width: 0px;
  visibility: collapse;
  opacity: 0;
  transition-property: opacity, width;
  transition-duration: 1s, 2s;
}

.hidden-menu.show {
  opacity: 1;
  visibility: visible;
  width: auto;
}

.logo-container {
  
}
</style>
