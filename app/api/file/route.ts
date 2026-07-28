import { writeFile } from "@/lib/util";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req:NextRequest,
  { params }: { params: { id: string } }
) {
      const searchParams = req.nextUrl.searchParams;
      const ttt = searchParams.get("ttt");

      let nr = null;
      console.log("**************");
      
        writeFile()
        nr= NextResponse.json({data: "d.data"})

      nr.headers.set('Access-Control-Allow-Origin', '*')
      return nr

}
