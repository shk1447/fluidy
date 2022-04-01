<template>
  <div style="width: 100%; height: 100%">
    <v-app id="app-main">
      <!-- Header Area -->
      <menu-bar class="header-area"></menu-bar>

      <!-- Body Area -->
      <div class="body-area">
        <!-- Content Area -->
        <v-content>
          <golden-layout
            class="hscreen"
            :reorderEnabled="false"
            :hasHeaders="false"
            :showPopoutIcon="false"
            :showMaximiseIcon="false"
          >
            <gl-component :closable="false">
              <golden-layout
                class="hscreen"
                :hasHeaders="false"
                :showPopoutIcon="false"
                :showMaximiseIcon="false"
              >
                <gl-row :height="100">
                  <gl-col :width="20">
                    <gl-component :closable="false">
                      <golden-layout
                        class="hscreen"
                        :hasHeaders="false"
                        :reorderEnabled="false"
                        :showPopoutIcon="false"
                        :showMaximiseIcon="false"
                      >
                        <gl-row :height="100">
                          <gl-component :closable="false">
                            <tree-viewer />
                          </gl-component>
                        </gl-row>
                      </golden-layout>
                    </gl-component>
                  </gl-col>
                  <gl-col :width="80" :closable="false">
                    <gl-component :closable="false">
                      <golden-layout
                        v-if="currentContents.length > 0"
                        class="hscreen"
                        :hasHeaders="true"
                        :reorderEnabled="true"
                        :showPopoutIcon="false"
                        :showMaximiseIcon="false"
                        :closable="false"
                        @tabCreated="handleTabCreated"
                        @rowCreated="handleRowCreated"
                        @columnCreated="handleColumnCreated"
                      >
                        <gl-stack :closable="false" :reorderEnabled="false">
                          <gl-component
                            v-for="(data, idx) in currentContents"
                            :key="idx"
                            :tabId="data.content_guid"
                            :title="data.name"
                            @itemDestroyed="onTabClose(data.content_guid)"
                            @stateChanged="onStateChanged(data)"
                          >
                            <table-viewer
                              v-if="data.content_type === 'table'"
                              :content_guid="data.content_guid"
                              :content_options="data.content_options"
                              :content_name="data.content_name"
                            />
                            <flow-viewer
                              v-else-if="data.content_type === 'flow'"
                              :content_guid="data.content_guid"
                              :content_options="data.content_options"
                              :content_name="data.content_name"
                            ></flow-viewer>
                          </gl-component>
                        </gl-stack>
                      </golden-layout>
                      <information-viewer v-else>info</information-viewer>
                    </gl-component>
                  </gl-col>
                </gl-row>
              </golden-layout>
            </gl-component>
          </golden-layout>
        </v-content>
      </div>

      <!-- Footer Area -->
      <div class="footer-area">
        <div
          style="
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ message }}
        </div>
      </div>

      <!-- Dialog Area -->
      <v-dialog
        v-model="dialog.show"
        max-width="450px"
        :persistent="dialog.persistent"
      >
        <!-- <space-dialog></space-dialog> -->
        <component :is="dialog.name" :params="dialog.params" />
      </v-dialog>

      <create-table-dialog></create-table-dialog>
      <create-flow-dialog></create-flow-dialog>
      <invitation-dialog></invitation-dialog>
      <user-info-dialog></user-info-dialog>
      <create-space-dialog></create-space-dialog>
    </v-app>

    <!-- Window Popup -->
    <window-popup />
    <input type="file" id="importFile" style="display: none" />
  </div>
</template>

<script>
import DataViewer from "../components/contents/DataViewer.vue";
import TableViewer from "../components/contents/TableViewer.vue";
import InformationViewer from "../components/contents/InformationViewer.vue";
import MenuBar from "../components/layouts/MenuBar";
import mainEventBus from "../eventbus/mainEventBus";
import SpaceDialog from "../components/dialogs/SpaceDialog";
import CreateContentsDialog from "../components/dialogs/CreateContentsDialog";
import InvitationDialog from "../components/dialogs/InvitationDialog";
import CreateTableDialog from "../components/dialogs/CreateTableDialog";
import CreateFlowDialog from "../components/dialogs/CreateFlowDialog";
import UserInfoDialog from "../components/dialogs/UseInfoDialog";
import CreateSpaceDialog from "../components/dialogs/CreateSpaceDialog";
import { mapState } from "vuex";

