<template lang="jade">
div#auth
  star-flow
  div#auth-input
    el-row(:gutter="20")
      el-col(:span="8", :offset="8")
        el-tooltip(:disabled="disabled", :content="errorTip", placement="bottom-start", effect="light")
          el-input(placeholder="请输入密码", v-model="password", type="password")
            template(slot="append")
              el-button(@click="signin") Go
</template>

<script>
import StarFlow from './StarFlow'

export default {
  name: 'auth',
  components: { StarFlow },
  data () {
    return {
      password: '',
      disabled: true,
      errorTip: ''
    }
  },
  methods: {
    setTip (tip) {
      this.errorTip = tip
      this.disabled = false
      setTimeout(() => {
        this.disabled = true
        this.errorTip = ''
      }, 1500)
    },

    signin () {
      if (!this.password) {
        this.setTip('密码不能为空')
      } else {
        // TODO: 向后台验证密码
        if (this.password === 'hongchh') {
          this.$router.push('/main')
        } else {
          this.setTip('密码错误')
        }
      }
    }
  }
}
</script>

<style lang="sass">
#auth
  width: 100%
  height: 100%
  background: url(../../assets/auth-bg.jpg) no-repeat
  background-size: 100% 100%
  background-attachment: fixed
  #auth-input
    position: absolute
    width: 100%
    height: 10%
    top: 45%
</style>