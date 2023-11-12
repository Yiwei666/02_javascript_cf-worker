# 项目功能

Cloudflare Workers 是一种在 Cloudflare 的边缘服务器上运行的脚本，用于处理网络请求。

本项目提供运行在Cloudflare Workers上的边缘计算脚本。


# 示例代码

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

这是一个简单的 Cloudflare Workers 脚本，用于处理网络请求并返回一个包含 "Hello World" 的 HTML 页面。让我解释一下每个部分的作用：

`addEventListener('fetch', event => {...})`: 这是一个事件监听器，用于捕获请求事件。当有请求到达时，它将触发 fetch 事件，并执行后面的回调函数。

`event.respondWith(handleRequest(event.request))`: 这告诉 Workers 使用 handleRequest 函数来处理请求，并将处理结果作为响应返回。

`async function handleRequest(request) {...}`: 这是实际处理请求的函数。它接收一个请求对象作为参数，然后生成一个包含 "Hello World" 内容的 HTML 页面。

`const html = ...`: 这里定义了一个包含 HTML 内容的模板字符串，表示要返回的页面的结构。

`return new Response(html, { headers: { 'content-type': 'text/html' } });`: 这一行创建了一个新的 Response 对象，将之前定义的 HTML 字符串作为响应主体，同时设置了响应头，指定内容类型为 text/html。