export default {
  computed: mapState({
    spaceName: (state) => state.tree.name,
    currentContents: (state) => {
      console.log(state.currentContents);
      return state.currentContents.contents;
    },
  }),
  components: {
    "menu-bar": MenuBar,
    "create-contents-dialog": CreateContentsDialog,
    "table-viewer": TableViewer,
    "information-viewer": InformationViewer,
    "invitation-dialog": InvitationDialog,
    "create-table-dialog": CreateTableDialog,
    "create-flow-dialog": CreateFlowDialog,
    "user-info-dialog": UserInfoDialog,
    "create-space-dialog": CreateSpaceDialog,
  },
  data() {
    DataViewer;
    return {
      message: "",
      progress: {
        current: 0,
        total: 0,
      },
      panels: [],
      windows: [],
      dialog: {
        name: "space-dialog",
        show: true,
        persistent: true,
        params: {},
      },
      showSpaceDialog: true,
    };
  },
  watch: {},
  methods: {
    test(e) {
      console.log("뭔가 바뀜");
      console.log(e);
    },
    onDestroyed(e) {},
    onStateChanged(item) {
      console.log("changed!!!!!", item);
    },
    onTabClose(id) {
      // console.log(id);
      // console.log(this.currentContents)
      // setTimeout(()=>this.$store.dispatch("currentContents/delete", id))
    },
    notifications() {
      /*
        ex] 아래와 같이 사용
        [{path:'app.loading', callback : function() { }}]
        */
      return [];
    },
    handleContentChange(a, b, c) {
      //console.log(a,b,c);
    },
    handleTabCreated(tab) {
      //생성된 탭에 대하여 custom close button click event
      tab.closeElement.off("click").on("click", (e) => {
        this.$store.dispatch(
          "currentContents/delete",
          tab.contentItem.vueObject.tabId
        );
      });
    },
    handleRowCreated(row) {
      console.log(row);
    },
    handleColumnCreated(col) {
      console.log(col);
    },
    handleInitialised(i) {
      console.log("%%%%%%%%%%%%%%%%%%");
      console.log(i);
    },
    handleStackCreated(e) {
      if (stack.vueObject.tabId === "no-drag") {
        //   console.log("=================================")
        //   console.log(stack);
        //   const originalGetArea = stack._$getArea;
        //   stack._$getArea = function() {
        //   const area = originalGetArea.call( stack);
        //   console.log(stack._contentAreaDimensions)
        //   delete stack._contentAreaDimensions.header;
        //   return area;
        // };
        e._$highlightDropZone = function (x, y) {
          // override to not drop tabs
          var segment, area;
          for (segment in this._contentAreaDimensions) {
            area = this._contentAreaDimensions[segment].hoverArea;
            if (area.x1 < x && area.x2 > x && area.y1 < y && area.y2 > y) {
              if (segment !== "header") {
                this._resetHeaderDropZone();
                this._highlightBodyDropZone(segment);
              }
              return;
            }
          }
        };
      }
      // stack.header.controlsContainer.prepend('<li title="Setting"><span class="mdi mdi-cog"></span></li>');
      // stack.header.controlsContainer.prepend('<li title="New Tab"><span class="mdi mdi-plus-box-outline"></span></li>');
    },
  },
  beforeCreate() {},
  created() {
    mainEventBus.$on("CLOSE_SPACE_DIALOG", (data) => {
      this.dialog.show = false;
      this.dialog.name = null;
    });
    mainEventBus.$on("OPEN_SPACE_DIALOG", (data) => {
      this.dialog.name = data.name;
      this.dialog.show = data.show;
    });
  },
  mounted() {},
  updated() {},
  destroyed() {},
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}

#app-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.header-area {
  min-height: 32px;
  height: 40px;
  width: 100%;
  background: rgb(60, 60, 60);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.body-area {
  display: flex;
  height: calc(100% - 64px);
  z-index: 8;
}

#top_content {
  width: 100%;
  height: 50%;
}

#top_content.report {
  height: 100%;
  overflow: scroll;
}
.footer-area {
  min-height: 30px;
  margin-top: 0px;
  height: 31px;
  display: flex;
  width: 100%;
  padding: 0.5em;
  background: #222933;
}
.navigation-area {
  width: 55px;
  min-width: 55px;
  height: 100%;
  background: rgb(51, 51, 51);
  z-index: 10;
}
.panel-area {
  height: 100%;
  width: 20%;
  min-width: 300px;
  background: rgb(37, 37, 37);
  border-right: 1px solid rgb(51, 51, 51);
  overflow-y: auto;
  overflow-x: hidden;
}

.hscreen {
  width: 100%;
  height: 100%;
}
</style>
