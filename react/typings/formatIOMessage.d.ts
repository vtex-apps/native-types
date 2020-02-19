import { IntlShape, MessageDescriptor } from 'react-intl'

type AdaptedMessageDescriptor = MessageDescriptor & {
  intl: IntlShape
}

export type Values = Record<string, string>

export type FormatIOMessage = (
  adaptedMessageDescriptor: AdaptedMessageDescriptor,
  values?: Values
) => string
