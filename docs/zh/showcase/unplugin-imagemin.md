---
title: unplugin-imagemin
owner: unplugin
name: unplugin-imagemin
stars: 205
forks: 19
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# 📦📦 unplugin Imagemin 图片压缩

[![NPM version](https://img.shields.io/npm/v/unplugin-imagemin?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-imagemin)

> [!IMPORTANT]
> **提示:**
> `1.0 目标` unplugin-imagemin 正在准备发布 1.0 版本，该版本将在达成以下目标后发布
- [x] 通过重新修改 squoosh 的 wasm 语法支持所有节点版本
- [x] 移除 sharp 依赖
- [x] 支持公共目录图像压缩
- [x] 支持 css 压缩图像
- [x] 支持全缓存模式
- [x] 支持 Node 22 及以上
- [ ] 类型选项
- [ ] 支持 farm、rsbuild、webpack 等框架

> [!WARNING]
新特性和稳定性、兼容性和性能特性正在不断更新  
建议使用最新版本 `pnpm add unplugin-imagemin@latest -D`

> [!WARNING]
由于 Google [squoosh](https://github.com/GoogleChromeLabs/squoosh) 不再维护 Node 方向，该 fork 出现并修正了一些兼容性问题。详情见 [squoosh-next](https://github.com/ErKeLost/squoosh-node-latest)

### ✨✨ 持续迭代开发中

```bash
✨ : unplugin-imagemin
✔ : 进程以模式 squoosh 启动
✅ : [test1.png] [12.39 MB] -> [102.54 KB]
✔ : 进程以模式 squoosh 启动
✅ : [test2.png] [16.38 MB] -> [76.79 KB]
```

#### 🌈 特性

- 🍰 支持 png jpeg webp avif svg tiff 格式
- 🦾 基于 squoosh 的高性能
- ✨ 多种图像格式可配置
- 🪐 在构建时压缩代码
- 😃 缓存机制
- 🌈 可以在构建时转换不同的图像类型

## Squoosh && Svgo

Unplugin-imagemin 支持两种压缩模式

[Squoosh](https://github.com/GoogleChromeLabs/squoosh) 是一个图像压缩 web 应用，通过多种格式减少图像大小。  
**Squoosh** 使用 rust & wasm

[Svgo](https://github.com/svg/svgo) 支持压缩 svg 格式的图片

## 🍰 效果展示

https://github.com/unplugin/unplugin-imagemin/assets/66500121/49169b22-7f5b-4cdc-b023-302003b15522

## 📦 安装

```bash
pnpm add unplugin-imagemin@latest -D
```

#### 支持 vite 和 rollup。

<details>
<summary>基础</summary><br>

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import imagemin from 'unplugin-imagemin/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), imagemin()],
});
```

<br></details>

<details>
<summary>高级</summary><br>

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import imagemin from 'unplugin-imagemin/vite';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    imagemin({
      // 不同图片压缩的默认配置选项
      compress: {
        jpg: {
          quality: 10,
        },
        jpeg: {
          quality: 10,
        },
        png: {
          quality: 10,
        },
        webp: {
          quality: 10,
        },
      },
      conversion: [
        { from: 'jpeg', to: 'webp' },
        { from: 'png', to: 'webp' },
        { from: 'JPG', to: 'jpeg' },
      ],
    }),
  ],
});

```

<br></details>

## 🌸 默认配置

Squoosh 默认配置 

默认配置见 [DefaultConfiguration](https://github.com/ErKeLost/unplugin-imagemin/blob/main/src/core/compressOptions.ts)

插件属性配置见 [configuration](https://github.com/ErKeLost/unplugin-imagemin/blob/main/src/core/types/index.ts)

```typescript
export interface PluginOptions {
  /**
   * @description 图片编译和转换
   * @default []
   */
  conversion?: ConversionItemType[];
  /**
   * @description 是否开启缓存
   * @default true
   */
  cache?: boolean;
  /**
   * @description 缓存文件位置的路径
   * @default ./node_modules/.cache/unplugin-imagemin/.unplugin-imagemin-cache
   */
  cacheLocation?: string;
  /**
   * @description 编译属性
   * @default CompressTypeOptions
   */
  compress?: CompressTypeOptions;
}