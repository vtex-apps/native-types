import { createIntl, createIntlCache } from 'react-intl'

import { FormatIOMessage } from './typings/formatIOMessage'

const formatIOMessage: FormatIOMessage = (
  { intl, ...messageDescriptor },
  values
) => {
  const { id, defaultMessage } = messageDescriptor
  const intlMessage = intl.messages[id]

  if (intlMessage) {
    return intl.formatMessage(messageDescriptor, values)
  }

  if (intlMessage === '') {
    return ''
  }

  /**
   * This enables a user to pass a translatable message which is not
   * in the current IntlContext to the function and actually have it
   * formatted by react-intl.
   */
  const cache = createIntlCache()
  const newIntl = createIntl(
    {
      locale: intl.locale,
      messages: {
        [id]: id,
      },
    },
    cache
  )

  return id && newIntl.formatMessage({ id, defaultMessage }, values)
}

export default formatIOMessage
