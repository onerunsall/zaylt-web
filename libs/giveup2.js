/**
 * Created by xinxin on 2018/12/11.
 */
var splitUtils = {};
var dateUtils = {};
var otherUtils = {};
var stringUtils = {};
var domUtils = {};

var giveup2 = {
    splitUtils:splitUtils,
    dateUtils:dateUtils,
    otherUtils:otherUtils,
    stringUtils:stringUtils,
    domUtils:domUtils
}



stringUtils.trimToEmpty = function(value){
    if(value == null || value == undefined)
        return '';
    else
        return value;
}

stringUtils.isNumber = function(value){
    if(value == NaN)
        return false;
    else
        return true;
}

stringUtils.randomString=function (min, max){
    var str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    if(!max)
        max=min

    range = Math.round(Math.random() * (max-min)) + min;

    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
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

otherUtils.isNaV=function(any){
   if(any ==null || any==undefined)
        return false;
    else
        return true;
}

otherUtils.toShow=function(any){
    if(otherUtils.isNaV(any)){
        any=any+''
        return any.trim();
    }
    else
        return '';
}

otherUtils.toShowOmit = function(any,startIndex,count){
    any = otherUtils.toShow(any)
    var aa =  any.slice(startIndex,count)
    if(aa.length < any.length)
        aa=aa+'...'
    return aa;
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


domUtils.swapDomLocation =function (dom1,dom2){
    var dom1Prev = dom1.previousElementSibling;
    var dom2Prev = dom2.previousElementSibling;

    if(!dom1Prev || dom1Prev==dom2){
        var dom1Prev = document.createElement('span');
        dom1.parentNode.insertBefore(dom1Prev,dom1);
    }
    if(!dom2Prev || dom2Prev==dom1){
        var dom2Prev = document.createElement('span');
        dom2.parentNode.insertBefore(dom2Prev,dom2);
    }
    dom1.parentNode.insertBefore(dom2,dom1Prev)
    dom2.parentNode.insertBefore(dom1,dom2Prev)

    dom1.parentNode.removeChild(dom1Prev)
    dom2.parentNode.removeChild(dom2Prev)
}

domUtils.upSelectedOptions =function (select){
    var childNodes = select.childNodes;
    var times = 0;
    for(var i=0;i<childNodes.length && times<childNodes.length ;times++,i++){
        if(!childNodes[i].selected){
            select.appendChild(childNodes[i])
            i--;
        }
    }
}


domUtils.scrollEvent= function (ele,down,top){
    ele.onscroll = function() {
        if (this.scrollTop + this.offsetHeight >= this.scrollHeight) {
            if(down)
                down();
        }else if(this.scrollTop == 0){
            if(top)
                top()
        }

    }
}



domUtils.layer=function (params){
    var layer = document.createElement('div');
    if(params.id==undefined||params.id==null)
        layer.id='giveup2-layer'+ giveup2.stringUtils.randomString(4)
    else
        layer.id=params.id;
    layer.classList.add('giveup2-layer')
    layer.style.position='fixed';
    layer.style.display='none';
    layer.style.top='0';
    layer.style.left='0';
    layer.style.bottom='0';
    layer.style.right='0';
    layer.style.overflow='auto';
    layer.style['z-index']=9999999;
    layer.style['background-color']='rgba(0, 0, 0, 0.3)';
    document.body.appendChild(layer);
    if(params.init)
        params.init(layer);

    layer.style.display='block';

    if(params.clickClose){
        $(layer).click(function(){
            $(this).remove();
        })
    }
}

domUtils.imgPreview=function(src){
    giveup2.domUtils.layer({init:function(layer){
        $(layer).append('<img style="margin:50px auto;display:block;position:relative;max-width:95%" src="'+src+'">')
    },clickClose:true})
}

