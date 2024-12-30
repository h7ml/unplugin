---
title: unplugin-vue
owner: unplugin
name: unplugin-vue
stars: 176
forks: 8
outline: deep
---

<RepoInfo :owner="$frontmatter.owner" :name="$frontmatter.name" :stars="$frontmatter.stars" :forks="$frontmatter.forks" />

---

# unplugin-vue [![npm](https://img.shields.io/npm/v/unplugin-vue.svg)](https://npmjs.com/package/unplugin-vue)

[![单元测试](https://github.com/unplugin/unplugin-vue/actions/workflows/unit-test.yml/badge.svg)](https://github.com/unplugin/unplugin-vue/actions/workflows/unit-test.yml)

将 Vue 3 SFC 转换为 JavaScript。

## 特性

- ⚡️ 支持 Vite、Webpack、Vue CLI、Rollup、esbuild 等，由 [unplugin](https://github.com/unjs/unplugin) 提供支持。
- ✨ 支持 `<script setup>` 和宏。
- 🔥 对 Vite 的热模块替换（HMR）支持。
- 🔄 定期从 [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue) 同步代码。目前基于 [@vitejs/plugin-vue@5.2.1](https://github.com/vitejs/vite-plugin-vue/tree/plugin-vue@5.2.1/packages/plugin-vue)。

## 谁在使用

- [Vue Macros](https://github.com/vue-macros/vue-macros) - 探索和扩展更多宏和 Vue 的语法糖。
- [vue-components-lib-seed](https://github.com/zouhangwithsweet/vue-components-lib-seed) - 一个 Vue 3.0 组件库模板。
- [Element Plus icons](https://github.com/element-plus/element-plus-icons)

## 替代品

- [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue) - 用于 Vite 和 Vue 3。
- [@vitejs/plugin-vue2](https://github.com/vitejs/vite-plugin-vue2) - 用于 Vite 和 Vue 2。
- [unplugin-vue2](https://github.com/unplugin/unplugin-vue2) - 用于 Vue 2.7+ 以及 Vite、esbuild、Rollup、Webpack 等。
- [vue-loader](https://github.com/vuejs/vue-loader) - 用于 Webpack。
- [esbuild-plugin-vue](https://github.com/egoist/esbuild-plugin-vue) - 用于 esbuild 和 Vue 3。
- [esbuild-vue](https://github.com/apeschar/esbuild-vue) - 用于 esbuild 和 Vue 2。
- ~~[vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2) - 用于 Vite 和 Vue 2.~~
- ~~[rollup-plugin-vue](https://github.com/vuejs/rollup-plugin-vue)~~ - ⚠️ 已不再维护。

## 感谢

- [Vite](https://github.com/vitejs/vite) - 下一代前端工具。速度快！
- [unplugin](https://github.com/unjs/unplugin) - 统一的 Vite、Rollup、Webpack 等插件系统。
- [vite-plugin-vue](https://github.com/vitejs/vite-plugin-vue) - 本项目从中继承。

## 赞助商

<p align="center">
  <a href="https://file.302.ai/gpt/imgs/20241230/505d473d28e24a688a9c8fd168b897f1.svg">
    <img src='https://file.302.ai/gpt/imgs/20241230/505d473d28e24a688a9c8fd168b897f1.svg'/>
  </a>
</p>

## 许可证

[MIT](./LICENSE) 许可证 © 2022-PRESENT [三咲智子](https://github.com/sxzz)