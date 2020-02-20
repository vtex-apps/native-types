import { FunctionComponent } from 'react'
import { MessageDescriptor } from 'react-intl'

import { Values } from './formatIOMessage'

export type IOMessage = FunctionComponent<
  MessageDescriptor & {
    values?: Values
  }
>
