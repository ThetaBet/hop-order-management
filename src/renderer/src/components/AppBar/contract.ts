import { JSX } from "react"

export interface IAppBarProps {
  pageName: string
  closeApi?: () => Promise<void>
  isDoubleCheckClose?: boolean
  operations?: JSX.Element
}