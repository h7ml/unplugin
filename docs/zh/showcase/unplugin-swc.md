---
title: unplugin-swc
owner: unplugin
name: unplugin-swc
stars: 239
forks: 13
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-swc

[![npm version](https://badgen.net/npm/v/unplugin-swc)](https://npm.im/unplugin-swc)

> [SWC](https://swc.rs/) 插件用于 Vite 和 Rollup。

## 安装

```bash
npm i unplugin-swc @swc/core -D
```

## 使用

Vite 或 Rollup：

```ts
import swc from 'unplugin-swc'

export default {
  plugins: [
    // Vite 插件
    swc.vite(),
    // Rollup 插件
    swc.rollup(),
  ],
}
```

### `tsconfig.json`

以下 SWC 选项是从 `tsconfig.json` 推断得出的：

- `jsc.parser.syntax`: 基于文件扩展名
- `jsc.parser.jsx`, `parser.tsx`: `compilerOptions.jsx`
- `jsc.parser.decorators`: `compilerOptions.experimentalDecorators`
- `jsc.transform.react.pragma`: `compilerOptions.jsxFactory`
- `jsc.transform.react.pragmaFrag`: `compilerOptions.jsxFragmentFactory`
- `jsc.transform.react.importSource`: `compilerOptions.jsxImportSource`
- `jsc.transform.legacyDecorator`: `compilerOptions.experimentalDecorators`
- `jsc.transform.decoratorMetadata`: `compilerOptions.emitDecoratorMetadata`
- `jsc.keepClassNames`: 当启用装饰器时，因为原始类名是像 `type-graphql` 这样的库生成正确 graphql 类型所必需的

如果您希望禁用此行为并使用 `.swcrc` 控制上述 `jsc` 选项，可以使用 `tsconfigFile` 选项：

```ts
// 或 swc.rollup
swc.vite({
  tsconfigFile: false,
})

// 也可以使用自定义 tsconfig 文件，而不是 tsconfig.json
swc.vite({
  tsconfigFile: './tsconfig.build.json',
})
```

### 代码压缩

使用 `minify: true` 选项，仅对 Rollup 有效，因为 Vite 使用 esbuild 来压缩代码，无法更改。

要对压缩过程进行高级控制，[请在 `.swcrc` 中使用 `jsc.minify` 选项](https://swc.rs/docs/configuration/minification)。

### Vite

如果您使用该插件，`esbuild` 将自动禁用。

## 选项

该插件接受所有 `@swc/core` 选项，除了应在 `.swcrc` 中配置的 `jsc` 外，还有一些特定于此插件的额外选项：

### `options.tsconfigFile`

- 类型：`boolean`, `string`
- 默认值：`tsconfig.json`

禁用使用 tsconfig 文件或指定自定义文件。

### `options.include`

- 类型：`RegExp`
- 默认值：`/\.[jt]sx?$/`

包含在转译过程中的文件。

### `options.exclude`

- 类型：`RegExp`
- 默认值：`/node_modules/`

在转译过程中排除的文件。

### `options.jsc`

- 类型：`object`

与默认选项合并的自定义 [jsc](https://swc.rs/docs/configuration/compilation) 选项。

## 许可证

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)