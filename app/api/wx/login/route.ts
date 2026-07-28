import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req:NextRequest,
  { params }: { params: { id: string } }
) {
      const searchParams = req.nextUrl.searchParams;
      const ttt = searchParams.get("ttt");

      let nr = null;
        const d = await axios({
          method:"get",
          url: "https://api.weixin.qq.com/sns/jscode2session",
          params:  {
            appId: "wx73973472fe852fd5",
            secret: "49abad8d05df101c9cadbae5f8d35780",
            js_code: ttt||"",
            grant_typegrant_type: "authorization_code"
          }
        })
        nr= NextResponse.json({data: d.data})

      nr.headers.set('Access-Control-Allow-Origin', '*')
      return nr

}
