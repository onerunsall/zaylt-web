#!/bin/bash

echo --nginx stop
cd ./nginx-1.15.10
rm -rf ./logs/*.log
taskkill -f -im nginx.exe
cd ..
echo

echo --start http://127.0.0.1/src/index.html
start http://127.0.0.1/src/index.html
echo

echo --nginx start
cd ./nginx-1.15.10
./nginx
cd ..
echo