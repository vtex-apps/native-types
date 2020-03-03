import { createIntl, createIntlCache } from 'react-intl'

import { FormatIOMessage } from './types/formatIOMessage'

const cache = createIntlCache()

const formatIOMessage: FormatIOMessage = (
  { intl, ...messageDescriptor },
  values
) => {
  const { defaultMessage, id } = messageDescriptor

  if (typeof id !== 'string' || id === '') {
    return ''
  }

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
  const newIntl = createIntl(
    {
      locale: intl.locale,
      messages: {
        [id]: id,
      },
    },
    cache
  )

  return newIntl.formatMessage({ defaultMessage, id }, values)
}

export default formatIOMessage
