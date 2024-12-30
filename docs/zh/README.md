<p align="center">
<img src="https://file.302.ai/gpt/imgs/20241230/385c6b1392aa405299df365697bb2d8b.svg">
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

该项目使用 [GitHub GraphQL API](https://docs.github.com/en/graphql) 来生成展示数据。您需要首先创建一个 [GitHub 个人访问令牌](https://github.com/settings/personal-access-tokens/new)。

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