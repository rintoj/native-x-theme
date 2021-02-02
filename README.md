# @native-x/theme

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This modules helps you define the theme for all `native-x` components.

## Install

### Yarn

```sh
yarn add @native-x/theme
```

### NPM

```sh
npm install @native-x/theme
```

## Usage

```tsx
import { ThemeProvider } from '@native-x/theme'

enum COLOR {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TERTIARY = 'TERTIARY',
  ACCENT = 'ACCENT',
  DIVIDER = 'DIVIDER',
  DISABLED = 'DISABLED',
  TRANSPARENT = 'TRANSPARENT'
}

const themes = {
  light: {
    [COLOR.PRIMARY]: '#FFFFFF',
    [COLOR.SECONDARY]: '#212121',
    [COLOR.TERTIARY]: '#707070',
    [COLOR.ACCENT]: '#0AD572',
    [COLOR.DIVIDER]: '#BDBDBD',
    [COLOR.DISABLED]: '#F5F5F5',
    [COLOR.TRANSPARENT]: 'transparent',
  },
  dark: {
    [COLOR.PRIMARY]: '#212121',
    [COLOR.SECONDARY]: '#FFFFFF',
    [COLOR.TERTIARY]: '#F3E8C0',
    [COLOR.ACCENT]: '#71F28F',
    [COLOR.DIVIDER]: '#707070',
    [COLOR.DISABLED]: '#252525',
    [COLOR.TRANSPARENT]: 'transparent',
  }
}

function App() {
  return <ThemeProvider theme={'dark'} themes={themes}>
    {...}
  </ThemeProvider>
}
```

### `useTheme()`

```tsx
function MyComponent() {
  const {
    // current theme
    currentTheme,

    // name of the current theme
    themeName,

    // all the declared themes by name
    themes,

    // get a color by name `getColor(name: string, theme?: string)`
    getColor,

    // get text color by name `getTextColor(name: string, theme?: string)`
    getTextColor,

    // get background color by name `getBackgroundColor(name: string, theme?: string)`
    getBackgroundColor,

    // get border color by name `getBorderColor(name: string, side?: BorderSide, theme?: string)
    getBorderColor,
  } = useTheme()

  const accentBackgroundStyle = getBackgroundColor(COLOR.ACCENT)

  return <View style={accentBackgroundStyle}>
    {...}
  </View>
}
```

### `useContainerStyle()`

```tsx
import { ContainerStyleProps, useContainerStyle } from '@native-x/theme'

interface Props extends ContainerStyleProps {
  ...
}

function MyComponent({
  backgroundColor,
  border,
  borderBottomColor,
  borderColor,
  borderLeftColor,
  borderRadius,
  borderRightColor,
  borderTopColor,
  opacity,
  padding,
}: Props) {
  const style = useContainerStyle({
    backgroundColor,
    border,
    borderBottomColor,
    borderColor,
    borderLeftColor,
    borderRadius,
    borderRightColor,
    borderTopColor,
    opacity,
    padding,
  })
  return <View style={style}>
    {...}
  </View>
}
```

You can also extend specific style types:

```tsx
interface Props extends BackgroundColorStyleProps,
  BorderColorStyleProps,
  BorderSizeStyleProps,
  OpacityStyleProps,
  ShadowStyleProps,
  PaddingStyleProps {
  ...
}
```

### `useTextStyle()`

```tsx
import { TextStyleProps, useTextStyle } from '@native-x/theme'

interface Props extends TextStyleProps {
  ...
}

function MyComponent({ fontSize, lineHeight, textColor }: Props) {
  const style = useTextStyle({ fontSize, lineHeight, textColor })
  return <Text style={style}>{...}</Text>
}
```

Or use individual styles as below

```tsx
interface Props extends FontSizeStyleProps,
  LineHeightStyleProps,
  TextColorStyleProps {
  ...
}
```

### `useShadowStyle()`

```tsx
import { ShadowProps, useShadowStyle } from '@native-x/theme'

interface Props extends ShadowProps {}

function MyComponent({ shadow, shadowColor }: Props) {
  const style = useShadowStyle({ shadow, shadowColor })
  return <Text style={style}>{...}</Text>
}
```
