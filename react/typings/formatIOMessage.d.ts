import { FormattedMessage, InjectedIntl, InjectedIntlProps } from 'react-intl'

type AdaptedMessageDescriptor = FormattedMessage.MessageDescriptor &
  InjectedIntlProps

export type FormatIOMessage = (
  adaptedMessageDescriptor: AdaptedMessageDescriptor,
  values?: Parameters<InjectedIntl['formatMessage']>[1]
) => string
