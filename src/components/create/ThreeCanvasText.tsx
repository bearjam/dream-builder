import React from "react"
import { Text } from "@react-three/drei"
import { CanvasTextItem } from "types/canvas"
import { colors } from "tailwindcss/defaultTheme"

type Props = {
  item: CanvasTextItem
}

const ThreeCanvasText = ({ item }: Props) => {
  // return <Text>{item.text}</Text>
  return (
    <Text
      color={colors.red[600]}
      fontSize={32}
      lineHeight={undefined}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      fillOpacity={1}
    >
      {item.text}
    </Text>
  )
}

export default ThreeCanvasText
