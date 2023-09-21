<template>
  <div class="login-container">
    <el-form ref="form" label-width="70px" :model="form" :rules="rules" :inline="true">
      <h3 class="login-title">系统登陆</h3>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input
      ></el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder=" 请输入密码"
          type="password"
        ></el-input
      ></el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import  Mock  from 'mockjs'
import cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "请输入密码",
          },
        ],
      },
    };
  },
  methods:{
    submit(){
        // const token = Mock.Random.guid()
        // cookie.set('token',token)
        this.$refs.form.validate((valid)=>{
            if(valid){
                getMenu(this.form).then(({data})=>{
                    console.log(data)
                    if(data.code===20000){
                        cookie.set('token', data.data.token)
                        this.$store.commit('setMenu',data.data.menu)
                        this.$store.commit('addMenu',this.$router)
                    }
                    else{
                        this.$message.error(data.data.message)
                    }
                })
            }
        })
          
        this.$router.push('/home')
     
    }

  },

};
</script>

<style lang="less" scoped>
.login-container {
  box-sizing: border-box;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  .login-title {
    text-align: center;
    font-weight: 700;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-input {
    width: 198px;
  }
  .el-button {
    margin-left: 105px;
    margin-top: 10px;
  }
}
</style>
