'use strict'

import { Shape, Img, Icon } from '../'

import { userBundle } from '../User'

import { styleParentMode } from './style'

export const parentMode = {
  proto: Shape,
  round: 10,
  theme: 'purple',
  style: styleParentMode,
  icon: {
    proto: Icon,
    name: 'checkMedium'
  },
  h2: 'Welcome to parent Mode',
  description: {
    proto: userBundle,
    users: { ...[{}, {}, {}] },
    span: 'You’ll now be able to chat with tutor privately. No other participants will see the messages.'
  }
}