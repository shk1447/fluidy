<template>
  <v-dialog
    v-model="showCreateFlowDialog"
    max-width="600px"
    :persistent="true"
  >
    <v-card tile outlined>
      <v-container>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field
                v-model="content_name"
                hide-details
                placeholder=" "
                autocomplete="off"
                :label="'NAME'"
              ></v-text-field>
            </v-col>            
          </v-row>  
          <v-row>
            <v-col>
              <v-data-table
                style="max-height: 600px"
                dense
                :headers="schema_header"
                :items="schema_list"
                calculate-widths
                no-data-text="No Data Table"
                hide-default-footer
                :items-per-page="-1"
              >
                <template v-slot:body="{ items }">
                  <tbody>
                    <tr v-for="(item, idx) in items" :key="idx">
                      <td>
                        <input
                          style="
                            outline: none;
                            color: hsla(0, 0%, 100%, 0.7);
                            width: 120px;
                          "
                          v-model="item.id"
                        />
                      </td>
                      <!-- <td>
                        <input
                          style="
                            outline: none;
                            color: hsla(0, 0%, 100%, 0.7);
                            width: 65px;
                          "
                          v-model="item.name"
                        />
                      </td> -->
                      <td>
                        <select
                          class="field-type-select"
                          v-model="item.type"
                          @change="changeType(item)"
                        >
                          <option value="string">String</option>
                          <option value="text">Text</option>
                          <option value="file">File</option>
                          <option value="select">Select</option>
                          <option value="checkbox">CheckBox</option>
                        </select>
                      </td>
                      <td>
                        <v-icon
                          :disabled="!item.options"
                          color="hsla(0, 0%, 100%, 0.7)"
                          small
                          @click="setFieldOption(item, idx)"
                          >mdi-cog</v-icon
                        >
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="4"
                        style="
                          text-align: center;
                          cursor: pointer;
                          color: hsla(0, 0%, 100%, 0.7);
                          font-size: 0.774rem;
                        "
                        @click="addField"
                      >
                        <v-icon small color="success"> mdi-plus-thick </v-icon>
                        <label style="cursor: pointer">FIELD</label>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-col>
          </v-row>        
        </v-form>
      </v-container>
      <v-system-bar window height="36" color="rgb(42,42,42)">
        <v-icon small>mdi-information-outline</v-icon>
        <span>Set up flow name and schema.</span>
        <v-spacer></v-spacer>
        <v-icon color="success" @click="createContent">mdi-check-bold</v-icon>
        <v-icon color="red" @click="closeDialog">mdi-close-thick</v-icon>
      </v-system-bar>
    </v-card>
  </v-dialog>
</template>
<script>
import { createContent } from "../../api/content/contentAPI";
import mainEventBus from "../../eventbus/mainEventBus";
import { mapState } from "vuex";
import MenuBarVue from "../layouts/MenuBar.vue";

export default {
  created() {
    mainEventBus.$on("OPEN_CREATE_FLOW_DIALOG", () => {
      this.showCreateFlowDialog = true;
    });
  },
  computed: mapState({
    space_guid: (state) => state.tree.guid,
  }),
  methods: {   
    closeDialog() {
      this.showCreateFlowDialog = false;
      this.schema_list = [];
    },
    async createContent() {
      try {
        console.log(this.space_guid);
        var params = {
          space_guid: this.space_guid,
          content_name: this.content_name,
          content_type: "flow",
          content_options: { fields: {} },
        };
        
        this.schema_list.forEach(function (v, k) {
          params.content_options.fields[v.id] = {
            name: v.id,
            type: v.type,
            options: v.options,
          };
        });

        let response = await createContent(params);
        if (response.status === 200) {
          this.$store.dispatch("tree/loadTreeData", this.space_guid);
          this.closeDialog();
        }
      } catch (err) {
        console.error("failed create content : ", err);
      }
    },
     addField() {
      this.schema_list.push({
        id: "",
        name: "",
        type: "string",
        options: null,
      });
    },
    changeType(item) {
      switch (item.type) {
        case "select":
          item.options = {
            items: [],
          };
          break;
        default:
          item.options = null;
          break;
      }
      console.log(item);
    },
    setFieldOption(item, idx) {
      console.log(item);
      this.editedIndex = idx;
      this.showOptionsDialog = true;
    },    
    addOption() {
      this.schema_list[this.editedIndex].options.items.push({
        text: "",
        value: "",
      });
    },
    deleteOption(idx) {
      this.schema_list[this.editedIndex].options.items.splice(idx, 1);
    },
    closeOptions() {
      this.schema_list[this.editedIndex].options.items = [];
      this.editedIndex = -1;
      this.showOptionsDialog = false;
    },
    saveOptions() {
      this.editedIndex = -1;
      this.showOptionsDialog = false;
    },
  },
  data() {
    return {
      content_name: null,
      showCreateFlowDialog: false,  
      schema_header: [
        { text: "ID", value: "id" },
        // { text: "NAME", value: "name" },
        { text: "TYPE", value: "type" },
        { text: "OPTIONS", value: "options" },
      ],
      schema_list: [],
      options: ["string", "text", "file", "select", "checkbox"],
      select_header: [
        {
          text: "TEXT",
          value: "text",
        },
        {
          text: "VALUE",
          value: "value",
        },
        {
          text: "",
          value: "",
        },
      ],
      editedIndex: -1,   
    };
  },
};
</script>
<style>
</style>