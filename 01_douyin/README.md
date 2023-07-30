### 项目功能
---


### 环境部署
---

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
