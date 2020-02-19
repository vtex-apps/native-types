import React, { ReactElement } from 'react'
import {
  FormattedMessage,
  useIntl,
  createIntl,
  createIntlCache,
  RawIntlProvider,
} from 'react-intl'

import { IOMessage as IOMessageType } from './typings/IOMessage'

const IOMessage: IOMessageType = ({
  children,
  id,
  defaultMessage,
  ...props
}) => {
  const intl = useIntl()
  const intlMessage = intl.messages[id]

  if (intlMessage) {
    return (
      <FormattedMessage id={id} {...props}>
        {children}
      </FormattedMessage>
    )
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

  if (children && typeof children === 'function') {
    return (
      (children(
        intlMessage === ''
          ? ''
          : newIntl.formatMessage({ id, defaultMessage }, props.values)
      ) as ReactElement) || null
    )
  }

  return intlMessage === '' ? null : (
    <RawIntlProvider value={newIntl}>
      <FormattedMessage id={id} {...props}>
        {children}
      </FormattedMessage>
    </RawIntlProvider>
  )
}

export default IOMessage
