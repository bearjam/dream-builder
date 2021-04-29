import { useRouter } from "next/router"
import { useEffect } from "react"

const IndexPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push("/create")
  }, [])
  return <></>
}

export default IndexPage
