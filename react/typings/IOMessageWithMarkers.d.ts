import { FunctionComponent } from 'react'

type Values = Record<string, any>

interface Props {
  message: string
  handleBase: string
  markers: string[]
  values: Values
}

export type IOMessageWithMarkers = FunctionComponent<Props>