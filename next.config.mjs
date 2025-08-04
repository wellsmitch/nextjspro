import path, { dirname } from "path";
import { StrictMode } from "react";
import { fileURLToPath } from 'url';
// 获取当前模块的 URL
const __filename = import.meta.url;

// 将 URL 转换为文件路径
const __dirname = dirname(fileURLToPath(__filename));
const nextConfig = {
 // productionBrowserSourceMaps: true,
 sassOptions: {
  includePaths: [path.join(__dirname, 'app')], // 配置 Sass 编译器
 },
};
export default nextConfig;

