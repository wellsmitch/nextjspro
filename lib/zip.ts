import fs from "fs";
import path from "path";
import archiver from "archiver"
/**
 * 将目录中的部分文件打包成 zipnpm i --save-dev @types/archiver
 * @param {string} sourceDir 源目录
 * @param {string} outputZip 输出 zip 文件路径
 * @param {Function} filterFn 过滤函数，接收文件路径，返回 true 表示包含
 */
function packPartialFiles(sourceDir: any, outputZip: any, filterFn: any) {
   
  return new Promise((resolve, reject) => {
    // 创建写入流
    const output = fs.createWriteStream(outputZip);
    const archive = archiver('zip', { zlib: { level: 9 } }); // 压缩级别 0-9

    // 监听输出流完成
    output.on('close', () => {
      console.log(`压缩包已生成：${outputZip}，大小：${archive.pointer()} 字节`);
      resolve("");
    });

    // 处理警告/错误
    archive.on('warning', (err: any) => {
      if (err.code === 'ENOENT') console.warn('警告：', err);
      else reject(err);
    });
    archive.on('error', reject);

    // 将 archive 管道到输出流
    archive.pipe(output);

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

    traverse(sourceDir);
    archive.finalize();
  });
}