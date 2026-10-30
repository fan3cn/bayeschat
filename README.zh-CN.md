<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/icon-dark.png">
    <img src="docs/brand/icon.png" width="104" height="104" alt="BayesChat 应用图标">
  </picture>
</p>

<h1 align="center">BayesChat</h1>

<p align="center"><b>私密的 iOS AI 对话：自带 API Key、MCP、记忆与预设 —— 全部在你的设备上完成。</b></p>

<p align="center">
  <img src="docs/badges/ios.svg" alt="iOS 17 及以上">
  <img src="docs/badges/device.svg" alt="可在 iPhone 与 iPad 上运行">
  <img src="docs/badges/languages.svg" alt="22 种语言">
  <img src="docs/badges/pro.svg" alt="Pro 为一次性 14.99 美元购买">
  <img src="docs/badges/version.svg" alt="版本 1.1.7，构建号 55">
</p>

<p align="center">
  <a href="https://apps.apple.com/app/id6777948055"><img src="docs/brand/app-store.svg" height="40" alt="从 App Store 下载"></a>
  &nbsp;&nbsp;
  <a href="https://bayeschat.xyz"><img src="docs/badges/website.svg" height="40" alt="bayeschat.xyz"></a>
  &nbsp;&nbsp;
  <a href="https://discord.com/invite/6sQVmYzUaP"><img src="docs/badges/discord.svg" height="40" alt="加入 Discord"></a>
  &nbsp;&nbsp;
  <a href="https://x.com/bayeschat"><img src="docs/badges/x.svg" height="40" alt="在 X 上关注 @bayeschat"></a>
</p>

<p align="center">
  <a href="docs/"><code>文档</code></a> &nbsp;
  <a href="#截图"><code>截图</code></a> &nbsp;
  <a href="CHANGELOG.md"><code>更新日志</code></a> &nbsp;
  <a href="release-notes/"><code>发布说明</code></a> &nbsp;
  <a href="PROVIDERS.md"><code>服务商</code></a> &nbsp;
  <a href="#支持"><code>支持</code></a> &nbsp;
  <a href="README.md"><code>English</code></a>
</p>

**BayesChat 官方仓库** —— 发布动态、文档以及每个版本的更新日志。

**服务商可以从这个仓库列进 BayesChat。** 内置服务商列表是一份公开目录：只要你的接口讲 OpenAI Chat Completions 或 Anthropic Messages，一个 PR 就能把它加进 App 的 *Choose Provider* 列表 —— 不用发版、不用改代码。规则和提交步骤见 [`PROVIDERS.md`](PROVIDERS.md)（需要 BayesChat 1.1.7 或更高版本）。

---

## BYOK：任意服务商，本地或云端都行

把 BayesChat 指向你已经在付费的服务上，并在一个地方统一管理它们。
没有任何东西是写死的 —— 只要接口讲的是受支持的协议，它就能用。

- **OpenAI**（Chat Completions 与 Responses API）、**Anthropic**（Messages）、
  **Google Gemini**、**OpenRouter**，以及任何 **OpenAI 兼容** 接口
- **自定义 Base URL**，协议会根据你粘贴的地址自动识别
- **本地运行时** —— Ollama、LM Studio、llama.cpp server —— 并原生支持 Ollama 的
  `keep_alive`，让模型在多轮对话之间保持热启动
- **每个服务商可单独配置请求头**，支持 `{session_id}` 与 `{model_id}` 占位符。
  正因如此，多协议网关才真正可用：把服务商指向 OpenCode Go
  （`https://opencode.ai/zen/go/v1`）或 OpenCode Zen（`https://opencode.ai/zen/v1`），
  只需添加一次 `x-opencode-session: {session_id}`，每次对话就会获得独立且稳定的
  会话 ID。此时网关上的每个模型都会路由到它真正支持的协议 —— Chat Completions、
  Anthropic Messages 或 OpenAI Responses —— 而不是把一种传输格式强行套用到整个接口上。
- **实时模型列表** —— 模型选择器展示的是你的 Key 真正能调用的模型，而不是一张写死的表
- Key 保存在**钥匙串（Keychain）**中，绝不落到明文文件里

## 把你的服务商加进来

*Choose Provider* 里的列表是一份公开目录，不是写死在 App 里的：一个 PR 加一行
（和一张图标），就能到达已经装了 App 的用户 —— 不需要发版。

- [`PROVIDERS.md`](PROVIDERS.md) 是契约：文件格式、图标要求，以及哪些东西没法用数据表达。
- 提 PR 前跑 `node scripts/check-providers.mjs`，CI 会跑同一套检查。
- 需要 **BayesChat 1.1.7 或更高版本**。更旧的版本自带一份列表、从不下载，
  因此看不到后来新增的服务商。

