import React from 'react'
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl'

interface Props extends InjectedIntlProps {
  defaultId?: string
  id: string
}

const IOMessage: React.FunctionComponent<Props> = ({ defaultId, id, intl }) => {
  if (intl.messages[id]) {
    return <FormattedMessage id={id} />
  }

  if (defaultId && intl.messages[defaultId]) {
    return <FormattedMessage id={defaultId} />
  }

  return null
}

export default injectIntl(IOMessage)
