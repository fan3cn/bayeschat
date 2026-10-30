# The README header

`README.md` opens with a centred block: logo, name, one-line pitch, fact badges,
an App Store badge, a website button, Discord and X buttons, and jump links.
Everything in it is a static file in this repo — the badges are committed SVG,
not `img.shields.io` URLs.

That is a deliberate choice. The product's claim is "no tracking, no analytics
SDK, no third-party telemetry", so its own front page should not fetch images
from a third-party server every time somebody loads it.

## What lives where

| Path | What it is |
| --- | --- |
| `docs/brand/icon.png` | The app icon with its iOS corner mask baked in, for GitHub's light theme |
| `docs/brand/icon-dark.png` | The same for `prefers-color-scheme: dark`, picked by `<picture>` |
| `docs/brand/app-store.svg` | Apple's own "Download on the App Store" badge, unmodified |
| `docs/badges/*.svg` | The fact badges plus the website, Discord and X buttons, drawn here |

`docs/screenshots/*.webp` are the marketing frames shown further down the README.

## The Chinese README

`README.zh-CN.md` is a full translation of the English README, kept in sync by hand
rather than generated. It uses the same artwork and the same jump links, and its nav
row links back to `README.md`. The English README's nav row links to it as
`简体中文`, so each version can be reached from the other.

It is deliberately not covered by `check-readme.mjs`: that script checks the English
header's claims and pinned artwork bytes. If the version, price or language count
changes, update the Chinese README in the same commit.

## The claims in the badges

Five badges, all of them checkable facts, none of them vanity:

| Badge | Where the truth lives |
| --- | --- |
| `iOS 17+` | `IPHONEOS_DEPLOYMENT_TARGET` in the app project |
| `iPhone & iPad` | `TARGETED_DEVICE_FAMILY` in the app project |
| `22 languages` | `LanguageSettings.supported` in the app repo |
| `Pro $14.99 once` | The App Store listing and the site's pricing section |
| `v1.1.5 · build 48` | Derived — see below |

There is deliberately no CI, coverage, downloads or license badge. The repository
has no CI and no `LICENSE` file, so those would either be fabricated or need a
dynamic badge service.

## Keeping it honest

The version badge is the only part that changes on its own schedule, so it is not
written by hand. It is derived from `CHANGELOG.md`, which the release step copies
into this repository anyway: the newest `## [x.y.z]` heading gives the marketing
version, its metadata comment gives the build.

```bash
node scripts/sync-version-badge.mjs          # rewrite docs/badges/version.svg
node scripts/check-readme.mjs                # exit 0 = the whole header is consistent
```

`check-readme.mjs` fails when:

- the version badge disagrees with `CHANGELOG.md`;
- the README references an image that is not in the repository, or an asset in
  `docs/badges` / `docs/brand` is committed but unused;
- the icon, the dark icon, or Apple's badge have different bytes than the pins in
  the script — which is what catches an icon replaced without its corner mask;
- one of the five badges or the website button has been dropped from the header.

The release step runs both commands after copying `CHANGELOG.md`; see the app
repository's `AGENTS.md`.

## Changing the artwork

The icons are the landing repo's `assets/brand/icon.png` and `icon-dark.png` —
`bayeschat-landing` owns brand art — with the iOS corner mask (22.37% radius,
transparent outside) baked in. GitHub cannot clip an `<img>`, and without the mask
the dark tile reads as a pasted black square.

Regenerate from the landing repo:

```bash
python3 - <<'PY'
from PIL import Image, ImageDraw
from pathlib import Path

def round_corners(src, dst):
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    s = 4
    mask = Image.new("L", (w * s, h * s), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w * s - 1, h * s - 1), radius=int(w * s * 0.2237), fill=255)
    im.putalpha(mask.resize((w, h), Image.LANCZOS))
    im.save(dst)

brand = Path.home() / "git/bayeschat-landing/assets/brand"
round_corners(brand / "icon.png", Path("docs/brand/icon.png"))
round_corners(brand / "icon-dark.png", Path("docs/brand/icon-dark.png"))
PY
```

Then update the two `docs/brand/icon*.png` pins in `scripts/check-readme.mjs` to
the new sha256 values the check reports. A new badge is the same shape as the
existing ones: an opaque pill, white 600-weight text, `#3C5FBE` fill (white text
clears 4.5:1 on it), 20px tall.
