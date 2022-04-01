<template>
  <v-dialog
    v-model="showFlowConfigDialog"
    max-width="600px"
    :persistent="true"
  >
    <v-card tile outlined>
      <v-container>
        <v-form>
          <v-row>
            <v-col>
              <h1>FLOW CONFIG DIALOG</h1>
            </v-col>
          </v-row>          
        </v-form>
      </v-container>
      <v-system-bar window height="36" color="rgb(42,42,42)">
        <v-icon small>mdi-information-outline</v-icon>
        <span>Set up flow name and schema.</span>
        <v-spacer></v-spacer>
        <v-icon color="success">mdi-check-bold</v-icon>
        <v-icon color="red" @click="closeDialog">mdi-close-thick</v-icon>
      </v-system-bar>
    </v-card>
  </v-dialog>
</template>
<script>
import mainEventBus from "../../eventbus/mainEventBus";
import { mapState } from "vuex";

export default {
  created() {
    mainEventBus.$on("OPEN_FLOW_CONFIG_DIALOG", () => {
      this.showFlowConfigDialog = true;
    });
  },
  computed: mapState({
    space_guid: (state) => state.tree.guid,
  }),
  methods: {   
    closeDialog() {
      this.showFlowConfigDialog = false;
      this.schema_list = [];
    }
  },
  data() {
    return {
      content_name: null,
      showFlowConfigDialog: false,     
    };
  },
};
</script>
<style>
</style>