# Changelog

All notable changes to BayesChat are recorded in this file.

## [1.1.8] - 2026-11-02

<!-- build 56 | since 1.1.7 (d685a0c) | d685a0c..4adc5d5 | 16 commits -->

### New Features

- About has a page on Bayes' theorem: the formula set as a fraction, the minister who never published it, and why a language model is that one line run billions of times (5f7a3da)

### Changed

- The model now knows what time it is without being told in a prompt: every user message carries the local time it was written, so questions about today, now or how long ago something happened are answered against the clock instead of the training data (bef66e6)
- That time travels with the message rather than inside the instructions, which means a conversation no longer rewrites its own system prompt every minute and the prompt cache keeps answering from the same place it left off (bef66e6)
- The prompt template editor offers only the model ID now: the timezone rides the send time on each message, and the rest of its variables are gone along with the cache warning they needed (bef66e6)
- The developer contact address in About and on the privacy and terms pages is now support@bayeschat.xyz, so reaching support no longer depends on a mailbox a provider can shut down (4008124)
- Contact Developer drafts the message with the app version, device model, iOS version and app language already in the body, so a report arrives answerable instead of prompting a follow-up question (6273320)

### Fixed

- Scrolling text stops exactly at the input box: the card's shadow no longer spills a hazy band above its top edge, so the last line dissolves behind the card instead of running through a narrow dirty strip (64ab810)

### Removed

- Current date, current time, current weekday, current datetime and timezone prompt variables, replaced by the send time on each message (bef66e6)


## [1.1.7] - 2026-10-29

<!-- build 55 | since 1.1.6 (d565aef) | d565aef..d685a0c | 188 commits -->


### New Features

- The built-in provider list is data the app updates itself: a vendor that merges a pull request into the public catalog shows up in Choose Provider, without waiting for a new app version (d21e28d)
- Tapping + to add a provider refreshes that list first, with a spinner: a slow or failed refresh just leaves the list you already had, and you can pick from it while it runs (d21e28d)
- A conversation that runs past midnight is split by its date, said once for the whole day on a line of its own, while each message keeps its own time where it always was (6576e3b)
- A conversation that begins today opens straight onto its first message instead of a Today heading, which explained the one thing the reader already knew; a conversation that began on an earlier day keeps its date (d8357fb)
- That date says Today and Yesterday as words, other days by their date, and carries the year only when it is not the current one (6576e3b)
- The conversation list names those days the same way, from one place, so a chat filed under Yesterday never opens onto a page that calls that day something else (6576e3b)
- Memory shows what it just learned instead of saving it silently: a capsule lifts off the memory pill above the composer with the entry in your own words, cycles through the rest when a pass learned several, and leaves on its own, while the pill counts them (12ff2d0)
- Additions only reach that capsule: a reworded or removed entry is a correction, not news, and the list in settings is where corrections show up (12ff2d0)
- The app keeps its model catalogue current instead of waiting for the next release: it checks once a day in the background, and until a newer copy arrives the current one keeps answering (0720b70)
- Reasoning works out what a model accepts even when the app has never seen it: a bundled catalogue of over three hundred models supplies the levels, whether thinking can be stopped, and the model's own default, and it is generated instead of hand-written (f736f22)
- Reasoning has its own panel instead of a row among the sampling switches, so it can explain itself: which levels the chosen model takes, the level it uses by default, and why some models cannot be turned off at all (200a9af)
- The reasoning panel names the model it is talking about and says what will be sent, including when a model does not reason at all, when it always reasons, and when it is not in the app's catalog (200a9af)
- An endpoint the app cannot place ends its reasoning panel with Try smart detection, which opens the engine serving it and the model's own name, read from the endpoint's own model list and both editable by hand (54bf83e)
- That answer is kept for the provider and model it was given for, and printed under the link as what was detected, so the correction does not have to be made twice (54bf83e)
- Detect reads the levels out of the model's own chat template and lists them before anything is saved, and a saved answer draws exactly the chips a known model draws, Off included when the template has a switch for it (15b9a17)
- Detect answers within a few seconds either way instead of spinning: the look-up is bounded, a host that cannot be reached is retried on the community mirror of the same model API, and the sheet says whether the template was not found or the site could not be reached (5f55081)
- A saved detection survives switching to another model and back, and survives the provider being renamed, because the answer now belongs to the model rather than to the provider it was saved under (b2ea5a4)
- An endpoint smart detection has described keeps one correction line instead of two: the detection sheet replaces the hand-written fields link there, since the levels are already the model's own (b2ea5a4)
- The model row in smart detection has a name of its own, Exact Model ID, instead of showing only the value once something had been typed into it (6a4d442)
- Detect keeps a model's quantisation in its name, because a re-published quant is its own repository with its own chat template: an oMLX build of Sage-A1.5 now reads that build's levels instead of the base model's (bd09cfa)
- The second row of smart detection is labelled Model ID rather than Exact Model ID, and the word exact is gone from all 21 translations with it (f3b1f73)
- A detected model whose thinking is a switch rather than a set of levels keeps its Off chip: Ornith-1.5-35B-A3B used to be reported as having no reasoning at all, and its switch was nowhere on the panel (6409a16)
- A model smart detection described keeps the Not correct? Set your own parameters line as well, because the two correct different things: where the levels came from, and which field the endpoint actually reads (05c84a4)
- Smart detection reports the repository and the template on separate lines, and says when a template was read but steers nothing, instead of calling both cases a missing template (1f358c1)
- A chat preset's reasoning panel is the same panel the composer opens: smart detection and the hand-written fields are there too, because a preset pins one provider and model and those answers belong to that pair (0503363)

