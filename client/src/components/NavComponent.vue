<template>
<div class="nav-bar-container">
  <div v-for="(item, idx) in items" :key="idx">
    <div v-if="item.separator" class="nav-bar-separator"></div>
    <div v-else :class="'nav-menu-item ' + (item.key === selected_item.key ? 'selected' : '')" @click="onClickItem(item)" :style="(item.background ? 'background:' +item.background: '') + ';cursor:pointer;'">
      <v-tooltip v-if="!expand" right>
        <template v-slot:activator="{ on }">
          <v-hover v-slot:default="{ hover }">
            <div class="nav-menu-item" style="justify-content:center;">
              <v-img v-if="!item.icon" :src="item.image" style="cursor:pointer;margin:0.5em" width="10em" contain height="100%"></v-img>
              <v-icon v-else v-on="on" :color="hover || item.key === selected_item.key ? '#e5e5e5' : '#e1e4e5'">
                {{item.icon}}
              </v-icon>
            </div>
          </v-hover>
        </template>
        <span>{{item.label}}</span>
      </v-tooltip>

      <div v-else class="nav-expand-container">
        <v-hover v-slot:default="{ hover }">
          <div class="nav-menu-item">
            <v-img v-if="!item.icon" :src="'./resource/static/images/logo.png'" style="cursor:pointer;margin:0.5em" width="10em" contain height="100%"></v-img>
            <v-icon v-else :color="hover || item.key === selected_item.key ? '#e5e5e5' : '#e1e4e5'">{{item.icon}}</v-icon>
            <label style="margin-left:1em;cursor:inherit">{{item.label}}</label>
          </div>
        </v-hover>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:['expand','onAction'],
  data() {
    return {
      selected_item: {
        key: 'flow'
      },
      items: []
    }
  },
  watch: {
    expand(new_val) {
      console.log(new_val);
    }
  },
  methods: {
    notifications: function () {
      return [{
        path: 'app.main',
        callback: this.onChangeItem
      }, {
        path: 'app.expand',
        callback: this.onExpand
      }]
    },
    onExpand(val) {
      this.expand = val;
    },
    onClickHome() {

    },
    onClickItem: function (item) {
      this.selected_item = item;
      this.$emit('onAction', item);
    }
  },
  created() {
    console.log('created')
    this.items = [{
      key: 'projects',
      label: 'Projects',
      compName: 'project-comp',
      icon: 'mdi-view-dashboard-variant'
    }, {
      separator: true
    }, {
      key: 'flow',
      label: 'Flow Chart',
      compName: 'flow-editor',
      icon: 'mdi-merge'
    }, {
      separator: true
    }, {
      key: 'table',
      label: 'Table',
      compName: 'table-editor',
      icon: 'mdi-table-large'
    }, {
      separator: true
    }, {
      key: 'setting',
      label: 'Setting',
      compName: 'setting-comp',
      icon: 'mdi-cog'
    }]
  },
  mounted() {
    console.log('mounted')
  },
  destroyed() {
    console.log('destroyed')
  }
}
</script>

<style scoped>
.nav-bar-container {
  width: 100%;
  box-shadow: 0 0 20px rgba(34, 36, 38, .15);
  z-index: 1;
}

.nav-bar-separator {
  border-top: 1px solid rgba(34, 36, 38, .15);
  border-bottom: 1px solid rgba(255, 255, 255, .1);
  cursor: none;
}

.nav-expand-container {
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 1em;
  cursor: pointer;
}

.nav-menu-item {
  height: 3.9em;
  width: 100%;
  display: flex;
  align-items: center;
  color: #e5e5e5
}

.nav-menu-item.separator {
  border-bottom: 1px solid #e5e5e5;
}

.nav-menu-item.selected {
  border-left: 4px solid #e5e5e5;
}
</style>
