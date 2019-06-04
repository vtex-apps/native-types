import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'

import { IOMessage as IOMessageType } from './typings/IOMessage'

const IOMessage: IOMessageType = props => {
  const intlMessage = props.intl.messages[props.id]

  if (intlMessage) {
    return <FormattedMessage {...props} />
  }

  if (intlMessage === '') {
    return null
  }

  return <>{props.id}</>
}

export default injectIntl(IOMessage)
