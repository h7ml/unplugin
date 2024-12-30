---
title: unplugin-auto-import
owner: unplugin
name: unplugin-auto-import
stars: 3320
forks: 199
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-auto-import

[![NPM version](https://img.shields.io/npm/v/unplugin-auto-import?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-auto-import)

按需自动导入 Vite、Webpack、Rspack、Rollup 和 esbuild 的 APIs。支持 TypeScript。由 [unplugin](https://github.com/unjs/unplugin) 驱动。

---

without

```ts
import { computed, ref } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
```

with

```ts
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

---

without

```tsx
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <div>{ count }</div>
}
```

with

```tsx
export function Counter() {
  const [count, setCount] = useState(0)
  return <div>{ count }</div>
}
```

## 安装

```bash
npm i -D unplugin-auto-import
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({ /* options */ }),
  ],
})
```

示例: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import AutoImport from 'unplugin-auto-import/rollup'

export default {
  plugins: [
    AutoImport({ /* options */ }),
    // 其他插件
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
    require('unplugin-auto-import/webpack').default({ /* options */ }),
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
    require('unplugin-auto-import/rspack').default({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

> 您**不需要**这个插件用于 Nuxt，它已经内置。

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-auto-import/webpack').default({ /* options */ }),
  ],
}
```

您也可以将 Vue 配置文件重命名为 `vue.config.mjs` 并使用静态导入语法（您应该使用最新的 `@vue/cli-service ^5.0.8`）：
```ts
// vue.config.mjs
import AutoImport from 'unplugin-auto-import/webpack'

export default {
  configureWebpack: {
    plugins: [
      AutoImport({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>Quasar</summary><br>

```ts
// vite.config.js [Vite]
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    AutoImport({ /* options */ })
  ]
})
```

```ts
// quasar.conf.js [Webpack]
const AutoImportPlugin = require('unplugin-auto-import/webpack').default

