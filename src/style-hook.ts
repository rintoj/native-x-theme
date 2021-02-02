import { useMemo } from 'react'
import { styles as s } from 'tachyons-react-native'
import { BorderSide, useTheme } from './theme-provider'

export type BackgroundColor = string
export interface BackgroundColorStyleProps {
  backgroundColor?: BackgroundColor
}

export type Color = string
export interface ColorStyleProps {
  color?: Color
}

export type BorderColor = string
export interface BorderColorStyleProps {
  borderColor?: BorderColor
  borderLeftColor?: BorderColor
  borderRightColor?: BorderColor
  borderTopColor?: BorderColor
  borderBottomColor?: BorderColor
}

export const BORDER_SIZE = {
  none: s.bw0,
  normal: s.bw1,
  large: s.bw2,
  'x-large': s.bw3,
  'xx-large': s.bw4,
  'xxx-large': s.bw5,
}
export type BorderSize = keyof typeof BORDER_SIZE
export interface BorderSizeStyleProps {
  border?: BorderSize | boolean
}

export const BORDER_RADIUS = {
  none: undefined,
  small: s.br1,
  normal: s.br3,
  large: s.br4,
  round: s.brPill,
}
export type BorderRadius = keyof typeof BORDER_RADIUS
export interface BorderRadiusStyleProps {
  borderRadius?: BorderRadius
}

const SHADOW = {
  none: undefined,
  normal: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  large: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
}
export type Shadow = keyof typeof SHADOW
export interface ShadowStyleProps {
  shadow?: Shadow
  shadowColor?: Color
}

export const OPACITY = {
  transparent: s.o0,
  low: s.o30,
  partial: s.o50,
  medium: s.o70,
  high: s.o90,
  full: s.o100,
}
export type Opacity = keyof typeof OPACITY
export interface OpacityStyleProps {
  opacity?: Opacity
}

export const FONT_SIZE = {
  'xxx-small': { fontSize: 8, lineHeight: 12 },
  'xx-small': { fontSize: 10, lineHeight: 14 },
  'x-small': { fontSize: 12, lineHeight: 16 },
  small: { fontSize: 14, lineHeight: 18 },
  normal: { fontSize: 16, lineHeight: 22 },
  large: { fontSize: 20, lineHeight: 28 },
  'x-large': { fontSize: 24, lineHeight: 36 },
  'xx-large': { fontSize: 36, lineHeight: 48 },
  'xxx-large': { fontSize: 48, lineHeight: 64 },
}
export type FontSize = keyof typeof FONT_SIZE
export interface FontSizeStyleProps {
  fontSize?: FontSize
}

export const PADDING = {
  'x-large': s.pa5,
  large: s.pa4,
  none: s.pa0,
  normal: s.pa3,
  small: s.pa2,
  'x-small': s.pa1,
  'horizontal:x-large': s.ph5,
  'horizontal:large': s.ph4,
  'horizontal:none': s.ph0,
  'horizontal:normal': s.ph3,
  'horizontal:small': s.ph2,
  'horizontal:x-small': s.ph1,
  'vertical:x-large': s.pv5,
  'vertical:large': s.pv4,
  'vertical:none': s.pv0,
  'vertical:normal': s.pv3,
  'vertical:small': s.pv2,
  'vertical:x-small': s.pv1,
}
export type Padding = keyof typeof PADDING
export interface PaddingStyleProps {
  padding?: Padding | Padding[]
}

export const LINE_HEIGHT = {
  solid: { lineHeight: 22 },
  title: { lineHeight: 36 },
  relax: { lineHeight: 42 },
}
export type LineHeight = keyof typeof LINE_HEIGHT
export interface LineHeightStyleProps {
  lineHeight?: LineHeight
}

export type ContainerStyleProps = BackgroundColorStyleProps &
  ColorStyleProps &
  BorderColorStyleProps &
  BorderSizeStyleProps &
  BorderRadiusStyleProps &
  OpacityStyleProps &
  ShadowStyleProps &
  PaddingStyleProps

export function useContainerStyle(props: ContainerStyleProps | undefined = {}) {
  const { getBackgroundColor, getTextColor, getBorderColor } = useTheme()
  const {
    backgroundColor,
    color,
    borderRadius,
    border,
    padding,
    opacity,
    borderColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
    borderBottomColor,
  } = props
  const shadowStyle = useShadowStyle(props)
  return useMemo(
    () =>
      [
        getBackgroundColor(backgroundColor as string),
        getTextColor(color as string),
        border === true ? [getBorderColor('divider'), BORDER_SIZE.normal] : undefined,
        getBorderColor(borderColor as string),
        getBorderColor(borderLeftColor as string, BorderSide.LEFT),
        getBorderColor(borderRightColor as string, BorderSide.RIGHT),
        getBorderColor(borderTopColor as string, BorderSide.TOP),
        getBorderColor(borderBottomColor as string, BorderSide.BOTTOM),
        BORDER_RADIUS[borderRadius as BorderRadius],
        BORDER_SIZE[border as BorderSize],
        (padding instanceof Array ? padding : [padding]).map(i => PADDING[i as Padding]),
        OPACITY[opacity as Opacity],
        shadowStyle,
      ].filter(i => i != null),
    [
      getBackgroundColor,
      backgroundColor,
      getTextColor,
      color,
      getBorderColor,
      borderColor,
      borderLeftColor,
      borderRightColor,
      borderTopColor,
      borderBottomColor,
      borderRadius,
      border,
      padding,
      opacity,
      shadowStyle,
    ],
  )
}

export function useShadowStyle({ shadow, shadowColor }: ShadowStyleProps) {
  const { getColor } = useTheme()
  return useMemo(
    () =>
      [
        shadow ? SHADOW[shadow] : null,
        shadowColor ? { shadowColor: getColor(shadowColor) } : null,
      ].filter(i => i != null),
    [getColor, shadow, shadowColor],
  )
}

export type TextStyleProps = FontSizeStyleProps & ColorStyleProps & LineHeightStyleProps

export function useTextStyle(props: TextStyleProps | undefined = {}) {
  const { getTextColor } = useTheme()
  const { color, fontSize, lineHeight } = props
  return useMemo(
    () =>
      [
        getTextColor(color as string),
        LINE_HEIGHT[lineHeight as LineHeight],
        FONT_SIZE[fontSize as FontSize],
      ].filter(i => i != null),
    [color, fontSize, getTextColor, lineHeight],
  )
}
