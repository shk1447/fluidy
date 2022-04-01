<template>
  <v-dialog v-model="showUserInfoDialog" max-width="500px" :persistent="true">
    <v-card tile outlined>
      <v-container>
        <v-form>
          <v-row>
            <v-col cols="12" md="5">
              <div
                style="
                  border: 1px dashed rgba(222, 222, 222, 0.5);
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  cursor: pointer;
                "
                @click="openFileUpload"
              >
                <v-icon large color="white darken-2" v-if="!thumbnail">
                  mdi-image
                </v-icon>
                <v-img
                  v-else
                  max-height="220"
                  max-width="180"
                  contain
                  :src="thumbnail"
                ></v-img>
              </div>
            </v-col>
            <v-col cols="12" md="7">
              <v-row>
                <v-col>
                  <v-text-field
                    hide-details
                    placeholder=" "
                    autocomplete="off"
                    :label="'EMAIL'"
                    v-model="userInfoForm.email"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    hide-details
                    placeholder=" "
                    type="password"
                    autocomplete="off"
                    :label="'PASSWORD'"
                    v-model="userInfoForm.pwd"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                hide-details
                placeholder=" "
                autocomplete="off"
                :label="'LAST NAME'"
                v-model="userInfoForm.last_name"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                hide-details
                placeholder=" "
                autocomplete="off"
                :label="'FIRST NAME'"
                v-model="userInfoForm.first_name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                hide-details
                placeholder=" "
                autocomplete="off"
                :label="'COMPAY NAME'"
                v-model="userInfoForm.company_name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                hide-details
                placeholder=" "
                autocomplete="off"
                :label="'PHONE NUMBER'"
                v-model="userInfoForm.phone_number"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
      <v-system-bar window height="36" color="rgb(42,42,42)">
        <v-icon small>mdi-information-outline</v-icon>
        <span v-if="!isUpdateFail && !isUpdateSuccess"
          >Set up user profile.</span
        >
        <span v-if="isUpdateFail && !isUpdateSuccess" style="color: red"
          >Profile update failed</span
        >
        <span v-if="!isUpdateFail && isUpdateSuccess" style="color: green"
          >Profile update success</span
        >
        <v-spacer></v-spacer>
        <v-icon color="success" @click="updateUserInfo">mdi-check-bold</v-icon>
        <v-icon color="red" @click="closeDialog">mdi-close-thick</v-icon>
      </v-system-bar>
    </v-card>
    <input
      type="file"
      @change="uploadFile"
      :style="{ visibility: 'hidden', position: 'absolute' }"
      ref="imgUpload"
    />
  </v-dialog>
</template>
<script>
import mainEventBus from "../../eventbus/mainEventBus";
import { updateUser, getUser } from "../../api/user/userAPI";
export default {
  created() {
    mainEventBus.$on("OPEN_USER_INFO_DIALOG", async () => {
      this.showUserInfoDialog = true;
      try {
        let response = await getUser();
        if (response.status === 200) {
          this.userInfoForm.email = response.data.email;
          this.userInfoForm.pwd = response.data.pwd;
          this.userInfoForm.phone_number = response.data.phone_number;
          this.thumbnail = response.data.photo;
          const img = await fetch(response.data.photo);
          const blob = await img.blob();
          this.userInfoForm.photo = blob;
          this.userInfoForm.first_name = response.data.first_name;
          this.userInfoForm.last_name = response.data.last_name;
          this.userInfoForm.company_name = response.data.company_name;
        }
      } catch (e) {
        console.log("get user info failed");
      }
    });
  },
  methods: {
    closeDialog() {
      this.showUserInfoDialog = false;
      this.isUpdateFail = false;
      this.isUpdateSuccess = false;
      this.thumbnail = null;
      this.userInfoForm = {
        email: null,
        pwd: null,
        company_name: null,
        first_name: null,
        last_name: null,
        photo: null,
        phone_number: null,
      };
    },
    openFileUpload() {
      this.$refs.imgUpload.click();
    },
    uploadFile(e) {
      const files = e.target.files || e.dataTransfor.files;
      if (!files.length) return;
      this.userInfoForm.photo = files[0];
      var reader = new FileReader();
      reader.onload = (event) => {
        this.thumbnail = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    },
    async updateUserInfo() {
      try {
        this.isUpdateSuccess = false;
        this.isUpdateFail = false;
        const formData = new FormData();
        Object.keys(this.userInfoForm).forEach((key) => {
          formData.append(key, this.userInfoForm[key]);
        });
        let response = await updateUser(formData);
        if (response.status === 200) {
          this.isUpdateSuccess = true;
          console.log("update success");
        }
      } catch (e) {
        this.isUpdateFail = true;
        console.error("update failed");
      }
    },
  },
  data() {
    return {
      showUserInfoDialog: false,
      userInfoForm: {
        email: null,
        pwd: null,
        company_name: null,
        first_name: null,
        last_name: null,
        photo: null,
        phone_number: null,
      },
      thumbnail: null,
      isUpdateSuccess: false,
      isUpdateFail: false,
    };
  },
};
</script>


