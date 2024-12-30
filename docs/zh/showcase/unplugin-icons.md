---
title: unplugin-icons
owner: unplugin
name: unplugin-icons
stars: 4170
forks: 144
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-icons

[![NPM 版本](https://img.shields.io/npm/v/unplugin-icons?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-icons)

按需在全局访问数千个图标作为组件。

### 特性

- 🌏 通用
  - 🤹 **任意** 图标集合 - ~150个流行集合，超过200,000个图标、标志、表情符号等。由 [Iconify](https://github.com/iconify/iconify) 提供支持。
  - 📦 **主要** 构建工具 - Vite、Webpack、Rollup、Nuxt、Rspack等。由 [unplugin](https://github.com/unjs/unplugin) 提供支持。
  - 🚀 **主要** 框架 - Vanilla、Web Components、React、Vue 3、Vue 2、Solid、Svelte等。 [贡献](./src/core/compilers)。
  - 🍱 **任意** 组合它们！
- ☁️ 按需 - 仅打包您真正使用的图标，同时拥有所有选项。
- 🖨 SSR / SSG 友好 - 与页面一起传输图标，不再出现 FOUC 问题。
- 🌈 可样式化 - 可以像样式和类那样更改大小、颜色，甚至添加动画。
- 📥 [自定义图标](#custom-icons) - 加载您的自定义图标以轻松获得通用集成。
- 📲 [自动导入](#auto-importing) - 在模板中直接将图标用作组件。
- 🦾 TypeScript 支持。
- 🔍 [浏览图标](https://icones.js.org/)

<table><tr><td><br>

&nbsp;&nbsp;&nbsp;💡 **这个工具背后的故事**: [与图标的旅程继续](https://antfu.me/posts/journey-with-icons-continues) - Anthony 的博文&nbsp;&nbsp;&nbsp;

</td></tr></table>

> **`vite-plugin-icons` 已更名为 `unplugin-icons`**，请参阅 [迁移指南](#migrate-from-vite-plugin-icons)

## 用法

使用约定 `~icons/{collection}/{icon}` 导入图标名称，并直接用作组件。 [也可以进行自动导入](#auto-importing)。

###### React

```jsx
import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'

function App() {
  return (
    <div>
      <IconAccessibility />
      <IconAccountBox style={{ fontSize: '2em', color: 'red' }} />
    </div>
  )
}
```

###### Vue

```html
<script setup>
import IconAccessibility from '~icons/carbon/accessibility'
import IconAccountBox from '~icons/mdi/account-box'
</script>

<template>
  <icon-accessibility/>
  <icon-account-box style="font-size: 2em; color: red"/>
</template>
```

## 安装

### 插件

```bash
npm i -D unplugin-icons
```

### 图标数据

我们使用 [Iconify](https://iconify.design/) 作为图标数据源（支持100+个图标集合）。

您有两种方式来安装它们：

###### 安装完整集合

```bash
npm i -D @iconify/json
```

`@iconify/json` (~120MB) 包含来自 Iconify 的所有图标集合，因此您可以一次安装并根据需要使用它们（仅实际使用的图标将被打包到生产构建中）。

###### 按图标集安装

如果您只想使用少数几个图标集，并且不想下载整个集合，您也可以单独用 `@iconify-json/[collection-id]` 安装它们。
例如，要安装 [Material Design Icons](https://icon-sets.iconify.design/mdi/)，可以执行：

```bash
npm i -D @iconify-json/mdi
```

为了提升您的工作效率，也可以通过启用 `autoInstall` 选项让 `unplugin-icons` 处理该安装。

```ts
Icons({
  // 实验性
  autoInstall: true,
})
```

在导入图标时将会安装图标集。将自动检测正确的包管理器（`npm`、`yarn` 或 `pnpm`）。

## 示例

您可以在 StackBlitz 上在线玩这个仓库中的示例，请参阅 [playgrounds 页面](./examples/README.md)。

分叉任何在线示例并重现您遇到的问题，然后与我们分享链接。

## 配置

###### 构建工具

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  plugins: [
    Icons({ /* options */ }),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Icons from 'unplugin-icons/rollup'

export default {
  plugins: [
    Icons({ /* options */ }),
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
    require('unplugin-icons/webpack').default({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

Nuxt 2 和 [Nuxt Bridge](https://github.com/nuxt/bridge)

```ts
// nuxt.config.js
export default {
  buildModules: [
    ['unplugin-icons/nuxt', { /* options */ }],
  ],
}
```

Nuxt 3

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-icons/nuxt', { /* options */ }]
  ],
})
```

或与 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 解析器一起使用

```ts
import IconsResolver from 'unplugin-icons/resolver'
import ViteComponents from 'unplugin-vue-components/vite'

// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'unplugin-icons/nuxt',
  ],
  vite: {
    plugins: [
      ViteComponents({
        resolvers: [
          IconsResolver({/* options */}),
        ],
      }),
    ],
  },
})
```

请参阅 [Nuxt 示例](examples/nuxt3) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Rspack</summary>

```ts
import Icons from 'unplugin-icons/rspack'

// rspack.config.mjs
export default defineConfig({
  plugins: [
    // ...
    Icons({/* options */}),
  ]
})
</details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-icons/webpack').default({ /* options */ }),
    ],
  },
}
```

您还可以将 Vue 配置文件重命名为 `vue.config.mjs` 并使用静态导入语法（您应该使用最新的 `@vue/cli-service ^5.0.8`）：
```ts
// vue.config.mjs
import Icons from 'unplugin-icons/webpack'

export default {
  configureWebpack: {
    plugins: [
      Icons({ /* options */ }),
    ],
  },
}
```

<br></details>

<details>
<summary>SvelteKit</summary><br>

`unplugin-icons` 插件应该在 `vite.config.js` 配置文件中进行配置：

```ts
import { sveltekit } from '@sveltejs/kit/vite'
import Icons from 'unplugin-icons/vite'
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
    })
  ]
})
```

如果您遇到模块导入错误，请查看 `框架 -> Svelte` 部分中的说明。

请参阅 [SvelteKit 示例](examples/sveltekit) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Svelte + Vite</summary><br>

Svelte 支持需要 `@sveltejs/vite-plugin-svelte` 插件：
```shell
npm i -D @sveltejs/vite-plugin-svelte
```

`unplugin-icons` 插件应该在 `vite.config.js` 配置文件中进行配置：

```ts
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    svelte(),
    Icons({
      compiler: 'svelte',
    }),
  ],
})
```

如果您遇到模块导入错误，请查看 `框架 -> Svelte` 部分中的说明。

请参阅 [Svelte + Vite 示例](examples/vite-svelte) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Next.js</summary><br>

`unplugin-icons` 插件应该在 `next.config.js` 配置文件中进行配置：
```ts
// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      require('unplugin-icons/webpack').default({
        compiler: 'jsx',
        jsx: 'react'
      })
    )

    return config
  },
}
```

您还可以将 Next 配置文件重命名为 `next.config.mjs` 并使用静态导入语法：
```ts
// next.config.mjs
import Icons from 'unplugin-icons/webpack'

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: 'jsx',
        jsx: 'react'
      })
    )

    return config
  }
}
```

如果您遇到模块导入错误，请查看 `框架 -> React` 部分中的说明。

⚠️ **警告:** 导入图标时需要明确在导入路径中添加 `.jsx` 扩展名，以便 Next.js 知道如何加载它，例如：

<!-- eslint-skip -->

```ts
import IconArrowRight from '~icons/dashicons/arrow-right.jsx';
                                                     // ^-- 写上 `.jsx` 以避免
                                                     // https://github.com/antfu/unplugin-icons/issues/103
