import React from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'

type Props = FormattedMessage.Props & InjectedIntlProps

const IOMessage: React.FunctionComponent<Props> = props => {
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
