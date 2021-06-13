import Image from "next/image"
import React from "react"

const TestPage = () => {
  return (
    <div>
      {/* <Image src="/hoggard.jpg" layout="fill" /> */}
      <Image
        src={
          "https://images.unsplash.com/photo-1613910117442-b7ef140b37f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjE4NTAxMzg5&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit"
        }
        layout="fill"
        objectFit="contain"
      />
    </div>
  )
}

export default TestPage