// ...后面的代码
<IconArrowRight />
```

请参阅 [Next.js 示例](examples/next) 以获取一个工作示例项目。

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Icons from 'unplugin-icons/esbuild'

build({
  /* ... */
  plugins: [
    Icons({
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
import { defineConfig } from 'astro/config'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
})
```

请参阅 [Astro 示例](examples/astro) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Astro + Vue</summary><br>

需要安装 [@astrojs/vue](https://docs.astro.build/es/guides/integrations-guide/vue)。

```ts
import Vue from '@astrojs/vue'
// astro.config.mjs
import { defineConfig } from 'astro/config'
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [
    Vue(),
  ],
  vite: {
    plugins: [
      Icons({
        compiler: 'vue3',
      }),
    ],
  },
})
```

请参阅 [Astro + Vue 示例](examples/astro-vue) 以获取一个工作示例项目。

<br></details>

###### 框架

<details>
<summary>Vue 3 / Vue 2.7+</summary><br>

Vue 3 / Vue 2.7+ 支持需要对等依赖 `@vue/compiler-sfc`：

```bash
npm i -D @vue/compiler-sfc
```

```ts
Icons({ compiler: 'vue3' })
```

类型声明

<!-- eslint-skip -->

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/vue",
    ]
  }
}
```

请参阅 [Vue 3 示例](examples/vite-vue3) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Vue 2 (仅适用于版本 < 2.7)</summary><br>

Vue 2 支持需要对等依赖 `vue-template-compiler`：

```bash
npm i -D vue-template-compiler
```

```ts
Icons({ compiler: 'vue2' })
```

类型声明

<!-- eslint-skip -->

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/vue",
    ]
  }
}
```

