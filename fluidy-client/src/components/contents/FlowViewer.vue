<template>
  <golden-layout
    class="hscreen"
    :hasHeaders="false"
    :showPopoutIcon="false"
    :showMaximiseIcon="false"
  >
    <gl-col :width="100">
      <gl-row :height="50">
        <gl-stack :closable="false" @itemCreated="test">
          <gl-component :closable="false" :reorderEnabled="true" title="Data">
            <flow
              @addNode="addNode"
              @addEdge="addEdge"
              @remove="remove"
              @undoLastRemoved="undoLastRemoved"
              @update="updateFlow"
              :flowData="data"
            />
          </gl-component>
        </gl-stack>
      </gl-row>
      <gl-row :height="50">
        <gl-stack :closable="false">
          <gl-component title="Form">
            <data-viewer
              ref="data_viewer"
              :content_guid="content_guid"
              :content_options="content_options"
              :content_name="content_name"
              @loaded="loadedRows"
              @added="addedRow"
              @updated="updatedRow"
              @removed="removedRow"
              @selected-cell="selectedCell"
              @selected-row="selectedRow"
            />
          </gl-component>
        </gl-stack>
      </gl-row>
    </gl-col>
  </golden-layout>
</template>

<script>
import Flow from "./Flow";
import DataViewer from "./DataViewer";
import {
  addContent,
  loadContent,
  removeData,
  updateData,
} from "../../api/content/contentAPI";
export default {
  props: ["content_guid", "content_name", "content_options"],
  components: {
    flow: Flow,
    "data-viewer": DataViewer,
  },
  /**
   * <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<TODO>>>>>>>>>>>>>>>>>>>>>>>
   * flow -> table
   * table -> flow
   * 데이터 맞춰야됩니다...
   * 
   * [[[[[[[[[[[[[[[[[[[[[[[[[[DATA]]]]]]]]]]]]]]]]]]]]]]]]]]
    parent?
    id
    name    
    type: "Process",        
    position: 
    classes?
    ? : 필요한지 잘 모르겠는 것
   * 
   */
  data() {
    return {
      data: [],
      timer: null,
      requestStack: {},
    };
  },
  methods: {
    updateFlow(data) {
      console.log("update");
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.requestStack[data.idx] = data;
          this.timer = null;
          console.log(this.requestStack);
          const res = await Promise.all(
            Object.values(this.requestStack).map((d) =>
              updateData({ content_guid: this.content_guid, ...d })
            )
          );
          console.log(res);
          this.requestStack = {};
        }, 50);
      } else {
        this.requestStack[data.idx] = data;
      }
    },
    loadedRows(rows) {
      this.data = rows;
    },
    addedRow(params) {
      console.log(params);
    },
    updatedRow(params) {
      console.log(params);
    },
    removedRow(params) {
      console.log(params);
    },
    selectedRow(params) {},
    selectedCell(params) {
      if (params.header.type == "file") {
        this.store.app.windows.push({
          title: this.content_name,
          compName: "iframe-content",
          action: true,
          type: "window",
          isOpen: true,
          resizable: true,
          meta: {
            loadUrl:
              "/content/" +
              this.content_guid +
              "/" +
              params.item[params.header.value],
          },
        });
      }
    },
    async addNode(nodeData) {
      console.log("addNode");
      Object.assign(nodeData, { content_guid: this.content_guid });
      Object.keys(this.content_options.fields).forEach((d) => {
        if (d !== "meta" && d !== "type" && d !== "name") {
          const temp = {};
          temp[d] = null;
          Object.assign(nodeData, temp);
        }
      });
      let response = await addContent(nodeData);
      if (response.status === 200) {
        response = await loadContent({ content_guid: this.content_guid });
        if (response.status == 200) {
          this.data = response.data;
          this.$refs.data_viewer.loadContent();
        }
      }
    },
    async addEdge(edgeData) {
      console.log("addEdge");
      Object.assign(edgeData, { content_guid: this.content_guid });
      Object.keys(this.content_options.fields).forEach((d) => {
        if (d !== "meta" && d !== "type" && d !== "name") {
          const temp = {};
          temp[d] = null;
          Object.assign(edgeData, temp);
        }
      });

      let response = await addContent(edgeData);
      if (response.status === 200) {
        response = await loadContent({ content_guid: this.content_guid });
        if (response.status == 200) {
          this.data = response.data;
          this.$refs.data_viewer.loadContent();
        }
      }
    },
    async remove(idx) {
      console.log("remove");
      let response = await removeData({
        idx,
        content_guid: this.content_guid,
      });
      if (response.status === 200) {
        response = await loadContent({ content_guid: this.content_guid });
        if (response.status == 200) {
          this.data = response.data;
          this.$refs.data_viewer.loadContent();
        }
      }
    },
    undoLastRemoved(event) {
      console.log("undoLastRemoved");
      console.log(event);
    },
  },
  created() {},
  mounted() {
    this.$nextTick(async () => {
      let response = await loadContent({ content_guid: this.content_guid });
      if (response.status == 200) {
        this.data = response.data;
      }
    });
  },
  destroyed() {},
};
</script>

<style>
</style>
