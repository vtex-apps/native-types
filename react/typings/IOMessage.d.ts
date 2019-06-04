import { FunctionComponent } from 'react'
import { FormattedMessage, InjectedIntlProps } from 'react-intl'

export type IOMessage = FunctionComponent<
  FormattedMessage.Props & InjectedIntlProps
>
