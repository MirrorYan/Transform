<template>
  <div class="login-page">
    <div class="login-box">
      <div class="top-padding"></div>
      <div class="login-form">
        <div class="logo-container">
          <img src="../assets/logo.png" alt="Logo">
        </div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="65px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" />
          </el-form-item>
          <el-form-item label="验证码" prop="code" class="form-item-verify">
            <el-input v-model="form.code" />
            <em class="el-icon-refresh" @click="handleLoadVerify" />
            <el-image fit="contain" :src="'data:image/png;base64,' + imgCode" />
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
import { getVerifyCode, userLogin } from '../utils/api';

export default {
  name: 'PageLogin',
  data () {
    return {
      imgCode: '',
      form: {
        username: '',
        password: '',
        code: '',
        codeId: null
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.handleLoadVerify();
  },
  methods: {
    handleLoadVerify () {
      getVerifyCode().then(res => {
        this.imgCode = res.base64Code;
        this.form.codeId = res.codeId;
      });
    },
    onSubmit () {
      const data = {
        ...this.form,
        username: setEncrypt(this.form.username),
        password: setEncrypt(this.form.password)
      };
      this.$refs.loginForm.validate(valid => {
        if (!valid) return;
        userLogin({...data}).then(res => {
          window.localStorage.setItem('token', res.token);
          this.$message({
            message: '登录成功！',
            type: 'success',
            duration: 1500
          });
          this.$router.push('/');
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
  background: url(../assets/forest.jpg) no-repeat;
  background-position: center;
  background-size: cover;
  .login-box {
    width: 98%;
    max-width: 450px;
    margin: auto;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(255, 255, 255, .5);
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
  .form-item-verify {
    position: relative;
    .el-input {
      width: 50%;
    }
    .el-icon-refresh {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
    }
    .el-image {
      float: right;
      width: 120px;
      height: 40px;
      margin-right: 15px;
      vertical-align: middle;
    }
  }
}
</style>