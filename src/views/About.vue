<template>
  <div class="about">
    <div class="site-content">
      <div class="content-warp">
        <div class="about-site about-info">
          <section-title><span>❤</span>关于博客</section-title>
          <div class="info-card">
            <p>本站的前端页面来自<a target="_blank" class="out-link" href="http://static.fengziy.cn/Gblog/">Gblog</a>。
            </p>
            <p>不过我又用vue3+element-plus重写了一遍，样式基本没变。</p>
            <p>
              <a target="_blank" href="https://github.com/fetie" style="color: #ff6d6d;">Github仓库</a>记得star★哟
            </p>
          </div>
        </div>
        <div class="about-me about-info">
          <section-title id="Guestbook"><span>❤</span>给我留言</section-title>
          <div class="info-card">
            <el-form ref="contactForm" hide-required-asterisk :rules="contactRule" :model="form" label-width="50px">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="内容" prop="content">
                <el-input v-model="form.content" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitMessage">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref,reactive} from 'vue'
import sectionTitle from '@/components/section-title.vue'
import { ElMessage } from 'element-plus'
import {leaveMessage} from '@/api'

const form=reactive({
  email:'',
  content:''
})
const contactRule=reactive({
  email:[
    {required: true, message: '邮箱不能为空', trigger: 'blur',},
    {type: 'email', message: '邮箱格式有误', trigger: 'blur',}
  ],
  content:[
    {required: true, message: '内容不能为空', trigger: 'blur',}
  ]
})

const contactForm=ref(null)
function submitMessage(){
  contactForm.value.validate((valid) => {
    if (valid) {
      leaveMessage(form).then(res => {
        let result=res.result
        if(result){
          ElMessage.success('留言成功')
        }
      }).catch(err => {
          console.log(err)
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })

}
</script>

<style scoped lang="less">
.about {
  padding-top: 40px;
}

.content-warp {
  margin-top: 80px;

  .about-info {
    margin: 30px 0;

    span {
      color: red;
      margin-right: 10px;
    }

    .info-card {
      min-height: 100px;
      padding: 20px;
      border-radius: 3px;
      margin: 30px 0 50px 0;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .el-form-item{
        &:last-child{
          margin-bottom: 0;
        }
      }
      p {
        line-height: 1.7rem;
      }
    }
  }
}

/*******/
@media (max-width: 800px) {
  .content-warp {
    margin-top: 0;
  }
}
</style>
