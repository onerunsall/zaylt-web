#!/bin/bash
echo "admin : asdfj12#!@jweoiqr$@1482DF3ewrjOY"
echo

versionMsg=$1
if [ -z "$versionMsg" ]; then
 versionMsg='pack 更新'
fi

echo "-assign version"
version=`date +%y%m%d%H`
echo version: $version
sed -i "s/app\.version='.*'/app\.version='$version'/g" ./src/app.js
echo

echo "-package"
commitid=`git rev-parse --short HEAD`
env=/root/data/njshangka.com
packageName="prod-za-ylt-web-$version-$commitid.zip"
echo $packageName
rm -rf ./dist/
mkdir dist
cp -r ./src/* ./dist/
cd ./dist/
../zip -q -r ./$packageName ./
cd ..
echo

echo "-git add"
git add .
echo

echo "-git commit"
git commit -am "$version-$versionMsg"
echo

echo "-git pull"
git pull
echo

echo "-git push"
git push
echo

echo "-remote push"
scp -P 33699 ./dist/$packageName admin@47.110.157.60:$env
echo

echo "-remote deploy"
ssh -p 33699 -t admin@47.110.157.60 "unzip -q -o $env/$packageName -d $env/webroot/ylt"
echo

start https://njshangka.com/ylt/index.html

echo success
