/**
 * Created by xinxin on 2018/12/11.
 */
var splitUtils = {};
var dateUtils = {};
var otherUtils = {};

var giveup2 = {
    splitUtils:splitUtils,
    dateUtils:dateUtils,
    otherUtils:otherUtils
}



splitUtils.toSplit=function(arr,separator,clearEmpty){
    if (arr == null || arr.length == 0)
        return "";
    if(separator == null || separator == undefined)
        separator=','
    var s=''
    for (var i = 0; i < arr.length; i++) {
        if(clearEmpty)
        {
            if(arr[i]==null||arr[i]==undefined||arr[i].toString() == '')
                contunue;
        }
        else
            s = s+separator+arr[i];
    }
    if (s.length > 0)
        s = s.substring(1);
    return s;
}

splitUtils.toArray=function(split,separator,clearEmpty){
    var arr = [];
    if (split == null || split.length == 0)
        return arr;
    if(separator == null || separator == undefined)
        separator=','
    var arrSrc = split.split(separator);
    if(clearEmpty){
        for (var i = 0; i < arrSrc.length; i++) {
                if(arrSrc[i]==null||arrSrc[i]==undefined||arrSrc[i].toString() == '')
                    contunue;
                else
                    arr.push(arrSrc[i]);
        }
    }
    else
        arr = arrSrc;
    return arr;
}

dateUtils.formatToDateTime=function(timestamp){
    if(!timestamp||timestamp.length==0)
        return '';
    var date = new Date(timestamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}

dateUtils.formatToDate=function(timestamp){
    if(!timestamp||timestamp.length==0)
        return '';
    var date = new Date(timestamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};


dateUtils.toTimestamp=function(formatStr){
    if(!formatStr||formatStr.length==0)
        return '';
    return new Date(formatStr).getTime();
};

otherUtils.getAttr=function(obj,attrName){
    if(obj == null||obj==undefined)
        return null;
    var aas = attrName.split('.');
    var value=obj;
    for(var aa in aas){
        value= value[aas[aa]];
        if(value == null||value==undefined)
            return value;
    }
    return value;
}

otherUtils.getAttrInPerObj=function(arr,attrName){
    var attrs = []
    if(!arr)
        return attrs;
    for(var i = 0;i<arr.length;i++){
        attrs.push(otherUtils.getAttr(arr[i],attrName))
    }
    return attrs;
}


otherUtils.parseQueryStr =function (queryStr){
    var str=decodeURIComponent(queryStr);
    var arr=str.split("&");
    var obj = {};
    for(var i=0;i < arr.length;i++){
        var arrsub=arr[i].split("=");
        obj[arrsub[0]]=arrsub[1];
    }
    return obj;
}

otherUtils.convertBase64UrlToBlob=function(urlData){
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

otherUtils.strongKeyword=function(){
    if(arguments.length==0)
        return '';
    var srcText=arguments[0];
    if(srcText==null || srcText==undefined)
        return srcText
    srcText = srcText+''
    if(arguments.length==1)
        return srcText;
    for(var a in arguments){
        if(a>0){
            var keyword = arguments[a];
            if(!keyword)
                continue;
            var index = srcText.indexOf(keyword);
            if(index<0)
                continue;
            var aaa = srcText.substr(index,keyword.length);
            var bbb = '<span style="color:red">'+aaa+'</span>'
            srcText = srcText.replace(aaa,bbb)
        }
    }
    return srcText;
}
