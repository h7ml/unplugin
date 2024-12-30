---
title: unplugin-vue2-script-setup
owner: unplugin
name: unplugin-vue2-script-setup
stars: 603
forks: 39
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-vue2-script-setup

[![NPM version](https://img.shields.io/npm/v/unplugin-vue2-script-setup?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue2-script-setup)

将 [`<script setup>`](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) 引入 Vue 2。适用于 Vite、Nuxt、Vue CLI、Webpack、esbuild 等，基于 [unplugin](https://github.com/unjs/unplugin) 提供支持。

> ⚠️ 随着 [Vue 2.7](https://blog.vuejs.org/posts/vue-2-7-naruto.html) 的发布，内置了组合 API 和 `<script setup>`，**你不再需要这个插件**。因此这个插件已进入维护模式，仅支持 Vue 2.6 或更早版本。该项目将在 2022 年底达到生命周期结束。

## 安装

```bash
npm i -D unplugin-vue2-script-setup
npm i @vue/composition-api
```

在应用的入口文件中安装 [`@vue/composition-api`](https://github.com/vuejs/composition-api)（它启用 `setup()` 钩子）：

```ts
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'

export default defineConfig({
  plugins: [
    Vue2(),
    ScriptSetup({ /* options */ }),
  ],
})
```

示例: [`playground/`](./playground/)

<br></details>

<details>
<summary>Nuxt</summary><br>

> 在 [Nuxt Bridge](https://github.com/nuxt/bridge) 中内置。

</details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default

module.exports = {
  parallel: false, // 禁用 thread-loader, 因为它与此插件不兼容
  configureWebpack: {
    plugins: [
      ScriptSetup({ /* options */ }),
    ],
  },
}
```

示例: [`examples/vue-cli`](./examples/vue-cli)

###### TypeScript

要在 Vue CLI 中使用 TypeScript，请安装 `@vue/cli-plugin-typescript` 但禁用类型检查：

```bash
npm i -D @vue/cli-plugin-typescript vue-tsc
```

```ts
const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default

module.exports = {
  parallel: false,
  configureWebpack: {
    plugins: [
      ScriptSetup({ /* options */ }),
    ],
  },
  chainWebpack(config) {
    // 禁用类型检查并让 `vue-tsc` 处理
    config.plugins.delete('fork-ts-checker')
  },
}
```

然后使用 [`vue-tsc`](https://github.com/johnsoncodehk/volar) 在构建时进行类型检查：

```jsonc
// package.json
{
  "scripts": {
    "dev": "vue-cli-service serve",
    "build": "vue-tsc --noEmit && vue-cli-service build"
  }
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
const ScriptSetup = require('unplugin-vue2-script-setup/webpack').default

module.exports = {
  /* ... */
  plugins: [
    ScriptSetup({ /* options */ }),
  ]
}
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Vue from 'rollup-plugin-vue'
import ScriptSetup from 'unplugin-vue2-script-setup/rollup'

export default {
  plugins: [
    Vue(),
    ScriptSetup({ /* options */ }),
  ]
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import ScriptSetup from 'unplugin-vue2-script-setup/esbuild'

build({
  /* ... */
  plugins: [
    ScriptSetup({
      /* options */
    }),
  ],
})
```

<br></details>

<details>
<summary>Jest</summary><br>

```bash
npm i -D vue-jest
```

```ts
// jest.config.js
module.exports = {
  transform: {
    '.*\\.(vue)$': 'unplugin-vue2-script-setup/jest',
  },
}
```

<br></details>

<details>
<summary>JavaScript API</summary><br>

```ts
import { transform } from 'unplugin-vue2-script-setup'

const Vue2SFC = await transform(`
<template>
  <!-- ... -->
</template>

<script setup>
  // ...
</script>
`)
```

<br></details>

## IDE

我们建议使用 [VS Code](https://code.visualstudio.com/) 配合 [Volar](https://github.com/johnsoncodehk/volar) 来获得最佳体验（如果你有它，可以考虑禁用 Vetur）。

使用 Volar 时，你需要将 `@vue/runtime-dom` 安装为开发依赖，以使其在 Vue 2 上工作。

```bash
npm i -D @vue/runtime-dom
```

[了解更多](https://github.com/johnsoncodehk/volar#using)

###### 全局类型

如果你的 IDE 缺少全局类型，请使用以下内容更新你的 `tsconfig.json`：

```jsonc
{
  "compilerOptions": {
    "types": [
      "unplugin-vue2-script-setup/types"
    ]
  }
}
```

###### 支持 Vue 2 模板

Volar 优先支持 Vue 3。Vue 3 和 Vue 2 模板存在一些不同。你需要设置 `experimentalCompatMode` 选项来支持 Vue 2 模板。

```jsonc
{
  "compilerOptions": {
    // ...
  },
  "vueCompilerOptions": {
    "target": 2
  }
}
```

###### ESLint

如果你使用 ESLint，可能会对 `<script setup>` 遇到 `@typescript-eslint/no-unused-vars` 警告。你可以禁用它并在你的 `tsconfig.json` 中添加 `noUnusedLocals: true`，Volar 将正确推断缺失的本地变量。 

## 配置

<details>
  <summary>
    Ref Sugar（第二版）
  </summary>

在 v0.5.x 中，我们发布了基于 Vue 3 的 **实验性** [Ref Sugar（第二版）](https://github.com/vuejs/rfcs/discussions/369) 实现，依赖于 [`@vue/reactivity-transform`](https://github.com/vuejs/vue-next/tree/master/packages/reactivity-transform) 包。注意语法尚未确定，可能在未来的更新中更改。**使用风险自负！**

要启用它，请传递选项：

```ts
ScriptSetup({
  reactivityTransform: true
})
```

要获取 TypeScript 支持，请使用以下内容更新你的 `tsconfig.json`：

```jsonc
{
  "compilerOptions": {
    "types": [
      "unplugin-vue2-script-setup/types",
      "unplugin-vue2-script-setup/ref-macros"
    ]
  }
}
```

</details>

## 推荐

如果你喜欢使用 `<script setup>`，你可能还想尝试 [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) 以进一步提高开发体验。

## 进展

- [x] 概念验证
- [x] 组件注册
- [x] 编译时宏 `defineProps` `defineEmits` `withDefaults` `defineExpose`
- [x] 全局类型
- [x] 与普通脚本合并
- [x] [Ref Sugar（第二版）](https://github.com/vuejs/rfcs/discussions/369)
- [x] `<template lang="pug">` 支持
- [x] Vite 插件
- [x] Webpack 插件
- [x] Nuxt 模块
- [ ] ~~顶级 await~~（不支持）

## 如何？

<details>
  <summary>
    👀
  </summary>

![image](https://user-images.githubusercontent.com/11247099/130307245-20f9342e-377b-4565-b55d-1b91741b5c0f.png)

这得益于将 `<script setup>` 语法转换回普通 `<script>`，让 Vue 2 SFC 编译器处理其余部分。

<br></details>

## 赞助商

<p align="center">
  <a href="https://file.302.ai/gpt/imgs/20241230/1c218925b9804875a115863f728475ad.svg">
    <img src='https://file.302.ai/gpt/imgs/20241230/1c218925b9804875a115863f728475ad.svg'/>
  </a>
</p>

## 许可证

[MIT](./LICENSE) 许可证 © 2021 [Anthony Fu](https://github.com/antfu)