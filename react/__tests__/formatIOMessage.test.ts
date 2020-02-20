import { IntlShape, createIntl } from 'react-intl'

import formatIOMessage from '../formatIOMessage'

const createMockIntl = (customMessages: IntlShape['messages'] = {}) =>
  createIntl({ locale: 'en', messages: customMessages })

describe('formatIOMessage', () => {
  it('returns id when message is undefined', () => {
    const id = 'test/format-io-message.unmapped-id-example'
    const intl = createMockIntl()

    const output = formatIOMessage({ id, intl })

    expect(output).toBe(id)
  })

  it('returns formatted id when message is undefined and dynamic', () => {
    const id = '{exceedingItems, plural, =0{} one {+ # gift} other {+ # gifts}}'
    const intl = createMockIntl()

    const values = {
      exceedingItems: '3',
    }

    const output = formatIOMessage({ id, intl }, values)
    const expectedOutput = '+ 3 gifts'

    expect(output).toBe(expectedOutput)
  })

  it("returns '' when message is ''", () => {
    const id = 'test/format-io-message.empty-string-example'

    const messages: IntlShape['messages'] = { [id]: '' }
    const intl = createMockIntl(messages)

    const output = formatIOMessage({ id, intl })

    const expectedOutput = ''

    expect(output).toBe(expectedOutput)
  })

  it('works with static, non-empty messages', () => {
    const id = 'test/format-io-message.working-static-example'

    const messages: IntlShape['messages'] = {
      [id]: 'It works :)',
    }
    const intl = createMockIntl(messages)

    const output = formatIOMessage({ id, intl })

    const expectedOutput = messages[id]

    expect(output).toBe(expectedOutput)
  })

  it('works with dynamic, non-empty messages', () => {
    const id = 'test/format-io-message.working-dynamic-example'

    const messages: IntlShape['messages'] = {
      [id]: '{subject} {verb} {emoji}',
    }

    const values: Record<string, string> = {
      emoji: ':)',
      subject: 'It',
      verb: 'works',
    }

    const intl = createMockIntl(messages)
    const output = formatIOMessage({ id, intl }, values)

    const expectedOutput = Object.entries(values).reduce(
      (acc, [currKey, currValue]) => acc.replace(`{${currKey}}`, currValue),
      messages[id]
    )

    expect(output).toBe(expectedOutput)
  })
})
