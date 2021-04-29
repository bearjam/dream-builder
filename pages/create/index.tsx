import dynamic from "next/dynamic"
export default dynamic(() => import("components/create"), { ssr: false })
