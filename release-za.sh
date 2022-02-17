#!/bin/bash
echo "admin : asdfj12#!@jweoiqr$@1482DF3ewrjOY"
echo

versionNote=$1
if [ -z "$versionNote" ]; then
 versionNote='pack 更新'
fi

echo "-assign version"
version=`date +%y%m%d%H`
echo version: $version
sed -i "s/app\.version='.*'/app\.version='$version'/g" ./src/app.js
echo

echo "-package"
commitId=`git rev-parse --short HEAD`
env=/root/data/domains/za
packageName="za-ylt-web-$version-$commitId.zip"
echo $packageName
rm -rf ./dist/
mkdir dist
cp -r ./src/* ./dist/
cd ./dist/
mkdir packages
../zip -q -r ../packages/$packageName ./
cd ..
echo

echo "-git add"
git add .
echo

echo "-git commit"
git commit -am "$version-$versionNote"
echo

echo "-git push"
git push
echo

echo "-git status"
result=`git status`
echo $result
ck=$(echo $result | grep "nothing to commit, working tree clean")
if [[ "$ck" = "" ]]
then 
	echo -e "\033[31mfail: git有未提交的内容，请检查。\033[0m"
	exit 1
fi

ck=$(echo $result | grep "Your branch is up to date with")
if [[ "$ck" = "" ]]
then
	echo -e "\033[31mfail: git push失败，请检查。\033[0m"
	exit 1
fi
echo

exit 1

echo "-remote push"
scp -P 33699 ./dist/$packageName admin@47.110.157.60:$env
echo

echo "-remote deploy"
ssh -p 33699 -t admin@47.110.157.60 "unzip -q -o $env/$packageName -d $env/webroot/ylt"
echo

start https://njshangka.com/ylt/index.html

echo success
