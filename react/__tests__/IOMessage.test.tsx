import React from 'react'
import { InjectedIntl, IntlProvider } from 'react-intl'
import { render } from '@vtex/test-tools/react'

import IOMessage from '../IOMessage'
import { IOMessage as IOMessageType } from '../typings/IOMessage'

interface RenderElementParams {
  id: React.ComponentProps<IOMessageType>['id']
  messages: React.ComponentProps<IOMessageType>['intl']['messages']
  values?: Parameters<InjectedIntl['formatMessage']>[1]
}

interface GetElementParams extends RenderElementParams {
  shouldTranslate?: boolean
}

type QueryElementParams = RenderElementParams

const renderElement = ({ id, messages, values }: RenderElementParams) =>
  render(
    <IntlProvider messages={messages}>
      <IOMessage id={id} values={values} />
    </IntlProvider>,
    { messages }
  )

const getElement = ({
  id,
  messages,
  shouldTranslate = true,
  values,
}: GetElementParams) => {
  const { getByText } = renderElement({ id, messages, values })

  if (values) {
    const text = Object.entries(values).reduce((acc, [currKey, currValue]) => {
      if (typeof currValue !== 'string') {
        return acc
      }

      return acc.replace(`{${currKey}}`, currValue)
    }, messages[id])

    return getByText(text)
  }

  return getByText(shouldTranslate ? messages[id] : id)
}

const queryElement = ({ id, messages, values }: QueryElementParams) => {
  const { queryByText } = renderElement({ id, messages, values })

  return queryByText(id)
}

describe('IOMessage', () => {
  it('displays id when message is undefined', () => {
    const id = 'test/io-message.unmapped-id-example'

    const messages: Record<string, string> = {}

    const element = getElement({ id, messages, shouldTranslate: false })

    expect(element).toBeDefined()
  })

  it("returns null when message is ''", () => {
    const id = 'test/format-io-message.empty-string-example'

    const messages: Record<string, string> = { [id]: '' }

    const element = queryElement({ id, messages })

    expect(element).toBeNull()
  })

  it('works with static, non-empty messages', () => {
    const id = 'test/format-io-message.working-static-example'

    const messages: Record<string, string> = {
      [id]: 'It works :)',
    }

    const element = getElement({ id, messages })

    expect(element).toBeDefined()
  })

  it('works with dynamic, non-empty messages', () => {
    const id = 'test/format-io-message.working-dynamic-example'

    const messages: Record<string, string> = {
      [id]: '{subject} {verb} {emoji}',
    }

    const values: Record<string, string> = {
      emoji: ':)',
      subject: 'It',
      verb: 'works',
    }

    const element = getElement({ id, messages, values })

    expect(element).toBeDefined()
  })
})
