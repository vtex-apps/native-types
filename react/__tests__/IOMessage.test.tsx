import React from 'react'
import { render } from '@vtex/test-tools/react'

import IOMessage from '../IOMessage'
import { IOMessage as IOMessageType } from '../types/IOMessage'

interface RenderElementParams {
  id: React.ComponentProps<IOMessageType>['id']
  values?: React.ComponentProps<IOMessageType>['values']
}

const renderIOMessageWithIntl = ({ id, values }: RenderElementParams) =>
  render(<IOMessage id={id} values={values} />, {
    locale: 'en',
  })

interface ParseDynamicMessageParams {
  message: string
  values: Record<string, string | number>
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

    const { getByText } = renderIOMessageWithIntl({ id })

    const element = getByText(id)

    expect(element).toBeDefined()
  })

  it('displays formatted id when message is undefined and id is dynamic', () => {
    const id = '{exceedingItems, plural, =0{} one {+ # gift} other {+ # gifts}}'
    const values = {
      exceedingItems: '3',
    }

    const { getByText } = renderIOMessageWithIntl({ id, values })

    const expectedOutput = '+ 3 gifts'
    const element = getByText(expectedOutput)

    expect(element).toBeDefined()
  })

  it("returns null when message is ''", () => {
    /**
     * This message is defined at '/messages' so that @vtex/test-tools
     * can find it.
     * */
    const id = 'test/format-io-message.empty-string-example'

    const { container } = renderIOMessageWithIntl({ id })

    expect(container.children).toHaveLength(0)
  })

  it('works with static, non-empty messages', () => {
    /**
     * This message is defined at '/messages' so that @vtex/test-tools
     * can find it.
     * */
    const id = 'test/format-io-message.working-static-example'

    const { getByText } = renderIOMessageWithIntl({ id })

    const element = getByText('It works :)')

    expect(element).toBeDefined()
  })

  it('works with dynamic, non-empty messages', () => {
    /**
     * This message is defined at '/messages' so that @vtex/test-tools
     * can find it.
     * */
    const id = 'test/format-io-message.working-dynamic-example'

    const values: Record<string, string> = {
      emoji: ':)',
      subject: 'It',
      verb: 'works',
    }

    const text = parseDynamicMessage({
      message: '{subject} {verb} {emoji}',
      values,
    })

    const { getByText } = renderIOMessageWithIntl({ id, values })

    const element = getByText(text)

    expect(element).toBeDefined()
  })
})
