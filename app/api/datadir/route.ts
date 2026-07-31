
import { NextResponse , NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
  req:NextRequest,
  { params }: { params: { id: string } }
) {
        const filePathIn = path.join("/tmp");
    
 const allFiles = await getAllFilesAsync(filePathIn);

 return NextResponse.json(allFiles)
}

async function getAllFilesAsync(dir:any):Promise<any>  {
  const entries = await fs.readdirSync(dir);
  const files = await Promise.all(entries.map(async (entry: any) => {
    const fullPath = path.join(dir, entry);
    if (entry.isDirectory&&entry.isDirectory()) {
      return getAllFilesAsync(fullPath);
    } else {
      return fullPath;
    }
  }));
  // 展平结果数组
  return files.flat();
}