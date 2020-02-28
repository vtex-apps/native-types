import { FunctionComponent } from 'react'

type Values = Record<string, any>

interface Props {
  label: string
  componentName: string
  markers: string[]
  values: Values
}

export type IOMessageWithMarkers = FunctionComponent<Props>