### Added

- Verify & Fetch Models replaces a provider's model list instead of appending to it, so the models an endpoint stopped offering leave the picker instead of answering with an error when chosen (1986e9a)
- Settings has a Model Data screen: which copy is in use, the day it was published, when it was last checked and updated, how many models and providers it knows, and a button to check now (0720b70)
- That screen lists what the last update changed, so a model that appeared, disappeared or started taking different reasoning levels can be seen instead of guessed at (0720b70)
- Only the part of the download the app acts on is kept: the endpoint, the family of fields and each model's own levels. What stays on the device is about a tenth of it and the original file is never stored (0720b70)
- A copy downloaded before an upgrade gives way to the snapshot that ships with the new version, instead of shadowing it (0720b70)
- Use Built-in Data on that screen drops the download and goes back to the copy that came with this version (0720b70)
- A model typed by hand is marked Manual and survives that refresh: only the models the endpoint publishes are replaced (1986e9a)
- A model the endpoint still lists keeps its favourite, its switched-off state and its context length through a refresh, because only the ones that disappeared are removed (1986e9a)
- The reasoning panel's no-preference chip is called Auto instead of Omit, and says what it does: no reasoning parameters are sent, so the remote model decides (565ba5f)
- A model the app already knows keeps its strip to its own levels: the way to correct it is one line under the request preview, Not correct? Set your own parameters, which opens the same field editor the Custom chip used to (565ba5f, 12064e2)
- Writing the reasoning fields by hand replaces the fields only, not the model's levels: the strip stays, the choice reads Custom, and picking a level goes back to the detected fields (565ba5f)
- The reasoning panel keeps one escape hatch for an endpoint the app cannot describe: send nothing, or write the request fields yourself, and the answer is remembered for that provider and model (565ba5f)
- The box for writing those fields opens at a usable size, grows with the text, checks that the JSON is an object before it can be saved, and comes back with what was saved last time (565ba5f)
- An endpoint the app cannot place at all no longer receives a guessed reasoning field; it sends nothing until the fields are written by hand (565ba5f)
- A model the app has no data for is described as unknown instead of as one that does not reason, and its saved level is reported as not sent (565ba5f)
- A prompt in a chat preset's prompt list can be edited on the spot, from the pencil on its row or a swipe from the left, instead of only being picked (22d2cfb)
- Magpie joins the provider presets with its own bird icon, and typing its localhost:3425 address fills in the name and icon for you (156b102)
- OpenCode providers show the OpenCode mark, so the two OpenCode gateways no longer share the generic server icon (156b102)
- The hand-written reasoning fields keep what was written when they are switched off, so the editor comes back with it instead of an empty box (565ba5f)
- Every reasoning control in the panel, including the field editor's Turn Off, is translated into all 21 languages the app ships (565ba5f)

### Changed

