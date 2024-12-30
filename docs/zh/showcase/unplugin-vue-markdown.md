---
title: unplugin-vue-markdown
owner: unplugin
name: unplugin-vue-markdown
stars: 529
forks: 29
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-vue-markdown

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-markdown?color=a1b858)](https://www.npmjs.com/package/unplugin-vue-markdown)

将Markdown编译为Vue组件。

- 📚 将Markdown用作Vue组件。
- 💚 在Markdown中使用Vue组件。
- 🔌 支持Vite、Webpack、Vue CLI等，基于[unplugin](https://github.com/unjs/unplugin)。
- ⚡️ 与[VitePress](https://vitepress.vuejs.org/)执行相同的转换。

## 安装

```bash
npm i unplugin-vue-markdown
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <-- 允许Vue编译Markdown文件
    }),
    Markdown({ /* options */ }),
  ],
})
```

示例: [`examples/vite`](./examples/vite/)

<br>
</details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
const Markdown = require('unplugin-vue-markdown/webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  /* ... */
  module: {
    rules: [
      // ... 其他规则
      {
        test: /\.(vue|md)$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    Markdown({ /* options */ })
  ]
}
```

<br>
</details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
const Markdown = require('unplugin-vue-markdown/webpack')

module.exports = {
  parallel: false, // 禁用线程加载器，这会导致错误，我们仍在调查根本原因
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .test(/\.(vue|md)$/) // <-- 允许Vue编译Markdown文件

    config
      .plugin('markdown')
      .use(Markdown({
        markdownItUses: [
          prism,
        ],
      }))
  },
}
```

示例: [`examples/vue-cli`](./examples/vue-cli/)

<br>
</details>

## 将Markdown作为Vue组件导入

```html
<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from './README.md'

export default {
  components: {
    HelloWorld,
  },
}
</script>
```

## 在Markdown中使用Vue组件

您甚至可以在Markdown中使用Vue组件，例如

```html
<Counter :init='5'/>
```

<Counter :init='5'/>

请注意，您可以全局注册组件，或使用`<script setup>`标签局部注册它们。

```ts
import { createApp } from 'vue'
import App from './App.vue'
import Counter from './Counter.vue'

const app = createApp(App)

// 全局注册
app.component('Counter', Counter) // <--

app.mount()
```

```html
<script setup>
import { Counter } from './Counter.vue'
</script>

<Counter :init='5'/>
```

或者您可以使用[`unplugin-vue-components`](#work-with-unplugin-vue-components)进行自动组件注册。

## 前置数据

前置数据将被解析并注入到Vue的实例数据`frontmatter`字段中。

例如：

```md
---
name: 我的酷炫应用
---

# 你好，世界

这是{{frontmatter.name}}
```

将被渲染为

```html
<h1>你好，世界</h1>
<p>这是我的酷炫应用</p>
```

如果您已经设置了`wrapperComponent`选项，它也将作为props传递给包装组件。

## 文档头和元数据

要管理文档头和元数据，您需要安装[`@unhead/vue`](https://unhead.harlanzw.com/integrations/vue/setup)并进行一些设置。

```bash
npm i @unhead/vue
```

```js
// vite.config.js
import Vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'

export default {
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      headEnabled: true // <--
    })
  ]
}
```

```js
// src/main.js
import { createHead } from '@unhead/vue' // <--
import { createApp } from 'vue'

const app = createApp(App)

const head = createHead() // <--
app.use(head) // <--
```

然后，您可以使用前置数据来控制头部。例如：

```yaml
---
title: 我酷炫的应用
meta:
  - name: description
    content: 你好，世界
---
```

有关更多可用选项，请参阅[`@unhead/vue`的文档](https://unhead.harlanzw.com/integrations/vue/setup)。

## 选项

`unplugin-vue-markdown`在底层使用[`markdown-it`](https://github.com/markdown-it/markdown-it)，有关更多详细信息，请参见[`markdown-it`的文档](https://markdown-it.github.io/markdown-it/)。

```ts
// vite.config.js
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItPrism from 'markdown-it-prism'
import Markdown from 'unplugin-vue-markdown/vite'

export default {
  plugins: [
    Markdown({
      // 默认选项传递给markdown-it
      // 见: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      // 提供Markdown It实例的函数可以应用自定义设置/插件
      markdownItSetup(md) {
        // 例如
        md.use(MarkdownItAnchor)
        md.use(MarkdownItPrism)
      },
      // 包装div的类名
      wrapperClasses: 'markdown-body'
    })
  ],
}
```

有关更高级选项，请参见[tsdoc](./src/types.ts)。

## 示例

请参见[/examples](./examples)。

或预配置的Markdown模板[Vitesse](https://github.com/antfu/vitesse)。

## 集成

### 与[vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)一起使用

```ts
import Vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import Pages from 'vite-plugin-pages'

export default {
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      extensions: ['vue', 'md'],
    }),
    Markdown()
  ],
}
```

将您的Markdown放在`./src/pages/xx.md`下，然后您可以通过路由`/xx`访问该页面。

### 与[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)一起使用

`unplugin-vue-components`允许您按需自动导入组件，而不必担心注册。

```ts
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'

export default {
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown(),
    // 应放在`Markdown()`之后
    Components({
      // 允许自动加载`./src/components/`下的Markdown组件
      extensions: ['vue', 'md'],

      // 允许自动导入和注册在Markdown中使用的组件
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    })
  ],
}
```

`./src/components`下的组件可以直接在Markdown组件中使用，Markdown组件也可以放在`./src/components`下以便自动导入。

## TypeScript类型定义

```ts
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'

  const Component: ComponentOptions
  export default Component
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue'

  const Component: ComponentOptions
  export default Component
}
```

## 许可证

MIT许可证 © 2020-PRESENT [Anthony Fu](https://github.com/antfu)