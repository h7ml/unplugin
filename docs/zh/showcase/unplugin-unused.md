---
title: unplugin-unused
owner: unplugin
name: unplugin-unused
stars: 82
forks: 1
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-unused [![npm](https://img.shields.io/npm/v/unplugin-unused.svg)](https://npmjs.com/package/unplugin-unused)

[![Unit Test](https://github.com/unplugin/unplugin-unused/actions/workflows/unit-test.yml/badge.svg)](https://github.com/unplugin/unplugin-unused/actions/workflows/unit-test.yml)

检查未使用的依赖项。

## 安装

```bash
npm i -D unplugin-unused
```

## 使用

```ts
Unused({
  include: [/\.([cm]?[jt]sx?|vue)$/],
  exclude: [/node_modules/],
  level: 'warning', // 或 'error'
  /**
   * 忽略一些依赖项。
   */
  ignore: {
    peerDependencies: ['vue'],
  },
  // 或忽略所有种类的依赖项。
  // ignore: ['vue'],

  /**
   * 要检查的依赖项种类。
   */
  depKinds: ['dependencies', 'peerDependencies'],
})
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginUnused from 'unplugin-unused/vite'

export default defineConfig({
  plugins: [UnpluginUnused()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnpluginUnused from 'unplugin-unused/rollup'

export default {
  plugins: [UnpluginUnused()],
}
```

<br></details>

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.js
import UnpluginUnused from 'unplugin-unused/rolldown'

export default {
  plugins: [UnpluginUnused()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'

build({
  plugins: [require('unplugin-unused/esbuild')()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [require('unplugin-unused/webpack')()],
}
```

<br></details>

## 赞助商

<p align="center">
  <a href="https://file.302.ai/gpt/imgs/20241230/f417701f1276455b9e040abf864ee16f.svg">
    <img src='https://file.302.ai/gpt/imgs/20241230/f417701f1276455b9e040abf864ee16f.svg'/>
  </a>
</p>

## 许可证

[MIT](./LICENSE) 许可证 © 2024-PRESENT [三咲智子](https://github.com/sxzz)