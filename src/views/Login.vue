<template>
  <div class="login-container">
    <el-card class="login-card" shadow="hover">
      <h2 class="title">后台管理系统</h2>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="0"
        @keyup.enter="handleLogin"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="User"
            clearable
          />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :type="passwordVisible ? 'text' : 'password'"
            placeholder="请输入密码"
            prefix-icon="Lock"
            clearable
          >
            <template #suffix>
              <el-icon @click="passwordVisible = !passwordVisible" class="cursor-pointer">
                <component :is="passwordVisible ? 'View' : 'Hide'" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from "vue"
import { ElMessage } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"
import { useUserStore } from "@/stores/user"
import router from "@/router"

// 表单数据
const loginForm = reactive({
    username: "",
    password: ""
})

// 校验规则
const rules: FormRules = {
    username: [{ required: true, message: "请输入用户", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
}

// refs
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const passwordVisible = ref(false)
const userStore = useUserStore()

// 登录逻辑
const handleLogin = async () => {
    if (!loginFormRef.value) return
    loginFormRef.value.validate((valid) => {
        if (valid) {
            loading.value = true
            setTimeout(async () => {
                loading.value = false
       
                if (await userStore.login(loginForm)) {
                  ElMessage.success("登录成功")
                  nextTick()
                  router.replace({ path: '/home' })
                } else {
                  ElMessage.error("用户名或密码错误")
                }
            }, 1500)
        }
    })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #74ebd5 0%, #acb6e5 100%);
}

.login-card {
  width: 360px;
  padding: 30px 20px;
  border-radius: 12px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
}

.login-btn {
  width: 100%;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
