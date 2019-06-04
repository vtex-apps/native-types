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

const renderIOMessageWithIntl = ({
  id,
  messages,
  values,
}: RenderElementParams) =>
  render(
    <IntlProvider messages={messages}>
      <IOMessage id={id} values={values} />
    </IntlProvider>,
    { messages }
  )

interface ParseDynamicMessageParams {
  message: string
  values: Record<string, ReactIntl.MessageValue>
}

const parseDynamicMessage = ({ message, values }: ParseDynamicMessageParams) =>
  Object.entries(values).reduce((acc, [currKey, currValue]) => {
    if (typeof currValue !== 'string') {
      return acc
    }

    return acc.replace(`{${currKey}}`, currValue)
  }, message)

describe('IOMessage', () => {
  it('displays id when message is undefined', () => {
    const id = 'test/io-message.unmapped-id-example'

    const messages: Record<string, string> = {}

    const { getByText } = renderIOMessageWithIntl({ id, messages })

    const element = getByText(id)

    expect(element).toBeDefined()
  })

  it("returns null when message is ''", () => {
    const id = 'test/format-io-message.empty-string-example'

    const messages: Record<string, string> = { [id]: '' }

    const { container } = renderIOMessageWithIntl({ id, messages })

    expect(container.children).toHaveLength(0)
  })

  it('works with static, non-empty messages', () => {
    const id = 'test/format-io-message.working-static-example'

    const messages: Record<string, string> = {
      [id]: 'It works :)',
    }

    const { getByText } = renderIOMessageWithIntl({ id, messages })

    const element = getByText(messages[id])

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

    const text = parseDynamicMessage({ message: messages[id], values })

    const { getByText } = renderIOMessageWithIntl({ id, messages, values })

    const element = getByText(text)

    expect(element).toBeDefined()
  })
})
