import React from 'react'
import { render } from '@vtex/test-tools/react'

import IOMessageWithMarkers from '../IOMessageWithMarkers'
import { IOMessageWithMarkers as IOMessageWithMarkersType } from '../types/IOMessageWithMarkers'

interface RenderElementParams {
  message: React.ComponentProps<IOMessageWithMarkersType>['message']
  values?: React.ComponentProps<IOMessageWithMarkersType>['values']
  handleBase?: React.ComponentProps<IOMessageWithMarkersType>['handleBase']
  markers?: React.ComponentProps<IOMessageWithMarkersType>['markers']
}

const renderIOMessageWithIntl = ({
  message,
  values = {},
  handleBase = '',
  markers = [],
}: RenderElementParams) =>
  render(
    <IOMessageWithMarkers
      message={message}
      values={values}
      handleBase={handleBase}
      markers={markers}
    />,
    {
      locale: 'en',
    }
  )

describe('IOMessageWithMarkers', () => {
  it('Render simple message with only the label', () => {
    const message = 'Hello world!'
    const { getByText } = renderIOMessageWithIntl({ message })
    const element = getByText(message)

    expect(element).toBeDefined()
  })

  it('Check values interpolation', () => {
    const message = '{hello} {world} {exclamation}'
    const values = {
      hello: 'Hello',
      world: 'World',
      exclamation: '!',
    }

    const { getByText } = renderIOMessageWithIntl({ message, values })
    const element = getByText('Hello World !')

    expect(element).toBeDefined()
  })

  it('check marker and componentName', () => {
    const message = '<bold>Hello World!</bold>'
    const markers = ['bold']
    const handleBase = 'test'
    const { getByText } = renderIOMessageWithIntl({
      message,
      markers,
      handleBase,
    })

    const element = getByText('Hello World!')

    expect(element.className).toBe('test-bold')
  })

  it('check message with many markers and values', () => {
    const message =
      '<bold>{a}</bold> <italic>{b}</italic> <pretty>{c}</pretty> <sale>{d}</sale>'

    const values = {
      a: 'A',
      b: 'B',
      c: 'C',
      d: 'D',
    }

    const handleBase = 'test'
    const markers = ['bold', 'italic', 'pretty', 'sale']
    const { getByText } = renderIOMessageWithIntl({
      message,
      values,
      markers,
      handleBase,
    })

    expect(getByText('A').className).toBe('test-bold')
    expect(getByText('B').className).toBe('test-italic')
    expect(getByText('C').className).toBe('test-pretty')
    expect(getByText('D').className).toBe('test-sale')
  })

  it('check that if there are values equal to markers, the component should not be rendered correctly', () => {
    const message = '<a>{a}</a> <b>{b}</b> <c>{c}</c> <d>{d}</d>'
    const values = {
      a: 'A',
      b: 'B',
      c: 'C',
      d: 'D',
    }

    const handleBase = 'test'
    const markers = ['a', 'b', 'c', 'd']
    const { queryByText } = renderIOMessageWithIntl({
      message,
      values,
      markers,
      handleBase,
    })

    expect(queryByText('A')).toBeNull()
    expect(queryByText('B')).toBeNull()
    expect(queryByText('C')).toBeNull()
    expect(queryByText('D')).toBeNull()
  })
})
