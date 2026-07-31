
import { NextResponse, NextRequest } from 'next/server';
import {parser} from 'stream-json';
import {pick} from 'stream-json/filters/pick.js';
import {streamArray} from 'stream-json/streamers/stream-array.js';
import chain from 'stream-chain';
import fs from 'node:fs';
import path from 'path';

export async function POST(
    req: NextRequest,
) {

    const bodyJson = await req.json()
    const fileName = bodyJson.fileName
    const jsonInfo = bodyJson.json
    const modifyType = bodyJson.modifyType

    const filePathIn = path.join("/tmp", fileName);
    const filePathOut = path.join("/tmp", "new-"+fileName);
    const inputStream = fs.createReadStream("/tmp");
    const outputStream = fs.createWriteStream(filePathOut);

    if (modifyType === "add") {
        outputStream.write(JSON.stringify(jsonInfo) + '\n');
    }
    console.log('filePathIn',filePathIn)
    outputStream.write("[");
    const ddd = await new Promise(d=> {
            // data.json: { "meta": {...}, "data": [ ...millions of records... ] }
            const pipeline = chain([
            fs.createReadStream(filePathIn), // a file far bigger than RAM is fine
            parser(),
            // pick({filter: 'list'}), // descend into "data", ignore everything else
            streamArray() // emit one array element at a time
            ]);

            const byDepartment = {};
            pipeline.on('data', (infooooo: any) => {
                const {value, key} = infooooo
                console.log('infooooo',value.objectId)
                outputStream.write(JSON.stringify(value) + '\n');

            });
            pipeline.on('end', () =>  {
                console.log(byDepartment)
                d("")
            });
    })

    outputStream.write("]");
    // console.log('123123123123123',ddd,123123123123123)

   return NextResponse.json({ddd: ">>>>>>>>>>"})

}