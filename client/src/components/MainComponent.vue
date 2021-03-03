<template>
<v-app id="app-main">
  <div class="content-wrapper">
    <div @mouseleave="offExpand" class="layout" style="height:100%;background:rgba(66, 66, 66, 1);z-index:1;">
      <navigation-bar @onAction="onNavAction" :expand.sync="expand"></navigation-bar>
    </div>
    <v-main class="main-content" ref="main_content">
      <div class="menu-bar-wrapper">
        <menu-bar @onAction="onMenuAction"></menu-bar>
      </div>
      <v-progress-linear :active="false" indeterminate bottom></v-progress-linear>
      <div id="content_ref" style="height:calc(100% - 4em);overflow:auto;">
        <div style="width: 100%; height: 100%; position: absolute" ref="content_area">
          <div class="side_container" ref="side_container">
            <component @onAction="onContentAction" :is="main.compName"></component>
          </div>
          <div id="sidebar" ref="sidebar">
            <v-tabs v-model="tab" height="32px" background-color="#f1f4f5">
              <v-tabs-slider color="white"></v-tabs-slider>
              <v-tab v-for="item in tabs" :key="item.name" style="
                  font-size: 1em;
                  background: white;
                  border-top: 1px solid #e2e2e2;
                  border-right: 1px solid #e2e2e2;
                  border-bottom: 2px solid #e2e2e2;
                ">
                {{ item.name }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" style="width:100%;height:calc(100% - 40px);overflow:none;">
              <v-tab-item v-for="item in tabs" :key="item.name" style="height: 100%; width: 100%">
                <component :is="item.compName"></component>
              </v-tab-item>
            </v-tabs-items>
          </div>
          <div id="sidebar-separator" class="ui-draggable" ref="sidebar_sep"></div>
        </div>
      </div>
    </v-main>
  </div>
</v-app>
</template>

<script>
import NavigationBar from './NavComponent.vue';
import MenuBar from './MenuComponent.vue';
import FlowEditor from './content/FlowComponent.vue';
import TableEditor from './content/TableComponent.vue';
import ProjectComp from './content/ProjectComponent.vue';
import SettingComp from './content/SettingComponent.vue';

import TreePanel from './panel/TreeComponent.vue';
import EditPanel from './panel/EditComponent.vue';
import CommentPanel from './panel/CommentComponent.vue';

export default {
  components: {
    'navigation-bar': NavigationBar,
    'menu-bar': MenuBar,
    'flow-editor': FlowEditor,
    'table-editor': TableEditor,
    'project-comp': ProjectComp,
    'setting-comp': SettingComp,
    'tree-panel': TreePanel,
    'edit-panel': EditPanel,
    'comment-panel': CommentPanel
  },
  methods: {
    onMenuAction(d) {
      this.$refs.main_content.$el.classList.contains("expand") ? this.$refs.main_content.$el.classList.remove('expand') : this.$refs.main_content.$el.classList.add('expand');
      this.expand = !this.expand;
    },
    onNavAction(item) {
      this.main = item;
    },
    onExpand() {
      if (!this.$refs.main_content.$el.classList.contains("expand")) {
        this.$refs.main_content.$el.classList.add('expand')
        this.expand = true;
      }
    },
    offExpand() {
      if (this.$refs.main_content.$el.classList.contains("expand")) {
        this.$refs.main_content.$el.classList.remove('expand')
        this.expand = false;
      }
    },
    onContentAction() {
      this.$refs.sidebar.classList.contains("expand") ?
        this.$refs.sidebar.classList.remove("expand") :
        this.$refs.sidebar.classList.add("expand");
      this.$refs.sidebar_sep.classList.contains("expand") ?
        this.$refs.sidebar_sep.classList.remove("expand") :
        this.$refs.sidebar_sep.classList.add("expand");
      this.$refs.side_container.classList.contains("expand") ?
        this.$refs.side_container.classList.remove("expand") :
        this.$refs.side_container.classList.add("expand");
    }
  },
  watch:{
    "mrx_store.app.edge_list": {
      deep:true,
      handler(val) {
        this.$common.api.flow.setEdges({content:JSON.stringify(val)}).then(function(res) {
          console.log(res);
        })
      }
    },
    "mrx_store.app.node_list": {
      deep:true,
      handler(val) {
        this.$common.api.flow.setNodes({content:JSON.stringify(val)}).then(function(res) {
          console.log(res);
        })
      }
    }
  },
  data() {
    return {
      tab: 0,
      tabs: [{
          name: "Tree",
          compName: "tree-panel",
        },
        {
          name: "Edit",
          compName: "edit-panel",
        },
        {
          name: "Comment",
          compName: "comment-panel",
        },
      ],
      main: {
        compName: 'flow-editor'
      },
      expand: false
    }
  },
  beforeCreate() {
    var me = this;
    this.$common.api.app.check().then(function (res) {
      me.$message({
        type: 'success',
        message: 'Welcome to Fluidy!'
      })
      
      me.$common.api.flow.getNodes().then(function(res) {
        me.mrx_store.app.node_list = res;
        me.mrx_store.app.selected_proc = res[0];
        console.log('node')
      })
      me.$common.api.flow.getEdges().then(function(res) {
        me.mrx_store.app.edge_list = res;
        console.log('edge')
      })
    }).catch(function (err) {
      me.$router.push("/");
    })
  },
  created() {

  },
  mounted() {
    var me = this;
    var sidebar = {};
    $('#sidebar-separator').draggable({
      axis: "x",
      start: function (event, ui) {
        sidebar.closing = false;
        sidebar.start = ui.position.left;
        sidebar.width = me.$refs.content_area.clientWidth - ui.position.left - 12;
      },
      drag: function (event, ui) {
        var sidebar_width = me.$refs.content_area.clientWidth - ui.position.left - 12;

        me.$refs.sidebar.style.width = sidebar_width + 'px';
        me.$refs.sidebar.style.border = 'none';

        if (sidebar_width < 200) {
          sidebar.closing = true;
        } else {
          sidebar.closing = false;
        }
        if (sidebar.closing) {
          me.$refs.sidebar.style.border = '1px dashed rgba(80, 80, 80, 0.4)';
        }

      },
      stop: function (event, ui) {
        if (sidebar.closing) {
          me.$refs.sidebar.style.width = '0px';
          me.$refs.sidebar.style.border = 'none';
        }
        $("#sidebar-separator").css("left", "auto");
        $("#sidebar-separator").css("right", ($("#sidebar").width()) + "px");
      }
    });
  },
  destroyed() {

  }
}
</script>

<style>
#app-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.menu-bar-wrapper {
  display: flex;
  min-height: 30px;
  height: 4em;
  width: 100%;
  background: rgb(255, 255, 255);
}

.content-wrapper {
  display: flex;
  height: 100%;
}

.main-content {
  width: calc(100%-6em);
  height: 100%;
  background: #f1f4f5;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  padding: 0em 0em !important;
  transition: width 1s;
}

.main-content.expand {
  width: calc(100% - 20em);
}

#sidebar-separator {
  position: absolute;
  top: 0px !important;
  left: auto;
  right: 400px;
  bottom: 0px;
  width: 1em;
  background: url("../static/images/grip.png") no-repeat 50% 50%;
  cursor: ew-resize;
  z-index: 99999;
}

#sidebar-separator.expand {
  right: 300px;
}

#sidebar {
  position: absolute;
  top: 0px !important;
  left: auto;
  right: 0px;
  bottom: 0px;
  width: 0px;
  background: #ffffff;
  z-index: 11;
  box-sizing: border-box;
  width: 400px;
  box-shadow: 0px 10px 10px 0px rgba(34, 36, 38, 0.15);
}

.side_container {
  height: 100%;
  width: 100%;
  background: white;
  transition: 0.3s ease all;
}

</style>
