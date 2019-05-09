import React from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'

interface Props extends InjectedIntlProps {
  id: string
}

const IOMessage: React.FunctionComponent<Props> = ({ id, intl }) => {
  const intlMessage = intl.messages[id]

  if (intlMessage) {
    return <FormattedMessage id={id} />
  }

  if (intlMessage === '') {
    return null
  }

  return <>{id}</>
}

export default injectIntl(IOMessage)
