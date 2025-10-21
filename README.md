### vue3ts-admin-template

- **使用**
1. 添加新视图组件: views/custom/Xxx.vue
2. 后端返回的路由,按照mock中已有数据格式进行返回

- **部署**
```bash
npm run build
cp dist/*  /var/www/vue3ts-admin-template
chmod -R 0755 /var/www/vue3ts-admin-template
# 这里设置为nginx启动用户
chown -R nginx:nginx /var/www/vue3ts-admin-template
```