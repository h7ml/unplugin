---
title: unplugin-ast
owner: unplugin
name: unplugin-ast
stars: 80
forks: 4
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-ast [![npm](https://img.shields.io/npm/v/unplugin-ast.svg)](https://npmjs.com/package/unplugin-ast) [![jsr](https://jsr.io/badges/@unplugin/ast)](https://jsr.io/@unplugin/ast)

[![Unit Test](https://github.com/unplugin/unplugin-ast/actions/workflows/unit-test.yml/badge.svg)](https://github.com/unplugin/unplugin-ast/actions/workflows/unit-test.yml)

操作 AST 来转换你的代码。

## 安装

```bash
npm i unplugin-ast
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import AST from 'unplugin-ast/vite'

export default defineConfig({
  plugins: [AST()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import AST from 'unplugin-ast/rollup'

export default {
  plugins: [AST()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'

build({
  plugins: [require('unplugin-ast/esbuild')()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [require('unplugin-ast/webpack')()],
}
```

<br></details>

## 配置

以下是配置的默认值

```ts
AST({
  // 转换目标的过滤器
  include: [/\.[jt]sx?$/],
  exclude: undefined,

  // Rollup 和 esbuild 不支持使用 enforce 来控制插件的顺序。用户需要手动维护顺序。
  enforce: undefined,

  // https://babeljs.io/docs/en/babel-parser#options
  parserOptions: {},

  // 请参阅下面的自定义转换器
  transformer: [],
})
```

## 转换器

### 内置转换器

#### RemoveWrapperFunction

```ts
import { RemoveWrapperFunction } from 'unplugin-ast/transformers'

/**
 * 移除包装函数。比如 `defineComponent`, `defineConfig`...
 * @param functionNames - 要移除的函数名称
 *
 * @example defineComponent()
 * @example tw`text-red-500 ${expr}`
 */
export function RemoveWrapperFunction(
  functionNames: Arrayable<string>,
): Transformer<CallExpression>
```

转换：

```ts
export default defineConfig(config)
```

为：

```ts
export default config
```

#### RemoveNode

```ts
import { RemoveNode } from 'unplugin-ast/transformers'

/**
 * 移除任意节点。
 */
export function RemoveNode(
  onNode: (
    node: Node,
    parent: Node | null | undefined,
    index: number | null | undefined,
  ) => Awaitable<boolean>,
): Transformer
```

### 自定义转换器

```ts
import type { CallExpression } from '@babel/types'
import type { Transformer } from 'unplugin-ast'

export const RemoveWrapperFunction = (
  functionNames: string[],
): Transformer<CallExpression> => ({
  onNode: (node) =>
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    functionNames.includes(node.callee.name),

  transform(node) {
    return node.arguments[0]
  },
})
```

## 赞助商

<p align="center">
  <a href="https://file.302.ai/gpt/imgs/20241230/1ff14586c50d4ec8ac109af413c03a3e.svg">
    <img src='https://file.302.ai/gpt/imgs/20241230/1ff14586c50d4ec8ac109af413c03a3e.svg'/>
  </a>
</p>

## 许可证

[MIT](./LICENSE) 许可证 © 2022-PRESENT [三咲智子](https://github.com/sxzz)