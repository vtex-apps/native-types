import type { ReactElement } from 'react'
import {
  createIntl,
  createIntlCache,
  MessageDescriptor,
  IntlShape,
  IntlFormatters,
} from 'react-intl'

type AdaptedMessageDescriptor = MessageDescriptor & {
  intl: IntlShape
}

export type Values = Record<string, string | number | ReactElement>

const cache = createIntlCache()

type Return<T extends Values | undefined> = T extends undefined ? string : ReturnType<IntlFormatters['formatMessage']>

const formatIOMessage = <T extends Values | undefined = undefined>(
  { intl, ...messageDescriptor }: AdaptedMessageDescriptor,
  values?: T
): Return<T> => {
  const { defaultMessage, id } = messageDescriptor

  if (typeof id !== 'string' || id === '') {
    return ''
  }

  const intlMessage = intl.messages[id]

  if (intlMessage) {
    return intl.formatMessage(messageDescriptor, values) as Return<typeof values>
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

  return newIntl.formatMessage({ defaultMessage, id }, values) as Return<typeof values>
}

export default formatIOMessage
