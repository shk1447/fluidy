<template>
  <div style="width: 100%; height: 100%" ref="data_table">
    <v-system-bar window height="36" color="rgb(42,42,42)">
      <v-icon small>mdi-information-outline</v-icon>
      <span>you can insert/update/delete data row.</span>
      <v-spacer></v-spacer>
      <v-icon color="succss" small @click="addDatum">mdi-plus-thick</v-icon>
    </v-system-bar>
    <v-data-table
      v-if="headers.length > 0"
      fixed-header
      :height="table_height + 'px'"
      class="data-table"
      :headers="headers"
      :items="data_rows"
      dense
      hide-default-footer
      :items-per-page="-1"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr
            v-for="(item, idx) in items"
            :key="idx"
            @click="selectedRow(idx, item)"
          >
            <td v-for="header in headers" :key="header.value">
              <div
                v-if="header.value"
                :style="
                  header.disabled ? 'pointer-events:none;opacity:.5;' : ''
                "
              >
                <v-icon v-if="header.type == 'text' || header.type == 'json'">
                  mdi-dots-horizontal
                </v-icon>
                <input
                  type="checkbox"
                  v-model="item[header.value]"
                  :name="header.value"
                  v-else-if="header.type == 'checkbox'"
                  @change="updateDatum($event, item.idx, header, item)"
                />
                <select
                  v-else-if="header.type == 'select'"
                  class="field-type-select"
                  v-model="item[header.value]"
                  @change="updateDatum($event, item.idx, header, item)"
                >
                  <option
                    v-for="(option, k) in header.options.items"
                    :key="k"
                    :value="option.value"
                  >
                    {{ option.text }}
                  </option>
                </select>
                <div v-else-if="header.type == 'file'">
                  <v-chip
                    v-if="item[header.value]"
                    class="ma-2"
                    close
                    color="rgba(222,222,222,0.8)"
                    label
                    outlined
                    small
                    @click="selectedCell(item, header)"
                    @click:close="deleteFile(item.idx, header)"
                  >
                    {{ item[header.value] }}
                  </v-chip>
                  <input
                    v-else
                    :type="'file'"
                    :class="'table-edit-input file'"
                    v-model="item[header.value]"
                    @change="updateDatum($event, item.idx, header, item)"
                  />
                </div>
                <input
                  v-else
                  :type="'text'"
                  :class="'table-edit-input text'"
                  v-model="item[header.value]"
                  @change="updateDatum($event, item.idx, header, item)"
                />
              </div>
              <div
                v-else
                style="
                width:
                display: flex;
                justify-content: center;
                align-items: center;
              "
              >
                <v-icon small color="orange" @click="showForm(header, item)"
                  >mdi-pencil</v-icon
                >
                <v-icon small color="red" @click="removeDatum(item.idx)"
                  >mdi-close-thick</v-icon
                >
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  insertData,
  updateData,
  removeData,
  loadContent,
} from "../../api/content/contentAPI";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";

export default {
  props: ["content_guid", "content_name", "content_options"],
  data() {
    return {
      table_height: 0,
      iframe_height: 0,
      headers: [],
      data_rows: [],
      emptyData: {},
      loadUrl: "",
    };
  },
  watch: {},
  methods: {
    notifications() {
      /*
        ex] 아래와 같이 사용
        [{path:'app.loading', callback : function() { }}]
        */
      return [];
    },
    resizeHandler() {
      this.table_height = this.$refs.data_table.offsetHeight - 36;
    },
    async addDatum() {
      var datum = {};
      this.headers.map((d) => {
        datum[d.value] =
          d.options && d.options.default ? d.options.default : null;
      });
      datum["content_guid"] = this.content_guid;
      let response = await insertData(datum);
      if (response.status == 200) {
        // this.data_rows.push(datum);
        this.loadContent();
      }
      this.$emit("added", datum);
    },
    async removeDatum(idx) {
      console.log(idx);
      var params = {
        content_guid: this.content_guid,
        idx: idx,
      };
      let response = await removeData(params);
      if (response.status == 200) {
        this.loadContent();
      }
      this.$emit("removed", { idx: idx });
    },
    async updateDatum(e, idx, header, item) {
      if (item[header.value] != null && item[header.value] != undefined) {
        var formData = new FormData();
        formData.append("content_guid", this.content_guid);
        formData.append("idx", idx);
        if (this.content_options.fields[header.value].type == "file") {
          if (e && e.target.files.length > 0) {
            formData.append(header.value, e.target.files[0]);
          } else {
            formData.append(header.value, "");
          }
        } else {
          formData.append(header.value, item[header.value]);
        }
        let response = await updateData(formData);
        if (response.status == 200) {
          this.loadContent();
        }
        this.$emit("updated", item);
      }
    },
    async loadContent() {
      let response = await loadContent({ content_guid: this.content_guid });
      if (response.status == 200) {
        this.data_rows = response.data;
        this.$emit("loaded", this.data_rows);
      }
    },
    async deleteFile(idx, header) {
      var formData = new FormData();
      formData.append("content_guid", this.content_guid);
      formData.append("idx", idx);
      formData.append(header.value, "");
      let response = await updateData(formData);
      if (response.status == 200) {
        this.loadContent();
      }
    },
    selectedRow(idx, item) {
      this.$emit("selected-row", { idx: idx, item: item });
    },
    selectedCell(item, header) {
      this.$emit("selected-cell", { item: item, header: header });
    },
    initialize() {
      this._resizeHandler = debounce(this.resizeHandler, 100, {
        leading: true,
      });

      addListener(this.$refs.data_table, this._resizeHandler);
      var headers = [];
      Object.keys(this.content_options.fields).forEach((v, i) => {
        headers.push({
          text: this.content_options.fields[v].name,
          value: v,
          type: this.content_options.fields[v].type,
          options: this.content_options.fields[v].options,
          disabled: this.content_options.fields[v].disabled ? true : false,
        });
      });
      this.headers = [...headers, { text: "", value: null, sortable: false }];
      this.loadContent();
    },
    showForm(header, item) {
      this.store.app.windows.push({
        title: this.content_name,
        compName: "form-window",
        action: true,
        type: "window",
        isOpen: true,
        meta: {
          headers: this.headers,
          item: JSON.parse(JSON.stringify(item)),
          header: header,
          content_guid: this.content_guid,
          parent: this,
        },
      });
    },
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    this.initialize();
  },
  beforeDestroy() {
    removeListener(this.$refs.data_table, this._resizeHandler);
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script>

<style scoped>
.table-edit-input {
  outline: none;
  width: 100%;
}
.table-edit-input.file {
  color: rgba(141, 141, 141, 1);
  font-size: 11px;
}
.table-edit-input.text {
  color: hsla(0, 0%, 100%, 0.7);
  font-size: 11px;
}
.field-type-select {
  width: 100%;
}
</style>


