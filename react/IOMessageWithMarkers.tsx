import React, { useMemo } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import IOMessage from './IOMessage'
import { IOMessageWithMarkers as IOMessageWithMarkersType } from './types/IOMessageWithMarkers'

const IOMessageWithMarkers: IOMessageWithMarkersType = ({
  message,
  markers = [],
  handleBase = '',
  values = {},
}) => {
  const CSS_HANDLES = useMemo(() => markers.map(marker => {
    return `${handleBase}_${marker}`
  }), [markers])
  const handles = useCssHandles(CSS_HANDLES)
  
  const markerComponents = markers.reduce((acc: Record<string, any>, marker) => {
    // for more information check https://github.com/formatjs/react-intl/blob/master/docs/Components.md#rich-text-formatting
    acc[marker] = (...chunks: any) => (
      <span className={handles[`${handleBase}_${marker}`]}>{chunks}</span>
    )
    return acc
  }, {})

  return (
    <IOMessage
      id={message}
      values={{
        ...markerComponents,
        ...values,
      }}
    />
  )
}

export default React.memo(IOMessageWithMarkers)
