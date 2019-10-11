# Copyable

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/copyable.svg)

## Example

```js
import Copyable from '@leafygreen-ui/copyable';

const codeSnippet = `
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

console.log(greeting('World'));
`;

const ExampleComponent = () => <Copyable>{codeSnippet}</Copyable>;
```

**Output HTML**

```HTML
<div class="leafygreen-ui-79elbk">
  <div class="leafygreen-ui-f80xqh">
    <pre class="leafygreen-ui-xwadh2">
      <code class="lg-highlight-hljs-dark leafygreen-ui-16k3j4z">
        <span class="lg-highlight-built_in">console</span>.log(<span class="lg-highlight-string">'hello world'</span>)
      </code>
    </pre>
  </div>
  <button type="button" class="leafygreen-ui-1xjqzec" aria-disabled="false">
    <span class="leafygreen-ui-1qfy0rk">
        <span title="copy button" class="leafygreen-ui-18mwod7" data-clipboard-text="console.log('hello world')"></span>
        <div class="leafygreen-ui-1l4w6pd" aria-hidden="true" role="presentation">
          <svg width="14" height="14" role="img" viewBox="0 0 16 16" class="">
            <title> Copy Icon</title>
            <g fill="currentColor" fill-rule="evenodd"><path d="M13 5h-3V2H7v9h6V5zm2 0v8H5V0h5l5 5z"></path><path d="M4 4v1H2v10h7v-1h1v2H1V4h3z"></path></g>
          </svg>
        </div>
        <div class="leafygreen-ui-1hyfx7x"></div>
    </span>
  </button>
</div>
```

## Properties

### withText

**Type:** `boolean`

**Default:** `true`

Determines if copy button will have `Copy` text or just an `Icon`

### children **Required**

**Type:** `string`

This is the code snippet that will be rendered in the code block.

### multiline

**Type:** `boolean`

**Default:** `true`

This prop determines whether or not the code snippet will visually retain line breaks when rendered.

### lang

**Type:** `'javascript'` | `'typescript'` | `'csp'` | `'cpp'` | `'go'` | `'java'` | `'perl'` | `'php'` | `'python'` | `'ruby'` | `'scala'` | `'bash'` | `'shell'` | `'sql'` | `'yaml'` | `'json'` | `'auto'` | `'none'`

**Default:** `'auto'`

The language to render the code block as. When set to `'none'`, no syntax highlighting will be applied. When set to `'auto'`, the component will attempt to do its best to guess what language the code snippet is.

**We recommend explicitly setting the language if you know what language will be rendered.**

### variant

**Type:** `'dark'` | `'light'`

**Default:** `'light'`

Determines whether to use a light or dark highlighting palette.

### className

**Type:** `string`

Applies a className to the root element's classList.

### showLineNumbers

**Type:** `boolean`

**Default:** `false`

Shows line numbers next to each line of code in the passed code snippet.

**NOTE:** While you can set this to `true` regardless of the code component being multiline, the line numbers will not be displayed if the `multiline` prop is `true`.

### showWindowChrome

**Type:** `boolean`

**Default:** `false`

Shows a stylized window chrome frame around the code snippet. This is purely stylistic.

### chromeTitle

**Type:** `string`

Shows a filename-like title in the window chrome frame.

**NOTE:** While you can set this prop if `showWindowChrome` is `false`, it will not be displayed unless the `showWindowChrome` prop is `true`.
