import { PropsWithChildren, ReactNode } from "react"

export type LayoutType = ({ children }: { children?: ReactNode }) => JSX.Element
