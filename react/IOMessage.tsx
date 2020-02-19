import React, { ReactElement, Fragment } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import formatIOMessage from './formatIOMessage'

import { IOMessage as IOMessageType } from './typings/IOMessage'

const IOMessage: IOMessageType = ({
  children,
  id,
  defaultMessage,
  ...props
}) => {
  const intl = useIntl()

  if (!id || id.length === 0) {
    return id
  }

  const intlMessage = intl.messages[id]

  if (intlMessage) {
    return (
      <FormattedMessage id={id} {...props}>
        {children}
      </FormattedMessage>
    )
  }

  const message = formatIOMessage({ id, intl, defaultMessage }, props.values)

  if (children && typeof children === 'function') {
    return (children(intlMessage === '' ? '' : message) as ReactElement) || null
  }

  return intlMessage === '' ? null : (
    <Fragment>
      {message}
      {children}
    </Fragment>
  )
}

export default IOMessage
