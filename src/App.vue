<template>
  <div id="app">
    <el-menu class="nav-bar"
            mode="horizontal"
            :default-active="'1'"
            @select="handleSelect"
            background-color="#fff"
            text-color="#000"
            active-text-color="#5fb709"
    >
      <el-menu-item index="MainPage"><el-icon class="el-icon-s-home"/></el-menu-item>
      <el-button class="log-button" v-if="!this.isAdminMode" @click="isDialogVisible = true">Login</el-button>
      <el-button class="log-button" v-if="this.isAdminMode" @click="logOut()">Logout</el-button>
      <div class="lock-icon">
        <el-icon v-if="!this.isAdminMode" class="el-icon-lock"/>
        <el-icon v-else class="el-icon-unlock"/>
      </div>
    </el-menu>
    <img src="./assets/Vuber_eats_logo.png"/>
    <router-view/>
    <el-dialog
            title="Login"
            :visible.sync="isDialogVisible || this.isPending"
            width="30%"
            @closed="resetIsFailure"
    >
      <el-spinner v-if="this.isPending"></el-spinner>
      <el-form ref="form" :model="loginForm" label-width="120px" :label-position="'left'">
        <el-form-item
                :rules="[{ required: true, message: 'An username is required'},]"
                label="Username"
                prop="username">
          <el-input v-model="loginForm.username"/>
        </el-form-item>
        <el-form-item label="Password"
                      :rules="[{ required: true, message: 'A password is required'},]"
                      prop="password">
          <el-input type="password" v-model="loginForm.password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">Submit</el-button>
          <el-button @click="isDialogVisible = false">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'app',
  computed: mapState({
    isAdminMode: state => state.user.isAdmin,
    isPending: state => state.user.isPending,
    username: state => state.user.username,
    isFailure: state => state.user.isFailure
  }),
  data(){
    return {
      isDialogVisible: false,
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('user/login', this.loginForm);
          if(!this.isFailure) {
            this.isDialogVisible = false;
            this.$message.success({
              duration: 2000,
              showClose: true,
              dangerouslyUseHTMLString: true,
              message: '<span class="notification-message">Welcome ' + this.username + '</span>'
            });
          } else {
            this.$message.error({
              showClose: true,
              dangerouslyUseHTMLString: true,
              message: '<span class="notification-message">' + this.isFailure + '</span>'
            });
          }
        } else {
          return false;
        }
      });
    },
    handleSelect(index){
      if (this.$router.currentRoute.name !== index) {
        this.$router.push({name: index})
      }
    },
    resetIsFailure(){
      this.$store.commit('user/setIsFailure', '')
    },
    async logOut(){
      await this.$store.dispatch('user/resetUser');
      this.$message.info({
        duration: 2000,
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: '<span class="notification-message">Logged out</span>'
      });
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #ffffff;
  }

  body {
    background-color: #000000;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #409EFF;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #409EFF;
  }
  .el-drawer__body {
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .nav-bar {
    display: flex;
    justify-content: flex-end;
  }

  .log-button {
    border: 0;
  }

  .lock-icon {
    display: flex;
    align-self: center;
    margin-right: 1rem;
  }

  .notification-message {
    font-family: 'Avenir', Helvetica, Arial, sans-serif ;
  }

  .el-form-item__content {
    margin-top: 1rem;
  }
</style>
