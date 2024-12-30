---
title: unplugin-vue-cssvars
owner: unplugin
name: unplugin-vue-cssvars
stars: 132
forks: 21
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

<p align="center">
  <img src="https://file.302.ai/gpt/imgs/20241230/f4796a6cc1f34870a70756f5b0656320.png" />
</p>
<h1 align="center">
unplugin-vue-cssvars
</h1>
<p align="center">
🌀 一个允许您在 CSS 文件中使用 Vue3 的 CSSVars 功能的 Vue 插件
</p>
<p align="center">
英语 | <a href="https://github.com/unplugin/unplugin-vue-cssvars/blob/master/README.ZH-CN.md" target="_blank">中文</a>
</p>

## 特性

* 🧩 这是 Vue 的功能扩展
* 🌈 兼容多种打包平台（vite、webpack）
* ⛰ 支持 css、sass、scss、less、stylus
* ⚡ 支持热模块替换（hmr）

## 核心策略

1. 当使用开发服务器时，
`unplugin-vue-cssvars` 将分析组件中引用的 css 文件，
并在 `@vitejs/plugin-vue` 的转换代码中注入样式。
2. 当构建时，`unplugin-vue-cssvars` 将分析组件中引用的 css 文件并注入到
组件单文件中，无需担心产生冗余代码，打包工具（如 vite）将自动处理。

## 安装

```bash
npm i unplugin-vue-cssvars -D
```
或者
```bash
yarn add unplugin-vue-cssvars -D
```
或者
```bash
pnpm add unplugin-vue-cssvars -D
```

## 使用
1. 使用插件并设置选项
<details>
<summary>Vite</summary>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { viteVueCSSVars } from 'unplugin-vue-cssvars'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
export default defineConfig({
  plugins: [
    vue(),
    viteVueCSSVars({
      include: [/.vue/],
      includeCompile: ['**/**.scss'],
      server: false,
    }) as PluginOption,
  ],
})
```

</details>
<br>
<details>
<summary>Rollup</summary>

```ts
// rollup.config.js
import { rollupVueCSSVars } from 'unplugin-vue-cssvars'
export default {
  plugins: [
    rollupVueCSSVars(/* options */),
  ],
}
```

</details>
<br>
<details>
<summary>Webpack</summary>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-cssvars').webpackVueCSSVars({ /* options */ }),
  ],
}
```
</details>
<br>
<details>
<summary>Vue CLI</summary>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-cssvars').webpackVueCSSVars({ /* options */ }),
    ],
  },
}
```

</details>
<br>
<details>
<summary>ESBuild</summary>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import { esbuildVueCSSVars } from 'unplugin-vue-cssvars'

build({
  plugins: [esbuildVueCSSVars(/* options */)],
})
```
</details>

2. 使用 `v-bind-m`

```
// foo.css
.foo{
   color: v-bind-m(fontColor)
}
```

3. 使用别名   
例如，您有以下项目结构：  

![img.png](public/img.png)

 ```
// App.vue
<template>
  <div class="scss">
    app
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/mixin';
</style>

```

然后您可以像这样进行配置

```
// vite.config.ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteVueCSSVars } from '../dist'
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    viteVueCSSVars({
      include: [/.vue/],
      includeCompile: ['**/**.scss'],
      alias: {
        '@': resolve(__dirname, './src'),
      },
    }),
  ],
})
````

## 选项

```typescript
export interface Options {
   /**
    * 提供将被转换的路径
    * @default process.cwd()
    */
   rootDir?: string
   
   /**
    * 用于匹配要转换的文件的 RegExp 或 glob
    */
   include?: FilterPattern

   /**
    * 用于匹配不应被转换的文件的 RegExp 或 glob
    */
   exclude?: FilterPattern
   
   /**
    * 指定要编译的文件，例如，
    * 如果您想编译 scss，那么您可以传递 ['**/**.sass']
    * @property { ['**/**.css', '**/**.less', '**/**.scss', '**/**.sass', '**/**.styl'] }
    * @default ['**/**.css']
    */
   includeCompile?: Array<string>
   
   /**
    * 标志在开发时是否启动服务器，
    * 因为 unplugin-vue-cssvars 在构建和服务器开发时使用不同的策略
    * 如果在 vite 中未传递，unplugin-vue-cssvars 将自动 
    * 识别配置的命令以确定服务器值
    * @default true
    */
   server?: boolean

   /**
    * 别名
    * @default undefined
    */
   alias?: Record<string, string>
}
```

## 提示

### ● 转换分析时的规则
1. 在 `sfc` 中，如果 `@import` 指定了后缀，转换分析将根据后缀文件进行，
否则转换分析将根据当前 `style` 标签的 `lang` 属性（默认为 `css`）进行。
2. `css` 的规则：`css` 文件只能引用 `css` 文件，并且只有带有 `css` 后缀的文件才会被解析。
3. `scss`、`less`、`stylus` 的规则：`scss`、`less`、`stylus` 文件可以引用 `css` 文件，以及相应的 `scss` 或 `less` 文件或 `stylus` 文件，
   优先对后处理器后缀的文件进行转换分析，如果文件不存在，则分析其 `css` 文件。

### ● 在 SFC 中的变量提取规则
1. 对于 `script setup`，`unplugin-vue-cssvars` 将提取所有变量进行匹配。
````
<script setup>
    const color = 'red'
</script>
````
2. 对于 `composition api`，`unplugin-vue-cssvars` 将提取 `setup` 函数返回的变量进行匹配。
````
<script>
 import { defineComponent } from 'vue'
 export default defineComponent( {
   setup(){
       const color = 'red'
       return {
          color
       }
   }
})
</script>
````
3. 对于 `options api`，`unplugin-vue-cssvars` 将提取 `data` 函数返回的变量进行匹配。
````
<script>
 export default {
   data(){
       const color = 'red'
       return {
          color
       }
   }
}
</script>
````
4. 对于普通的 `script`，`unplugin-vue-cssvars` 将提取所有变量进行匹配。
````
<script>
    const color = 'red'
</script>
````

### ● SFC 中的变量冲突规则
1. 在 sfc 中，有 options API 和 composition API，所有变量将被合并。如果变量存在冲突，
后出现的语法将优先（例如，如果先写了 options API，然后写 composition API，composition API 优先）。
2. 在 sfc 中存在 `script setup`、`options api` 和 `composition api`，所有变量将被合并，
如果存在变量冲突，`script setup` 优先。
3. sfc 中的普通 `script` 不会同时与 `options api` 和 `composition api` 存在。
4. 如果 sfc 中存在普通 `script`，则必须存在 `script setup`。
5. sfc 中的普通 `script` 和 `script setup` 变量将被合并，
如果存在变量冲突，`script setup` 优先。

### ● 样式注入后的优先级
1. 从 `sfc` 开始，分析在 `style` 标签中引用的 `css` 文件，并根据 `css` 文件中的引用顺序，以深度优先的方式促进并注入到 `sfc` 中。
2. 注入到 `sfc` 后，它的优先级完全由 `@vue/compiler-dom` 的编译器确定。

## 感谢
* [vue](https://github.com/vuejs/core)
* [vite](https://github.com/vitejs/vite)
* [unplugin](https://github.com/unjs/unplugin)