// 后端接口 上层可以有文件夹  不能 和 page.tsx 同一层目录
import Network from "@/network"
import { NextResponse, NextRequest } from "next/server"
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
 try {
//   const res = await Network.get("", {
//    params: {
//     "tableName": "codeList",
//    }
//   })
const info  = request.nextUrl.searchParams
const code = info.get("code")
const like = info.get("like")
    // 读取 JSON 文件
const filePath = path.join("/tmp", 'indexData.json');
const fileContent = fs.readFileSync(filePath, 'utf8');

// 将 JSON 字符串解析为 JavaScript 对象
const jsonData = JSON.parse(fileContent) as [];
  return NextResponse.json({ 
    errMsg: null,  
    results: jsonData.filter((info: any)=> {
      if(like) {
        return info.moduleType ===like
      }
      return (
        info.moduleType ===code
      )
      })
 })
 } catch (err: any) {
  console.log('err', err)
  return NextResponse.json({
   errMsg: err?.message || ""
  })
 }
}