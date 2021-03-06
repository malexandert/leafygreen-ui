# @leafygreen-ui/icon

## 6.1.0

### Minor Changes

- 1d86d56: Adds static property `isGlyph` to Glyph components, and ensures that Glyph components can receive size values consistent with Icon sizes, rather than just a numeric value.

## 6.0.1

### Patch Changes

- e83e4ed: Fixes displayName property of generated glyphs

## 6.0.0

### Major Changes

- 6fc022e: Transpiles icons imported individually from dist to use commonjs.

## 5.2.0

### Minor Changes

- 2fc4ef9: Adds "ImportantWithCircle" glyph to Icon library
- e857861: Adds "Unsorted", "UpDownCarets", "VerticalEllipsis", "SortAscending", and "SortDescending" glyphs to Icon
- cf6167e: Build and consume individual glyph components

## 5.1.0

### Minor Changes

- c812eb3: Updates the "ActivityFeed" icon to be consistent with other icons in the MongoNav

## 5.0.3

### Patch Changes

- 75c0693: Upgrades workspace dependencies

## 5.0.2

### Patch Changes

- 5aafd72: When an Icon is a child of IconButton, the Icon's title will be unset unless explicitly set on Icon, and its size will be inherited from IconButton unless its explicitly set.
- 5aafd72: Fixes an issue where some built type definition files had a triple-slash reference directive pointing to a package that might not exist in a consuming application.
- Updated dependencies [5aafd72]
  - @leafygreen-ui/lib@4.4.1

## 5.0.1

### Patch Changes

- 365412e: Adds emotion as a dependency rather than devDep to package.json

## 5.0.0

### Major Changes

- 4c268a5: Refactors how glyph components are generated, and allows titles to be unset by passing `false` into the title prop.

## 4.3.0

### Minor Changes

- e1568c6: Updates the visual weight of the "InviteUser" glyph.

## 4.2.0

### Minor Changes

- a2948f6: Adds "University" glyph

## 4.1.0

### Minor Changes

- 71327dd: Adds "ActivityFeed", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Folder", "InviteUser", and "Megaphone" icons

## 4.0.0

### Major Changes

- 0a75bd6: Changes values of `large` and `xlarge` icons to be `20` and `24` respectively. If using `<Icon size="large" />` previously, update to `<Icon size="xlarge" />`

### Patch Changes

- Updated dependencies [fabc1c9]
  - @leafygreen-ui/lib@4.2.0

## 3.0.1

### Patch Changes

- 8fd107a: Fixes an issue where local module definition for SVG files was overriding the module definition in consuming applications
- Updated dependencies [11b2217]
  - @leafygreen-ui/lib@4.1.0

## 3.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files

### Patch Changes

- Updated dependencies [464c09d]
  - @leafygreen-ui/lib@4.0.0
  - @leafygreen-ui/theme@2.0.0

## 2.1.0

### Minor Changes

- cdcf687: Adds support for `title` prop

## 2.0.0

### Major Changes

- eb49b56:
  - Uses `currentColor` to set fill. If the fill prop is not set, the fill of an icon will now be inherited from its decendent's color.
  - Icon now includes a `small` size variant that renders the glyph as a 14x14px SVG element.
