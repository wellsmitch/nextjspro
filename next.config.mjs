import path, { dirname } from "path";
import { StrictMode } from "react";
import { fileURLToPath } from 'url';
// 获取当前模块的 URL
const __filename = import.meta.url;

// 将 URL 转换为文件路径
const __dirname = dirname(fileURLToPath(__filename));
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // 构建时忽略ESLint
    },
    typescript: {
        ignoreBuildErrors: true, // 构建时忽略TypeScript错误
    },
    // productionBrowserSourceMaps: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'app')], // 配置 Sass 编译器
    },

    // webpack(config) {
    //  const fileLoaderRule = config.module.rules.find((rule) => {
    //   rule.test?.test?.(".svg")
    //  })

    //  config.module.rules.push(
    //   {
    //    ...fileLoaderRule,
    //    test:/\.svg$/i,
    //    resourceQuery: /url/,
    //   },
    //   {
    //    test: /\/.svg$/i,
    //    // issuer: fileLoaderRule.issuer,
    //    // resourceQuery:{not: [...fileLoaderRule.resourceQuery.not,/url/]},
    //    use: ['@svgr/webpack']
    //   }
    //  )


    //  return config
    // }
};
export default nextConfig;

