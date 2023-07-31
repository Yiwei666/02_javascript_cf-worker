#!/bin/bash

# 定义源目录和目标服务器信息
source_dir="/home/01_html/02_douyVideo/"
target_server="root@128.199.14.4"
target_dir="/home/01_html/02_douyVideo/"

# 执行rsync命令，添加-e选项指定使用SSH密钥认证
rsync -avze "ssh" "$source_dir" "$target_server:$target_dir"
