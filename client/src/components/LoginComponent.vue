<template>
<v-app class="login-background">
  <!-- Common Area -->
  <v-dialog v-model="loginState" max-width="320px" persistent>
    <v-card>
      <div style="display:flex;padding-top: 1em;align-items:center;">
        <div style="height: 50px;margin-left: 1em;width: 125px;background: url(&quot;./static/images/logo.png&quot;) 50% 50% / contain no-repeat;/* margin-top: 1em; *//* padding-top: 1em; */"></div>
        <v-spacer />
        <v-btn x-small fab outlined style="margin-right:1em;" @click="showSignup">
          <v-icon >mdi-account-plus-outline</v-icon>
        </v-btn>
      </div>
      <div style="padding:1em;">
        <v-form lazy-validation ref="form" v-model="valid">
          <v-text-field prepend-icon="mdi-account" autocomplete="off" @keyup.enter="handleLocalAuth" v-model="loginForm.email" name="email" label="E-mail" :rules="[(v) => !!v || 'Email is required']"></v-text-field>
          <v-text-field prepend-icon="mdi-lock" autocomplete="off" @keyup.enter="handleLocalAuth" v-model="loginForm.pwd" name="pwd" label="Password" type="password" :rules="[(v) => !!v || 'Password is required']"></v-text-field>
        </v-form>
      </div>
      <v-card-actions>
        <div class="container-form-btn">
          <v-btn text block @click="handleLocalAuth">Sign in</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="signupState" max-width="320px">
    <v-card>
      <div style="display:flex;padding-top: 1em;align-items:center;">
        <div style="height: 50px;margin-left: 1em;width: 125px;background: url(&quot;./static/images/logo.png&quot;) 50% 50% / contain no-repeat;/* margin-top: 1em; *//* padding-top: 1em; */"></div>
        <v-spacer />
      </div>
      <div style="padding:1em;">
        <v-form lazy-validation ref="form" v-model="valid">
          <v-text-field prepend-icon="mdi-account" autocomplete="off" v-model="signupForm.email" name="email" label="E-mail" :rules="[(v) => !!v || 'Email is required']"></v-text-field>
          <v-text-field prepend-icon="mdi-lock" autocomplete="off" v-model="signupForm.pwd" name="pwd" label="Password" type="password" :rules="[(v) => !!v || 'Password is required']"></v-text-field>
          <v-text-field prepend-icon="mdi-lock-outline" autocomplete="off" v-model="signupForm.repwd" name="pwd" label="Re-Password" type="password" :rules="[(v) => !!v || 'Re-Password is required' , (v) => (v == signupForm.pwd) || 'Not Equal Passwords']"></v-text-field>
        </v-form>
      </div>
      <v-card-actions>
        <div class="container-form-btn">
          <v-btn :disabled="valid_pwd" text block @click="handleSignup">Sign up</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      mode:'login',
      loginState: true,
      signupState: false,
      loginForm: {
        email: null,
        pwd: null,
      },
      signupForm: {
        email:null,
        pwd:null,
        repwd:null
      },
      valid_pwd:true
    }
  },
  watch:{
    'signupForm': {
      deep:true,
      handler: function(v) {
        if(v.pwd.length > 0) {
          if(v.pwd == v.repwd) {
            this.valid_pwd = false;
          } else {
            this.valid_pwd = true;
          }
        }
      }
    }
  },
  methods: {
    handleSignup() {
      var me = this;
      
      this.$common.api.app.signup({email:this.signupForm.email, pwd:this.signupForm.pwd}).then(function(res) {
        me.$message(res)
        if(res.type == 'success') {
          me.signupState = false;
        }
      }).catch(function(err) {
        me.$message({type:'error',message:'서버 오류'})
      })
    },
    showSignup() {
      this.signupState = true;
    },
    changeMode() {
      this.mode = 'signup';
    },
    handleLocalAuth() {
      this.$common.api.app.signin(this.loginForm).then(function(res) {
        this.$router.push("flow");
      }.bind(this)).catch(function(err) {
        this.$message({type:'warning', message:'정확하지 않은 로그인 정보입니다.'})
      }.bind(this))
      
    }
  },
  created() {

  },
  mounted() {

  },
  destroyed() {

  }
}
</script>

<style>
.login-background {
  background: url(/static/images/background.jpg) !important;
  background-repeat: no-repeat !important;
  background-position: right !important;
  background-size: cover !important;
}

.container-form-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
