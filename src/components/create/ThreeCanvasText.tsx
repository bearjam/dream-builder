import React from "react"
import { Text } from "@react-three/drei"
import { CanvasTextItem } from "types/canvas"

type Props = {
  item: CanvasTextItem
}

const ThreeCanvasText = ({ item }: Props) => {
  return <Text>{item.text}</Text>
}

export default ThreeCanvasText
