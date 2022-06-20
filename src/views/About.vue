<template>
  <div class="about">
    <div class="site-content">
      <div class="content-warp">
        <div class="about-site about-info">
          <section-title><span>❤</span>关于博客</section-title>
          <div class="info-card">
            <p>
              本站的前端页面来自<a
                target="_blank"
                class="out-link"
                href="http://static.fengziy.cn/Gblog/"
                >Gblog</a
              >。不过我用vue3+ts重构了。
            </p>
            <p>
              本站的中国疆域历史地图全部来自<a
                target="_blank"
                class="out-link"
                href="https://sdmtai.github.io/"
                >https://sdmtai.github.io/</a
              >
            </p>
            <p>
              <a
                target="_blank"
                href="https://github.com/fetie/feBlogVue"
                style="color: #ff6d6d"
                >我的Github仓库</a
              >记得star★哟
            </p>
          </div>
        </div>
        <div class="about-me about-info">
          <section-title id="Guestbook"><span>❤</span>给我留言</section-title>
          <div class="info-card">
            <el-form
              ref="contactForm"
              hide-required-asterisk
              :rules="contactRule"
              :model="form"
              label-width="50px"
            >
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item label="内容" prop="content">
                <el-input v-model="form.content" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <feButton @click="submitMessage">提交</feButton>
                <!--      el-button在uc移动端显示不出来-->
                <!--                <el-button type="primary" @click="submitMessage">提交</el-button>-->
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import sectionTitle from '@/components/section-title.vue'
import feButton from '@/components/fe-button.vue'
import { leaveMessage } from '@/api'

const form = reactive({
  email: '',
  content: '',
})
const contactRule = reactive({
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '邮箱格式有误', trigger: 'blur' },
  ],
  content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
})

const contactForm = ref()
function submitMessage() {
  if (contactForm.value) {
    contactForm.value.validate((valid: boolean) => {
      if (valid) {
        leaveMessage(form)
          .then((res) => {
            const result = res.result
            if (result) {
              ElMessage.success('留言成功')
            }
            setTimeout(() => {
              location.reload()
            }, 1000)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      else {
        console.log('error submit!!')
        return false
      }
    })
  }
}
</script>

<style scoped lang="less">
.about {
  padding-top: 40px;
}

.content-warp {
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
      .el-form-item {
        &:last-child {
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