请参阅 [Vue 2 示例](examples/vite-vue2) 以获取一个工作示例项目。

<br></details>

<details>
<summary>React</summary><br>

JSX 支持需要对等依赖 `@svgr/core` 及其插件 `@svgr/plugin-jsx`：

```bash
npm i -D @svgr/core @svgr/plugin-jsx
```

```ts
Icons({ compiler: 'jsx', jsx: 'react' })
```

类型声明

<!-- eslint-skip -->

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/react",
    ]
  }
}
```

请参阅 [React 示例](examples/vite-react) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Preact</summary><br>

JSX 支持需要对等依赖 `@svgr/core` 及其插件 `@svgr/plugin-jsx`：

```bash
npm i -D @svgr/core @svgr/plugin-jsx
```

```ts
Icons({ compiler: 'jsx', jsx: 'preact' })
```

类型声明

<!-- eslint-skip -->

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/preact",
    ]
  }
}
```

请参阅 [Preact 示例](examples/vite-preact) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Solid</summary><br>

```ts
Icons({ compiler: 'solid' })
```

类型声明

<!-- eslint-skip -->

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/solid",
    ]
  }
}
```

请参阅 [Solid 示例](examples/vite-solid) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Svelte</summary><br>

```ts
Icons({ compiler: 'svelte' })
```

类型声明

对于 SvelteKit， 在 `src/app.d.ts` 文件中：

```ts
import 'unplugin-icons/types/svelte'
```

对于 Svelte + Vite，在 `src/vite-env.d.ts` 文件中：

```js
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/svelte" />
```

如果您仍在使用 Svelte 4，请将引用替换为使用 Svelte 4：
```js
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/svelte4" />
```

如果您仍在使用 Svelte 3，请将引用替换为使用 Svelte 3：
```js
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/svelte3" />
```

请参阅 [Svelte 示例](examples/vite-svelte) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Astro</summary><br>

类型声明

<!-- eslint-skip -->

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/astro",
    ]
  }
}
```

请参阅 [Astro 示例](examples/astro) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Astro + Vue</summary><br>

仅需要 Vue 类型声明：

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/vue"
    ]
  }
}
```

请参阅 [Astro + Vue 示例](examples/astro-vue) 以获取一个工作示例项目。

<br></details>

<details>
<summary>Qwik</summary><br>

Qwik 支持需要对等依赖 `@svgx/core`：

```bash
npm i -D @svgx/core
```

```ts
Icons({ compiler: 'qwik' })
```

或者，您可以使用 `jsx` 编译器，需要对等依赖 `@svgr/core` 及其插件 `@svgr/plugin-jsx`：
```bash
npm i -D @svgr/core @svgr/plugin-jsx
```

```ts
Icons({ compiler: 'jsx', jsx: 'qwik' })
```

类型声明

<!-- eslint-skip -->

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "types": [
      "unplugin-icons/types/qwik",
    ]
  }
}
```

请参阅 [Qwik 示例](examples/vite-qwik) 以获取一个工作示例项目。

<br></details>

## 从查询参数使用 RAW 编译器

从 `v0.13.2` 开始，您还可以使用 `raw` 编译器访问 `svg` 图标并在 HTML 模板中使用它，只需在图标查询参数中添加 `raw`。

例如，使用 `vue3`：

