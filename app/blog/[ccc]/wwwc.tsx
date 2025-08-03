
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: 'daa',
  description: '...',
}
export default async function Page() {
   const res = await fetch("https://server.wellsmitch.top/api/getcodeList",{
   method: "get"
  })
  const data = res.json()
  
  return <>---wwwwc-{data}</>
}