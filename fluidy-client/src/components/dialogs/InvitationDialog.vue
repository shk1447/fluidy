<template>
  <v-dialog v-model="showInvitationDialog" max-width="500px" :persistent="true">
    <v-card tile outlined ref="ref_new_project">
      <v-container>
        <v-form>
          <v-row>
            <v-col>
              <v-chip
                class="ma-2"
                close
                color="success"
                outlined
                v-for="(user, index) in invitedUserList" :key="index"
              >                
              {{user.email}}
              </v-chip>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field hide-details placeholder=" " v-model="invitationTargetEmail" autocomplete="off" label="INVITATION TO"></v-text-field>
            </v-col>
            <v-col>
              <v-select
                v-model="role"
                :items="items"
                :rules="[v => !!v || 'Item is required']"
              ></v-select>
            </v-col>
          </v-row>                   
        </v-form>
      </v-container>
      <v-system-bar window height="36" color="rgb(42,42,42)">
        <v-icon small>mdi-information-outline</v-icon>        
        <span v-if="!isInviteFail && !isInviteSuccess">Send Invitation</span>
        <span v-if="isInviteFail && !isInviteSuccess" style="color: red">Invitation send failed</span>
        <span v-if="!isInviteFail && isInviteSuccess" style="color: green">Invitation send success</span>
        <v-spacer></v-spacer>
        <v-icon color="success" @click="sendInvitation">mdi-check-bold</v-icon>
        <v-icon color="red" @click="closeDialog">mdi-close-thick</v-icon>
      </v-system-bar>      
    </v-card>    
  </v-dialog>
</template>
<script>
import mainEventBus from '../../eventbus/mainEventBus'
import {inviteUser, loadSpaceUser} from '../../api/space/spaceAPI'
export default {
  created(){
    mainEventBus.$on('OPEN_INVITATION_DIALOG', async (space_guid) =>{
      this.showInvitationDialog = true;
      this.space_guid = space_guid

      try {
        console.log("흠")
        let response = await loadSpaceUser(this.space_guid);
        if(response.status === 200){
          console.log(response);
          this.invitedUserList = response.data.result
        }
      } catch(e){
        console.error("failed space user list")
      }
    })
  },  
  methods : {    
    async sendInvitation(){
      try {
        let response = await inviteUser({
          space_guid: this.space_guid,
          email: this.invitationTargetEmail,
          role: this.role
        })
        if(response.status === 200){          
          this.isInviteSuccess = true; 
          this.isInviteFail = false;         
          console.log("invitation success")
        }
      } catch(err){                
        this.isInviteFail = true;
        this.isInviteSuccess = false;
        console.error("invitation failed")
      }
    },
    closeDialog(){
      this.showInvitationDialog = false;
      this.isInviteSuccess = false;
      this.isInviteFail = false;
      this.space_guid = null;
      this.role = null;
      this.invitationTargetEmail = null;
    }
  },    
  data(){
    return {      
      isInviteFail : false,
      isInviteSuccess: false,
      showInvitationDialog : false,
      invitationTargetEmail : null,
      space_guid : null,
      role : null,
      invitedUserList : [],
      items: [
        'manager',
        'editor',
        'viewer',
        'commentor',
      ],
    }
  }
}
</script>