module.exports = {
  build: {
    chainWebpack(chain) {
      chain.plugin('unplugin-auto-import').use(
        AutoImportPlugin({ /* options */ }),
      )
    },
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import AutoImport from 'unplugin-auto-import/esbuild'

build({
  /* ... */
  plugins: [
    AutoImport({
      /* options */
    }),
  ],
})
```

<br></details>

<details>
<summary>Astro</summary><br>

```ts
// astro.config.mjs
import AutoImport from 'unplugin-auto-import/astro'

export default defineConfig({
  integrations: [
    AutoImport({
      /* options */
    })
  ],
})
```

<br></details>

## 配置

```ts
AutoImport({
  // 目标转换
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
    /\.md$/, // .md
  ],

  // 注册的全局导入
  imports: [
    // 预设
    'vue',
    'vue-router',
    // 自定义
    {
      '@vueuse/core': [
        // 命名导入
        'useMouse', // import { useMouse } from '@vueuse/core',
        // 别名
        ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
      ],
      'axios': [
        // 默认导入
        ['default', 'axios'], // import { default as axios } from 'axios',
      ],
      '[package-name]': [
        '[import-names]',
        // 别名
        ['[from]', '[alias]'],
      ],
    },
    // 示例类型导入
    {
      from: 'vue-router',
      imports: ['RouteLocationRaw'],
      type: true,
    },
  ],

  // 要过滤掉的导入的字符串正则数组。
  ignore: [
    'useMouse',
    'useFetch'
  ],

  // 启用根据目录的默认模块导入
  defaultExportByFilename: false,

  // 自动导入的目录扫描选项
  dirsScanOptions: {
    types: true // 启用目录下类型的自动导入
  },

  // 目录下模块导出的自动导入
  // 默认只扫描目录下的一层模块
  dirs: [
    './hooks',
    './composables', // 仅根模块
    './composables/**', // 所有嵌套模块
    // ...

    {
      glob: './hooks',
      types: true // 启用导入类型
    },
    {
      glob: './composables',
      types: false // 如果顶级 dirsScanOptions.types 导入已启用，只需禁用该目录
    }
    // ...
  ],

  // 生成对应 .d.ts 文件的文件路径。
  // 当 `typescript` 本地安装时默认为 './auto-imports.d.ts'。
  // 设置为 `false` 以禁用。
  dts: './auto-imports.d.ts',

  // 要在声明文件生成期间忽略的导入字符串正则数组。您可能会发现这在您需要提供
  // 函数的自定义签名时很有用。
  ignoreDts: [
    'ignoredFunction',
    /^ignore_/
  ],

  // 在 Vue 模板中的自动导入
  // 请参见 https://github.com/unjs/unimport/pull/15 和 https://github.com/unjs/unimport/pull/72
  vueTemplate: false,

  // 在 Vue 模板中的自动导入指令
  // 请参见 https://github.com/unjs/unimport/pull/374
  vueDirectives: undefined,

  // 自定义解析器，兼容 `unplugin-vue-components`
  // 请参见 https://github.com/antfu/unplugin-auto-import/pull/23/
  resolvers: [
    /* ... */
  ],

  // 在 Vite 的 `optimizeDeps` 选项中包含自动导入的包
  // 建议启用
  viteOptimizeDeps: true,

  // 在其他导入之后注入导入
  injectAtEnd: true,

  // 生成对应 .eslintrc-auto-import.json 文件。
  // eslint globals 文档 - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
  eslintrc: {
    enabled: false, // 默认 `false`
    // 提供以 `.mjs` 或 `.cjs` 结尾的路径，以生成相应格式的文件
    filepath: './.eslintrc-auto-import.json', // 默认 `./.eslintrc-auto-import.json`
    globalsPropValue: true, // 默认 `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
  },

  // 生成对应 .biomelintrc-auto-import.json 文件。
  // biomejs 扩展文档 - https://biomejs.dev/guides/how-biome-works/#the-extends-option
  biomelintrc: {
    enabled: false, // 默认 `false`
    filepath: './.biomelintrc-auto-import.json', // 默认 `./.biomelintrc-auto-import.json`
  },

  // 将未导入的项目保存到 JSON 文件中，以供其他工具使用
  dumpUnimportItems: './auto-imports.json', // 默认 `false`
})
```

请参考 [类型定义](./src/types.ts) 获取更多选项。

## 预设

请参见 [src/presets](./src/presets)。

## 包预设

我们仅为最流行的包提供预设，使用任何未包含在此处的包，您可以将其安装为开发依赖并添加到 `packagePresets` 数组选项中：
```ts
AutoImport({
  /* 其他选项 */
  packagePresets: ['detect-browser-es'/* 其他本地包名称 */]
})
```

您可以查看 [Svelte 示例](./examples/vite-svelte) 获取一个实际示例，注册 `detect-browser-es` 包预设并自动导入 `detect` 函数到 [App.svelte](./examples/vite-svelte/src/App.svelte)。

请参考 [unimport PackagePresets jsdocs](https://github.com/unjs/unimport/blob/main/src/types.ts) 获取有关 `ignore` 或 `cache` 等选项的更多信息。

**注意**: 确保使用的本地包已正确配置包导出，否则相应的模块导出将无法被检测到。

## TypeScript

为了正确提示自动导入的 APIs 的类型

<table>
<tr>
<td width="400px" valign="top">

1. 启用 `options.dts` 以便自动生成 `auto-imports.d.ts` 文件
2. 确保 `auto-imports.d.ts` 没有在 `tsconfig.json` 中被排除

</td>
<td width="600px"><br>

```ts
AutoImport({
  dts: true // 或自定义路径
})
```

</td>
</tr>
</table>

## ESLint

> 💡 当使用 TypeScript 时，我们建议**禁用** `no-undef` 规则，因为 TypeScript 已经检查它们，您不需要担心这个问题。

如果您遇到 `no-undef` 的 ESLint 错误：

<table>
<tr>
<td width="400px">

1. 启用 `eslintrc.enabled`

</td>
<td width="600px"><br>

```ts
AutoImport({
  eslintrc: {
    enabled: true, // <-- 这个
  },
})
```

</td></tr></table>
<table><tr><td width="400px">

2. 更新您的 `eslintrc`:
[扩展配置文件](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files)

</td>
<td width="600px"><br>

```ts
// .eslintrc.js
module.exports = {
  extends: [
    './.eslintrc-auto-import.json',
  ],
}
```

</td>
</tr>
</table>

## 常见问题

### 与 [`unimport`](https://github.com/unjs/unimport) 的比较

从 v0.8.0 开始，`unplugin-auto-import` **使用** `unimport` 作为底层工具。`unimport` 被设计为一个更低级别的工具（它还为 Nuxt 的自动导入提供支持）。您可以认为 `unplugin-auto-import` 是对它的封装，提供了更用户友好的配置 API 和像解析器这样的功能。从现在开始，新的功能开发将主要发生在 `unimport` 中。

### 与 [`vue-global-api`](https://github.com/antfu/vue-global-api) 的比较

您可以将这个插件视为 `vue-global-api` 的继任者，但提供了更多的灵活性和与 Vue 以外库的绑定（例如 React）。

###### 优势

- 灵活且可定制
- 可树摇（按需转换）
- 无全局污染

###### 缺点

- 依赖于构建工具集成（而 `vue-global-api` 是纯运行时） - 但是嘿，我们已经支持了很多！

## 赞助商

<p align="center">
  <a href="https://file.302.ai/gpt/imgs/20241230/0b6e17a91b0c4fbdbe0b89820e99261a.svg">
    <img src='https://file.302.ai/gpt/imgs/20241230/0b6e17a91b0c4fbdbe0b89820e99261a.svg'/>
  </a>
</p>

## 许可证

[MIT](./LICENSE) 许可证 © 2021-PRESENT [Anthony Fu](https://github.com/antfu)