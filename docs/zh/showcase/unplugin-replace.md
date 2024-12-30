---
title: unplugin-replace
owner: unplugin
name: unplugin-replace
stars: 11
forks: 1
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-replace [![npm](https://img.shields.io/npm/v/unplugin-replace.svg)](https://npmjs.com/package/unplugin-replace) [![JSR](https://jsr.io/badges/@unplugin/replace)](https://jsr.io/@unplugin/replace)

[![Unit Test](https://github.com/unplugin/unplugin-replace/actions/workflows/unit-test.yml/badge.svg)](https://github.com/unplugin/unplugin-replace/actions/workflows/unit-test.yml)

🍣 一个通用的打包插件，基于 [@rollup/plugin-replace](https://www.npmjs.com/package/@rollup/plugin-replace) 替换文件中的目标字符串。

## 安装

```bash
# npm
npm i -D unplugin-replace

# jsr
npx jsr add -D @unplugin/replace
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Replace from 'unplugin-replace/vite'

export default defineConfig({
  plugins: [Replace()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Replace from 'unplugin-replace/rollup'

export default {
  plugins: [Replace()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'

build({
  plugins: [require('unplugin-replace/esbuild')()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [require('unplugin-replace/webpack')()],
}
```

<br></details>

## 使用

### 选项

有关所有选项的信息，请参阅 [docs](https://github.com/rollup/plugins/tree/master/packages/replace#options)。

该插件接受所有 [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace#options) 选项，以及一些特定于该插件的额外选项。

### `options.values`

- 类型: `{ [find: string]: Replacement } | ReplaceItem[]`
- 默认值: `[]`

```ts
type ReplaceItem = {
  /** 提供一个字符串或正则表达式来查找您要寻找的内容。 */
  find: string | RegExp

  /**
   * 可以是字符串或函数。
   * - 如果是字符串，它将替换与模式匹配的子字符串。支持多种特殊替换模式
   * - 如果是函数，它将在每次匹配时被调用，其返回值将被用作替换文本。
   */
  replacement: Replacement
}
type Replacement = string | ((id: string, match: RegExpExecArray) => string)
```

与 `@rollup/plugin-replace` 相比，`find` 选项支持正则表达式模式。

**示例:**

```ts
Replace({
  values: [
    {
      find: /apples/gi,
      replacement: 'oranges',
    },
    {
      find: 'process.env.NODE_ENV',
      replacement: '"production"',
    },
  ],
})
```

## 赞助商

<p align="center">
  <a href="https://file.302.ai/gpt/imgs/20241230/d68d7b4a7ff646959a987ec818a2ca0c.svg">
    <img src='https://file.302.ai/gpt/imgs/20241230/d68d7b4a7ff646959a987ec818a2ca0c.svg'/>
  </a>
</p>

## 许可证

[MIT](./LICENSE) 许可证 © 2024-PRESENT [三咲智子](https://github.com/sxzz)