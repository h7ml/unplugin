<p align="center">
<img src="https://file.302.ai/gpt/imgs/20241217/05ba69d70182449b876f4252c979065d.svg">
</p>

<h1 align="center">
Unplugin
</h1>
<p align="center">
统一插件系统，支持 Vite、Rollup、webpack、esbuild 等
</p>

<p align="center">
<a href="https://unplugin.unjs.io">文档</a>
</p>

## 开发

此项目使用 [GitHub GraphQL API](https://docs.github.com/en/graphql) 来生成展示数据。因此，您需要先创建 [GitHub 个人访问令牌](https://github.com/settings/personal-access-tokens/new)。

```bash
cp .env.example .env
```

```ini
# .env
GITHUB_TOKEN=<YOUR_TOKEN>
```

### 生成文件

```bash
pnpm gen-files
```

## 贡献

请参考 https://github.com/antfu/contribute