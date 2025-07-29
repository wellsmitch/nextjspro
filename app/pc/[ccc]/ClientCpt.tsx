"use client"
import { useParams, usePathname, useSearchParams } from "next/navigation";

export default ()=> {
  const p = useParams()
 const p1 = useSearchParams()
 const p2 = usePathname()
 console.log('useParams', p, p2)
  // p1.forEach((v,k)=> {
  //  console.log('k-v>>>>>>>>>',v,k)
  // })
  return <></>
}