- models.dev on Reasoning Support is a link to the site it credits, and the screen no longer repeats its own name as a section header (41ff26e)
- The settings screen that says which models take reasoning levels is called Reasoning Support instead of Model Data, which described what the app stores rather than what the screen is for (37a7e27)
- The Choose Provider section for servers you run yourself is called Self-Hosted instead of Local Engines, which covers a server on your own network as well as one on this device (7b04752)
- Long-pressing your own message opens the system's own menu with Copy, Edit and Delete stacked top to bottom, where one bar used to hold them and a third action could fall behind an overflow chevron on a narrow screen (894a243, d4b568f, c53d436)
- The menu arrives on the hold with a haptic tick, with nothing drawn on the bubble itself
- A message near the bottom of the screen opens its menu above itself instead of under a panel that would cover the text being acted on
- Everything quiet in a transcript now comes from one small-type scale: the time, the date, reasoning and tool rows, model names and token counts are one of three sizes in a single weight, so nothing reads heavier than its neighbours (65ecc90)
- The token counts keep their capsules, now at the caption size in the theme's translucent neutral instead of a size smaller and a weight heavier than the rest of the row (117dc35)
- A card's title no longer thickens when the card expands; the accent ink marks that state instead (65ecc90)
- The buttons above the message field no longer fade themselves to 55 per cent when switched off; off is the tertiary grey, so the label stays readable instead of sinking towards the background (65ecc90)
- The New session rule drops its uppercase and its semibold letterforms, so it speaks the same language as the date that heads a day (65ecc90)
- The time under a reply and the date that heads a day are set at caption size in regular weight and in the secondary grey, so they read crisp rather than thick and hazy (c36c5d0)
- Small print across a transcript, model names and reasoning and tool labels included, drops from 14 to 13 points, the system's footnote size (c36c5d0)
- Long-pressing a message opens the system's own menu: it blurs, springs open against the message and follows the system appearance, instead of a card the transcript drew for itself (eda56ac)
- Its actions sit on one bar with Delete last in the system's red, rather than stacked under a header (eda56ac)
- That bar carries the actions and nothing else: the message's time, which used to sit above them, is gone (eda56ac)
- Copying from it confirms itself with a tap of feedback and a spoken Copied for VoiceOver, now that no row is left to flip into a checkmark (eda56ac)
- A memory entry holds up to 1000 characters instead of 400, so a stack, a set of constraints or how a project is laid out survives as one whole note instead of stopping mid-sentence (d5e7441)
- The memory editor counts characters as you type and stops at that ceiling with the count in orange, instead of shortening the entry on save (d5e7441)
- What's New is a real system sheet instead of a hand-drawn popup: it slides up with the system dim, corners, grabber and swipe-to-dismiss, and About opens the same sheet rather than a second card on its own window (a235388)
- Its notes scroll under a button that can no longer be pushed off screen, each highlight is marked rather than numbered, and at large text sizes the version line stacks instead of wrapping the date into three lines (a235388)
- The system's progress card can appear in the Dynamic Island while an answer is still streaming on screen, because the background job that keeps a locked run alive has to be requested while the app is in front (db57ab3)
- The catalogue that ships with the app is rebuilt from the current upstream data: 7,910 models across 210 providers, 4,892 of them with reasoning controls (85e9d4d)
- The app now makes one request of its own, the daily catalogue check: it sends nothing but the request for that file, and a check that finds nothing new costs no download (0720b70)
- The reasoning panel no longer prints a sentence under its chips: the request preview right below them already says what the request will carry, and the sentence was a second answer that could disagree with it (b7a1d72)
- The Model Data screen reports what the catalogue knows, when it last checked and what the last check changed, instead of naming which copy is in force or offering to drop the download (85e9d4d)
- The parameters, reasoning, memory and prompt row above the message field spaces itself by the width it has: tight on a narrow iPhone, roomier on a wide one, instead of one gap at every size (d578420)
- A reply stays covered by the system only once the app is really left, so a conversation watched to the end no longer grows a Dynamic Island card and its own done buzz on top of the answer (c46f07a)
- The reasoning level chips are all drawn at one height and one text size, so a strip no longer shows shorter, smaller chips standing beside taller ones (30c72d5)
- A row of reasoning chips stretches its chips to the edge of the sheet instead of cutting every chip to the same share, so the longest word keeps its full size and the row still fills the width (30c72d5)
- Refreshing a provider's models is now the way its list stays current: the sheet lists every model the endpoint returns, including the ones already saved, so the list can be narrowed on the same screen it is replaced from (1986e9a)
- Reasoning reads one catalog instead of three overlapping ones, so a model's levels, its switch and the field they travel on can no longer disagree (a9699ae)
- Reasoning levels are offered only when both the endpoint and the model are listed: an endpoint the app has never seen now shows Auto and Custom instead of levels copied from a similarly named cloud model (a9699ae)
- A model name is no longer trimmed to fit: a local client prefix or a runtime suffix such as -splash does not make an unknown model inherit a cloud model's levels (a9699ae)
- A model whose only control is a switch reads Off and On, instead of Off and High (a9699ae)
- A thinking level is written into the exact field the provider reads instead of one of eleven shapes the app had compiled in, so a model behind a relay or a reseller no longer gets a parameter nobody reads (565ba5f)
- A gateway that serves one model over Messages and the next over Responses now gets the fields that match the interface actually used, instead of the vendor's native spelling (565ba5f)
- Hand-written reasoning fields reach every protocol, not only the OpenAI-compatible one, so a model behind Messages or Responses can be steered by hand too (565ba5f)
- The levels offered for a model are the ones its endpoint publishes, so a host that accepts three of a model's five levels no longer shows five chips and fails on two of them (565ba5f)
- A reasoning setting that an endpoint cannot express is no longer sent as the lowest level it does accept, so asking for Off on a model that cannot stop thinking adds nothing instead of adding thinking (565ba5f)
- A relay on a sub-domain of a known host is recognised as that host, so a gateway reached at eu.openrouter.ai keeps its own thinking levels instead of falling back to the unknown-model default (565ba5f)
- A local port now names its engine, so Ollama on 11434 is sent the reasoning effort field it reads instead of a chat-template switch it ignores (565ba5f)
- oMLX is looked for on port 8000, which is where it actually listens, so a server on that port is no longer mistaken for the other engine that shares it (565ba5f)
- A reasoning panel for a model the app does not know no longer offers levels it cannot vouch for; it explains the situation and offers one control that opens the provider's own parameters with a fragment already filled in (6259168)
- The free-text entry next to the reasoning levels is gone: it collected one word for a field the app had guessed (6259168)
- The reasoning panel's empty state is called Omit instead of Default, because nothing is sent and the model decides, which the old word made look like a level the model had chosen (25a90a2)
- The reasoning panel shows the request it is about to make, so following the model, which sends nothing, no longer looks like Off, which sends an explicit stop (f736f22)
- Choosing the level a model uses by default no longer starts sending it: the model's own level is marked, and the choice stays at Default until a level is picked (f736f22)
- A model whose host offers only an on and off switch gets a panel with exactly Default and Off, instead of reading as one that cannot be steered (f736f22)
- A distinct local port identifies the engine behind an address, so a server on the vLLM port receives the switch vLLM reads instead of the generic one (f736f22)
- A custom parameter set now also reaches providers that speak the Anthropic or Responses API, not only the OpenAI-compatible ones, so a model the app cannot describe can still be steered by hand (f736f22)
- A switched-off button above the composer fades by the same amount whichever button it is, so the prompt button no longer looks switched on beside the others (40e7c68)
- A switched-off parameter dims its control rather than its explanation, so every row on the parameters page greys to one shade and the help text stays readable (40e7c68)
- The reasoning setting in a chat preset sits directly under the model it belongs to, because the model is what decides which levels exist and whether the control appears at all (395a679)
- The memory button above the composer says Memory instead of On or Off, so the brain glyph is not read as a second reasoning switch beside the head-with-brain one (395a679)
- The parameters panel's master switch reads Send parameters and lights the rows below it when it is on, instead of greying them out the moment it is switched on (395a679)
- The prompt button lights its name as well as its icon when a prompt is selected, so a chat that sends a template no longer looks like it sends none (0c498c7)
- The reasoning button brackets the marker for the model's own level, high (default), instead of chaining it onto the level with the same dot the row uses between controls, so the marker can no longer be read as a separate control (0bdf9af)
- Provider and model read as one name divided by a rule above the composer and by a slash (OpenRouter/anthropic/claude-sonnet-4) everywhere else, instead of sharing the dot the same row uses between its controls, so the provider no longer looks dimmer than the model it belongs to (cd6674c)
- Reasoning effort spans the same seven levels every current model uses (Off, Minimal, Low, Medium, High, XHigh, Max) instead of five, so the cheapest and the most expensive settings are reachable at all (200a9af)
- The reasoning picker only offers levels your model actually accepts, and it says so when a model always thinks: Claude Opus 5.5, Gemini 3 and GLM-5.3 no longer offer an Off that the provider would reject (200a9af)
- A level a model cannot take is raised to the nearest one it can rather than failing the request, so switching a preset to another model cannot turn a reply into an error (200a9af)
- Each provider now gets its thinking control in the shape it documents (OpenRouter's nested object, DeepSeek, Kimi and Z.ai's thinking switch, Qwen's enable_thinking, Together's enabled flag, a local server's chat template), and a provider the app has never seen gets the plain OpenAI field (200a9af)
- "Send no parameters" now covers the sampling fields only: the reasoning level has its own control and is no longer turned on or off by that switch (200a9af)
- Switching to another model keeps the reasoning level when the new model accepts it, and otherwise falls back to the model's own level instead of sending a different one behind your back (200a9af)
- The reasoning panel is a short sheet of tappable levels instead of a list behind a menu, so changing the level takes one tap (200a9af)
- The reasoning panel is one row of levels, and each level is the word the request actually carries: Low reads as low, High reads as high (200a9af)
- The stopped level reads as off everywhere, instead of none on the providers that spell it that way on the wire, so the row never reads as a fourth level beside low and high (200a9af)
- The reasoning panel no longer offers a separate "Follows the model" row: the level marked default is the one shown as chosen, since that is what the model would do on its own (200a9af)
- Picking a level leaves the panel open, so two levels can be compared in two taps; Done closes it (200a9af)
- The reasoning panel is one surface: it no longer shows a second, lighter band under the levels where the sheet's own background used to peek through (200a9af)
- The pill above the composer repeats the chip you chose, default marker included, instead of dropping it and reading like the tap had not registered (200a9af)
- "Custom" is offered only for a model the app's catalog does not know: anywhere else the listed levels are the whole answer, and a made-up word was only ever going to come back as an error (200a9af)
- Every generation parameter has its own switch, so a chat can send exactly the ones you want instead of all of them or none: the parameters panel keeps a switched-off row visible but greyed, and a master switch turns them all on or off at once (44b141e, 5b1a62a)
- Turning every parameter off keeps the values you tuned: the reset button that used to wipe them is gone, since the master switch already means send nothing (5b1a62a)
- The switch sits in the same place on every parameter row, and stop sequences and custom JSON have one too, so switching them off no longer needs an empty box (5b1a62a)
- The parameters panel says what it does: "Send no parameters" with "No parameters are sent. The model uses its own values", instead of four different phrases that all implied the app had invented defaults (1caec13, 382fa5c, 44b141e)
- The parameter and memory buttons are one glyph plus On or Off, with no extra words, so the row above the composer stays readable (382fa5c, 44b141e, bdb7ccb, 45f6573)
- The reasoning button states the level it is set to, and reads Default when nothing is pinned; Top P tells you it is ignored while Temperature is on (bdb7ccb)
- A chat preset now carries one set of parameters, applied whenever you pick it: the "use session parameters" option is gone, so a saved preset can no longer mean different things on different chats (8bf770d)
- The reasoning row no longer prints its own name twice (bdb7ccb)
- Chat preset cards stay in the order you arranged them: using a preset no longer moves it to the front, so the card you tapped stays under your finger (47c86d3)
- The reasoning panel answers one question: whether the app's catalogue knows the model. If it does, the model's own levels are drawn; if it does not, the strip is Auto and Custom, with no guessed level set in between (565ba5f)
- The reasoning levels wrap onto a second row when they do not fit, instead of shrinking until medium reads med (565ba5f)
- Add Provider lists every cloud vendor in one Cloud section, in a single order, instead of splitting them into international and Chinese groups (d21e28d)

### Fixed

- A gateway that turns a request away because it is momentarily full is asked twice more before the error is shown, so a busy model no longer ends the turn on a refusal that clears in a second (1c627d4)
- Opening the keyboard no longer sets off a paste banner: the composer asked the clipboard what it held in a way iOS reads as an actual paste, so the system announced one on every focus (3f27506)
- Scrolling, the typewriter and every animation now run at the full refresh rate of a ProMotion phone instead of being held at 60 frames a second, which is what made a fast flick through Settings read as dropped frames (8d06af8)
- A table that streams in keeps every column the finished answer has: a price inside a cell used to swallow the rest of its row, clipping the last column past the screen edge until the chat was reopened, and a settled table now adopts the paint a reopen would draw when the two differ (aa7b23e)
- The lines you are reading stay still while the answer above them grows, shrinks or swaps its cards: a structural update holds the part at the top of the screen in place instead of keeping the same scroll offset (a698ba0)
- Finishing an answer no longer taps twice when the system is carrying the run: the app's own completion haptic stands down while the system's task card is there to announce it (d01c86a)

- A long answer asked for while the app is open keeps running after the phone is locked again: the background job is requested while the app is still on screen, which is what the system requires, instead of on the way out (db57ab3)
- A model picked with a billing, routing or speed mode on its id now offers the reasoning levels of the model it is a mode of instead of reading as unknown: OpenRouter's batch and free variants, and inco's fast tier (edc5d5a, 4e43475)
- A saved level of Off on a model that cannot stop now reads as nothing sent, in the strip and in the pill, instead of highlighting the lowest level while the request carried nothing (6284df0)
- A gateway that serves two products on one address is told apart by the path you typed, so OpenCode Go's newer models are recognised: Kimi K3.1 Pro offers its own reasoning levels instead of Custom (85e9d4d)
- The reasoning panel re-reads the model's facts while it is open, so saving your own fields lights the Custom chip and shows them in the request preview at once, instead of only after closing and reopening the sheet (f4ab0b3)
- Asking for Off on a model that cannot stop thinking sends nothing, instead of sending its lowest level and making it think (a9699ae)
- A reasoning budget that cannot fit beside the reply is no longer sent, instead of a value larger than the remaining output window (a9699ae)
- Reasoning levels now follow the service that actually answers: OpenRouter's GLM-5.3 shows its low, high and max instead of being hidden behind Always on, and Gemini 3.8 no longer offers a level that service does not expose (4f569cc)
- A downloaded model is recognised under the name it was saved with, so a local file ending in -mlx or -gguf no longer looks like a model the app has never seen (4f569cc)
- The line under the reasoning levels names the fields of the API the provider is really reached over, not the one picked when the provider was created (4f569cc)
- A model whose id a gateway spells with dots (claude-opus-4.7) or tags with a price or freshness suffix is recognised instead of being treated as unknown, so its real levels appear (8a469df)
- Models that do not reason at all, such as llama, mistral and gemma, no longer offer reasoning levels: the app knows them and stays quiet instead of guessing (8a469df)
- A reasoning level on a local server is labelled by its rung (Off, Low, Medium, High) instead of repeating true on every chip, which made three different choices read as the same word (710337d)
- The line under the reasoning levels is the exact JSON object the request carries, nested entries included, instead of a rewritten key list, and it reads {} when nothing is sent (dfecf09)
- The reasoning levels share one row evenly across the screen instead of shrinking to their text and bunching at the left edge, and a long word only scales down when its own segment cannot hold it (629b658)
- The reasoning panel no longer carries a sentence under the levels: the chips name the words and the line at the bottom names the request, so only a model that needs a caveat still says anything there (ec0683c)
- The reasoning panel's caption is rewritten around the states it names: Omit sends nothing and lets the model decide, Off asks the provider to stop thinking, and the level marked (default) is the model's own (c5b5af1)
- The reasoning panel's caption disappears once a level is picked, since it describes the choice rather than the level, and the request line underneath already says what will be sent (748ee2b)
- Turning reasoning off no longer sends Qwen-only fields to every other provider, which some APIs refused outright and the rest quietly ignored (200a9af)
- Claude receives the thinking shape its generation requires: adaptive thinking with an effort level on 4.6 and newer, a token budget on 4.5 and older, and no disable request at all on the models that refuse one (200a9af)
- Claude's thinking summaries are requested explicitly, so the newest models show their reasoning instead of hiding it (200a9af)
- No reasoning level is sent until you pick one, so a fresh install no longer overrides every model's own default with Medium (200a9af)
- Choosing a reasoning level now sticks in a conversation you have not sent yet: the request already carried the new level while the panel and the pill above the composer kept showing the old one (200a9af)
- Max no longer vanishes on the models that document it: DeepSeek, Kimi and their neighbours received no reasoning field at all for a level the panel was offering (200a9af)
- The reasoning pill lights its level in the accent colour along with its icon, instead of tinting the glyph and leaving the level grey beside it (200a9af)
- Opening the parameters panel no longer changes the request: a look at it used to write temperature 1.0, top-p 1.0 and 4K max tokens into your settings (1caec13)
- Top-p is no longer sent next to temperature; the two are alternatives, and newer Claude models reject a request that carries both (1caec13)
- Bold text, headings and table headers in a prompt you sent stay white on the coloured bubble instead of turning near-black, with weight alone carrying the emphasis (783d7bb)
- A long prompt you sent keeps one height for the whole turn: it no longer moves, and no longer gains or drops its Show more button, when the reply starts or stops (ca924ae)
- A photo you sent keeps the size of its thumbnail for the whole turn, instead of growing when a tool call finishes and the conversation repaints (2f3825d)
- A bubble that holds only a photo shrink-wraps the thumbnail, instead of trailing a strip of empty bubble colour beside the picture (2f3825d)
- Renaming a prompt carries the new name into the chat presets and conversations that use it, so they no longer fall back to No Prompt (22d2cfb)
- Selecting a chat preset only scrolls the card row when that card is actually out of view, instead of sliding off to a card you never picked (47c86d3)
- A row of a few chat preset cards no longer has empty space after the last one, so it cannot be dragged or scrolled into nothing (47c86d3)
- A chat preset card picks up a new icon, and the selected card picks up its highlight, without waiting for another change to repaint the row (47c86d3)
- Saving hand-written reasoning fields no longer moves the level you chose: the fields stand in for it while they are on, and the strip greys instead of dropping the selection (565ba5f)
- Hand-written reasoning fields no longer rename the level chips: a body such as reasoning_effort abc turned the Low, Medium and High chips into three copies of the word abc (565ba5f)
- The box for writing reasoning fields opens empty instead of pre-filled with the fields the app would have sent for the current level, so the answer is the user's own (565ba5f)
- A saved reasoning word that is not one of the levels is no longer shown as the current value, because the strip has no chip that could mean it (565ba5f)
- The Auto chip is translated like everything around it: it used to stay English while the line above the composer switched language (565ba5f)
- Only one reasoning chip is lit at a time: saving hand-written fields after picking Max left Max tinted as well, so the strip showed two selections in two shades of blue (565ba5f)
- A model whose service the app knows but whose name it does not now names the level it sends instead of reading Omit, and the request line quotes the fields that really go out (565ba5f)
- An endpoint the app cannot place offers Omit whenever a level is saved, so a leftover level can be cleared at last (565ba5f)
- The hand-written fields are quoted in the request line when no level is chosen, instead of an empty object that looked like nothing was sent (565ba5f)
- A model that always reasons says that a saved level is not sent, instead of leaving it unused without a word (565ba5f)
- The line above the quoted request says what it is, so an empty object no longer reads as an error placeholder (565ba5f)
- A chat preset's reasoning panel no longer shows a Custom request parameters button that did nothing when tapped (565ba5f)
- A level in the reasoning panel is announced as selected to VoiceOver (565ba5f)
- oMLX fills in the address it actually listens on, port 8000, instead of 8080 (d21e28d)

### Removed

- Regenerate is gone from the menu on your own message: editing the prompt and sending it again is the same thing with one keystroke more, and a fourth row there was not worth the shortcut (43225ad)
- Thinking levels are no longer offered for local and self-hosted models: they are drawn only for cloud endpoints the app can identify, and everything else answers Auto and Custom (a9699ae)
- The shortcut from the reasoning panel into the provider's own parameters is gone; hand-written fields are edited in the panel itself (565ba5f)
- Azure is no longer offered as a built-in provider, because its address needs a resource name and cannot be reached with one fixed address (d21e28d)

## [1.1.6] - 2026-10-22

<!-- build 49 | since 1.1.5 (bbe61ef) | bbe61ef..d565aef | 35 commits -->

### Changed

- Text that contains bold, lists, tables or formulas now streams in with the same steady, softly fading typewriter as plain paragraphs, instead of arriving in small bursts with no fade (2662e77)
- A completion notification waits until the answer, its AI title and any new memory are all saved, so it no longer arrives while the Lock Screen card still says it is finishing (44148aa)
- Reply text is drawn with the same glyph weight as the rest of the app, so Chinese prose no longer looks washed out next to the composer (4b13743)
- Formulas sit at body size and write their Chinese words in the same sans font as the surrounding sentence, instead of a larger serif face (4b13743)
- Reply text is a shade lighter, and bold text in a paragraph now stands out by weight and ink instead of looking like a second typeface (ec4c3f3)
- Headings inside a reply step 22 / 20 / 18, so a section label can no longer look lighter than bold text in the sentence above it (ec4c3f3)
- Exported HTML and PDF always use the light palette, so exporting from a dark-mode device no longer produces a dark page (a3e297c)
- The exported document's title no longer uses a synthesised bold that smeared Chinese strokes (a3e297c)
- A finished background run announces itself once: the Lock Screen card plays the completion, and the notification that keeps the record no longer lights up the screen or makes a sound on top of it (44148aa)

### Fixed

- A reply that follows a heading no longer draws its first words at heading size, and any such slip now corrects itself within a fraction of a second instead of waiting for the conversation to be reopened (ad617ca)

- An answer that is still being written no longer flickers when a reasoning block, its text, and a tool call are all on screen (035abe5)
- A DeepSeek V4 tool round keeps going instead of stopping on an error asking for its reasoning to be passed back, including the rounds where the model thought nothing at all (0ded512)
- A second message in a DeepSeek V4 conversation with tools no longer gets the same rejection, because the earlier turns keep their thinking (0ded512)
- The close button on the setup guide and on the chat preset suggestion now dismisses the card instead of leaving it on screen (5185682)
- A reasoning card that is expanded while it streams no longer opens with a blank line, matching what the same card looks like after reopening the conversation (a4174d8)
- A table that is still arriving keeps every row it has shown, instead of settling with the header and losing the rows that were mid-paint (7ef513f)
- A long background run's card keeps its progress climbing through slow tool calls instead of freezing on one percentage, which made iOS treat the job as stalled and end it (2a85e17)
- An interrupted background run saves its whole turn before iOS suspends the app, so the conversation no longer comes back mid-write (2a85e17)
- A conversation opened from a notification keeps its jump-to-bottom button wherever you leave it, instead of showing it only above a point in the middle of the chat (6684d3f)

## [1.1.5] - 2026-10-20

<!-- build 48 | since 1.1.4 (e87ee13) | e87ee13..bbe61ef | 6 commits -->

### New Features

- Long chats and tool calls keep running after you leave the app on iOS 26, with progress on the Lock Screen and in the Dynamic Island (2bad883)
- An opt-in notification when a response finishes while you are away, and tapping it opens the conversation that finished (2bad883)

### Changed

- AI titles and long-term memory settle inside the same background run as the answer, so the conversation is fully updated when you return (2bad883)
- The composer keeps a separate parameters pill beside the reasoning pill, showing only sampling values that differ from the defaults (27c9ee4)

### Fixed

- Background tool runs keep their provider credential while the screen is locked, instead of failing the next model round with a 401 (2bad883)
- A model that stops after its tools without writing a final answer now offers Continue instead of ending silently (2bad883)
- The background task card switches to Done together with its completion icon, instead of still saying it is finishing (2bad883)
- The jump-to-bottom button returns as soon as a background reply settles, without reopening the conversation (2bad883)

## [1.1.4] - 2026-10-19

<!-- build 47 | since 1.1.3 (2317018) | 2317018..e87ee13 | 38 commits -->

### New Features

- Long-term memory about the user, a Pro feature (d5d1924)
- Retry a failed tool call in place, narrated on the card (5945888)

### Added

- Memory pill in the composer, folded in with the two parameter pills (528eaa1)
- Settings split into Chat and Tools by what each row changes (7c7207d)
- What's New scrolls on into the previous releases, and About reopens the card on demand (58989f7, bd33c57)

### Changed

- Tool calls in one round run concurrently instead of in a queue (c3cc621)
- Steady fractional typewriter reveal with closed-loop fade-in spans (9a47f30)
- A user bubble's text and pictures share one collapsed height (eb5cf0f)
- The history drawer list is grouped in the cache, not in the body (e079dc8)
- About names Memory and Presets in its tagline, with wording aligned to the website (87ad8d1)
- About shows its version and build line in English in every language (e87ee13)

### Fixed

- A finishing stream no longer disarms Stop (2ed4188)
- The selected preset now means what it says (81c6890)
- Memory deletion reads and lands correctly, and the Memory row is locked for non-Pro users (17bb4e0, 51a010c)
- A translation that matches the English key is kept (5ef6c9f)
- The history drawer snapshot stays in step with title summaries (a27db45)
- Pro opens from the free-limit alert (d901dca)
- The reasoning pill glyph has real weight (9dc848e)
- A dark shadow no longer flashes over Settings on a sheet swipe (9b4c32a)
- The theme row keeps its scroll when picking a theme (6ede5ef)
- The `succeeded on attempt N` tool subtitle is gone (089cae2)
- Closing Settings no longer flashes the page black for a frame before the chat comes back (4817e25)

### Removed

- Built-in prompt templates and their localization entries (a5c9908, 2103f48)

## [1.1.3] - 2026-10-14

<!-- build 46 | since 1.1.2 (0e430ec) | 0e430ec..2317018 | 12 commits -->

### Changed

- Custom Headers support the `{session_id}` and `{model_id}` placeholders, with OpenCode and LiteLLM examples, and the per-conversation session header is sent as `x-opencode-session` (81360ea, c5ed87b)
- OpenCode presets are gone from the provider picker; those gateways are added by hand with their base URL (2e396ec)

### Fixed

- OpenCode gateways (Go and Zen) work end to end: each model is routed to the protocol it expects (e8fc1cc)
- Gemini providers pointed at a path that does not exist, so chat and model listing both failed; they now use Gemini's OpenAI-compatible surface, and providers you already saved correct themselves (6b19adb)
- Provider edits apply immediately: the request is rebuilt from the live provider before every send, regenerate, edit, and title (a3d5867)
- Jump-to-bottom stays available while generating, and no longer appears for short replies that already fit on screen (a884064, d900e5b)
- Pinned messages hold still when reasoning or tool cards expand and while the reply streams (7b62394)
- A card collapse tap no longer reads as dead while reasoning is painting (cbc5eaa)
- Removing a Custom Header row no longer crashes (c5ed87b)

## [1.1.2] - 2026-09-21

<!-- build 45 | since 1.1.1 (1d5ea7b) | 1d5ea7b..0e430ec | 25 commits -->

### New Features

- Full-resolution attachments: tapping a photo opens the original image, not just the compressed preview (4972510)

### Changed

- About lists Discord and X under Support, with wording aligned to the website (6970ab2)
- A What's New card appears once after each marketing-version upgrade (c0675f7, 5a43d94)
- The history drawer reopens near the conversation you just selected (44210d6)

### Fixed

- Failed requests show the server or gateway error instead of an empty bubble (7df4950)

## [1.1.1] - 2026-09-15

<!-- build 44 | since 1.0.9 (fb836f0) | fb836f0..1d5ea7b | 37 commits -->

### New Features

- Composer auto-grows with wrapped text, expands into a full-screen editor, and submits with the keyboard Send key (0e5af1a, 54a1fef, 66342cc)
- Copy control on expanded reasoning and tool cards; tool copy includes arguments and result (29a92c1)

### Added

- Just-captured photo shortcut at the top of the plus menu (1c7f39b)

### Changed

- The expanded editor sits flush above the keyboard, with no blank gap and no dark strip above the keyboard (0e8194d)
- Composer is one floating card without the soft-mask top lip (7464fdc)
- Transcript typography is lighter: headings and emphasis use softer font weights (413dd3d)

### Fixed

- The pinned bubble stays put when reasoning or tool cards expand and collapse, including after pin exhaustion (d2e9019)
- The pinned bubble stays put while the reply streams (7a8c1d7)
- Session titles no longer jank chat scrolling; short titles stay centered, long ones scroll horizontally, and full headline size is kept (57a60e4, 7a8c1d7)
- Fewer blank flashes when switching appearance or dismissing Settings (a7fbbfc)
- Photo-library picks appear in the composer immediately (48c2b9b)
- Empty-state preset clearance stays stable as the keyboard and composer grow (5b05c5b)
- The history drawer settings gear is nudged toward the trailing edge (a6d5e49)

## [1.0.9] - 2026-08-27

<!-- build 41 | since 1.0.8 (0a98ba4) | 0a98ba4..fb836f0 | 91 commits -->

### New Features

- Hamburger menu with a slide-out history drawer: open your chats with a single swipe from the left edge or the top-left icon; Settings moved into the drawer behind a dimmed backdrop (8b29ead, 2963b47, 5720db0, 8dac8e2)
- Long-press context menu on your own messages, with Edit, Copy, and Delete; delete confirms in a centered dialog
- Tool call cards show the size of the returned result next to the call duration, and show both the original and sent sizes when a result is trimmed
- Advanced reasoning options: XHigh and a free-text custom reasoning effort, and Off now correctly disables reasoning for each provider (fced6fe)

### Changed

- Tool Result Limit default raised to 20,000 characters, and Max Tokens default raised to 20,480 (f9effe1)
- Keyboard, composer, and page are lifted by a single animation block instead of a multi-phase state machine (b09eda5, 470fef8, 4812764, dcb6ac2)
- A fixed header replaces the native navigation bar, removing the iOS 17/18 title-bar flash (ecffd83)

### Fixed

- Third-party keyboards settle at the correct bottom position in one smooth motion on cold start, warm re-show, and first show (24463fd, 5e3a3ed, 019dc91)
- The sent bubble lands at the top of the chat in one paint instead of flashing at the bottom (69c48a7)
- Jump-to-bottom eases in smoothly: long jumps wait for off-screen tiles to rasterize first, and per-frame scroll reads are gone (8a55bd9)
- Copy feedback and message actions are restored after a stream finishes (2374f13, f894f71)

## [1.0.8] - 2026-08-16

<!-- build 35 | since 1.0.7 (cd8ac78) | cd8ac78..0a98ba4 | 52 commits -->

### New Features

- Chat themes: ready-made presets with live preview, your bubbles and the navigation bar following the same palette, and an accent toggle for the user bubble (d1ca481, 5226d84, 6fccbbb)
- Multi-select photos from the photo library in one picker flow (fc6ccf1)
- Backup & Restore: export a versioned JSON backup with per-category selection, and restore merges by upserting on id or name without deleting anything; API keys and custom headers are never exported (0f50c4d)

### Added

- Tool result truncation: oversized results are trimmed head and tail before being sent to the model, under a configurable character limit, while the stored message keeps the full result (9ac080a)
- Tool result size readout on tool cards, with Settings switches for truncation and for the readout
- MCP: the session id is echoed for stateful streamable HTTP servers (89db616), tool schemas are normalized so strict models accept them (d33cb51), and tool picker pages follow the chat theme (d74cace)

### Changed

- Keyboard push-up: the live tip is pushed above the keyboard with a sync-animated bottom pad that survives shrink and scroll (0ed2be9, 3082305)

### Fixed

- Replies no longer stutter as they settle: the history-drawer query is unmounted while closed and the idle drawer prewarm is gone (50e328f, cd485aa)
- Share sheets present from the key window on iOS 26+, so they appear over Settings immediately instead of after the page closes (ef45069)
- Starter cards lift above the keyboard on an empty new chat (01ef08d)
- Third-party keyboards push correctly on their first show (07f242e)

### Removed

- The cumulative `ctx N` footer chip was prototyped and dropped before release, because a request's `input_tokens` already equals the context-window usage at that point (9b4297f)

## [1.0.7] - 2026-08-06

### New Features

- The conversation you were in is restored after a cold start or process restart, and returning from a long background session shows fewer empty transcript screens (d746651)

### Changed

- Tool calls show arguments while they stream, arguments and results are pretty-printed as JSON, expanding cards no longer reflows width, and user and assistant footers share one action gap (b7fcd73, 6f79501)
- Settings runs in its own window so the chat WebView leaves the compositor during inertial scroll (1ba1756)
- Streaming reveal is block-stable: closed blocks are immutable, reasoning drains before the body advances, and an open code fence is highlighted once on commit (4f24c04, 4ef4b13, 6c424f7, 435fcd6)

### Fixed

- The pinned bubble holds its position while it streams and while reasoning or tool cards expand, without fighting a user pan (4668a86, 652b21e, 54de7f2, a13a2b1)
- At-bottom detection is restored with KVO on `contentOffset`, `contentSize`, and `bounds` after the preference-key path broke (b57b449)
- Jump-to-bottom works again on iPad: animated jumps use a JS smooth scroll, and a jump falls back to JS when the native content range looks viewport tall (11aae4e)
- Reasoning and tool icons render again on iOS 17 WKWebView, where luminance masks come out empty (68e382e)
- The typewriter no longer dumps its text on remount, and the mid-drag settle hitch, blank code fences, and headings reparsed mid-sentence are fixed (4ef4b13, 9afb048, 84791fc, f502124)
- Settings present and dismiss flashes and theme sync on dismiss on iOS 17/18 (7a2cc27, de576b3)
- The jump-to-bottom control no longer flashes white after status-bar layout jumps (c1f7266)

## [1.0.6] - 2026-07-17

### New Features

- Single-webview transcript: one view owns scrolling, Markdown, KaTeX, and highlight.js, which cuts scroll-time CPU and compositor churn
- Waterfall streaming engine: tokens are coalesced into a tail buffer and revealed sequentially, reasoning drains before the body advances, closed blocks are immutable, and only the trailing open fragment is repainted
- Prompt caching keeps more of the conversation reusable, so Time to First Token drops sharply after the first message of a session
- One unified Reasoning effort setting, shared by Settings and Chat Presets

### Changed

- Reasoning and tool sections are calmer: unified card chrome, duration badges, and collapse and expand that no longer move the text
- Export gains a footer brand, unified datetimes, and dark code-block styling
- iPhone is locked to portrait, and the iPad layout holds up after rotation

### Fixed

- Chat Preset selection and deselection, including restore when starting a new chat or switching sessions
- Non-standard `prompt_cache_key` and the `ContextManager` path are gone from request serialization (2738d61, f6b4d30)
