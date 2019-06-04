import { InjectedIntl, IntlProvider } from 'react-intl'

import formatIOMessage from '../formatIOMessage'
import { FormatIOMessage } from '../typings/formatIOMessage'

interface GetOutputParams {
  id: Parameters<FormatIOMessage>[0]['id']
  messages: Parameters<FormatIOMessage>[0]['intl']['messages']
  values?: Parameters<FormatIOMessage>[1]
}

const getOutput = ({ id, messages, values }: GetOutputParams) => {
  const intlProvider = new IntlProvider({ locale: 'en', messages })

  const { intl } = intlProvider.getChildContext()

  return formatIOMessage({ id, intl }, values)
}

describe('formatIOMessage', () => {
  it('returns id when message is undefined', () => {
    const id = 'test/format-io-message.unmapped-id-example'

    const messages: InjectedIntl['messages'] = {}

    const output = getOutput({ id, messages })

    const expectedOutput = id

    expect(output).toBe(expectedOutput)
  })

  it("returns '' when message is ''", () => {
    const id = 'test/format-io-message.empty-string-example'

    const messages: InjectedIntl['messages'] = { [id]: '' }

    const output = getOutput({ id, messages })

    const expectedOutput = ''

    expect(output).toBe(expectedOutput)
  })

  it('works with static, non-empty messages', () => {
    const id = 'test/format-io-message.working-static-example'

    const messages: InjectedIntl['messages'] = {
      [id]: 'It works :)',
    }

    const output = getOutput({ id, messages })

    const expectedOutput = messages[id]

    expect(output).toBe(expectedOutput)
  })

  it('works with dynamic, non-empty messages', () => {
    const id = 'test/format-io-message.working-dynamic-example'

    const messages: InjectedIntl['messages'] = {
      [id]: '{subject} {verb} {emoji}',
    }

    const values: Record<string, string> = {
      emoji: ':)',
      subject: 'It',
      verb: 'works',
    }

    const output = getOutput({ id, messages, values })

    const expectedOutput = Object.entries(values).reduce(
      (acc, [currKey, currValue]) => acc.replace(`{${currKey}}`, currValue),
      messages[id]
    )

    expect(output).toBe(expectedOutput)
  })
})
