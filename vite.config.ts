import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'
import type { ParseOptions, CompressOptions } from 'terser'


// https://vite.dev/config/
export default defineConfig(({ }) => ({
  plugins: [
    vue(),
    vueDevTools(),
    viteMockServe({
      mockPath: 'src/mock',      // mock 文件目录
      enable: true,
      watchFiles: true,       // 文件热更新
      logger: true,
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts', // 生成的全局类型声明
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts', // 生成的组件类型声明
    }),
    obfuscatorPlugin({
      include: [
        // 混淆打包输出的 JS/TS 转译产物
          /\.[jt]s(x)?$/,
          // 如果你使用 rollup code-splitting 生成 chunk 名包含 js 扩展：
          /\.js$/
      ],
      exclude: [
        'node_modules',     // 不混淆第三方库（性能+兼容）
        'public',           // 静态资源
        'dist',             // 输出目录（避免重复处理）
        '**/*.d.ts',        // 类型文件
        /core\.wasm$/,      // wasm 文件不要混淆
        /.*\\.worker\\.js$/, // web worker 可能需要保持可读以便调试
      ],
      // 真正传给 javascript-obfuscator 的参数
        options: {
          compact: true,                          // 移除空白
          controlFlowFlattening: true,            // 控制流扁平化（增加难度，但会增加体积/慢）
          controlFlowFlatteningThreshold: 0.75,   // 多少比例的函数启用变换
          numbersToExpressions: true,             // 数字表达式混淆
          simplify: true,                         // 简化同类表达式（配合其他选项）
          stringArray: true,                      // 把字符串放入数组并引用
          stringArrayThreshold: 0.9,              // 多少比例的字符串走 stringArray
          rotateStringArray: true,
          transformObjectKeys: true,
          // 下面两项慎用（会破坏某些框架/绑定形式）
          // identifierNamesGenerator: 'hexadecimal', // 变量名生成策略：'hexadecimal'|'mangled'|'dictionary'
          // renameGlobals: false,
          // 把一些常见的全局函数/接口名排除，避免破坏运行时
          // 例如：Vue runtime helpers、window、document、__webpack_require__（按需加入）
        },

        // 调试开关：构建时输出匹配/排除信息，便于排查哪些文件被处理
        debugger: false,

        // 只在 build 阶段应用插件（减少 dev 时的干扰）
        apply: 'build'
    })
  ],
  build:{
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2
      } as CompressOptions,
      mangle: {
        toplevel: true
      }
    } as ParseOptions
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 7776,
    host: '0.0.0.0'
  }
}))
