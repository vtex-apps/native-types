import React, { Fragment } from 'react'
import { useIntl } from 'react-intl'

import formatIOMessage from './formatIOMessage'
import { IOMessage as IOMessageType } from './typings/IOMessage'

const IOMessage: IOMessageType = ({
  children,
  values,
  ...messageDescriptor
}) => {
  const intl = useIntl()

  const message = formatIOMessage({ intl, ...messageDescriptor }, values)

  if (children && typeof children === 'function') {
    return children(message === '' ? '' : message) || null
  }

  return message === '' ? null : (
    <Fragment>
      {message}
      {children}
    </Fragment>
  )
}

export default IOMessage