```vue
<script setup lang='ts'>
import RawMdiAlarmOff from '~icons/mdi/alarm-off?raw&width=4em&height=4em'
import RawMdiAlarmOff2 from '~icons/mdi/alarm-off?raw&width=1em&height=1em'
</script>

<template>
  <!-- raw 示例 -->
  <pre>
    import RawMdiAlarmOff from '~icons/mdi/alarm-off?raw&width=4em&height=4em'
    {{ RawMdiAlarmOff }}
    import RawMdiAlarmOff2 from '~icons/mdi/alarm-off?raw&width=1em&height=1em'
    {{ RawMdiAlarmOff2 }}
  </pre>
  <!-- svg 示例 -->
  <span v-html="RawMdiAlarmOff" />
  <span v-html="RawMdiAlarmOff2" />
</template>
```

## 自定义图标

从 `v0.11` 开始，您现在可以加载您自己的图标！

从 `v0.13` 开始，您还可以将转换回调提供给 `FileSystemIconLoader`。

```ts
import { promises as fs } from 'node:fs'

// loader helpers
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

Icons({
  customCollections: {
    // 键为集合名称
    'my-icons': {
      account: '<svg><!-- ... --></svg>',
      // 延迟加载您的自定义图标
      settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
      /* ... */
    },
    'my-other-icons': async (iconName) => {
      // 您的自定义加载器。随意处理。
      // 例如，从远程服务器获取：
      return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
    },
    // 一个从文件系统加载图标的助手
    // `./assets/icons` 下的文件与 `.svg` 扩展名将被作为文件名加载
    // 您还可以提供一个转换回调以更改每个图标（可选）
    'my-yet-other-icons': FileSystemIconLoader(
      './assets/icons',
      svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
    ),
  },
})
```

然后使用如下

```ts
import IconAccount from '~icons/my-icons/account'
import IconFoo from '~icons/my-other-icons/foo'
import IconBar from '~icons/my-yet-other-icons/bar'
```

> 💡 SVG 创建小贴士：
> - 为了使您的图标具有颜色适应性，请在 SVG 中设置 `fill="currentColor"` 或 `stroke="currentColor"`。
> - 不要指定 `height` 和 `width`，我们将为您设置它们。

### 配合解析器使用

在使用解析器进行自动导入时，您需要告诉它您的自定义集合名称：

```ts
IconResolver({
  customCollections: [
    'my-icons',
    'my-other-icons',
    'my-yet-other-icons',
  ],
})
```

请参阅 [Vue 3 + Vite 示例](./examples/vite-vue3/vite.config.ts)。

### 使用自定义外部集合包

从版本 `v0.18.3` 开始，您可以使用其他包从其他作者加载图标。

