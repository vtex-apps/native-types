import React, { Fragment, FC } from 'react'
import { useIntl, MessageDescriptor } from 'react-intl'

import formatIOMessage, { Values } from './formatIOMessage'

type IOMessageType = FC<
  MessageDescriptor & {
    values?: Values
  }
>

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

  return message === '' ? null : <Fragment>{message}</Fragment>
}

export default IOMessage
