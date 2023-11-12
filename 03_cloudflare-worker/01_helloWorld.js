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
