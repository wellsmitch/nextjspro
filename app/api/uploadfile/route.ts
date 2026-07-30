import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // 1. 解析表单数据
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: '未上传文件' }, { status: 400 });
    }

    // 2. 将 File 转为 Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    // 4. 生成安全的文件名（防止冲突和路径遍历攻击）

    const filePath = path.join("/tmp", file.name);

    // 5. 写入文件
    await writeFile(filePath, buffer);

    // 6. 返回文件访问路径（相对 public 目录）
    return NextResponse.json({
      success: true,
      filePath: `/tmp/${file.name}`,
    });
  } catch (error) {
    console.error('上传失败:', error);
    return NextResponse.json(
      { error: '上传失败，请稍后重试' },
      { status: 500 }
    );
  }
}