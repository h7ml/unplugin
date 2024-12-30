---
title: unplugin-vue-components
owner: unplugin
name: unplugin-vue-components
stars: 3866
forks: 354
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-vue-components

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-components?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-components)

Vue 的按需组件自动导入。

###### 特性

- 💚 开箱即用，支持 Vue 2 和 Vue 3。
- ✨ 支持组件和指令。
- ⚡️ 支持 Vite、Webpack、Rspack、Vue CLI、Rollup、esbuild 等，基于 <a href="https://github.com/unjs/unplugin">unplugin</a>。
- 🏝 树摇，仅注册你使用的组件。
- 🪐 文件夹名称作为命名空间。
- 🦾 完全支持 TypeScript。
- 🌈 [内置解析器](#importing-from-ui-libraries) 支持流行的 UI 库。
- 😃 与 [unplugin-icons](https://github.com/antfu/unplugin-icons) 完美兼容。

<br>

<p align="center">
  <a href="https://file.302.ai/gpt/imgs/20241230/e8a0a929838a4731a295eaa6a861d1a6.svg">
    <img src='https://file.302.ai/gpt/imgs/20241230/e8a0a929838a4731a295eaa6a861d1a6.svg'/>
  </a>
</p>

<br>

## 安装

```bash
npm i unplugin-vue-components -D
```

> **`vite-plugin-components` 已更名为 `unplugin-vue-components`**，请查看 [迁移指南](#migrate-from-vite-plugin-components)。

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({ /* options */ }),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Components from 'unplugin-vue-components/rollup'

export default {
  plugins: [
    Components({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-components/webpack').default({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-components/rspack').default({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

你可能不需要这个插件用于 Nuxt。请使用 [`@nuxt/components`](https://github.com/nuxt/components) 替代。

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-components/webpack').default({ /* options */ }),
  ],
}
```

你也可以将 Vue 配置文件重命名为 `vue.config.mjs` 并使用静态导入语法（应使用最新的 `@vue/cli-service ^5.0.8`）:

```ts
// vue.config.mjs
import Components from 'unplugin-vue-components/webpack'

export default {
  configureWebpack: {
    plugins: [
      Components({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Components from 'unplugin-vue-components/esbuild'

build({
  /* ... */
  plugins: [
    Components({
      /* options */
    }),
  ],
})
```

<br></details>

## 使用

像平常一样在模板中使用组件，它会按需导入组件，不再需要 `import` 和 `组件注册`！如果你异步注册父组件（或懒加载路由），自动导入的组件将与其父组件一起进行代码分割。

它将自动将以下内容转换为：

```html
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>
```

转换为：

```html
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
  import HelloWorld from './src/components/HelloWorld.vue'

  export default {
    name: 'App',
    components: {
      HelloWorld,
    },
  }
</script>
```

> **注意**
> 默认情况下，该插件将在 `src/components` 路径中导入组件。你可以使用 `dirs` 选项来进行自定义。

## TypeScript

要获得自动导入组件的 TypeScript 支持，有一个 [PR](https://github.com/vuejs/core/pull/3399) 被提出给 Vue 3 来扩展全局组件的接口。当前，[Volar](https://github.com/johnsoncodehk/volar) 已经支持这种用法。如果你在使用 Volar，你可以按照以下方式更改配置以获得支持。

```ts
Components({
  dts: true, // 如果安装了 `typescript`，默认启用
})
```

设置完成后，将生成 `components.d.ts` 并会自动更新类型定义。随意选择是否提交到 Git。

> **确保还将 `components.d.ts` 添加到 `tsconfig.json` 的 `include` 中。**

## 从 UI 库导入

我们针对流行的 UI 库如 **Vuetify**、**Ant Design Vue** 和 **Element Plus** 提供了几个内置解析器，你可以通过以下方式启用它们：

支持的解析器：

- [Ant Design Vue](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/antdv.ts)
- [Arco Design Vue](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/arco.ts)
- [BootstrapVue](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/bootstrap-vue.ts)
- [Element Plus](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/element-plus.ts)
- [Element UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/element-ui.ts)
- [Headless UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/headless-ui.ts)
- [IDux](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/idux.ts)
- [Inkline](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/inkline.ts)
- [Ionic](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/ionic.ts)
- [Naive UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/naive-ui.ts)
- [Prime Vue](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/prime-vue.ts)
- [Quasar](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/quasar.ts)
- [TDesign](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/tdesign.ts)
- [Vant](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/vant.ts)
  - [`@vant/auto-import-resolver`](https://github.com/youzan/vant/blob/main/packages/vant-auto-import-resolver/README.md) - Vant 的自动导入解析器
- [Varlet UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/varlet-ui.ts)
  - [`@varlet/import-resolver`](https://github.com/varletjs/varlet/blob/dev/packages/varlet-import-resolver/README.md) - Varlet 的自动导入解析器
- [VEUI](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/veui.ts)
- [View UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/view-ui.ts)
- [Vuetify](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/vuetify.ts) &mdash; 在可能的情况下优先使用第一方插件：[v3 + vite](https://www.npmjs.com/package/vite-plugin-vuetify)，[v3 + webpack](https://www.npmjs.com/package/webpack-plugin-vuetify)，[v2 + webpack](https://npmjs.com/package/vuetify-loader)
- [VueUse Components](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/vueuse.ts)
- [VueUse Directives](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/vueuse-directive.ts)
- [Dev UI](https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/devui.ts)

```ts
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers'
// vite.config.js
import Components from 'unplugin-vue-components/vite'

// 安装插件
Components({
  resolvers: [
    AntDesignVueResolver(),
    ElementPlusResolver(),
    VantResolver(),
  ],
})
```

你也可以快速编写自己的解析器：

```ts
Components({
  resolvers: [
    // 导入 Vant 的示例
    (componentName) => {
      // 其中 `componentName` 始终是大写字母开头
      if (componentName.startsWith('Van'))
        return { name: componentName.slice(3), from: 'vant' }
    },
  ],
})
```

> [我们不再接受新的解析器](./src/core/resolvers/_READ_BEFORE_CONTRIBUTE.md)。

## 全局注册组件的类型

一些库可能会为你注册一些全局组件，以便你可以随时使用（例如 Vue Router 提供 `<RouterLink>` 和 `<RouterView>`）。由于它们是全局可用的，因此该插件不需要导入它们。然而，这些组件通常不友好于 TypeScript，你可能需要手动注册它们的类型。

因此，`unplugin-vue-components` 提供了一种只为全局组件注册类型的方法。

```ts
Components({
  dts: true,
  types: [{
    from: 'vue-router',
    names: ['RouterLink', 'RouterView'],
  }],
})
```

所以 `RouterLink` 和 `RouterView` 将在 `components.d.ts` 中出现。

默认情况下，`unplugin-vue-components` 会自动检测支持的库（例如 `vue-router`）当它们安装在工作区时。如果你想完全禁用它，可以传递一个空数组：

```ts
Components({
  // 禁用类型仅注册
  types: [],
})
```

## 从 `vite-plugin-components` 迁移

`package.json`

```diff
{
  "devDependencies": {
-   "vite-plugin-components": "*",
+   "unplugin-vue-components": "^0.14.0",
  }
}
```

`vite.config.js`

```diff
- import Components, { ElementPlusResolver } from 'vite-plugin-components'
+ import Components from 'unplugin-vue-components/vite'
+ import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    /* ... */
    Components({
      /* ... */

      // `customComponentsResolvers` 已重命名为 `resolver`
-     customComponentsResolvers: [
+     resolvers: [
        ElementPlusResolver(),
      ],

      // `globalComponentsDeclaration` 已重命名为 `dts`
-     globalComponentsDeclaration: true,
+     dts: true,

      // `customLoaderMatcher` 已弃用，请使用 `include` 代替
-     customLoaderMatcher: id => id.endsWith('.md'),
+     include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
  ],
}
```

## 配置

以下是配置的默认值

```ts
Components({
  // 查找组件的目录的相对路径
  dirs: ['src/components'],

  // 组件的有效文件扩展名
  extensions: ['vue'],

  // 匹配文件名的全局模式，以被识别为组件
  // 当指定时，`dirs`、`extensions` 和 `directoryAsNamespace` 选项将被忽略
  // 如果你想排除组件的注册，请使用带有前导 `!` 的否定全局模式
  globs: ['src/components/*.{vue}'],

  // 搜索子目录
  deep: true,

  // 自定义组件的解析器
  resolvers: [],

  // 生成 `components.d.ts` 全局声明，
  // 也接受自定义文件名的路径
  // 默认：如果安装了 typescript，则为 `true`
  dts: false,

  // 允许子目录作为组件的命名空间前缀
  directoryAsNamespace: false,

  // 合并文件夹和组件的相同前缀（区分大小写）
  // 以防止命名空间组件名称中重复
  // 当 `directoryAsNamespace: true` 时有效
  collapseSamePrefixes: false,

  // 用于忽略命名空间前缀的子目录路径
  // 当 `directoryAsNamespace: true` 时有效
  globalNamespaces: [],

  // 自动导入指令
  // 默认：对 Vue 3 为 `true`，对 Vue 2 为 `false`
  // Babel 被禁用，以提高性能。如果需要安装 Babel，请运行：`npm install -D @babel/parser`
  directives: true,

  // 解析前转换路径
  importPathTransform: v => v,

  // 允许组件覆盖同名的其他组件
  allowOverrides: false,

  // 转换目标的过滤器（要插入自动导入的组件）
  // 注意这些不是关于包括/排除注册的组件 - 用 `globs` 或 `excludeNames` 来处理
  include: [/\.vue$/, /\.vue\?vue/],
  exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],

  // 不会被导入的组件名称的过滤器
  // 用于全局导入的异步组件或插件无法检测的其他冲突
  excludeNames: [/^Async.+/],

  // 项目的 Vue 版本。如果未指定，将自动检测。
  // 可接受的值：2 | 2.7 | 3
  version: 2.7,

  // 仅提供库中组件的类型（全局注册）
  types: []
})
```

## 示例

[Vitesse](https://github.com/antfu/vitesse) 启动模板。

## 感谢

感谢 [@brattonross](https://github.com/brattonross)，这个项目受到了 [vite-plugin-voie](https://github.com/vamplate/vite-plugin-voie) 的启发。

## 许可证

[MIT](./LICENSE) 许可证 © 2020-PRESENT [Anthony Fu](https://github.com/antfu)