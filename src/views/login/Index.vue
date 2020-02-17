<template>
  <div class="login" :class="pageClass">
    <div class="login-wrap">
      <div class="login-wrap-title">{{ pageText[pageType] }}</div>
      <div class="login-wrap-input">
        <span class="login-wrap-input-label">账号</span>
        <input class="input" type="tel" v-model="phone" placeholder="请输入手机号码" maxlength="11" />
      </div>
      <div class="login-wrap-input">
        <template v-if="loginType == 0">
          <span class="login-wrap-input-label">验证码</span>
          <input class="input" type="tel" v-model="verifyCode" placeholder="请输入验证码" maxlength="6" />
          <span class="code-btn get-code" @click="getCode" v-if="codeText ==  '获取验证码'">{{codeText}}</span>
          <span class="code-btn has-code" v-else>{{codeText}}</span>
        </template>
        <template v-else-if="loginType == 2">
          <span class="login-wrap-input-label">密码</span>
          <input
            class="input"
            type="password"
            v-model="password"
            placeholder="请输入密码"
            maxlength="30"
          />
          <span class="code-btn forget" @click="forgetPassword">忘记密码</span>
        </template>
      </div>
      <template v-if="pageType === 1">
        <div class="right-btn">
          <span class="ah-a" @click="switchLoginType">{{loginType === 0 ? '密码登录' : '验证码登录'}}</span>
        </div>
      </template>
      <template v-else-if="pageType === 0">
        <div class="left">
          <van-checkbox class="checkbox" v-model="isRead">
            <img slot="icon" slot-scope="props" :src="props.checked ? icon.active : icon.normal" />
            已阅读并同意
            <span class="protocol" @click="readProtocol">《注册条款》</span>
          </van-checkbox>
        </div>
      </template>
      <div class="ah-button-large" @click="login">{{ pageButtonText[pageType] }}</div>
      <template v-if="pageType !== 2">
        <section class="login-wrap-tips">
          <div>
            {{ pageType === 1 ? '没' : '已' }}有账号?立即
            <a
              href="javascript:void(0)"
              class="ah-a"
              @click="switchPageType"
            >{{ pageType === 1 ? '注册' : '登录' }}</a>
          </div>
        </section>
      </template>
    </div>
    <div class="login-logo">
      <img src="../../assets/images/logo.png" alt="logo" />
    </div>
  </div>
</template>

<script>
import { Toast, Checkbox, Popup } from 'vant'
import { phoneEx } from '@/script/var'
import Service from '@/service/index'
const checkBoxNormal = require('../../assets/images/icon_checkbox_circle.png')
const checkBoxActive = require('../../assets/images/icon_checkbox_circle_active.png')