**警告**: 外部包必须包含 `icons.json` 文件，文件中包含 `IconifyJSON` 格式的 `icons` 数据，该格式可以通过 Iconify Tools 导出。有关更多详细信息，请查看 [将图标集导出为 JSON 包](https://iconify.design/docs/libraries/tools/export/json-package.html)。

例如，您可以使用 `an-awesome-collection` 或 `@my-awesome-collections/some-collection` 来加载您的自定义图标或第三方图标：
```ts
// loader helpers
import { ExternalPackageIconLoader } from 'unplugin-icons/loaders'

Icons({ customCollections: ExternalPackageIconLoader('my-awesome-collection') })
```

在使用解析器进行自动导入时，请记住需要告诉它您的自定义集合名称：
```ts
IconResolver({
  customCollections: [
    'my-awesome-collection',
  ],
})
```

您还可以将其与 `FileSystemIconLoader` 或其他自定义图标加载器结合使用：
```ts
// loader helpers
import { ExternalPackageIconLoader, FileSystemIconLoader } from 'unplugin-icons/loaders'

Icons({
  customCollections: {
    ...ExternalPackageIconLoader('an-awesome-collection'),
    ...ExternalPackageIconLoader('@my-awesome-collections/some-collection'),
    ...ExternalPackageIconLoader('@my-awesome-collections/some-other-collection'),
    'my-yet-other-icons': FileSystemIconLoader(
      './assets/icons',
      svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
    ),
  },
})
```

请参阅 [Vue 3 + Vite 示例](./examples/vite-vue3/vite.config.ts)。

## 图标自定义器

从 `v0.13` 开始，您还可以使用 `iconCustomizer` 配置选项或在导入时使用查询参数自定义每个图标。

`query` 参数将优先于 `iconCustomizer`，而 `iconCustomizer` 将优先于 `configuration`。

`iconCustomizer` 和 `query` 参数将应用于任何集合，即，对于来自 `custom` 加载器的每个图标、在 `customCollections` 中内联的图标或来自 `@iconify` 的图标。

例如，您可以配置 `iconCustomizer` 来更改集合中的所有图标或集合中的个别图标：

```ts
import { promises as fs } from 'node:fs'

// loader helpers
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

Icons({
  customCollections: {
    // 键为集合名称
    'my-icons': {
      account: '<svg><!-- ... --></svg>',
      // 延迟加载您的自定义图标
      settings: () => fs.readFile('./path/to/my-icon.svg', 'utf-8'),
      /* ... */
    },
    'my-other-icons': async (iconName) => {
      // 您的自定义加载器。随意处理。
      // 例如，从远程服务器获取：
      return await fetch(`https://example.com/icons/${iconName}.svg`).then(res => res.text())
    },
    // 一个从文件系统加载图标的助手
    // `./assets/icons` 下的文件与 `.svg` 扩展名将被作为文件名加载
    // 您还可以提供一个转换回调以更改每个图标（可选）
    'my-yet-other-icons': FileSystemIconLoader(
      './assets/icons',
      svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
    ),
  },
  iconCustomizer(collection, icon, props) {
    // 自定义此集合中的所有图标
    if (collection === 'my-other-icons') {
      props.width = '4em'
      props.height = '4em'
    }
    // 自定义此集合中的此图标
    if (collection === 'my-icons' && icon === 'account') {
      props.width = '6em'
      props.height = '6em'
    }
    // 自定义此集合中来自 @iconify 的图标
    if (collection === 'mdi' && icon === 'account') {
      props.width = '2em'
      props.height = '2em'
    }
  },
})
```

或者，您可以使用 `query` 参数应用于单个图标：

<!-- eslint-skip -->

```vue
<script setup lang='ts'>
import MdiAlarmOff from 'virtual:icons/mdi/alarm-off?width=4em&height=4em'
import MdiAlarmOff2 from 'virtual:icons/mdi/alarm-off?width=1em&height=1em'
</script>

<template>
  <!-- width=4em 和 height=4em -->
  <mdi-alarm-off />
  <!-- width=4em 和 height=4em -->
  <MdiAlarmOff />
  <!-- width=1em 和 height=1em -->
  <MdiAlarmOff2 />
</template>
```

请查看 `src/App.vue` 组件和 `vite.config.ts` 配置在 `vite-vue3` 示例项目中的内容。

## 全局自定义图标转换

从版本 `0.14.2` 开始，加载自定义图标时，您可以对其进行转换，例如添加 `fill` 属性为 `currentColor`：
```ts
Icons({
  customCollections: {
    // 键为集合名称
    'my-icons': {
      account: '<svg><!-- ... --></svg>',
      /* ... */
    },
  },
  transform(svg, collection, icon) {
    // 对此集合中的此图标应用填充
    if (collection === 'my-icons' && icon === 'account')
      return svg.replace(/^<svg /, '<svg fill="currentColor" ')

    return svg
  },
})
```

## 高级自定义图标集清理

在使用此插件与自定义图标时，考虑使用类似于 [Iconify](https://iconify.design/) 进行任何图标集的清理过程。您所需的所有工具都可以在 [Iconify Tools](https://docs.iconify.design/tools/tools2/) 中找到。

您可以检查这个 repo，使用 `unplugin-icons` 在 `SvelteKit` 项目中：https://github.com/iconify/tools/tree/main/%40iconify-demo/unplugin-svelte。

阅读 [清理图标](https://docs.iconify.design/articles/cleaning-up-icons/) 文章来自 [Iconify](https://iconify.design/) 获取更多详细信息。

## 从 `vite-plugin-icons` 迁移

`package.json`

```diff
{
  "devDependencies": {
-   "vite-plugin-icons": "*",
+   "unplugin-icons": "^0.7.0",
  }
}
```

`vite.config.js`

```diff
import Components from 'unplugin-vue-components/vite'
- import Icons, { ViteIconsResolver } from 'vite-plugin-icons'
+ import Icons from 'unplugin-icons/vite'
+ import IconsResolver from 'unplugin-icons/resolver'

