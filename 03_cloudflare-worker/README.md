# 项目功能

Cloudflare Workers 是一种在 Cloudflare 的边缘服务器上运行的脚本，用于处理网络请求。

本项目提供运行在Cloudflare Workers上的边缘计算脚本。


# 环境配置

- cf-worker部署 Hello world 程序示例代码

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const html = `
    <html>
      <head>
        <title>Hello World</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 24px;
            text-align: center;
            margin-top: 100px;
          }
        </style>
      </head>
      <body>
        <h1>Hello World</h1>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'content-type': 'text/html' },
  });
}
```
