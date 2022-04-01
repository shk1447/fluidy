<template>
  <v-card tile outlined min-width="550" max-height="650" style="overflow: auto">
    <v-tabs vertical light v-model="tab">
      <v-tab>
        <v-icon left> mdi-database </v-icon>
        Data
      </v-tab>
      <v-tab>
        <v-icon left> mdi-account </v-icon>
        Comment
      </v-tab>
      <v-tabs-items light vertical v-model="tab">
        <v-tab-item>
          <v-container>
            <v-form>
              <v-row v-for="(header, idx) in meta.headers" :key="idx">
                <v-col v-if="header.type == 'string'">
                  <v-text-field
                    dense
                    outlined
                    placeholder=" "
                    hide-details
                    v-model="data[header.value]"
                    :label="header.text"
                  ></v-text-field>
                </v-col>
                <v-col v-if="header.type == 'text'">
                  <v-textarea
                    auto-grow
                    hide-details
                    outlined
                    placeholder=" "
                    v-model="data[header.value]"
                    :label="header.text"
                  ></v-textarea>
                </v-col>
                <v-col v-if="header.type == 'select'">
                  <v-select
                    dense
                    light
                    hide-details
                    outlined
                    placeholder=" "
                    v-model="data[header.value]"
                    :items="header.options.items"
                    :label="header.text"
                  ></v-select>
                </v-col>
                <v-col v-if="header.type == 'checkbox'">
                  <v-checkbox
                    style="margin-top: 0px"
                    dense
                    hide-details
                    v-model="data[header.value]"
                    :label="`${header.text} : ${
                      data[header.value] ? 'true' : 'false'
                    } `"
                  ></v-checkbox>
                </v-col>
                <!-- <v-col v-if="header.type == 'file'">
              <v-chip
                v-if="data[header.value]"
                class="ma-2"
                close
                color="rgba(222,222,222,0.8)"
                label
                outlined
                small
              >
                {{ data[header.value] }}
              </v-chip>
              <v-file-input
                v-else
                dense
                small-chips
                :label="header.text"
                v-model="data[header.value]"
              ></v-file-input>
            </v-col> -->
              </v-row>
            </v-form>
          </v-container>
          <v-system-bar window height="36" color="rgb(255,255,255)">
            <v-icon small>mdi-information-outline</v-icon>
            <span>Set up form data.</span>
            <v-spacer></v-spacer>
            <v-icon color="success" @click="updateDatum">mdi-check-bold</v-icon>
            <v-icon color="red" @click="resetDatum">mdi-restart</v-icon>
          </v-system-bar>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <div class="cell-comment-container">
              <div class="cell-comment-list">
                <div
                  class="cell-comment"
                  :id="`comment-${comment.idx}`"
                  v-for="comment in comments"
                  :key="comment.idx"
                >
                  <a class="avatar">
                    <img :src="comment.avatar" />
                  </a>
                  <div class="content">
                    <span class="author">{{ "seokhwan.kim" }}</span>
                    <a
                      class="metadata"
                      @click="
                        (e) => {
                          e.preventDefault();
                        }
                      "
                      ><time :datetime="'2021-04-24T11:50:35.000Z'">{{
                        "2021-04-24 20:50"
                      }}</time></a
                    >
                    <div class="text">{{ comment.message }}</div>
                  </div>
                </div>
              </div>
            </div>
          </v-container>
          <v-system-bar window height="36" color="rgba(255,255,255, 0.9)">
            <v-icon small>mdi-message-processing-outline</v-icon>
            <input class="comment-input" v-model="message" />
            <v-spacer></v-spacer>
            <v-icon
              color="success"
              @click="
                () => {
                  comments.push({ idx: comments.length, message: message });
                  message = '';
                }
              "
              >mdi-send</v-icon
            >
          </v-system-bar>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>

<script>
import { updateData } from "../../api/content/contentAPI";

export default {
  props: ["meta"],
  data() {
    return {
      tab: 0,
      message: "",
      comments: [
        { idx: 0, message: "첫번째 테스트 커멘트" },
        { idx: 1, message: "두번째 테스트 커멘트" },
      ],
      data: {},
    };
  },
  watch: {
    data: {
      deep: true,
      async handler(val) {
        // console.log(val);
      },
    },
  },
  methods: {
    async updateDatum() {
      this.data["content_guid"] = this.meta.content_guid;
      var response = await updateData(this.data);
      if (response.status == 200) {
        this.meta.parent.loadContent();
        this.meta.item = JSON.parse(JSON.stringify(this.data));
      }
    },
    resetDatum() {
      this.data = JSON.parse(JSON.stringify(this.meta.item));
    },
  },
  created() {},
  mounted() {
    console.log(this.meta);
    this.data = JSON.parse(JSON.stringify(this.meta.item));
  },
  destroyed() {},
};
</script>

<style scoped>
.cell-comment-container {
  position: relative;
  min-height: 60px;
  font-size: 1.125em;
}

.cell-comment {
  position: relative;
  transition: color 2s ease-in-out;
}

.cell-comment:not(:first-child) {
  margin-top: 1.5em;
}

.cell-comment .avatar {
  display: block;
  width: 2.5em;
  height: 2.5em;
  float: left;
  margin: 0.2em 0 0;
}

.cell-comment .avatar img {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  border-radius: 0.25rem;
}

.cell-comment .content {
  margin-left: 3.5em;
}

.cell-comment .content .author {
  font-size: 1em;
  color: inherit;
  font-weight: 700;
  opacity: 0.87;
}

.cell-comment .content .metadata {
  display: inline-block;
  margin-left: 0.5em;
  color: inherit;
  font-size: 0.875em;
  opacity: 0.5;
}

.cell-comment .content .text {
  margin: 0.25em 0 0.5em;
  font-size: 1em;
  color: inherit;
  line-height: 1.3;
  opacity: 0.87;
  white-space: pre;
}

.cell-comment .content .actions {
  font-size: 0.875em;
}

.cell-comment .content .actions a {
  cursor: pointer;
  display: inline-block;
  color: rgba(255, 255, 255, 0.4);
}

.comment-input {
  outline: none;
  width: 100%;
  font-size: 11px;
  color: rgb(44, 44, 44);
}
</style>
