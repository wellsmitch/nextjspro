import { WXBizDataCrypt } from "@/lib/util";
import { NextRequest, NextResponse } from "next/server";



export async function POST(
  req:NextRequest,
) {
    const json:any  = await req.json()
        const sessionKey = json.sessionKey;
        const encryptedData = json.encryptedData
        const iv = json.iv
      
      const de = new WXBizDataCrypt("wx73973472fe852fd5",sessionKey||"")
      let nr = null;
      nr = NextResponse.json({data: de.decryptData(encryptedData, iv)})
      nr.headers.set('Access-Control-Allow-Origin', '*')
      return nr

}