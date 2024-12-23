---
aside: false
lastUpdated: false
---

# 插件约定

为了拥有一个更好的社区和生态系统，我们鼓励插件作者在创建 unplugin 时遵循以下约定。

- 由 Unplugin 驱动的插件应该具有清晰的名称，并以 `unplugin-` 前缀开头。
- 在 `package.json` 中包含 `unplugin` 关键字。
- 为了提供更好的开发体验，包可以导出两种类型的入口点：
  - 默认导出：`createUnplugin` 函数返回的值

    ```ts
    import UnpluginFeature from 'unplugin-feature'
    ```

  - 子路径导出：`createUnplugin` 函数返回值的属性供每个打包工具用户使用

    ```ts
    import VitePlugin from 'unplugin-feature/vite'
    ```

  - 有关此设置的更多细节，请参考 [unplugin-starter](https://github.com/unplugin/unplugin-starter)。