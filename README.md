<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/icon-dark.png">
    <img src="docs/brand/icon.png" width="104" height="104" alt="BayesChat app icon">
  </picture>
</p>

<h1 align="center">BayesChat</h1>

<p align="center"><b>Private iOS AI chat: BYOK, MCP, memory and presets — all on your device.</b></p>

<p align="center">
  <img src="docs/badges/ios.svg" alt="iOS 17 or later">
  <img src="docs/badges/device.svg" alt="Runs on iPhone and iPad">
  <img src="docs/badges/languages.svg" alt="22 languages">
  <img src="docs/badges/pro.svg" alt="Pro is a one-time $14.99 purchase">
  <img src="docs/badges/version.svg" alt="Version 1.1.7, build 55">
</p>

<p align="center">
  <a href="https://apps.apple.com/app/id6777948055"><img src="docs/brand/app-store.svg" height="40" alt="Download on the App Store"></a>
  &nbsp;&nbsp;
  <a href="https://bayeschat.xyz"><img src="docs/badges/website.svg" height="40" alt="bayeschat.xyz"></a>
  &nbsp;&nbsp;
  <a href="https://discord.com/invite/6sQVmYzUaP"><img src="docs/badges/discord.svg" height="40" alt="Join the Discord"></a>
  &nbsp;&nbsp;
  <a href="https://x.com/bayeschat"><img src="docs/badges/x.svg" height="40" alt="@bayeschat on X"></a>
</p>

<p align="center">
  <a href="docs/"><code>Docs</code></a> &nbsp;
  <a href="#screenshots"><code>Screenshots</code></a> &nbsp;
  <a href="CHANGELOG.md"><code>Changelog</code></a> &nbsp;
  <a href="release-notes/"><code>Release Notes</code></a> &nbsp;
  <a href="PROVIDERS.md"><code>Providers</code></a> &nbsp;
  <a href="#support"><code>Support</code></a> &nbsp;
  <a href="README.zh-CN.md"><code>简体中文</code></a>
</p>

**The official BayesChat repo** — news, docs and a changelog for every release.

**Providers can be listed in BayesChat from this repo.** The built-in provider
list is a public catalogue: if your endpoint speaks OpenAI Chat Completions or
Anthropic Messages, one pull request adds it to the app's *Choose Provider* list
— no App Store release, no code. See [`PROVIDERS.md`](PROVIDERS.md) for the rules
and the submission steps (BayesChat 1.1.7 or later).

---

## BYOK: any provider, local or cloud

Point BayesChat at whatever you already pay for, and manage it from one place.
Nothing is hardcoded — if an endpoint speaks a supported protocol, it works.

- **OpenAI** (Chat Completions and the Responses API), **Anthropic** (Messages),
  **Google Gemini**, **OpenRouter**, plus any **OpenAI-compatible** endpoint
- **Custom base URLs**, with the protocol detected from the URL you paste
- **Local runtimes** — Ollama, LM Studio, llama.cpp server — including Ollama's
  own `keep_alive` handling so your model stays warm between turns
- **Per-provider custom headers**, with `{session_id}` and `{model_id}` placeholders.
  This is what makes multi-protocol gateways usable: point a provider at OpenCode Go
  (`https://opencode.ai/zen/go/v1`) or OpenCode Zen (`https://opencode.ai/zen/v1`), add
  `x-opencode-session: {session_id}` once, and every conversation gets its own stable
  session id. Each model on that gateway is then routed to the protocol it actually
  speaks — Chat Completions, Anthropic Messages or OpenAI Responses — instead of one
  wire format being forced on the whole endpoint.
- **Live model lists** — the picker shows what your key can actually call, not a
  hardcoded table
- Keys live in the **Keychain**, never in plain files

## Add your provider

The list behind *Choose Provider* is a public catalogue, not a build-time
constant: one pull request adds a row (and a mark), and it reaches people who
already have the app — no App Store release.

- [`PROVIDERS.md`](PROVIDERS.md) is the contract: the file format, the logo
  rules, and what cannot be expressed as data.
- Run `node scripts/check-providers.mjs` before opening the pull request; CI runs
  the same check.
- Requires **BayesChat 1.1.7 or later**. Older builds ship their own copy of the
  list and never download it, so a newly added provider will not appear there.

