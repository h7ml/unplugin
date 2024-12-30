---
outline: deep
lastUpdated: false
---

# 入门指南

## 概述

**Unplugin** 是一个为各种构建工具提供统一插件系统的库。它扩展了优秀的 [Rollup 插件 API](https://rollupjs.org/plugin-development/#plugins-overview)，作为标准插件接口，并提供基于所使用构建工具的兼容层。

**Unplugin** 当前支持：

- [Vite](https://vitejs.dev/)
- [Rollup](https://rollupjs.org/)
- [Webpack](https://webpack.js.org/)
- [esbuild](https://esbuild.github.io/)
- [Rspack](https://www.rspack.dev/)
- [Rolldown](https://rolldown.rs/) <span style="color: #ca8a04"><strong>(⚠️ 实验性)</strong></span>
- [Farm](https://www.farmfe.org/)

## 在线尝试

您可以直接在浏览器中尝试 **Unplugin**。

[![open](/open_in_codeflow.svg)](https://stackblitz.com/~/github.com/yuyinws/unplugin-starter?file=src/index.ts)

## 创建 Unplugin 包

### 模板

- [unplugin/unplugin-starter](https://github.com/unplugin/unplugin-starter)
- [sxzz/unplugin-starter](https://github.com/sxzz/unplugin-starter)

请查看上述仓库以获取更多详细信息。

## 插件安装

### 先决条件

- Node.js 18.12.0 或更高版本。
- Webpack 5 或更高版本，如果您使用 Webpack。

### 安装包

::: code-group

```bash [npm]
npm install unplugin-starter --save-dev
```

```bash [yarn]
yarn add unplugin-starter -D
```

```bash [pnpm]
pnpm add unplugin-starter -D
```

```bash [bun]
bun add unplugin-starter -D
```

:::

### 打包器与框架集成

::: code-group

```ts [Vite]
// vite.config.ts
import Starter from 'unplugin-starter/vite'

export default defineConfig({
  plugins: [
    Starter({
      /* options */
    }),
  ],
})
```

```js [Rollup]
// rollup.config.js
import Starter from 'unplugin-starter/rollup'

export default {
  plugins: [
    Starter({
      /* options */
    }),
  ],
}
```

```js [Rolldown]
// rolldown.config.js
import Starter from 'unplugin-starter/rolldown'

export default {
  plugins: [
    Starter({
      /* options */
    }),
  ],
}
```

```js [webpack]
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-starter/webpack')({
      /* options */
    }),
  ],
}
```

```js [Rspack]
// rspack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-starter/rspack')({
      /* options */
    }),
  ],
}
```

```js [esbuild]
// esbuild.config.js
import { build } from 'esbuild'
import Starter from 'unplugin-starter/esbuild'

build({
  plugins: [Starter()],
})
```

```ts [Farm]
// farm.config.ts
import Starter from 'unplugin-starter/farm'

export default defineConfig({
  plugins: [
    Starter({
      /* options */
    }),
  ],
})
```

```js [Vue-CLI]
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-starter/webpack')({
        /* options */
      }),
    ],
  },
}
```

```js [Nuxt]
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    [
      'unplugin-starter/nuxt',
      {
        /* options */
      },
    ],
  ],
})
```

```js [Astro]
// astro.config.mjs
import { defineConfig } from 'astro/config'
import Starter from 'unplugin-turbo-console/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [Starter()],
})
```

## 支持的钩子

| 钩子                                                                              |     Rollup      | Vite | Webpack |     esbuild     |     Rspack      | Farm | Rolldown |
| --------------------------------------------------------------------------------- | :-------------: | :--: | :-----: | :-------------: | :-------------: | :--: | :------: |
| [`enforce`](https://vitejs.dev/guide/api-plugin.html#plugin-ordering)             | ❌ <sup>1</sup> |  ✅  |   ✅    | ❌ <sup>1</sup> |       ✅        |  ✅  |    ✅    |
| [`buildStart`](https://rollupjs.org/plugin-development/#buildstart)               |       ✅        |  ✅  |   ✅    |       ✅        |       ✅        |  ✅  |    ✅    |
| [`resolveId`](https://rollupjs.org/plugin-development/#resolveid)                 |       ✅        |  ✅  |   ✅    |       ✅        | ✅ <sup>5</sup> |  ✅  |    ✅    |
| `loadInclude`<sup>2</sup>                                                         |       ✅        |  ✅  |   ✅    |       ✅        |       ✅        |  ✅  |    ✅    |
| [`load`](https://rollupjs.org/plugin-development/#load)                           |       ✅        |  ✅  |   ✅    | ✅ <sup>3</sup> |       ✅        |  ✅  |    ✅    |
| `transformInclude`<sup>2</sup>                                                    |       ✅        |  ✅  |   ✅    |       ✅        |       ✅        |  ✅  |    ✅    |
| [`transform`](https://rollupjs.org/plugin-development/#transform)                 |       ✅        |  ✅  |   ✅    | ✅ <sup>3</sup> |       ✅        |  ✅  |    ✅    |
| [`watchChange`](https://rollupjs.org/plugin-development/#watchchange)             |       ✅        |  ✅  |   ✅    |       ❌        |       ✅        |  ✅  |    ✅    |
| [`buildEnd`](https://rollupjs.org/plugin-development/#buildend)                   |       ✅        |  ✅  |   ✅    |       ✅        |       ✅        |  ✅  |    ✅    |
| [`writeBundle`](https://rollupjs.org/plugin-development/#writebundle)<sup>4</sup> |       ✅        |  ✅  |   ✅    |       ✅        |       ✅        |  ✅  |    ✅    |

::: details 注意

1. Rollup 和 esbuild 不支持使用 `enforce` 来控制插件的顺序。用户需要手动维护顺序。
2. webpack 的 id 过滤器不在加载器逻辑内；需要额外的钩子来提高 webpack 的性能。在 Rollup 和 Vite 中，这个钩子已被填充以匹配行为。请参见以下用法示例。
3. 尽管 esbuild 可以处理 JavaScript、CSS 以及其他多种文件格式，但您只能在 `load` 和 `transform` 结果中返回 JavaScript。
4. 目前，`writeBundle` 仅作为一个钩子来控制时机。它不传递任何参数。
5. Rspack 支持 `resolveId`，最低要求版本为 v1.0.0-alpha.1。
   :::

### 用法

```ts{12-14,16-18} twoslash
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'

export interface Options {
  // 在此定义您的插件选项
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => ({
  name: 'unplugin-starter',
  // webpack 的 id 过滤器不在加载器逻辑内，
  // 需要额外的钩子来提高 webpack 的性能
  transformInclude(id) {
    return id.endsWith('main.ts')
  },
  // 就像 rollup transform
  transform(code) {
    return code.replace(/<template>/, '<template><div>Injected</div>')
  },
  // 更多钩子即将到来
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const rolldownPlugin = unplugin.rolldown
export const webpackPlugin = unplugin.webpack
export const rspackPlugin = unplugin.rspack
export const esbuildPlugin = unplugin.esbuild
export const farmPlugin = unplugin.farm
```

## 支持的上下文

| 上下文                                                                               | Rollup | Vite | Webpack | esbuild | Rspack | Farm | Rolldown |
| ------------------------------------------------------------------------------------- | :----: | :--: | :-----: | :-----: | :----: | :--: | :------: |
| [`this.parse`](https://rollupjs.org/plugin-development/#this-parse)                   |   ✅   |  ✅  |   ✅    |   ✅    |   ✅   |  ✅  |    ✅    |
| [`this.addWatchFile`](https://rollupjs.org/plugin-development/#this-addwatchfile)     |   ✅   |  ✅  |   ✅    |   ❌    |   ✅   |  ✅  |    ✅    |
| [`this.emitFile`](https://rollupjs.org/plugin-development/#this-emitfile)<sup>1</sup> |   ✅   |  ✅  |   ✅    |   ✅    |   ✅   |  ✅  |    ✅    |
| [`this.getWatchFiles`](https://rollupjs.org/plugin-development/#this-getwatchfiles)   |   ✅   |  ✅  |   ✅    |   ❌    |   ✅   |  ✅  |    ✅    |
| [`this.warn`](https://rollupjs.org/plugin-development/#this-warn)                     |   ✅   |  ✅  |   ✅    |   ✅    |   ✅   |  ✅  |    ✅    |
| [`this.error`](https://rollupjs.org/plugin-development/#this-error)                   |   ✅   |  ✅  |   ✅    |   ✅    |   ✅   |  ✅  |    ✅    |

::: info 注意

1. 目前，[`this.emitFile`](https://rollupjs.org/plugin-development/#thisemitfile) 仅支持 `EmittedAsset` 变体。
   :::

## 嵌套插件

**Unplugin** 支持构造多个嵌套插件，以表现得像一个插件。

### 支持的打包器

|         Rollup         | Vite | Webpack | Rspack | esbuild | Farm | Rolldown |
| :--------------------: | :--: | :-----: | :----: | :-----: | :--: | :------: |
| ✅ `>=3.1`<sup>1</sup> |  ✅  |   ✅    |   ✅   |   ✅    |  ✅  |    ✅    |

::: details 注意

1. Rollup 从 [v3.1.0](https://github.com/rollup/rollup/releases/tag/v3.1.0) 开始支持嵌套插件。插件作者在使用嵌套插件时应要求用户使用 `>=3.1.0` 的 Rollup 版本。对于单一插件格式，**Unplugin** 适用于任何版本的 Rollup。
   :::

### 用法

```ts twoslash
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'

export interface Options {
  // 在此定义您的插件选项
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => [
  {
    name: 'plugin-a',
    transform(code) {
      return code.replace(/<template>/, '<template><div>Injected</div>')
    },
  },
  {
    name: 'plugin-b',
    resolveId(id) {
      return id
    },
  },
]

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
```

## 打包器特定逻辑

虽然 **Unplugin** 为某些钩子提供了兼容层，但它的功能仅限于构建插件能力的公共子集。对于更高级的打包器特定用法，**Unplugin** 提供了一个逃生通道。

### 钩子

```ts {9,18,24,27,30,33,36,48} twoslash
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'

export interface Options {
  // 在此定义您的插件选项
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options,
  meta,
) => {
  console.log(meta.framework) // vite rollup webpack esbuild rspack...
  return {
    name: 'unplugin-starter',
    transform(code) {
      return code.replace(/<template>/, '<template><div>Injected</div>')
    },
    transformInclude(id) {
      return id.endsWith('main.ts')
    },
    vite: {
      // Vite 插件
      configureServer(server) {
        // 配置 Vite 服务器
      },
    },
    rollup: {
      // Rollup 插件
    },
    rolldown: {
      // Rolldown 插件
    },
    webpack(compiler) {
      // 配置 webpack 编译器
    },
    rspack(compiler) {
      // 配置 Rspack 编译器
    },
    esbuild: {
      // 更改 onResolve 和 onLoad 的过滤器
      // onResolveFilter?: RegExp,
      // onLoadFilter?: RegExp,
      // 告诉 esbuild 如何解释内容。默认情况下，Unplugin 会尝试根据文件扩展名猜测加载器
      // loader?: (Loader | (code: string, id: string) => Loader)
      // 或者您可以完全替换设置逻辑
      // setup?: EsbuildPlugin.setup,
    },
    farm: {
      // Farm 插件
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
```

### 插件

该包导出一组功能，取代 `createUnplugin`，允许针对特定打包器创建插件。
每个函数都与 `createUnplugin` 采用相同的泛型工厂参数。

```ts
import {
  createEsbuildPlugin,
  createFarmPlugin,
  createRolldownPlugin,
  createRollupPlugin,
  createRspackPlugin,
  createVitePlugin,
  createWebpackPlugin,
} from 'unplugin'

const vitePlugin = createVitePlugin(/* factory */)
const rollupPlugin = createRollupPlugin(/* factory */)
const rolldownPlugin = createRolldownPlugin(/* factory */)
const esbuildPlugin = createEsbuildPlugin(/* factory */)
const webpackPlugin = createWebpackPlugin(/* factory */)
const rspackPlugin = createRspackPlugin(/* factory */)
const farmPlugin = createFarmPlugin(/* factory */)