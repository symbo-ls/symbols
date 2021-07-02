'use strict'

import style from './style'
import SVG from '../SVG'

export default {
  proto: SVG,
  style,
  define: { sprite: param => param, name: param => param },
  sprite: {},
  src: element => element.sprite[element.name || element.key],
  attr: { viewBox: '0 0 24 24' }
}
