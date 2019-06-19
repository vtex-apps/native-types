import React, { ReactElement } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

import { IOMessage as IOMessageType } from './typings/IOMessage'

const IOMessage: IOMessageType = ({ children, id, ...props }) => {
  const intlMessage = props.intl.messages[id]

  if (intlMessage) {
    return (
      <FormattedMessage id={id} {...props}>
        {children}
      </FormattedMessage>
    )
  }

  if (children && typeof children === 'function') {
    return children(intlMessage == null ? id : intlMessage) as ReactElement || null
  }

  return intlMessage == null ? <>{id}</> : null
}

export default injectIntl(IOMessage)