[Open a pull request →](https://github.com/fan3cn/bayeschat/compare)

## MCP: Plug in your AI into the real world

Most MCP tooling stops at the desktop. BayesChat connects to **remote MCP servers
over Streamable HTTP** and runs their tools inside the conversation.

- Add a server, choose **bearer token** or **custom headers**, then **Validate &
  Fetch Tools** — you see the connection succeed and the tool list arrive
- **Toggle tools individually**, so a server can expose twenty and the model only
  gets the three you want
- Every call renders **inline** with its arguments, latency, token delta and
  result — expandable, copyable, cancellable
- **Concurrent calls** within a round instead of a queue, **retry in place** when
  one fails, and a **Continue** prompt when a model stops after calling tools
  without writing its final answer
- Long tool output is truncated intelligently instead of blowing out the context

> iOS cannot spawn child processes, so **stdio servers don't apply**. Remote HTTP
> servers do — and that's the whole design.

## Chat Presets: saved configuration, one tap to switch

A preset is not a saved prompt. It's the entire configuration for one kind of
task, switched in one tap.

- **Save the prompt, model, parameters, memory and tools as one reusable preset, then
  switch presets in a single tap** — Translator to Research changes everything above
  at once, not just the words of the prompt.
- Prompt variables such as `{{current_date}}`, `{{current_time}}`, `{{current_weekday}}`,
  `{{current_datetime}}`, `{{timezone}}` and `{{model_id}}` are resolved at send time.
- A preset can inherit your global parameters or override them individually.
- Each preset has its own icon and description; one can be marked as the default.
- The composer only shows the parameters that differ from the defaults, so a tuned
  preset looks different at a glance.

## Memory: AI remembers you across chats

Memory is not a black box that quietly rewrites your prompt.

- Learned from your conversations, then **merged under explicit capacity and
  protection rules** instead of blindly appended
- Every entry is **visible, editable and deletable** — you can fix what it got
  wrong, or delete a single fact without wiping everything
- Shown as a **pill in the composer** so you always know whether memory is active
  for this conversation
- Settles **inside the same run as the answer**, so a finished reply means the
  memory is finished too

## Background tasks: leave the app, nothing stops

Long answers and multi-step tool runs **keep going after you send the app to the
background**, with progress on the **Lock Screen and in the Dynamic Island** —
including a cancel control.

- Built on iOS 26's continued-processing API, so the network stays alive instead
  of being suspended
- **Live Activity** shows what's running and how far along it is
- **Opt-in notification** when it finishes; tapping it opens the conversation
  that finished
- Conversation title and memory updates are finished **inside the same background
  run**, so nothing is half-written when you come back
- On older iOS versions the app falls back to the normal background grace period

## Privacy: your data stays on your device

The product promise is verifiable, not just stated.

- **No account, no sign-up, no identity** — nothing to log in to
- Requests go to exactly two kinds of hosts: the provider endpoint you configured,
  and the MCP servers you added. Nothing else
- Conversations, presets and memory are stored **locally on the device**
- API keys and MCP credentials in the **Keychain**
- **No tracking, no analytics SDK, no third-party telemetry** — the app's privacy
  manifest declares no collected data types and no tracking domains
- Export and back up your data and take it with you, without asking anyone

---

## Screenshots

<p align="center">
  <img src="docs/screenshots/01-hero-privacy.webp" width="240" alt="A BayesChat conversation on iPhone: a question about AAPL, a collapsible reasoning block, two MCP tool calls and a streamed answer in Markdown">
  <img src="docs/screenshots/02-byok-providers.webp" width="240" alt="The provider picker on iPhone listing OpenAI-compatible, OpenRouter, OpenAI, Anthropic, Google Gemini, Mistral, xAI, Groq, DeepSeek and Fireworks AI">
  <img src="docs/screenshots/03-chat-presets.webp" width="240" alt="The new-chat screen with three Chat Presets — Research, Daily Talk and Translator — above the composer">
</p>

<p align="center"><sub><b>A private AI chat workspace</b> &nbsp;·&nbsp; <b>Any provider, local or cloud</b> &nbsp;·&nbsp; <b>Presets store prompts, models, parameters and tools</b></sub></p>

<p align="center">
  <img src="docs/screenshots/04-mcp-add-server.webp" width="240" alt="Adding a remote MCP server: name, URL, bearer-token authentication, then Validate and Fetch Tools returning a connected state">
  <img src="docs/screenshots/05-mcp-tool-call.webp" width="240" alt="An MCP tool call expanded inline in the conversation, showing its arguments, latency, token delta and JSON result">
  <img src="docs/screenshots/06-markdown-latex.webp" width="240" alt="A reply rendering LaTeX math, a table and syntax-highlighted code inside the transcript">
</p>

<p align="center"><sub><b>Add a remote MCP server and fetch its tools</b> &nbsp;·&nbsp; <b>MCP tool calls, fully expanded</b> &nbsp;·&nbsp; <b>Markdown, LaTeX, code and tables</b></sub></p>

<p align="center">
  <img src="docs/screenshots/07-parameters.webp" width="240" alt="Session parameters on iPhone: reasoning effort, temperature, top K, max tokens, penalties and seed">
  <img src="docs/screenshots/08-themes-sepia.webp" width="240" alt="The Sepia transcript theme applied to a conversation about a stock">
  <img src="docs/screenshots/09-background-dynamic-island.webp" width="240" alt="A background answer still running, shown as a Live Activity in the Dynamic Island">
</p>

<p align="center"><sub><b>Sampling controls, per preset</b> &nbsp;·&nbsp; <b>Themes and typography</b> &nbsp;·&nbsp; <b>Answers keep running in the background, live in the Dynamic Island</b></sub></p>

## Everything else

| **Feature**              | **What it does**                                                                                                                                                                                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Reasoning and tools**  | `<thinking>` tags and `reasoning` / `thinking` fields parsed into their own collapsible block; tool calls expand to their arguments, latency, token delta and JSON result — both copyable             |
| **Parameters**           | Temperature · Top P · Top K · Min P · Max Tokens · reasoning effort (low / medium / high) · penalties · seed · stop sequences · raw provider JSON — every knob your provider exposes, no config files |
| **Rendering**            | Markdown, KaTeX math, syntax-highlighted code and tables in one transcript surface that repaints only the streaming block — long answers stay smooth, with a typewriter reveal and lighter typography |
| **Attachments**          | Photos, PDFs and text files — a PDF is read into the prompt as text, and a photo opens at its original resolution                                                                                     |
| **Usage**                | Live `tok/s`, latency and up/down token counts under every reply                                                                                                                                      |
| **Composer**             | Auto-grows with your text, expands into a full-screen editor, submits with the keyboard Send key, with parameter / reasoning / memory / preset pills in one row                                       |
| **Prompt templates**     | Reusable system prompts, picked from the composer instead of retyped in every chat                                                                                                                    |
| **Auto titles**          | The model writes the title of every conversation from the conversation itself                                                                                                                         |
| **Message actions**      | Edit and regenerate replies, long-press any message to edit / copy / delete, and pin one so it holds still while reasoning and tool cards expand                                                      |
| **Clear context**        | Start a fresh context inside the same conversation — earlier messages stay in the transcript, only what follows is sent to the model                                                                  |
| **Navigation**           | Slide-out history drawer from the left edge, jump-to-bottom that appears only when it's needed                                                                                                        |
| **Search and favorites** | Search conversations by title, subtitle or first message; star the ones you keep and they group at the top of the drawer                                                                              |
| **Export**               | Batch export to Markdown, HTML or PDF (zip), or share a single conversation straight from its footer                                                                                                  |
| **Backup and restore**   | A plain JSON file, category by category, restored in-app — API keys and custom headers are never included                                                                                             |
| **Appearance**           | Light and dark, six transcript themes including sepia, adjustable typography                                                                                                                          |
| **Localisation**         | **22 languages**, including Simplified and Traditional Chinese                                                                                                                                        |
| **Onboarding**           | A setup guide that gets you from install to first answer, and a What's New card after each update                                                                                                     |

## Requirements and limits

- **iOS / iPadOS 17 or later.** Background continuations and the Live Activity
  require **iOS 26**.
- **Remote MCP servers only.** iOS cannot spawn local processes, so `stdio`
  servers are not supported by any iOS client — including this one.
- The model does the thinking. BayesChat does not proxy, resell or route your
  requests through anyone.

## Support

- **Bugs and questions:** [open an issue](https://github.com/fan3cn/bayeschat/issues) — that's the main channel
- **Discord:** [discord.com/invite/6sQVmYzUaP](https://discord.com/invite/6sQVmYzUaP) — the fastest place for a quick question
- **X:** [@bayeschat](https://x.com/bayeschat) — release announcements
- **Email:** <bayeschat@gmail.com>, for anything you'd rather not post publicly
- **Privacy policy:** [bayeschat.xyz/privacy.html](https://bayeschat.xyz/privacy.html) is the canonical page ([why this repo only links to it](docs/privacy.md))
- **What changed in each release:** [CHANGELOG.md](CHANGELOG.md) — the technical record, commit by commit
- **What's new, in a release's own words:** [release-notes](release-notes/) — the App Store copy, English and Chinese
- **How it compares:** [BYOK AI chat clients for iOS compared](https://bayeschat.xyz/blog/posts/2026-09-18-best-byok-ai-chat-clients-ios.html)

When reporting a problem, please include the app version, your device model, the
iOS or iPadOS version, the provider and model you were using, and whether MCP was
involved. Those five details turn a "it doesn't work" into something fixable.
