# svelte-quill

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![GitHub all releases](https://img.shields.io/github/downloads/rgglez/svelte-quill/total)
![GitHub issues](https://img.shields.io/github/issues/rgglez/svelte-quill)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/rgglez/svelte-quill)
[![GitHub release](https://img.shields.io/github/release/rgglez/svelte-quill.svg)](https://github.com/rgglez/svelte-quill/releases/)
![GitHub stars](https://img.shields.io/github/stars/rgglez/svelte-quill?style=social)
![GitHub forks](https://img.shields.io/github/forks/rgglez/svelte-quill?style=social)

**svelte-quill** is a configurable Svelte 5 wrapper for the
[Quill 2](https://quilljs.com/) rich-text editor.

HTML content is exposed via `bind:value`. Every Quill option can be passed as a
prop, with opinionated defaults; a raw `options` escape hatch covers anything
the named props don't.

## Requirements

- Svelte 5 runes (`$props` / `$bindable` / `$effect`).
- Quill and its theme CSS are loaded lazily on mount — no SSR crash, no manual
  CSS import.
- `quill` is a **peer dependency**, so there's a single copy in your app.

## Installation

```bash
npm install @rgglez/svelte-quill quill@2.0.2
```

`quill` is a peer dependency — install it alongside.

## Usage

```svelte
<script>
  import QuillEditor from '@rgglez/svelte-quill';
  let html = $state('<p>Hello</p>');
</script>

<QuillEditor bind:value={html} />
```

The theme CSS (snow/bubble) is imported by the component automatically.

## Props

| prop | type | default | description |
|------|------|---------|-------------|
| `value` | `string` (bindable) | `''` | Editor HTML content. Two-way via `bind:value`. |
| `height` | `string` | `'260px'` | Height of the editable area. |
| `theme` | `string` | `'snow'` | Quill theme: `'snow'` or `'bubble'`. |
| `placeholder` | `string` | `''` | Placeholder text. |
| `readOnly` | `boolean` | `false` | Read-only mode (reactive). |
| `toolbar` | `array \| object` | opinionated (see below) | Quill toolbar config. |
| `formats` | `string[]` | `undefined` | Whitelist of allowed formats (omitted when unset). |
| `modules` | `object` | `{}` | Merged over `{ toolbar }`; add/override Quill modules. |
| `options` | `object` | `{}` | **Escape hatch**: raw Quill options, spread last. |
| `onReady` | `(quill) => void` | `undefined` | Called with the Quill instance after init. |
| `onChange` | `(html: string) => void` | `undefined` | Called on every edit, in addition to `bind:value`. |

## Quill options

See Quill's
[configuration documentation](https://v2.quilljs.com/docs/configuration) for the
complete list of available options.

See Quill's [modules documentation](https://v2.quilljs.com/docs/modules) for the
available modules and links to their individual configuration references.

### Default toolbar

```js
[
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'code-block'],
  ['link'],
  ['clean']
]
```

## Examples

Custom toolbar:

```svelte
<QuillEditor
  bind:value={html}
  toolbar={[['bold', 'italic'], ['link', 'image']]}
/>
```

Escape hatch (raw Quill options + instance access):

```svelte
<QuillEditor
  bind:value={html}
  theme="bubble"
  options={{ bounds: '#app', scrollingContainer: '#app' }}
  onReady={(q) => console.log('quill ready', q)}
/>
```

Config precedence, from lowest to highest: named props → `modules` (merged over
`{ toolbar }`) → `options` (spread last, may replace `modules`/`formats`).

## Makefile

The `Makefile` provides the following release-related targets:

- `make tags`: Lists the repository's Git tags, ordered from the newest semantic
  version to the oldest.

- `make patch`: Increments the patch part of the version in `package.json` (for
  example, `0.1.0` to `0.1.1`), creates a commit and a `v<version>` Git tag, and
  pushes both the current branch and the tag to `origin`.

- `make publish`: Publishes the current version to npm as a public package. It
  does not change the version or create a Git tag.

- `make all`: Runs `patch` followed by `publish`, performing the complete
  patch-release workflow.

The release targets expect Git and npm to be configured, the user to have push
and publish permissions, and npm authentication to be active. Run `make all`
only from the branch and working tree that should be released because it creates
and pushes a commit and tag before publishing the package.

## License

Copyright (c) Rodolfo González González. Licensed under the
[Apache License 2.0](LICENSE).
