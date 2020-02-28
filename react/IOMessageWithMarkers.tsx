import React, { useMemo } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import IOMessage from './IOMessage'
import { IOMessageWithMarkers as IOMessageWithMarkersType } from './typings/IOMessageWithMarkers'

const IOMessageWithMarkers: IOMessageWithMarkersType = ({
  label,
  markers = [],
  componentName,
  values = {},
}) => {
  const CSS_HANDLES = useMemo(() => markers.map(marker => {
    return `${componentName}_${marker}`
  }), [markers])
  const handles = useCssHandles(CSS_HANDLES)
  
  const markerComponents = markers.reduce((acc: Record<string, any>, marker) => {
    // for more information check https://github.com/formatjs/react-intl/blob/master/docs/Components.md#rich-text-formatting
    acc[marker] = (...chunks: any) => (
      <span className={handles[`${componentName}_${marker}`]}>{chunks}</span>
    )
    return acc
  }, {})

  return (
    <IOMessage
      id={label}
      values={{
        ...markerComponents,
        ...values,
      }}
    />
  )
}

export default React.memo(IOMessageWithMarkers)
