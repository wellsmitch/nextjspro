
import type { Metadata } from "next";
// import CccClient from "./ClientCpt"
import fs from "fs"
import path from "path"


export const metadata: Metadata = {
  title: 'daa',
  description: '...',
}
export default  function Page() {
 // 读取本地文件
  const data = fs.readFileSync(path.join(process.cwd(), 'ddd.json'), 'utf8');
  console.log(data, "<<<<<<<<<<<<<<<<<<");
  
 return (
  <>
  {/* <CccClient/> */}
   123aaa {data}
  </>
 )
}