export default {
  name: 'Index',
  components: {
    [Toast.name]: Toast,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox
  },
  data () {
    return {
      phone: '',
      loginType: 0,
      pageType: 1, // 1. 登录, 0. 注册. 2. 找回密码.
      pageText: ['注册', '登录', '找回密码'],
      pageButtonText: ['注册', '登录', '下一步'],
      verifyCode: '',
      password: '',
      codeText: '获取验证码',
      isRead: false,
      showProtocol: false,
      icon: {
        normal: checkBoxNormal,
        active: checkBoxActive
      }
    }
  },
  mounted () {
    this.$emit('numChanged', 0)
    this.init()
    if (this.$route.query.pageType) {
      this.pageType = +this.$route.query.pageType
    }
    this.phone = this.utils.getStore('userName')
  },
  computed: {
    pageClass: function () {
      return 'pageType' + this.pageType
    }
  },
  methods: {
    switchLoginType () {
      this.loginType = 2 - this.loginType
    },
    readProtocol () {
      // 点击协议签保存用户输入的信息
      this.utils.setStore('userName', this.phone)
      this.$router.push('/protocol')
    },
    forgetPassword () {
      this.pageType = 2
      this.loginType = 0
    },
    switchPageType () {
      this.pageType = 1 - this.pageType
      if (this.pageType !== 1) {
        this.loginType = 0
      }
    },
    login () {
      let tips = '请输入' + (this.loginType === 0 ? '正确的验证码' : '密码')
      this.errorMsg = this.validator.required(this.phone, '请输入正确的手机号') ||
        this.validator.match(this.phone, phoneEx, '请输入正确的手机号') ||
        this.validator.required(this.loginType === 0 ? this.verifyCode : this.password, tips)

      if (this.errorMsg) {
        Toast(this.errorMsg)
        return
      }
      let query = {
        phoneNumber: this.phone,
        loginType: this.loginType,
        verifyCode: this.verifyCode,
        password: this.utils.encryptByDES(this.password)
      }
      if (this.pageType === 0) { // 注册
        if (!this.isRead) {
          Toast('请先勾选阅读协议')
          return
        }
        this.doRegister({ phonenumber: this.phone, verifyCode: this.verifyCode })
      } else { // 登录 & 找回密码
        Service.login(query).then(res => {
          if (Number(res.code) === 1 && res.msg) {
            Toast(res.msg)
            return
          }

          this.utils.setLocalstorageStore('Authorization', res.data.token)
          this.utils.setLocalstorageStore('clientKey', res.data.mobile)
          this.utils.setLocalstorageStore('userId', res.data.userId)

          this.utils.setLocalstorageStore('status', res.data.status)
          this.utils.setLocalstorageStore('userName', res.data.userName)
          this.utils.setLocalstorageStore('avatar', res.data.avatar)
          this.utils.setLocalstorageStore('auditTime', res.data['auditTime'])
          this.utils.setLocalstorageStore('registerTime', res.data['registerTime'])
          this.utils.setLocalstorageStore('auditMessage', res.data.auditMessage)
          if (this.pageType === 1) { // 登录
            if (res.data.setPassword === 1) {
              this.$router.replace('/setPassword?type=1')
              return
            }

            if (res.data.status === '2') {
              this.$router.replace('/identity')
            } else {
              this.$router.replace('/index')
            }
          } else if (this.pageType === 2) { // 找回密码
            this.$router.push('/setPassword?type=2')
          }
        }).catch(error => {
          Toast(error.msg || '登录失败')
        })
      }
    },
    doRegister (params) {
      Service.register(params).then(resp => {
        if (Number(resp.code) === 0) {
          Toast('注册成功, 请设置密码~')
          this.utils.setLocalstorageStore('clientKey', params.phonenumber)
          this.$router.replace('/setPassword?type=1')
        }
      }).catch(error => {
        Toast(error.msg || '注册失败')
      })
    },
    init () {
      if (this.utils.getStore('codeTime')) {
        let codeTime = this.utils.getStore('codeTime')
        let nowDate = new Date().getTime()
        let remainTime = 60 - Math.floor((nowDate - codeTime) / 1000)
        if (remainTime > 0) {
          this.codeText = remainTime >= 10 ? `${remainTime}s` : `0${remainTime}s`
          this.count(remainTime)
        }
      }
    },
    // 计时
    count (time = 59) {
      this.codeText = `${time}s`
      if (time === 59) {
        this.codeTime = new Date().getTime()
      }
      let timer = setInterval(() => {
        if (time > 1) {
          time--
          this.codeText = time >= 10 ? `${time}s` : `0${time}s`
        } else {
          clearInterval(timer)
          this.codeText = '获取验证码'
        }
      }, 1000)
    },
    getCode () {
      this.errorMsg = this.validator.required(this.phone, '请输入正确手机号') ||
        this.validator.match(this.phone, phoneEx, '请输入正确的手机号')

      if (this.errorMsg) {
        Toast(this.errorMsg)
        return
      }
      Service.getVerifycode({ phoneNumber: this.phone }).then(res => {
        if (Number(res.code) === 1 && res.msg) {
          Toast(res.msg)
          return
        }
        this.count(59)
        Toast('验证码发送成功')
      }).catch(error => {
        Toast(error.msg || '发送验证码失败')
      })
    }
  },
  destroyed () {
    this.utils.removeStore('codeTime')
  }
}
</script>

<style lang="less" scoped>
@import "../../style/index";

.login {
  overflow: hidden;
  &-wrap {
    padding: 1.2rem 0.6rem 0 0.6rem;

    &-title {
      padding: 1rem 0;
      .font-c(52, #333333);
      font-weight: bold;
    }
    &-input {
      position: relative;

      &-label {
        position: absolute;
        left: 0.5rem;
        transform: translateY(-50%);
        .font-c(24, #666666);
        font-weight: bold;
        letter-spacing: 1px;
      }
      input {
        height: 0.9rem;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #eeeeee;
        border-radius: 0.45rem;
        padding-left: 0.5rem;

        font-size: 0.3rem;
        &::placeholder {
          color: #ccc;
        }
      }

      &:not(:last-child) {
        margin-bottom: 0.48rem;
      }

      .code-btn {
        position: absolute;
        right: 0.4rem;
        top: 50%;
        transform: translateY(-50%);

        font-size: 0.3rem;
        color: @second-color;
      }
      .forget {
        color: @color-text-secondary;
      }
    }

    .right-btn {
      margin-bottom: 0.4rem;
      text-align: right;
      padding-right: 0.36rem;
      .ah-a {
        .font-c(30, #666666);
      }
    }
    .ah-button-large {
      box-shadow: 0px 3px 6px rgba(107, 129, 255, 0.5);
    }
    .left {
      text-align: left;
      padding-bottom: 0.4rem;
      .font-c(30, #333333);
      .checkbox {
        display: inline-block;
        img {
          width: 0.36rem;
        }
      }
    }
    &-tips {
      .font-c(30, #666666);
      padding-top: 0.4rem;
      a {
        color: @second-color;
      }
    }
  }

  &-logo {
    margin: 3rem auto 0 auto;
    text-align: center;
    img {
      height: 0.6rem;
    }
  }
}
.pageType3 {
  .login-wrap-tips {
    display: none;
  }
}
</style>
