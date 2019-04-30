import React from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'

interface Props extends InjectedIntlProps {
  id: string
}

const IOMessage: React.FunctionComponent<Props> = ({ id, intl }) => {
  if (intl.messages[id]) {
    return <FormattedMessage id={id} />
  }

  return null
}

export default injectIntl(IOMessage)
