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
        location //performance {
            proxy_pass http://127.0.0.1:2000; # 替换为您Node.js应用的监听地址
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
```

3. 测试访问

```
curl 127.0.0.1:2000/performance

```


### 其他部署方式
---

参考：https://github.com/Yiwei666/03_Python-PHP/tree/main/03_smallTools/08_%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%80%A7%E8%83%BD%E7%9B%91%E6%B5%8B
