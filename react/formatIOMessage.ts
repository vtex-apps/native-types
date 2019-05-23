import { FormattedMessage, InjectedIntlProps, MessageValue } from 'react-intl'

type FormatIOMessage = (
  adaptedMessageDescriptor: FormattedMessage.MessageDescriptor &
    InjectedIntlProps,
  values?: Record<string, MessageValue>
) => string

const formatIOMessage: FormatIOMessage = (
  { intl, ...messageDescriptor },
  values
) => {
  const { id } = messageDescriptor

  const intlMessage = intl.messages[id]

  if (intlMessage) {
    return intl.formatMessage(messageDescriptor, values)
  }

  if (intlMessage === '') {
    return ''
  }

  return id
}

export default formatIOMessage
