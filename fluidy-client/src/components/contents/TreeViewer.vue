<template>
  <div style="height: 100%; overflow: auto">
    <div class="expand-title" style="border-top: 1px solid rgb(51, 51, 51)">
      <div>
        <p :style="{ marginBottom: '0px' }">{{ name }}</p>
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-hover v-slot:default="{ hover }">
            <div v-on="on" style="padding: 0em 0em 0em 0.5em; cursor: pointer">
              <v-icon
                small
                :color="hover ? 'rgb(200,200,200)' : 'rgb(133, 133, 133)'"
                >mdi-plus</v-icon
              >
            </div>
          </v-hover>
        </template>
        <v-list dense>
          <v-list-item-group>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="createContent(item)"
            >
              <v-list-item-icon>
                <v-icon
                  small
                  v-text="item.icon"
                  :color="'hsla(0,0%,100%,.7)'"
                ></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-text="item.text"
                  style="color: hsla(0, 0%, 100%, 0.7)"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>
    <div
      :class="expand ? 'expand-content expand' : 'expand-content'"
      ref="ref_obj_list"
    >
      <v-treeview
        :items="children"
        item-key="id"
        item-text="name"
        class="content-tree-view"
        return-object
        dense
        open-all
        hoverable
        v-if="children.length"
      >
        <template v-slot:prepend="{item}">
          <v-icon small color="hsla(0, 0%, 100%, 0.85)" v-if="item.content_type === 'table'">
            {{ "mdi-table" }}
          </v-icon>
          <v-icon small color="hsla(0, 0%, 100%, 0.85)" v-else-if="item.content_type === 'flow'">
            {{ "mdi-graph" }}
          </v-icon>
        </template>
        <template v-slot:label="{ item }">
          <div
            tabindex="0"
            style="
              outline: none;
              width: 100%;
              height: 100%;
              cursor: pointer;
              color: hsla(0, 0%, 100%, 0.85);
            "
            @dblclick="onLoadContent(item)"
          >
            {{ item.name }}
          </div>
        </template>
        <template v-slot:append="{ item }">
          <v-tooltip right v-if="item.id != 'root'">
            <template v-slot:activator="{ on }">
              <v-icon
                color="hsla(0, 0%, 100%, 0.85)"
                @click="removeContent(item)"
                v-on="on"
                small
                >mdi-delete</v-icon
              >
            </template>
            <span>Delete</span>
          </v-tooltip>
        </template>
      </v-treeview>
    </div>
  </div>
</template>

<script>
import { removeContent } from "../../api/content/contentAPI";
import { mapState, mapActions } from "vuex";
import mainEventBus from "../../eventbus/mainEventBus";
export default {
  computed: mapState({
    name: (state) => state.tree.name,
    children: (state) => state.tree.children,
    space_guid: (state) => state.tree.guid,
  }),
  components: {
    // 외부 컴포넌트 등록
  },
  methods: {
    createContent(item) {
      if (item.type === "table") {
        mainEventBus.$emit("OPEN_CREATE_TABLE_DIALOG");
      } else if (item.type === "flow") {
        mainEventBus.$emit("OPEN_CREATE_FLOW_DIALOG");
      }
    },
    async removeContent(item) {
      try {
        var response = await removeContent(item.content_guid);
        if (response.status == 200) {
          this.$store.dispatch("tree/loadTreeData", this.space_guid);
        }
      } catch (err) {
        this.$message({ type: "error", message: err.message });
      }
    },
    async onLoadContent(item) {
      try {
        this.$store.dispatch("currentContents/add", item);
      } catch (err) {
        this.$message({ type: "error", message: err.message });
      }
    },
  },
  watch: {
    // 해당 view에서 사용되는 변수에 대한 event listen 등록
  },
  // computed : {
  //   search_items() {
  //     if(this.search_text) {
  //       return this.searchNode(this.store.flow.node_list, this.search_text)
  //     } else {
  //       return this.store.flow.node_list
  //     }
  //   }
  // },
  data() {
    // 해당 view에서 사용되는 변수 등록(<temaplte></template>연동)
    return {
      tree2: [],
      tree: [],
      search_text: "",
      expand: true,
      items: [
        { text: "Table", icon: "mdi-table", type: "table" },
        { text: "Flow", icon: "mdi-graph", type: "flow" },
      ],
    };
  },
  created() {
    // vue lifecycle01 : dom이 생성되기 전 instance 생성시 발생
    console.log("created");
  },
  mounted() {
    // vue lifecycle02 : dom객체가 browser에 생성시 발생
    console.log("mounted");
  },
  updated() {
    // vue lifecycle03 : data 변경으로 인해 dom update시 발생
  },
  destroyed() {
    // vue lifecycle04 : view destroy시 발생
    console.log("destroyed");
  },
};
</script>

<style scoped>
.content-tree-view {
  height: 100%;
  color: hsla(0, 0%, 100%, 0.7);
}

.expand-title {
  min-height: 40px;
  width: 100%;
  /* height: 3em; */
  padding: 0.5em;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 2px 2px 0 rgba(0, 0, 0, 0.05),
    0 1px 5px 0 rgba(0, 0, 0, 0.1);
}

.expand-content {
  width: 100%;
  transition: 0.3s ease all;
  min-height: 0px;
  height: 0px;
  visibility: hidden;
}
.expand-content.expand {
  height: auto;
  min-height: 250px;
  visibility: visible;
}
</style>
