---
title: unplugin-macros
owner: unplugin
name: unplugin-macros
stars: 167
forks: 3
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-macros [![npm](https://img.shields.io/npm/v/unplugin-macros.svg)](https://npmjs.com/package/unplugin-macros) [![jsr](https://img.shields.io/endpoint?url=https%3A%2F%2Fjsr-api.sxzz.moe%2Fbadge%2F%40unplugin%2Fmacros)](https://jsr.io/@unplugin/macros)

[![Unit Test](https://github.com/unplugin/unplugin-macros/actions/workflows/unit-test.yml/badge.svg)](https://github.com/unplugin/unplugin-macros/actions/workflows/unit-test.yml)

> 宏是一个在打包时运行 JavaScript 函数的机制。
> 这些函数或变量返回的值会直接内联到你的包中。

## 安装

```bash
# npm
npm i -D unplugin-macros

# jsr
npx jsr add -D @unplugin/macros
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Macros from 'unplugin-macros/vite'

export default defineConfig({
  plugins: [Macros()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Macros from 'unplugin-macros/rollup'

export default {
  plugins: [Macros()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

需要 esbuild >= 0.15

```ts
// esbuild.config.js
import { build } from 'esbuild'

build({
  plugins: [require('unplugin-macros/esbuild')()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [require('unplugin-macros/webpack')()],
}
```

<br></details>

## 用法

```js
// main.js
import { buildTime, getRandom } from './macros' with { type: 'macro' }

getRandom() // 在构建时将被替换为一个随机数
buildTime // 在构建时将被替换为时间戳
```

```js
// macros.js
export function getRandom() {
  return Math.random()
}
export const buildTime = Date.now()
```

有关更多信息，请参见 [Bun Macros](https://bun.sh/blog/bun-macros)。

### TypeScript

在 TypeScript 5.3 及以上版本中支持 Import Attributes 语法。
但是，你可以使用 `assert` 关键字替代 `with`，这在 TypeScript 4.5 及以上版本中是支持的。

### ESLint

在 ESLint v9.14.0 中支持 Import Attributes 语法。

## 选项

请参考 [docs](https://jsr.io/@unplugin/macros/doc/api/~/Options)。

## 感谢

感谢 [Bun Macros](https://bun.sh/blog/bun-macros)。

## 赞助商

<p align="center">
  <a href="https://file.302.ai/gpt/imgs/20241230/89d0cf259e6f483094671b43d9fb97dd.svg">
    <img src='https://file.302.ai/gpt/imgs/20241230/89d0cf259e6f483094671b43d9fb97dd.svg'/>
  </a>
</p>

## 许可证

[MIT](./LICENSE) 许可证 © 2023-PRESENT [三咲智子](https://github.com/sxzz)