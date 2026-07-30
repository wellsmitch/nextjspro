
import archiver from 'archiver';
import { NextResponse , NextRequest } from 'next/server';
import path from 'path';
import fs from 'fs';
import { Readable } from 'stream';
const filterFn = (fullPath: any, relPath:any) => path.extname(fullPath) === '.txt';
export async function GET(
  req:NextRequest,
  { params }: { params: { id: string } }
) {
    const archive = archiver('zip');

    // 递归遍历目录，添加符合条件的文件
    function traverse(dir: any, relativePath = '') {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(relativePath, entry.name);
        if (entry.isDirectory()) {
          traverse(fullPath, relPath);
        } else {
          // 应用过滤函数
          if (filterFn(fullPath, relPath)) {
            // 添加文件到压缩包，使用相对路径作为压缩包内路径
            archive.file(fullPath, { name: relPath });
          }
        }
      }
    }
    const source =path.join('/tmp');
    traverse(source);

    archive.finalize();
    const webStream = Readable.toWeb(archive);
    return new NextResponse(webStream, {
        headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="user-111-files.zip"`,
        },
    });
}