export default {
  plugins: [
    Vue(),
    Components({
      resolvers: [
        IconsResolver()
      ],
    }),
    Icons(),
  ],
}
```

`*` - 导入用法

```diff
- import IconComponent from 'virtual:vite-icons/collection/name'
+ import IconComponent from '~icons/collection/name'
```

> 如果您愿意，仍然可以在 Vite 中使用 `virtual:icons` 前缀，但尚未在 Webpack 中支持，我们在文档中将其统一作为解决方法。

## 选项

您可以设置所有图标的默认样式。
以下配置显示了每个选项的默认值：

```ts
Icons({
  scale: 1.2, // 图标相对 1em 的缩放
  defaultStyle: '', // 应用于图标的样式
  defaultClass: '', // 应用于图标的类名
  compiler: null, // 'vue2', 'vue3', 'jsx'
  jsx: 'react', // 'react' 或 'preact'
})
```

## 自动导入

<details>
<summary>Vue 2 & 3</summary><br>

与 [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) 一起使用

例如在 Vite 中：

```js
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'

export default {
  plugins: [
    Vue(),
    Components({
      resolvers: [
        IconsResolver(),
      ],
    }),
    Icons(),
  ],
}
```

然后您可以根据需要使用任何图标，无需明确导入。只有使用的图标将被打包。

```html
<template>
  <i-carbon-accessibility/>
  <i-mdi-account-box style="font-size: 2em; color: red"/>
</template>
```

</details>

<details>
<summary>React & Solid</summary><br>

与 [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) 一起使用

例如在 Vite 中：

```js
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
// vite.config.js
import Icons from 'unplugin-icons/vite'

export default {
  plugins: [
    /* ... */
    AutoImport({
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),
    Icons({
      compiler: 'jsx', // 或 'solid'
    }),
  ],
}
```

然后您可以使用前缀为 `Icon` 的任何图标，而无需明确导入。类型声明将即时生成。

<!-- eslint-disable react/jsx-no-undef -->

```js
export function Component() {
  return (
    <div>
      <IconCarbonApps />
      <IconMdiAccountBox style="font-size: 2em; color: red" />
    </div>
  )
}
```

</details>

### 名称转换

在使用组件解析器时，您必须遵循图标的名称转换以正确推断。

```
{prefix}-{collection}-{icon}
```

`collection` 字段遵循 [Iconify 的集合 ID](https://iconify.design/icon-sets/)。

默认情况下，前缀设置为 `i`，而您可以通过配置自定义

```ts
IconsResolver({
  prefix: 'icon', // <--
})
```

```html
<template>
  <icon-mdi-account />
</template>
```

非前缀模式也受支持

```ts
IconsResolver({
  prefix: false, // <--
  // 这是可选的，默认启用 Iconify 支持的所有集合
  enabledCollections: ['mdi'],
})
```

```vue
<template>
  <mdi-account />
</template>
```

### 集合别名

在使用组件解析器时，您必须使用集合的名称，这可能很长或冗余：例如，
在使用 `icon-park` 集合时，您需要使用这样的名称 `<icon-icon-park-abnormal />`。

您可以为任何集合添加别名到 `IconResolver` 插件：

```ts
IconsResolver({
  alias: {
    park: 'icon-park',
    fas: 'fa-solid',
    // ...
  }
})
```

您可以使用别名或集合名称，该插件将解析两者。

按照示例并使用之前的 `alias` 条目配置插件，您现在可以使用
`<icon-park-abnormal />` 或 `<icon-icon-park-abnormal />`。

## 赞助商

此项目是我<a href='https://github.com/antfu-sponsors'>赞助计划</a>的一部分

<p align="center">
  <a href="https://file.302.ai/gpt/imgs/20241230/ccc1a84dfee94508bd5a103d0a1996ef.svg">
    <img src='https://file.302.ai/gpt/imgs/20241230/ccc1a84dfee94508bd5a103d0a1996ef.svg'/>
  </a>
</p>

## 许可证

[MIT](./LICENSE) 许可证 © 2020-PRESENT [Anthony Fu](https://github.com/antfu)