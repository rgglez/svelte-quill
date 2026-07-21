# Examples

Each directory contains an independent Svelte 5 application:

- `default` uses `QuillEditor` with its default configuration.
- `full` demonstrates every public prop and an expanded toolbar with all formats
  supported by Quill without additional dependencies.

To run one of them:

```bash
cd examples/default # or examples/full
npm install
npm run dev
```

Both examples consume the package from the repository root through a local
`file:../..` dependency, so changes to the component can be tested before it is
published.
