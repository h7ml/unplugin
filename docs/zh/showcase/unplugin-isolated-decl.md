---
title: unplugin-isolated-decl
owner: unplugin
name: unplugin-isolated-decl
stars: 99
forks: 4
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-isolated-decl [![npm](https://img.shields.io/npm/v/unplugin-isolated-decl.svg)](https://npmjs.com/package/unplugin-isolated-decl) [![jsr](https://jsr.io/badges/@unplugin/isolated-decl)](https://jsr.io/@unplugin/isolated-decl)

[![Unit Test](https://github.com/unplugin/unplugin-isolated-decl/actions/workflows/unit-test.yml/badge.svg)](https://github.com/unplugin/unplugin-isolated-decl/actions/workflows/unit-test.yml)

⚡️ 一款用于生成孤立声明的极速工具。

## 特性

- 🚀 **快速**：生成 `.d.ts` 文件的速度显著快于 `tsc`。
- 🎨 **转换器**：支持 Oxc、SWC 和 TypeScript 转换器。
- 📦 **零配置**：无需配置，开箱即用。
- ✨ **打包工具支持**：支持 Vite、Rollup、esbuild 和 Farm。（欢迎提交 Webpack/Rspack 支持的 PR）

## 安装

```bash
# npm
npm i -D unplugin-isolated-decl

# jsr
npx jsr add -D @unplugin/isolated-decl
```

## 用法

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginIsolatedDecl from 'unplugin-isolated-decl/vite'

export default defineConfig({
  plugins: [UnpluginIsolatedDecl()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnpluginIsolatedDecl from 'unplugin-isolated-decl/rollup'

export default {
  plugins: [UnpluginIsolatedDecl()],
}
```

<br></details>

<details>
<summary>Rolldown</summary><br>

```ts
// rolldown.config.js
import UnpluginIsolatedDecl from 'unplugin-isolated-decl/rolldown'

export default {
  plugins: [UnpluginIsolatedDecl()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'

build({
  plugins: [require('unplugin-isolated-decl/esbuild')()],
})
```

<br></details>

<details>
<summary>Farm</summary><br>

```ts
// farm.config.ts
import UnpluginIsolatedDecl from 'unplugin-isolated-decl/farm'

export default defineConfig({
  plugins: [UnpluginIsolatedDecl()],
})
```

<br></details>

## 选项

```ts
export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
  enforce?: 'pre' | 'post' | undefined
  /**
   * 你需要自行安装支持的转换器之一。
   * oxc: @oxc/transformer
   * swc: @swc/core
   * typescript: typescript
   *
   * @default typescript
   */
  transformer?: 'oxc' | 'swc' | 'typescript'
  /**
   * 是否生成声明源映射。
   *
   * 仅支持 `typescript` 和 `oxc` 转换器。
   *
   * @link https://www.typescriptlang.org/tsconfig/#declarationMap
   */
  sourceMap?: boolean

  /** 仅适用于 typescript 转换器 */
  transformOptions?: TranspileOptions
  ignoreErrors?: boolean
  /** 输出文件的额外目录层级。 */
  extraOutdir?: string

  rewriteImports?: (
    id: string,
    importer: string,
  ) => string | void | null | undefined
}
```

### `rewriteImports`

重写 `.d.ts` 文件中的导入。（esbuild 不支持）

以下是 Rollup 中重写导入的示例：

```js
// rollup.config.js
import alias from '@rollup/plugin-alias'

export default {
  // ...
  plugins: [
    alias({ entries: [{ find: '~', replacement: '.' }] }),
    UnpluginIsolatedDecl({
      rewriteImports(id, importer) {
        if (id[0] === '~') return `.${id.slice(1)}`
      },
    }),
    // ...
  ],
}
```

### `patchCjsDefaultExport`

将 `.d.cts` 中的 `export default` 修补为 `export =`

---

> [!NOTE]
> 获取完整的选项集请查看 [options](src/core/options.ts)

## 赞助商

<p align="center">
  <a href="https://file.302.ai/gpt/imgs/20241230/528089b9475f4c738068ef6bc0b2d7bf.svg">
    <img src='https://file.302.ai/gpt/imgs/20241230/528089b9475f4c738068ef6bc0b2d7bf.svg'/>
  </a>
</p>

## 许可证

[MIT](./LICENSE) 许可证 © 2024-PRESENT [三咲智子](https://github.com/sxzz)