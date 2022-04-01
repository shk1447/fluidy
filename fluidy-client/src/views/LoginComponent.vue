<template>
<v-app class="login-background">
  <!-- Common Area -->
  
  <div style="display:flex;width:100%;height:100%; align-items:center; justify-content:center;">
    <div style="width:320px;">
      <div style="display:flex;padding-top: 1em;align-items:center;">
        <div style="filter:invert(1); height: 50px;margin-left: 1em;width: 125px;background: url(&quot;./static/images/logo.png&quot;) 50% 50% / contain no-repeat;/* margin-top: 1em; *//* padding-top: 1em; */"></div>
        <v-spacer />
        <v-btn x-small fab outlined style="margin-right:1em;" color="#8bb9b7" @click="showSignup">
          <v-icon >mdi-account-plus-outline</v-icon>
        </v-btn>
      </div>
      <div style="padding:1em;">
        <v-form lazy-validation ref="form" v-model="valid">
          <v-text-field 
            prepend-icon="mdi-account" 
            autocomplete="off" 
            v-model="loginForm.email" 
            name="email" 
            label="E-mail" 
            :rules="[
              (v) => !!v || 'Email is required'
          ]"/>
          <v-text-field 
            prepend-icon="mdi-lock" 
            autocomplete="off" 
            v-model="loginForm.pwd" 
            name="pwd" 
            label="Password" 
            type="password" 
            :rules="[
              (v) => !!v || 'Password is required'
          ]"/>
          <v-alert
            v-if="ifLoginFailed"
            dense
            outlined
            type="error"
          >
            Login failed!
          </v-alert>
        </v-form>
      </div>
      
      <div class="container-form-btn">
        <v-btn block color="primary" @click="handleLocalAuth">Login</v-btn>
        <button type="button" class="google-button" @click="handleGoogleAuth">
          <span class="google-button__icon">
            <svg viewBox="0 0 366 372" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M125.9 10.2c40.2-13.9 85.3-13.6 125.3 1.1 22.2 8.2 42.5 21 59.9 37.1-5.8 6.3-12.1 12.2-18.1 18.3l-34.2 34.2c-11.3-10.8-25.1-19-40.1-23.6-17.6-5.3-36.6-6.1-54.6-2.2-21 4.5-40.5 15.5-55.6 30.9-12.2 12.3-21.4 27.5-27 43.9-20.3-15.8-40.6-31.5-61-47.3 21.5-43 60.1-76.9 105.4-92.4z"
                id="Shape"
                fill="#EA4335"
              />
              <path d="M20.6 102.4c20.3 15.8 40.6 31.5 61 47.3-8 23.3-8 49.2 0 72.4-20.3 15.8-40.6 31.6-60.9 47.3C1.9 232.7-3.8 189.6 4.4 149.2c3.3-16.2 8.7-32 16.2-46.8z" id="Shape" fill="#FBBC05" />
              <path d="M361.7 151.1c5.8 32.7 4.5 66.8-4.7 98.8-8.5 29.3-24.6 56.5-47.1 77.2l-59.1-45.9c19.5-13.1 33.3-34.3 37.2-57.5H186.6c.1-24.2.1-48.4.1-72.6h175z" id="Shape" fill="#4285F4" />
              <path d="M81.4 222.2c7.8 22.9 22.8 43.2 42.6 57.1 12.4 8.7 26.6 14.9 41.4 17.9 14.6 3 29.7 2.6 44.4.1 14.6-2.6 28.7-7.9 41-16.2l59.1 45.9c-21.3 19.7-48 33.1-76.2 39.6-31.2 7.1-64.2 7.3-95.2-1-24.6-6.5-47.7-18.2-67.6-34.1-20.9-16.6-38.3-38-50.4-62 20.3-15.7 40.6-31.5 60.9-47.3z" fill="#34A853" />
            </svg>
          </span>
          <span class="google-button__text">Login with Google</span>
        </button>
      </div>
    </div>
  </div>
  

  <v-dialog v-model="signupState" max-width="320px">
    <v-card>
      <div style="display:flex;padding-top: 1em;align-items:center;">
        <div style="filter:invert(1);height: 50px;margin-left: 1em;width: 125px;background: url(&quot;./static/images/logo.png&quot;) 50% 50% / contain no-repeat;/* margin-top: 1em; *//* padding-top: 1em; */"></div>
        <v-spacer />
      </div>
      <div style="padding:1em;">
        <form ref="form">
          <v-text-field prepend-icon="mdi-account" 
            autocomplete="off" 
            v-model="signupForm.email" 
            :error-messages="emailErrors"
            label="E-mail"
            @input="$v.signupForm.email.$touch()"
            @blur="$v.signupForm.email.$touch()"
          ></v-text-field>          
          <v-text-field 
            prepend-icon="mdi-lock" 
            autocomplete="off" 
            :error-messages="passwordError"
            v-model="signupForm.pwd" 
            @input="$v.signupForm.pwd.$touch()"
            @blur="$v.signupForm.pwd.$touch()"
            label="Password" 
            type="password"             
          />            
          <v-text-field 
            prepend-icon="mdi-lock-outline" 
            autocomplete="off" 
            :error-messages="rePasswordError"
            v-model="signupForm.repwd" 
            name="pwd" 
            label="Re-Password" 
            type="password" 
            @input="$v.signupForm.repwd.$touch()"
            @blur="$v.signupForm.repwd.$touch()"
          />
          <v-text-field 
            prepend-icon="mdi-domain" 
            autocomplete="off" 
            v-model="signupForm.company_name" 
            name="company_name" 
            label="Comapy Name"            
          />
          <v-text-field 
            prepend-icon="mdi-rename-box" 
            autocomplete="off" 
            v-model="signupForm.first_name" 
            name="first_name" 
            label="First Name"            
          />
          <v-text-field 
            prepend-icon="mdi-rename-box" 
            autocomplete="off" 
            v-model="signupForm.last_name" 
            name="last_name" 
            label="Last Name"            
          />     
          <v-text-field 
            prepend-icon="mdi-phone" 
            autocomplete="off" 
            v-model="signupForm.phone_number" 
            name="phone_number" 
            label="Phone Number"            
          />     
          <v-file-input
            show-size
            truncate-length="15"
            :error-messages="photoError"
            v-model="signupForm.photo"
            @input="$v.signupForm.photo.$touch()"
            @blur="$v.signupForm.photo.$touch()"
            name="photo"
            :rules="[(v) => !!v || 'photo is required']"
          ></v-file-input>
          <v-alert
            v-if="ifSignupFailed"
            dense
            outlined
            type="error"
          >
            Signup failed!
          </v-alert>
        </form>
      </div>
      <v-card-actions>
        <div class="container-form-btn">
          <v-btn text block @click="handleSignup">Sign up</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-app>
