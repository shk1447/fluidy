<template>
  <v-dialog
    v-model="showCreateSpaceDialog"
    max-width="450px"
    :persistent="true"
  >
    <v-card tile outlined>
      <v-container>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field
                v-model="name"
                hide-details
                placeholder=" "
                autocomplete="off"
                :label="'SPACE NAME'"
              ></v-text-field>
            </v-col>
          </v-row>          
        </v-form>
      </v-container>
      <v-system-bar window height="36" color="rgb(42,42,42)">
        <v-icon small>mdi-information-outline</v-icon>
        <span v-if="!isCreateFail && !isCreateSuccess">Create Space</span>
        <span v-if="isCreateFail && !isCreateSuccess" style="color: red">Create space failed</span>
        <span v-if="!isCreateFail && isCreateSuccess" style="color: green">Create space success</span>
        <v-spacer></v-spacer>
        <v-icon color="success" @click="createSpace">mdi-check-bold</v-icon>
        <v-icon color="red" @click="closeDialog">mdi-close-thick</v-icon>
      </v-system-bar>
    </v-card>
  </v-dialog>
</template>
<script>
import mainEventBus from "../../eventbus/mainEventBus";
import { createSpace } from "../../api/space/spaceAPI";

export default {
  created() {
    mainEventBus.$on("OPEN_CREATE_SPACE_DIALOG", () => {
      this.showCreateSpaceDialog = true;
    });
  },  
  methods: {
    async createSpace() {
      try {
        console.log(this.name);
        let response = await createSpace(this.name);
        if (response.status === 200) {
          mainEventBus.$emit('REFRESH_SPACE_LIST')          
          this.isCreateSuccess = true;
          this.isCreateFail = false;
        }
      } catch (err) {
        console.error("failed create space");
        this.isCreateSuccess = false;
        this.isCreateFail = true;
      }
    },
    closeDialog() {
      this.showCreateSpaceDialog = false;
      this.isCreateFail = false;
      this.isCreateSuccess = false;
    },
    uuidv4() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    createContent() {
      
      this.showCreateSpaceDialog = false;
    },
  },
  data() {
    return {
      name: null,
      showCreateSpaceDialog: false,      
      isCreateFail : false,
      isCreateSuccess : false,      
    };
  },
};
</script>


