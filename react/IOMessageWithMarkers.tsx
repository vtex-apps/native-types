import React, { useMemo, ReactElement } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import IOMessage from './IOMessage'
import { IOMessageWithMarkers as IOMessageWithMarkersType } from './types/IOMessageWithMarkers'

const IOMessageWithMarkers: IOMessageWithMarkersType = ({
  message,
  markers = [],
  handleBase = '',
  values = {},
}) => {
  const CSS_HANDLES = useMemo(
    () => markers.map((marker) => `${handleBase}-${marker}`),
    [handleBase, markers]
  )

  const handles = useCssHandles(CSS_HANDLES)

  const markerComponents = markers.reduce((acc, marker) => {
    // for more information check https://github.com/formatjs/react-intl/blob/master/docs/Components.md#rich-text-formatting
    // eslint-disable-next-line react/display-name
    acc[marker] = (chunks) => (
      <span key={marker} className={handles[`${handleBase}-${marker}`]}>
        {chunks}
      </span>
    )

    return acc
  }, {} as Record<string, (...chunks: string[]) => ReactElement>)

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
