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
};

export default middleware