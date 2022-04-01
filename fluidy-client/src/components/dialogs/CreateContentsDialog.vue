<template>
  <v-dialog v-model="showCreateContentsDialog" max-width="450px" :persistent="true">
    <v-card tile outlined>
      <v-container>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field v-model="name" hide-details placeholder=" " autocomplete="off" :label="contentsType + ' name'"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="createContent">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import mainEventBus from '../../eventbus/mainEventBus'
export default {
  created(){
    mainEventBus.$on('OPEN_CREATE_CONTENTS_DIALOG', (contentsType) =>{
      console.log(contentsType)
      this.showCreateContentsDialog = true;
      this.contentsType = contentsType;
    })   
  },
  methods : {    
    closeDialog(){
      this.showCreateContentsDialog = false;
    },
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    createContent(){
      this.showCreateContentsDialog = false;
      this.$store.dispatch('currentContents/add', {
        id : this.uuidv4(),
        name : this.name,
        type : this.contentsType
      })
    }
  },    
  data(){
    return {
      name: null,
      contentsType : null,
      showCreateContentsDialog : false
    }
  }
}
</script>


