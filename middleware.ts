// middleware.js
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;
 
  // 检查用户是否已登录
  const isAuth = req.cookies.has('auth-token'); // 假设你使用 cookies 来存储认证令牌
 
  // 定义一个受保护的路由
  const protectedPaths = ['/pc/aaa'];
 
  // if (protectedPaths.includes(pathname) && !isAuth) {
  //   // 如果用户未认证，重定向到登录页面
  //   return NextResponse.redirect(new URL('/login', req.url));
  // }
   // 仅对 API 路由生效
  // if (req.nextUrl.pathname.startsWith('/api')) {
    const response = NextResponse.next();
    const origin = req.headers.get('origin') || '';
    // 可根据需要配置允许的 origin
    response.headers.set('Access-Control-Allow-Origin',  '*');
    // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // response.headers.set('Access-Control-Allow-Credentials', 'true');
    
    // 处理 OPTIONS 请求（预检）
    // if (req.method === 'OPTIONS') {
    //   return new NextResponse(null, { status: 204, headers: response.headers });
    // }
    console.log('12312312312312',response.headers)
    return response;
  // }
  return NextResponse.next();
};

export default middleware