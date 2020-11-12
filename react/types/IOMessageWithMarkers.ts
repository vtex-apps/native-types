import { FunctionComponent } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Values = Record<string, any>

interface Props {
  message: string
  handleBase: string
  markers: string[]
  values: Values
}

export type IOMessageWithMarkers = FunctionComponent<Props>
