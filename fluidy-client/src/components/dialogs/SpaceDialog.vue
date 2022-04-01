<template>
  <v-card tile outlined ref="ref_project_list">
    <v-data-table
      :headers="headers"
      :items="spaces"
      dense
      fixed-header
      hide-default-footer
      :items-per-page="-1"
    >
      <template v-slot:top>
        <v-system-bar height="36" color="rgb(42,42,42)">
          <span>SPACE</span>
          <v-spacer></v-spacer>
          <!-- <v-icon>mdi-server-off</v-icon>
          <v-icon>mdi-bell</v-icon> -->
          <v-icon @click="closeSpaceDialog">mdi-close</v-icon>
        </v-system-bar>
      </template>
      <template v-slot:body="{ items }">
        <tbody>
          <template v-if="items.length">
            <tr
              v-on="on"
              style="cursor: pointer; user-select: none"
              right
              v-for="(space, idx) in items"
              :key="idx"
            >
              <td class="ellipsis" @click="loadSpace(space.space_guid)">
                <span>{{ space.space_name }}</span>
              </td>
              <td>
                <!-- <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-hover v-slot:default="{ hover }">
                        <div @click="openInvitationDialog">
                          <v-icon v-on="on" small :disabled="space.role !== 'manager'" :color="hover ? 'cyan' : 'white'" > mdi-share-variant </v-icon>
                        </div>                        
                      </v-hover>
                    </template>
                    <span>Invite Space</span>
                  </v-tooltip> -->
                <v-hover v-slot:default="{ hover }">
                  <div @click="openInvitationDialog(space.space_guid)">
                    <v-icon
                      v-on="on"
                      small
                      :disabled="space.role !== 'manager'"
                      :color="hover ? 'cyan' : 'white'"
                    >
                      mdi-share-variant
                    </v-icon>
                  </div>
                </v-hover>
              </td>
              <td>
                <!-- <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-hover v-slot:default="{ hover }">
                        <v-icon v-on="on" :disabled="space.role !== 'manager'" small :color="hover ? 'red' : 'white'" @click="removeProject(space.space_guid)"> mdi-trash-can-outline </v-icon>
                      </v-hover>
                    </template>
                    <span>Remove Space</span>
                  </v-tooltip> -->
                <v-hover v-slot:default="{ hover }">
                  <div @click="removeProject(space.space_guid)">
                    <v-icon
                      v-on="on"
                      :disabled="space.role !== 'manager'"
                      small
                      :color="hover ? 'red' : 'white'"
                    >
                      mdi-trash-can-outline
                    </v-icon>
                  </div>
                </v-hover>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="3" :style="{ textAlign: 'center' }">Empty</td>
            </tr>
          </template>

          <tr>
            <td colspan="4" style="text-align: center; cursor: pointer">
              <div @click="openCreateSpaceDialog">
                <v-icon x-small color="success"> mdi-plus-thick </v-icon>
                <label
                  style="
                    cursor: pointer;
                    color: hsla(0, 0%, 100%, 0.7);
                    font-size: 0.774rem;
                  "
                  >SPACE</label
                >
              </div>
            </td>
          </tr>
          <!-- <v-progress-linear
              :active="true"
              :value="Math.random() * 100"
              absolute
              bottom
              color="deep-purple accent-4"
            ></v-progress-linear>
            <span>Disk Usage</span> -->
        </tbody>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { spaceList, createSpace, removeSpace } from "../../api/space/spaceAPI";
import mainEventBus from "../../eventbus/mainEventBus";
// import { mapState, mapActions } from 'vuex'
// export default {
//   computed: mapState({
//     products: state => state.products.all
//   }),
//   methods: mapActions('cart', [
//     'addProductToCart'
//   ]),
//   created () {
//     this.$store.dispatch('products/getAllProducts')
//   }
// }
export default {
  props: ["params"],
  data() {
    return {
      spaces: [],
      dialogProject: false,
      setting: {
        space_name: "",
      },
      headers: [
        { text: "NAME", value: "space_name" },
        { text: "INVITE", value: "", sortable: false },
        { text: "REMOVE", value: "", sortable: false },
      ],
      login_email: "",
    };
  },

  methods: {
    openCreateSpaceDialog() {
      console.log("오냐");
      mainEventBus.$emit("OPEN_CREATE_SPACE_DIALOG");
    },
    closeSpaceDialog() {
      mainEventBus.$emit("CLOSE_SPACE_DIALOG");
    },
    openInvitationDialog(space_guid) {
      mainEventBus.$emit("OPEN_INVITATION_DIALOG", space_guid);
    },
    loadSpace(space_guid) {
      this.$store.dispatch("tree/loadTreeData", space_guid);
      this.$store.dispatch("currentContents/clear");
      mainEventBus.$emit("CLOSE_SPACE_DIALOG");
    },
    async createProject() {
      try {
        let response = await createSpace(this.setting.space_name);
        if (response.status === 200) {
          response = await spaceList();
          if (response.status === 200) {
            this.spaces = response.data.result;
            this.setting.space_name = "";
            this.dialogProject = false;
          }
        }
      } catch (err) {
        console.error("failed create space");
      }
    },
    async removeProject(spaceID) {
      try {
        let response = await removeSpace(spaceID);
        if (response.status === 200) {
          response = await spaceList();
          if (response.status === 200) {
            this.spaces = response.data.result;
            this.setting.space_name = "";
          }
        }
      } catch (err) {
        console.error("failed remove space");
      }
    },
  },
  async created() {
    try {
      const response = await spaceList();
      if (response.status === 200) this.spaces = response.data.result;

      mainEventBus.$on("REFRESH_SPACE_LIST", async () => {
        try {
          let response = await spaceList();
          if (response.status === 200) {
            this.spaces = response.data.result;
          }
        } catch (err) {
          console.error("failed load space list");
        }
      });
    } catch (err) {
      console.error("failed bring space list");
    }
  },
  mounted() {},
  destroyed() {},
};
</script>

<style scoped>
.ellipsis {
  position: relative;
}
.ellipsis:before {
  content: "&nbsp;";
  visibility: hidden;
}
.ellipsis span {
  position: absolute;
  left: 20px;
  right: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
