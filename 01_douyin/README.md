# 项目功能

server.js 这段代码使用Node.js和Express框架创建了一个简单的Web服务器，用于提供视频文件的访问和展示。下面是对代码的功能总结：

1. 引入所需的模块：   
    引入express模块，用于创建Web服务器和路由。       
    引入path模块，用于处理文件路径。          
    引入fs模块，用于文件系统操作（读取目录和检查文件是否存在）。           

2. 定义常量和变量：   
    PORT常量设置服务器监听的端口号为3000。           
    videoPath变量设置视频文件所在的目录路径。           

3. 配置静态文件服务：   
    使用express.static中间件将public目录与Web服务器关联起来，使其中的静态资源可以通过URL访问。     

4. 定义路由/videos：   
    当访问/videos路径时，使用fs.readdir读取指定目录（videoPath）下的文件列表。         
    过滤出文件名以.mp4结尾的视频文件。          
    将过滤出的视频文件列表以JSON格式作为响应返回给客户端。            

5. 定义路由/videos/:videoName：   
    当访问类似/videos/video.mp4这样的路径时，根据参数中的videoName提取出视频文件名。            
    使用path.join将视频文件名与指定的视频目录路径拼接得到完整的视频文件路径。           
    使用fs.exists检查视频文件是否存在。          
    如果文件不存在，返回404状态码并发送'Video not found'消息。         
    如果文件存在，使用res.sendFile发送视频文件作为响应。            

6. 启动服务器：   
    使用app.listen方法在指定的端口（PORT）上启动服务器。         
    控制台输出服务器启动的消息，指示服务器已经开始监听请求。          
 
综上所述，这段代码创建了一个基本的Web服务器，可以列出指定目录下的所有.mp4格式的视频文件，并且可以通过URL访问这些视频文件进行播放。


# 项目结构

```

├── 02_douyin_nodejs
│   ├── node_modules            # 安装的模块
│   │   ├── accepts
│   │   ......
│   ├── package-lock.json
│   ├── package.json
│   └── server.js               # js脚本
├── douyin_random.php           # 观看视频的脚本


# 通过读取服务器上指定目录中的文件来生成视频列表
douyin_random.php                               # 在手机端和电脑端的视频播放页面大小是固定的
douyin_random_DeskMobile.php                    # 在手机端和电脑端的视频播放页面大小是自适应的
douyin_random_black.php                         # 将播放页面背景颜色设置为纯黑色


# 通过读取服务器上指定目录中的文件来生成视频列表
douyinVideo_page.php              
douyinVideo_random.php            

```

- 数据源:

第一个脚本通过JavaScript中的fetch函数从API端点（https://chaye.one/videos）异步获取视频列表。这意味着视频列表是从一个远程服务器动态获取的。
第二个脚本使用了PHP，通过读取服务器上指定目录中的文件来生成视频列表。这种方式是在服务器端通过PHP脚本预先生成的，而不是在客户端通过JavaScript异步请求获取的。


- 实现语言:

第一个脚本中的视频列表获取是通过客户端的JavaScript代码实现的。
第二个脚本中的视频列表获取是通过服务器端的PHP代码实现的。


- 数据格式:

第一个脚本通过API获取的视频列表是JSON格式的，通过response.json()方法解析。
第二个脚本通过PHP生成的视频列表是一个JavaScript数组，直接嵌入在HTML中。


- 动态性:

第一个脚本中的视频列表是在每次加载页面时通过API请求动态获取的。
第二个脚本中的视频列表是在服务器端生成的，因此在每次页面加载时都使用相同的列表。


# 环境部署

- **server.js**

要在Ubuntu系统中运行上述Node.js代码，需要使用npm（Node包管理器）安装所需的模块。所需的模块如下：

1. express：该模块用于创建Web服务器和处理HTTP请求。
1. path：该模块提供用于处理文件和目录路径的实用工具。
1. fs：该模块用于执行与文件系统相关的操作，如读取文件和目录。

要安装这些模块，请在Ubuntu系统上打开终端，然后导航到存放Node.js代码的目录，并运行以下命令：

```
npm init -y
npm install express
```

第一条命令（npm init -y）会在当前目录下创建一个带有默认值的package.json文件。package.json文件用于跟踪项目的依赖关系。-y标志表示接受所有默认配置。

第二条命令（npm install express）会将'express'模块及其依赖项安装到项目目录中的'node_modules'文件夹中。

运行这些命令后，您应该能在项目目录下看到'node_modules'文件夹，并在其中找到'express'模块。现在，您可以使用以下命令运行Node.js应用程序：

```
node 你的文件名.js
```

将'你的文件名.js'替换为存放Node.js代码的文件名。

node.js和npm安装，参考
https://github.com/Yiwei666/02_javascript_cf-worker/wiki/01_linux%E5%AE%89%E8%A3%85node.js%E5%92%8Cnpm


- **pm2后台进程管理**

使用 Node.js 进程管理工具（例如 PM2）：

1. 首先，全局安装 PM2，可以使用以下命令在终端中执行：

```
npm install -g pm2
```

进入包含 server.js 的项目目录。

2. 使用 PM2 启动应用程序：

```
pm2 start server.js
```

这将启动应用程序，并将其作为后台进程运行。PM2 会自动处理崩溃后的重启，以及监控日志和资源使用情况等。

3. 要查看正在运行的项目，您可以使用以下命令在 pm2 中列出所有正在运行的进程：

```
pm2 list
```

这将显示所有通过 pm2 启动的进程列表，包括项目名称、进程 ID、状态、CPU 和内存使用情况等信息。

在终端中输入如下命令，可以看到对应的json格式视频文件列表

```
curl 127.0.0.1:3000/videos 
```

4. **配置nginx文件**

```
    server {
        listen 443 ssl;
        server_name domain.com; # 替换为您的域名
        ssl_certificate /etc/nginx/key_crt/chaye.one.crt; # 替换为您下载的证书文件路径
        ssl_certificate_key /etc/nginx/key_crt/chaye.one.key; # 替换为您下载的密钥文件路径
        ssl_protocols TLSv1.2 TLSv1.3; # 选择您需要支持的 SSL/TLS 协议版本

        location /videos {
            proxy_pass http://127.0.0.1:3000; # 替换为您Node.js应用的监听地址
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }	

```

这段代码是一个 Nginx 配置块，它的作用是将客户端对指定路径 /videos 的请求代理（转发）到后端运行在 127.0.0.1 的 Node.js 应用，该应用监听在端口 3000 上。

这段配置的效果是，当客户端请求服务器上的 /videos 路径时，Nginx 会将请求转发给 Node.js 应用，而在转发过程中，它会适当地设置一些头部信息，以确保代理过程中的正确性和安全性。这对于将静态的 Nginx 服务器与动态的 Node.js 应用结合起来提供服务是非常常见的配置。

