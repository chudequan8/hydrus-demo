<template>
  <div class="login-container">
    <el-card class="login-card animated bounceInDown">
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
        label-width="0px"
      >
        <h3 class="login-title">登录系统</h3>
        <el-form-item prop="username">
          <svg class="icon icon-container" aria-hidden="true">
            <use xlink:href="#icon-account"></use>
          </svg>
          <el-input
            @keyup.enter.native="handleLogin"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <svg class="icon icon-container" aria-hidden="true">
            <use xlink:href="#icon-password"></use>
          </svg>
          <el-input
            name="password"
            type="password"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="15">
            <el-form-item prop="code">
              <svg class="icon icon-container" aria-hidden="true">
                <use xlink:href="#icon-authority"></use>
              </svg>
              <el-input
                name="code"
                type="text"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.code"
                placeholder="请输入验证码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <img
              class="verify-pic"
              @click="refreshCode"
              :src="imgDataURL"
              alt=""
            />
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%;"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { createVeryCode } from '@/utils'
export default {
  name: 'login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('验证码不能为空'))
      } else if (value !== this.vcode) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin',
        code: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            message: '账户不能为空',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePass
          }
        ],
        code: [
          {
            required: true,
            trigger: 'blur',
            validator: validateCode
          }
        ]
      },
      loading: false,
      vcode: '',
      imgDataURL: ''
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByEmail', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push({
                path: '/'
              })
            })
            .catch(() => {
              this.refreshCode()
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    refreshCode() {
      const result = createVeryCode()
      this.vcode = result.code // 随机生成的验证码
      this.imgDataURL = result.dataURL // 验证码图片的 base64
    }
  },
  created() {
    this.refreshCode()
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/mixin.scss';
.login-container {
  @include relative;
  height: 100vh;
  background-color: #2d3a4b;
  background-image: url('../../assets/login_bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  input:-webkit-autofill {
    transition: all 99999s ease-in;
    box-shadow: 0 0 0 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  .login-title {
    font-size: 24px;
    font-weight: 400;
    margin: 0 auto 40px;
    text-align: center;
    font-weight: bold;
  }
  .login-card {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px;
    margin: 120px auto;
  }
  .verify-pic {
    width: 100%;
    height: 36px;
    cursor: pointer;
  }
}
</style>
