<template>
  <div class="login-container">
    <el-card
      class="login-card"
      shadow="hover"
      :class="{ 'enter-active': cardEnter }"
    >
      <h2 class="title">vue3ts-admin-template</h2>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="0"
        @keyup.enter="handleLogin"
        class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户"
            clearable
            class="custom-input"
          >
            <template #prefix>
              <el-icon class="icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :type="passwordVisible ? 'text' : 'password'"
            placeholder="请输入密码"
            clearable
            class="custom-input"
          >
            <template #prefix>
              <el-icon class="icon"><Lock /></el-icon>
            </template>
            <template #suffix>
              <el-icon
                @click="passwordVisible = !passwordVisible"
                class="cursor-pointer toggle-icon"
              >
                <component :is="passwordVisible ? View : Hide" />
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
            <span v-if="!loading">登录</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { ElMessage  } from "element-plus"
import type { FormInstance, FormRules } from "element-plus"
import { useUserStore } from "@/stores/user"
import router from "@/router"
import { User, Lock, View, Hide } from "@element-plus/icons-vue"

const loginForm = reactive({
  username: "admin",
  password: "123456"
})

const rules: FormRules = {
  username: [{ required: true, message: "请输入用户", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
}

const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const passwordVisible = ref(false)
const userStore = useUserStore()
const cardEnter = ref(false)

onMounted(() => {
  setTimeout(() => {
    cardEnter.value = true
  }, 100) // 页面加载后触发动画
})

const handleLogin = async () => {
  if (!loginFormRef.value) return

  loginFormRef.value.validate(async (valid) => {
    if (!valid) {
      ElMessage.warning('请填写完整信息')
      return
    }
    loading.value = true // 开始 loading
    try {
      const success = await userStore.login(loginForm)
      if (success) {
        ElMessage.success('登录成功')
        router.replace({ path: '/home' })
      } else {
        ElMessage.error('用户名或密码错误')
      }
    } catch (err) {
      console.error(err)
      ElMessage.error('用户名或密码错误')
    } finally {
      loading.value = false // 登录结束后关闭 loading
    }
  })
}


</script>

<style scoped>

:global(body) {
  margin: 0;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #74ebd5 0%, #acb6e5 100%);
}

/* 卡片动画 */
.login-card {
  width: 380px;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  background: #ccdbd7;
  transform: scale(0.9);
  opacity: 0;
  transition: all 0.5s ease;
}

.login-card.enter-active {
  transform: scale(1);
  opacity: 1;
}

.login-card:hover {
  transform: translateY(-3px) scale(1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.title {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
}

.login-form {
  width: 100%;
}

.custom-input {
  border-radius: 8px;
  background: #f9f9f9;
  transition: all 0.3s ease;
}

.custom-input .el-input__inner {
  border-radius: 8px;
  background: #f9f9f9;
  padding-left: 40px;
  transition: all 0.3s ease;
}

.custom-input .el-input__inner:focus {
  border-color: #667eea;
  box-shadow: 0 0 6px rgba(102, 126, 234, 0.5);
}

.icon {
  color: #909399;
}

.toggle-icon {
  color: #909399;
}

.login-btn {
  width: 100%;
  border-radius: 8px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: linear-gradient(90deg, #5a67d8 0%, #6b46c1 100%);
}

.cursor-pointer {
  cursor: pointer;
}

</style>
