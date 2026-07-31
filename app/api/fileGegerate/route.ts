// 后端接口 上层可以有文件夹  不能 和 page.tsx 同一层目录
import Network from "@/network"
import { NextResponse } from "next/server"
import path from "path";
import fs from "fs";

export async function GET(request: Request) {
      try {
    const src = path.join(process.cwd(), 'app/assets/json/data'); // 源文件夹
    const dest = '/tmp';    
    // @ts-ignore  mmmmmmmmmmmmm
    // fs.cpSync(src, dest, { recursive: true });
    // 源文件路径 (例如，位于项目中的文件)
const srcPath = path.join(src, 'codeList.json');
// 目标文件路径 (必须写入 /tmp 目录)
const destPath = path.join('/tmp', 'codeList.json');
     fs.copyFileSync(srcPath, destPath);
    return NextResponse.json({ message: 'Copied successfully+1' });
  } catch (error) {
    console.log('error',error)
    return NextResponse.json({ error:"复制失败" }, { status: 500 });
  }
        // const srcPath = path.join(process.cwd(), 'package.json');
        // const destPath = path.join('/tmp', 'example.txt');

        // try {
        //     // 执行异步复制
        //     fs.copyFile(srcPath, destPath, err => {
        //         console.log('err', err)
        //     });
        //     return new Response(`文件已成功复制到: ${destPath}`);
        // } catch (err) {
        //     return new Response(`复制文件时出错:`, { status: 500 });
        // }
}