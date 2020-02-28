import React from 'react'
import { render } from '@vtex/test-tools/react'

import IOMessageWithMarkers from '../IOMessageWithMarkers'
import { IOMessageWithMarkers as IOMessageWithMarkersType } from '../typings/IOMessageWithMarkers'

interface RenderElementParams {
  label: React.ComponentProps<IOMessageWithMarkersType>['label']
  values?: React.ComponentProps<IOMessageWithMarkersType>['values']
  componentName?: React.ComponentProps<IOMessageWithMarkersType>['componentName']
  markers?: React.ComponentProps<IOMessageWithMarkersType>['markers']
}

const renderIOMessageWithIntl = ({ label, values = {}, componentName = '', markers = [] }: RenderElementParams) =>
  render(<IOMessageWithMarkers label={label} values={values} componentName={componentName} markers={markers} />, {
    locale: 'en',
  })

describe('IOMessageWithMarkers', () => {
  it('Render simple message with only the label', () => {
    const label = 'Hello world!'
    const { getByText } = renderIOMessageWithIntl({ label })
    const element = getByText(label)

    expect(element).toBeDefined()
  })

  it('Check values interpolation', () => {
    const label = '{hello} {world} {exclamation}'
    const values = {
      hello: 'Hello',
      world: 'World',
      exclamation: '!'
    }

    const { getByText } = renderIOMessageWithIntl({ label, values })
    const element = getByText('Hello World !')

    expect(element).toBeDefined()
  })

  it('check marker and componentName', () => {
    const label = '<bold>Hello World!</bold>'
    const markers = ['bold']
    const componentName = 'test'
    const { getByText } = renderIOMessageWithIntl({ label, markers, componentName })
    const element = getByText('Hello World!')

    expect(element.className).toBe('test_bold')
  })

  it('check message with many markers and values', () => {
    const label = '<bold>{a}</bold> <italic>{b}</italic> <pretty>{c}</pretty> <sale>{d}</sale>'
    const values = {
      a: 'A',
      b: 'B',
      c: 'C',
      d: 'D'
    }
    const componentName = 'test'
    const markers = ['bold', 'italic', 'pretty', 'sale']
    const { getByText } = renderIOMessageWithIntl({ label, values, markers, componentName })

    expect(getByText('A').className).toBe('test_bold')
    expect(getByText('B').className).toBe('test_italic')
    expect(getByText('C').className).toBe('test_pretty')
    expect(getByText('D').className).toBe('test_sale')
  })

  it('check that if there are values equal to markers, the component should not be rendered correctly', () => {
    const label = '<a>{a}</a> <b>{b}</b> <c>{c}</c> <d>{d}</d>'
    const values = {
      a: 'A',
      b: 'B',
      c: 'C',
      d: 'D'
    }
    const componentName = 'test'
    const markers = ['a', 'b', 'c', 'd']
    const { queryByText } = renderIOMessageWithIntl({ label, values, markers, componentName })

    expect(queryByText('A')).toBeNull()
    expect(queryByText('B')).toBeNull()
    expect(queryByText('C')).toBeNull()
    expect(queryByText('D')).toBeNull()
  })
})
