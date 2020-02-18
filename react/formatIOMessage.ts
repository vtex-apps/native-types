import { FormatIOMessage } from './typings/formatIOMessage'

const formatIOMessage: FormatIOMessage = (
  { intl, ...messageDescriptor },
  values
) => {
  const { id, defaultMessage } = messageDescriptor

  const intlMessage = intl.messages[id]

  if (!intlMessage && !defaultMessage) {
    return id
  }

  return intl.formatMessage(messageDescriptor, values)
}

export default formatIOMessage
