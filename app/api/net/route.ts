
import axios from 'axios';
import { NextResponse , NextRequest } from 'next/server';
  //const userId = params.id; // 获取路径中的 id
  //app/api/users/[id]/route.ts
  /* 
    const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name'); // 获取 ?name=xxx
  const age = searchParams.get('age');
  */
 /* 
  const body = await request.json(); // 解析 JSON
  const { username, password } = body;
 */
/* 
  const formData = await request.formData();
  const username = formData.get('username');
  const file = formData.get('file') as File; // 如果有文件
*/
/* 
 const authorization = request.headers.get('Authorization');
  const userAgent = request.headers.get('user-agent');
*/
/* 
  const cookieStore = request.cookies;
  const token = cookieStore.get('token')?.value;
*/
//   const method = request.method;
export async function GET(
  req:NextRequest,
  { params }: { params: { id: string } }
) {
      const searchParams = req.nextUrl.searchParams;
      const isFile = req.nextUrl.searchParams.get("isFile");
      const cUrl = searchParams.get("cUrl") as string;
      const urlParams = {} as any;
      searchParams.forEach((v:any, k:string)=> {
        urlParams[k]=v
        delete urlParams.cType;
        delete urlParams.cUrl;
      })
      let nr = null;
      if(cUrl) {
        const d = await axios({
          method:"get",
          url: cUrl,
          params: urlParams
        })
        nr= NextResponse.json({data: d.data})
      }else {
        nr= NextResponse.json({data: "cUrl"})
      }
      nr.headers.set('Access-Control-Allow-Origin', '*')
      return nr

}

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const cType = searchParams.get("cType");
  const cMethod = searchParams.get("cMethod");
  const cUrl = searchParams.get("cUrl") as string;
  let nr = null;
  if(cType === "string") {
      const urlParams = {} as any;
      searchParams.forEach((v:any, k:string)=> {
        urlParams[k]=v
        delete urlParams.cType;
        delete urlParams.cUrl;
      })
     const d = await axios({
      method: cMethod || "get",
      url: cUrl,
      params: urlParams
     })
      nr = NextResponse.json({data: d.data})
  }else if(cType === "json") {
     const d = await axios({
      method: cMethod || "get",
      url: cUrl,
      data: req.json()
     })
      nr = NextResponse.json({data: d.data})
  }else if(cType === "formData") {
     const d = await axios({
      method: cMethod || "get",
      url: cUrl,
      data: req.formData()
     })
      nr = NextResponse.json({data: d.data})
  }else {
   nr = NextResponse.json({ message: `cType::cUrl::cMethod!` }, { status: 201 });
  }
  nr.headers.set('Access-Control-Allow-Origin', '*')
  return nr
}