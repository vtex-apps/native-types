import type { ReactElement } from 'react'
import {
  createIntl,
  createIntlCache,
  MessageDescriptor,
  IntlShape,
} from 'react-intl'

type AdaptedMessageDescriptor = MessageDescriptor & {
  intl: IntlShape
}

export type Values = Record<string, string | number | ReactElement>

const cache = createIntlCache()

const formatIOMessage = (
  { intl, ...messageDescriptor }: AdaptedMessageDescriptor,
  values?: Values
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
