export const Variant = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

// When adding additional language support, be sure to also add
// the language in webpack.config.js
export const SupportedLanguages = {
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  Cs: 'cs', // C#
  Csharp: 'csharp',
  Cpp: 'cpp', // C++
  Go: 'go',
  Ini: 'ini',
  Java: 'java',
  Perl: 'perl',
  Php: 'php',
  Python: 'python',
  Ruby: 'ruby',
  Rust: 'rust',
  Scala: 'scala',
  Swift: 'swift',
  Kotlin: 'kotlin',
  ObjectiveC: 'objectivec',
  Bash: 'bash',
  Shell: 'shell',
  Sql: 'sql',
  Yaml: 'yaml',
  Json: 'json',
  Graphql: 'graphql',
} as const;

export type SupportedLanguages = typeof SupportedLanguages[keyof typeof SupportedLanguages];

export const Language = {
  ...SupportedLanguages,
  Auto: 'auto',
  None: 'none',
} as const;

export type Language = typeof Language[keyof typeof Language];
