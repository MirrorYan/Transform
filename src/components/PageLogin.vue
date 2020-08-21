<template>
  <div class="login-page">
    <div class="login-box">
      <div class="top-padding"></div>
      <div class="login-form">
        <div class="logo-container">
          <img src="../assets/logo.png" alt="Logo">
        </div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="50px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" @input="handleInput" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" />
          </el-form-item>
          
          <el-form-item label-width="10px">
            <el-checkbox label="记住密码" name="remember" />
            <el-link href="/forget" type="primary" class="forget">忘记密码?</el-link>
            <el-link href="/register" type="primary" class="register">注册账号</el-link>
          </el-form-item>
          <el-form-item label-width="10px">
            <el-button type="primary"
              style="width:100%;"
              @click="onSubmit"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import setEncrypt from '../utils/jsencrypt';
import { userLogin } from '../utils/api';

export default {
  name: 'PageLogin',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleInput (val) {
      // console.log(val)
    },
    onSubmit () {
      const that = this;
      const data = {
        username: setEncrypt(this.form.username),
        password: setEncrypt(this.form.password)
      };
      this.$refs.loginForm.validate(valid => {
        if (!valid) return;
        userLogin({...data}).then(res => {
          window.localStorage.setItem('token', res.token);
          that.$message({
            message: '登录成功！',
            type: 'success',
            duration: 1500
          });
          that.$router.push('/');
        });
      });
    }
  }
}
</script>

<style lang="scss">
.login-page {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/flower.svg);
  background-position: center;
  .login-box {
    width: 98%;
    max-width: 450px;
    margin: auto;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #eee;
    box-shadow: 0 0 20px #ddd;
  }
  .top-padding {
    height: 100px;
    background: $milk-blue;
  }
  .login-form {
    padding: 0 30px 20px;
    margin-top: -50px;
  }
  .logo-container {
    text-align: center;
    margin-bottom: 20px;
  }
  .el-link {
    float: right;
    &.forget {
      margin-left: 20px;
    }
  }
}
</style>