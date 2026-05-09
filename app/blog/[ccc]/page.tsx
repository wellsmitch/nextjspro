
import type { Metadata } from "next";
// import CccClient from "./ClientCpt"
import Custom from "./Custom";
import fs from "fs"
import path from "path"


export const metadata: Metadata = {
  title: 'daa',
  description: '...',
}
export default function Page() {
  // 读取本地文件
  const data = fs.readFileSync(path.join(process.cwd(), 'ddd.json'), 'utf8');
  console.log(data, "<<<<<<<<<<<<<<<<<<");
  const doSave = async () => {
    // return async () => {
      const data = { name: 'Next.js', version: Math.random() };
      await fs.writeFile(path.join(process.cwd(), 'ddd.json'), JSON.stringify(data, null, 2), null, ()=>{});

    // }
  }
setTimeout(()=> {
  doSave()
}, 2000)
  return (
    <>
      {/* <CccClient/> */}
      123aaa {data}
      {/* <Custom doSave={doSave()} /> */}
      {/* <button onClick={()=>doSave}>post</button> */}
    </>
  )
}