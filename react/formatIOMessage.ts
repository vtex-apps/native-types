import { InjectedIntl } from 'react-intl'

interface Params {
  id: string
  intl: InjectedIntl
}

const formatIOMessage = ({ id, intl }: Params) => {
  const intlMessage = intl.messages[id]

  if (intlMessage) {
    return intl.formatMessage({ id })
  }

  if (intlMessage === '') {
    return ''
  }

  return id
}

export default formatIOMessage
