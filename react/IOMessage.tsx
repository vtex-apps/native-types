import React, { ReactElement } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

import { IOMessage as IOMessageType } from './typings/IOMessage'
import formatIOMessage from './formatIOMessage'

const IOMessage: IOMessageType = ({
  children,
  id,
  intl,
  defaultMessage,
  values,
  ...props
}) => {
  const intlMessage = intl.messages[id]

  if (children && typeof children === 'function') {
    return (
      (children(
        intlMessage === ''
          ? ''
          : formatIOMessage({ id, defaultMessage, intl }, values)
      ) as ReactElement) || null
    )
  }

  if (!defaultMessage && !intlMessage) {
    return <>{id}</>
  }

  return intlMessage === '' ? null : (
    <FormattedMessage id={id} defaultMessage={defaultMessage} {...props}>
      {children}
    </FormattedMessage>
  )
}

export default injectIntl(IOMessage)
