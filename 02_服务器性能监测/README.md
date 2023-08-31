### 项目功能
---

监测服务器性能

### 项目结构
---

```
├── 03_performance_nodejs
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
```

### 项目部署
---

1. 安装依赖

```
npm init -y                          # create a package.json file

npm install express os ps-node       # Install the necessary packages

node server.js

```

2. 修改nginx配置文件

```
        location /performance {
            proxy_pass http://127.0.0.1:2000; # 替换为您Node.js应用的监听地址
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
```

3. **pm2后台进程管理**

使用 Node.js 进程管理工具（例如 PM2）：

- 首先，全局安装 PM2，可以使用以下命令在终端中执行：

```
npm install -g pm2
```

进入包含 server.js 的项目目录。

- 使用 PM2 启动应用程序：

```
pm2 start server.js
```

这将启动应用程序，并将其作为后台进程运行。PM2 会自动处理崩溃后的重启，以及监控日志和资源使用情况等。

- 要查看正在运行的项目，您可以使用以下命令在 pm2 中列出所有正在运行的进程：

```
pm2 list
```

这将显示所有通过 pm2 启动的进程列表，包括项目名称、进程 ID、状态、CPU 和内存使用情况等信息。


4. 测试访问

```
curl 127.0.0.1:2000/performance

```


### 其他部署方式
---

参考：https://github.com/Yiwei666/03_Python-PHP/tree/main/03_smallTools/08_%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%80%A7%E8%83%BD%E7%9B%91%E6%B5%8B