[去提 PR →](https://github.com/fan3cn/bayeschat/compare)

## MCP：把你的 AI 接入真实世界

大多数 MCP 工具止步于桌面端。BayesChat 通过 **Streamable HTTP** 连接**远程 MCP 服务器**，
并在对话中直接执行它们的工具。

- 添加服务器，选择 **Bearer Token** 或**自定义请求头**，然后点击 **Validate &
  Fetch Tools** —— 你会看到连接成功，并取回工具列表
- **逐个开关工具**，一个服务器可以暴露二十个工具，而模型只拿到你需要的三个
- 每次调用都会**内联展示**参数、延迟、token 增量与结果 —— 可展开、可复制、可取消
- 同一轮内**并发调用**而非排队，失败时**原地重试**，并在模型调用工具后未给出最终回答时
  提示 **Continue**
- 过长的工具输出会被智能截断，而不是把上下文撑爆

> iOS 无法创建子进程，因此**基于 stdio 的服务器不适用**。远程 HTTP 服务器可以 ——
> 这正是整套设计的前提。

## 对话预设：一键切换整套配置

预设不是一段保存下来的提示词，而是某一类任务的完整配置，一键即可切换。

- **把提示词、模型、参数、记忆与工具保存为一个可复用预设，再用一次点击切换预设** ——
  从「翻译」切到「研究」，会同时换掉上面的一切，而不只是提示词的措辞
- 提示词变量如 `{{current_date}}`、`{{current_time}}`、`{{current_weekday}}`、
  `{{current_datetime}}`、`{{timezone}}` 和 `{{model_id}}` 会在发送时求值
- 预设既可以继承全局参数，也可以逐项覆盖
- 每个预设都有独立的图标与描述，其中一个可设为默认
- 输入框只显示与默认值不同的参数，因此调校过的预设一眼就能看出不同

## 记忆：AI 跨对话记住你

记忆不是一个悄悄改写你提示词的黑盒。

- 从对话中学习，然后**在明确的容量与保护规则下合并**，而不是无脑追加
- 每一条记忆都**可见、可编辑、可删除** —— 你可以修正它记错的内容，或只删掉一条事实而
  不必清空全部
- 在输入框中以**药丸标签**显示，让你随时知道本次对话是否启用了记忆
- **在同一次运行内落定**，因此回复结束也就意味着记忆已经写完

## 后台任务：离开应用，也不会中断

长时间的回答与多步工具调用在**把应用切到后台之后仍会继续运行**，进度显示在
**锁定屏幕与灵动岛**上 —— 并且可以直接取消。

- 基于 iOS 26 的持续处理（continued processing）API 构建，网络连接保持活跃而不会被挂起
- **实时活动（Live Activity）**展示正在运行的内容与进度
- 完成时可**选择接收通知**，点击通知会打开刚完成的那段对话
- 对话标题与记忆更新**在同一次后台运行内完成**，回来时不会看到写了一半的内容
- 在较旧的 iOS 版本上，应用回退到普通的后台宽限期行为

## 隐私：你的数据留在你的设备上

这是可以被验证的产品承诺，而不只是说说而已。

- **无需账号、无需注册、无需身份** —— 没有登录这回事
- 请求只会发往两类主机：你配置的服务商接口，以及你添加的 MCP 服务器。别无其他
- 对话、预设与记忆**都存储在本地设备上**
- API Key 与 MCP 凭据保存在**钥匙串**中
- **没有追踪、没有分析 SDK、没有第三方遥测** —— 应用的隐私清单声明不收集任何数据类型，
  也没有任何追踪域名
- 导出与备份你的数据，随时带走，不必征求任何人同意

---

## 截图

<p align="center">
  <img src="docs/screenshots/01-hero-privacy.webp" width="240" alt="iPhone 上的 BayesChat 对话：关于 AAPL 的提问、可折叠的推理块、两次 MCP 工具调用，以及以 Markdown 流式输出的回答">
  <img src="docs/screenshots/02-byok-providers.webp" width="240" alt="iPhone 上的服务商选择器，列出 OpenAI 兼容、OpenRouter、OpenAI、Anthropic、Google Gemini、Mistral、xAI、Groq、DeepSeek 与 Fireworks AI">
  <img src="docs/screenshots/03-chat-presets.webp" width="240" alt="新建对话界面，输入框上方有三个对话预设 —— 研究、日常闲聊与翻译">
</p>

<p align="center"><sub><b>一个私密的 AI 对话工作台</b> &nbsp;·&nbsp; <b>任意服务商，本地或云端</b> &nbsp;·&nbsp; <b>预设保存提示词、模型、参数与工具</b></sub></p>

<p align="center">
  <img src="docs/screenshots/04-mcp-add-server.webp" width="240" alt="添加远程 MCP 服务器：名称、URL、Bearer Token 认证，然后 Validate and Fetch Tools 返回已连接状态">
  <img src="docs/screenshots/05-mcp-tool-call.webp" width="240" alt="对话中内联展开的 MCP 工具调用，展示参数、延迟、token 增量与 JSON 结果">
  <img src="docs/screenshots/06-markdown-latex.webp" width="240" alt="在对话记录中渲染 LaTeX 公式、表格与语法高亮代码的回答">
</p>

<p align="center"><sub><b>添加远程 MCP 服务器并取回其工具</b> &nbsp;·&nbsp; <b>MCP 工具调用完整展开</b> &nbsp;·&nbsp; <b>Markdown、LaTeX、代码与表格</b></sub></p>

<p align="center">
  <img src="docs/screenshots/07-parameters.webp" width="240" alt="iPhone 上的会话参数：推理强度、温度、Top K、最大 token、惩罚项与随机种子">
  <img src="docs/screenshots/08-themes-sepia.webp" width="240" alt="在一段关于股票的对话中应用了 Sepia 对话记录主题">
  <img src="docs/screenshots/09-background-dynamic-island.webp" width="240" alt="后台仍在运行的回答，以实时活动形式显示在灵动岛上">
</p>

<p align="center"><sub><b>采样控制，按预设区分</b> &nbsp;·&nbsp; <b>主题与排版</b> &nbsp;·&nbsp; <b>回答在后台继续运行，实时显示在灵动岛</b></sub></p>

## 其他功能

| **功能**    | **说明**                                                                                                            |
| --------- | ----------------------------------------------------------------------------------------------------------------- |
| **推理与工具** | `<thinking>` 标签以及 `reasoning` / `thinking` 字段会被解析为独立的可折叠区块；工具调用可展开查看参数、延迟、token 增量与 JSON 结果 —— 两者都可复制             |
| **参数**    | 温度 · Top P · Top K · Min P · 最大 token · 推理强度（低 / 中 / 高）· 惩罚项 · 随机种子 · 停止序列 · 原始服务商 JSON —— 服务商暴露的每个旋钮都在这里，不需要配置文件 |
| **渲染**    | Markdown、KaTeX 公式、语法高亮代码与表格共用一个对话记录界面，且只重绘正在流式输出的部分 —— 长回答依然流畅，并支持打字机式呈现与更轻的排版                                    |
| **附件**    | 图片、PDF 与文本文件 —— PDF 会被读入提示词作为文本，图片则以原始分辨率打开                                                                       |
| **用量**    | 每条回复下方实时显示 `tok/s`、延迟以及输入 / 输出 token 数量                                                                           |
| **输入框**   | 随文本自动增高，可展开为全屏编辑器，用键盘的发送键提交，参数 / 推理 / 记忆 / 预设标签排成一行                                                               |
| **提示词模板** | 可复用的系统提示词，从输入框直接选用，不必每次重新输入                                                                                       |
| **自动标题**  | 由模型根据对话内容自动撰写每段对话的标题                                                                                              |
| **消息操作**  | 编辑与重新生成回复，长按任意消息可编辑 / 复制 / 删除，也可置顶，让它在推理与工具卡片展开时保持不动                                                              |
| **清空上下文** | 在同一段对话中开启全新上下文 —— 早期消息仍留在记录里，只有后续内容会发送给模型                                                                         |
| **导航**    | 从左边缘滑出的历史记录抽屉，只在需要时才出现的回到底部按钮                                                                                     |
| **搜索与收藏** | 按标题、副标题或首条消息搜索对话；给常用对话加星，它们会置顶分组显示在抽屉里                                                                            |
| **导出**    | 批量导出为 Markdown、HTML 或 PDF（zip），也可从单个对话底部直接分享                                                                      |
| **备份与恢复** | 一个纯 JSON 文件，按类别分类，可在应用内恢复 —— API Key 与自定义请求头永远不会包含在内                                                              |
| **外观**    | 浅色与深色模式，六种对话记录主题（含 sepia），排版可调                                                                                    |
| **本地化**   | **22 种语言**，包含简体中文与繁体中文                                                                                            |
| **引导**    | 一份从安装到第一个答案的上手指南，以及每次更新后的「新功能」卡片                                                                                  |

## 要求与限制

- **iOS / iPadOS 17 或更高版本。** 后台持续运行与实时活动需要 **iOS 26**。
- **仅支持远程 MCP 服务器。** iOS 无法创建本地进程，因此 `stdio` 服务器不受任何 iOS 客户端
  支持 —— 包括本应用。
- 思考由模型完成。BayesChat 不代你转发、不转售，也不会路由你的请求。

## 支持

- **缺陷与问题：** [提交 issue](https://github.com/fan3cn/bayeschat/issues) —— 这是主要渠道
- **Discord：** [discord.com/invite/6sQVmYzUaP](https://discord.com/invite/6sQVmYzUaP) —— 想快速问一句就来这里
- **X：** [@bayeschat](https://x.com/bayeschat) —— 发布公告
- **邮箱：** <bayeschat@gmail.com>，用于你不想公开发布的内容
- **隐私政策：** [bayeschat.xyz/privacy.html](https://bayeschat.xyz/privacy.html) 是权威页面
  （[为什么本仓库只放链接](docs/privacy.md)）
- **每个版本改了什么：** [CHANGELOG.md](CHANGELOG.md)（逐条技术记录）
- **每个版本对外怎么说：** [release-notes](release-notes/)（App Store 文案，中英文）
- **横向对比：** [iOS 上 BYOK AI 对话应用对比](https://bayeschat.xyz/blog/posts/2026-09-18-best-byok-ai-chat-clients-ios.html)

反馈问题时，请附上应用版本、设备型号、iOS 或 iPadOS 版本、你使用的服务商与模型，以及是否涉及
MCP。这五项信息能把「用不了」变成可定位的问题。
