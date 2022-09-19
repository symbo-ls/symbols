'use strict'

import { getSpacingByKey, getMediaTheme, getColor, getMediaColor } from '@symbo.ls/scratch'

import { depth } from './Shape/style'

const isBorderStyle = str =>
  ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial'].some(v => str.includes(v))

const transformBorder = border => {
  const arr = border.split(', ')
  return arr.map(v => {
    if (isBorderStyle(v)) return v || 'solid'
    else if (v.slice(-2) === 'px' || v.slice(-2) === 'em') return v // TODO: add map spacing
    else if (getColor(v).length > 2) return getColor(v)
    return getSpacingByKey(v, 'border').border
  }).join(' ')
}

const transformTextStroke = stroke => ({
  WebkitTextStroke: stroke.split(', ').map(v => {
    if (v.includes('px')) return v
    else if (getColor(v)) return getColor(v)
  }).join(' ')
})

const transformShadow = shadow => ({
  boxShadow: shadow.split(', ').map(v => {
    if (v !== getColor(v)) return getColor(v)
    if (v.includes('px')) return v

    const arr = v.split(' ')
    if (!arr.length) return v
    return arr.map(v => getSpacingByKey(v, 'shadow').shadow).join(' ')
  }).join(' ')
})

const transformBackgroundImage = (backgroundImage, ctx) => ({
  backgroundImage: backgroundImage.split(', ').map(v => {
    if (v.includes('url') || v.includes('gradient')) return v
    else if (ctx.SYSTEM.GRADIENT[backgroundImage]) {
      return getMediaColor(backgroundImage, 'backgroundImage')
    }
    return `url(${v})`
  }).join(' ')
})

export const Theme = {
  class: {
    depth: ({ props }) => depth[props.depth],

    theme: ({ props, key }) => {
      if (!props.theme) return
      return getMediaTheme(props.theme, props.themeModifier)
    },

    color: ({ props }) => (props.color) && getMediaColor(props.color, 'color'),
    background: ({ props }) => (props.background) && getMediaColor(props.background, 'background'),
    backgroundColor: ({ props }) => (props.backgroundColor) && getMediaColor(props.backgroundColor, 'backgroundColor'),
    backgroundImage: ({ props, context }) => (props.backgroundImage) && transformBackgroundImage(props.backgroundImage, context),
    backgroundSize: ({ props }) => props.backgroundSize ? ({ backgroundSize: props.backgroundSize }) : null,
    backgroundPosition: ({ props }) => props.backgroundPosition ? ({ backgroundPosition: props.backgroundPosition }) : null,

    textStroke: ({ props }) => props.textStroke ? transformTextStroke(props.textStroke) : null,

    outline: ({ props }) => props.outline && ({
      outline: transformBorder(props.outline)
    }),

    border: ({ props }) => props.border && ({
      border: transformBorder(props.border)
    }),
    borderColor: ({ props }) => (props.borderColor) && getMediaColor(props.borderColor, 'borderColor'),
    borderStyle: ({ props }) => props.borderStyle && ({ borderStyle: props.borderStyle }),

    borderLeft: ({ props }) => props.borderLeft && ({
      borderLeft: transformBorder(props.borderLeft)
    }),
    borderTop: ({ props }) => props.borderTop && ({
      borderTop: transformBorder(props.borderTop)
    }),
    borderRight: ({ props }) => props.borderRight && ({
      borderRight: transformBorder(props.borderRight)
    }),
    borderBottom: ({ props }) => props.borderBottom && ({
      borderBottom: transformBorder(props.borderBottom)
    }),

    boxShadow: ({ props }) => props.boxShadow ? transformShadow(props.boxShadow) : null,

    opacity: ({ props }) => props.opacity && ({ opacity: props.opacity }),
    visibility: ({ props }) => props.visibility && ({ visibility: props.visibility })
  }
}