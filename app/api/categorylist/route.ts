// 后端接口 上层可以有文件夹  不能 和 page.tsx 同一层目录
import Network from "@/network"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
 try {
  const res = await Network.get("", {
   params: {
    "tableName": "codeList",
   }
  })

  return NextResponse.json({ errMsg: null, ...res.data })
 } catch (err: any) {
  console.log('err', err)
  return NextResponse.json({
   errMsg: err?.message || ""
  })
 }
}