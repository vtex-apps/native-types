import { InjectedIntl } from 'react-intl'

interface Params {
  defaultId?: string
  id: string
  intl: InjectedIntl
}
const formatIOMessage = ({ defaultId, id, intl }: Params) => {
  if (intl.messages[id]) {
    return intl.formatMessage({ id })
  }

  if (defaultId && intl.messages[defaultId]) {
    return intl.formatMessage({ id: defaultId })
  }

  return ''
}

export default formatIOMessage
