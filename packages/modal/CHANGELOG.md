# @leafygreen-ui/modal

## 3.1.1

### Patch Changes

- 1d86d56: Imports Glyphs directly, rather than importing the entire Icon package, when Glyph components are used
- Updated dependencies [1d86d56]
  - @leafygreen-ui/icon@6.1.0

## 3.1.0

### Minor Changes

- dc075c7: Adds `closeOnBackdropClick` prop to handle Modal closing when the backdrop is clicked

## 3.0.6

### Patch Changes

- Updated dependencies [6fc022e]
  - @leafygreen-ui/icon@6.0.0

## 3.0.5

### Patch Changes

- 05779a1: Upgrades `react-transition-group` to 4.4.1 which removes all React `StrictMode` warnings, making these components `StrictMode` safe.
- Updated dependencies [2fc4ef9]
- Updated dependencies [e857861]
- Updated dependencies [cf6167e]
  - @leafygreen-ui/icon@5.2.0

## 3.0.4

### Patch Changes

- 2a03117: Upgrades @testing-library/react to v10 and revises test suites to conform with new standards
- Updated dependencies [c812eb3]
  - @leafygreen-ui/icon@5.1.0

## 3.0.3

### Patch Changes

- Updated dependencies [4c268a5]
  - @leafygreen-ui/icon@5.0.0

## 3.0.2

### Patch Changes

- fabc1c9: Conditionally enables `useEscapeKey` hook, to ensure that escapeKey events are not unintentionally blocked from propagating
- 232cf52: `React-transition-group` now dependency instead of peer dependency
- Updated dependencies [0a75bd6]
- Updated dependencies [fabc1c9]
  - @leafygreen-ui/icon@4.0.0
  - @leafygreen-ui/lib@4.2.0

## 3.0.1

### Patch Changes

- 69792b8: Makes `react-transition-group` an external dependency of the build
- Updated dependencies [11b2217]
- Updated dependencies [8fd107a]
  - @leafygreen-ui/lib@4.1.0
  - @leafygreen-ui/icon@3.0.1

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/hooks@2.0.0
  - @leafygreen-ui/icon@3.0.0
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/palette@2.0.0
  - @leafygreen-ui/portal@2.0.0

## 2.0.0

### Major Changes

- b04a66f: Moves className prop to apply to root `div` rather than content `div`, and adds `contentClassName` to style overlay container. Where using `className` currently, should update to `contentClassName`

## 1.2.3

### Patch Changes

- 50853ca: Upgrade dependencies

## 1.2.2

- Updated dependencies [563dc2e]:
  - @leafygreen-ui/portal@1.1.7

## 1.2.1

### Patch Changes

- 4de039a: Further accessibility updates to make components compliant with a11y standards
- 3a24668: Replaces existing Escape handling with new useEscapeKey hook

## 1.2.0

### Minor Changes

- 27381f6: Modal content can receive focus

## 1.1.1

- Updated dependencies [eb49b56]:
  - @leafygreen-ui/icon@2.0.0
