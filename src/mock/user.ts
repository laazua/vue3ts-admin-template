// mock用户相关的数据
import type { LoginRequest } from '@/type/user'
import type { MockMethod } from 'vite-plugin-mock'


export default [
  {
    url: '/api/login',
    method: 'post',
    response: (body: LoginRequest) => {
      const { username, password } = body
      if (username === 'admin' && password === '123456') {
        return { code: 20000, message: '登录成功', data: { token: 'vue3ts-admin-template' } }
      }
      return { code: 40000, message: '认证失败', data: null }
    }
  },
  {
    url: '/api/user/admin',
    method: 'get',
    response: () => {
      const userInfo = {
        name: 'admin',
        email: 'admin@test.com',
        roles: ['admin'],
        routes: [
         {
            path: '/system',
            name: 'system',
            component: 'Layout',
            redirect: '/system/menu',
            meta: { title: '系统管理', icon: 'Tools' },
            children: [
              {
                path: 'role',
                name: 'role',
                component: 'Role',
                meta: { title: '角色管理', icon: 'Avatar' }
              },
              {
                path: 'menu',
                name: 'menu',
                component: 'Menu',
                meta: { title: '菜单管理', icon: 'Menu' }
              }
            ]
          }
        ]
      }
      return { code: 20000, message: '获取用户信息成功', data: userInfo }
    }
  }
] as MockMethod[]