</template>

<script>
  import {createUser, login} from '../api/user/userAPI'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  export default {
    mixins: [validationMixin],    
    data() {
      return {
        ifLoginFailed: false,
        ifSignupFailed : false,
        loginState: true,
        signupState: false,
        loginForm: {
          email: null,
          pwd: null,
        },
        signupForm: {
          email: null,
          pwd: null,
          repwd: null,
          company_name: null,
          phone_number: null,
          first_name: null,
          last_name: null,
          photo: null
        },
        valid_pwd:true
      }
    },  
    validations: {
      loginForm : {
        email: { required, email },
        pwd: {required}
      },
      signupForm : {
        email: { required, email },
        pwd: {required},
        repwd: {required},
        photo: {required},        
      }
      
    },
    methods: {    
      photoErrors () {
        const errors = [];
        if (!this.$v.signupForm.photo.$dirty) return errors[0];      
        !this.$v.signupForm.photo.required && errors.push('photo is required')
        return errors[0]
      }, 
      emailErrors () {
        const errors = [];
        if (!this.$v.signupForm.email.$dirty) return errors[0];        
        !this.$v.signupForm.email.email && errors.push('Must be valid e-mail')
        !this.$v.signupForm.email.required && errors.push('E-mail is required')
        return errors[0]
      },
      passwordError(){
        const errors = [];
        if (!this.$v.signupForm.pwd.$dirty) return errors[0];      
        !this.$v.signupForm.pwd.required && errors.push('confirming password is required')
        return errors[0]
      },
      rePasswordError(){
        const errors = [];
        if (!this.$v.signupForm.repwd.$dirty) return errors[0];      
        (this.signupForm.pwd !== this.signupForm.repwd) && errors.push('re confirm password')
        !this.$v.signupForm.repwd.required && errors.push('confirming password is required')
        return errors[0]
      },
      async handleSignup() {
        try {
          const formData = new FormData();
          Object.keys(this.signupForm)
          .forEach((key)=>{
            formData.append(key, this.signupForm[key])
          })
          const response = await createUser(formData);    
          if(response.status === 200){
            console.log("가입 성공")
            this.ifSignupFailed = false;
            setTimeout(()=>{
              this.signupState = false;
            }, 500)
          }else{
            console.log("가입 실패")
            this.ifSignupFailed = true;
          }        
        } catch(error){
          this.ifSignupFailed = true;
        }        
      },
      showSignup() {
        this.signupState = true;
      },    
      async handleLocalAuth() {
        try {
          const response = await login(this.loginForm);    
          if(response.status === 200){
            console.log("로그인 성공")
            this.ifLoginFailed = false; 
            this.$router.push({ path: 'main' })
          }else{
            console.log("로그인 실패")
            this.ifLoginFailed = true;
          }           
        }catch(error){
          this.ifLoginFailed = true;
        }        
      },
      handleGoogleAuth(e) {
        e.preventDefault();
        location.href = "/auth/google";
      }
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
}

.google-button {
  margin-top: 1em;
  width: 100%;
  height: 40px;
  border-width: 0;
  background: white;
  color: #737373;
  border-radius: 5px;
  white-space: nowrap;
  box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
  transition-property: background-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  padding: 0;
}
.google-button:focus {
  box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
}
.google-button:hover {
  box-shadow: 1px 4px 5px 1px rgba(0, 0, 0, 0.1);
}
.google-button:active {
  background-color: #e5e5e5;
  box-shadow: none;
  transition-duration: 10ms;
}

.google-button__icon {
  display: inline-block;
  vertical-align: middle;
  margin: 8px 0 8px 8px;
  width: 18px;
  height: 18px;
  box-sizing: border-box;
}

.google-button__icon--plus {
  width: 27px;
}

.google-button__text {
  display: inline-block;
  color:#737373;
  vertical-align: middle;
  padding: 0 24px;
  font-size: 14px;
  font-weight: bold;
  font-family: "Roboto", arial, sans-serif;
}
</style>
