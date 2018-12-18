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

var scripts = document.getElementsByTagName('script');
var my ;
for(var i in scripts){
    var as = scripts[i].src.split('/');
    if(as[as.length-1]=='giveup2.js')
    {
        my=scripts[i]
        break;
    }
}
giveup2.root = my.src.replace('/giveup2.js','');

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


domUtils.swapLocation =function (dom1,dom2){


        var dom1Prev = document.createElement('span');
        dom1Prev.style['display']='none'
        dom1.parentNode.insertBefore(dom1Prev,dom1);

        var dom2Prev = document.createElement('span');
        dom2Prev.style['display']='none'
        dom2.parentNode.insertBefore(dom2Prev,dom2);

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

domUtils.operationPics = function (container,multiply,uploadBlob,x,y){
    container.data = {count:0,mode:'show'};

    var picAlter = document.createElement('img');
    picAlter.style['width']='20px';
    picAlter.style['margin-left']='5px';
    picAlter.classList.add('picAlter')
    picAlter.src=giveup2.root+'/resource/add.jpg'
    picAlter.style['cursor']='pointer';

    picAlter.onclick=function(){
        domUtils.cutImg({complete:function(param){
            var url = uploadBlob(giveup2.otherUtils.convertBase64UrlToBlob(param.canvas.toDataURL(param.input.files[0].type)),param.input.files[0].name)
            if(url){
                container.addPics(url)
                if(!multiply)
                    $(container).find('.picAlter').hide()
            }
        },xRadio:x,yRadio:y})
    }


    container.appendChild(picAlter)

    container.alterMode=function(){
        $(container).find('.close').show()
        $(container).find('.swap').show()
        if(multiply)
            $(container).find('.picAlter').show()
        container.data.mode='alter'
    }

    container.showMode=function(){
        $(container).find('.close').hide()
        $(container).find('.swap').hide()
            $(container).find('.picAlter').hide()
        container.data.mode='show'
    }

    container.getPicUrls=function(){
      return  otherUtils.getAttrInPerObj($(container).find('.pic'),'attributes.src.value')
    }
    container.getPicUrl=function(){
        var urls = otherUtils.getAttrInPerObj($(container).find('.pic'),'attributes.src.value')
        if(urls.length==0)
            return '';
        else
            return urls[0]
    }
    container.addPics = function(urls){
        if(!(urls instanceof Array))
            urls=[urls]
        var container = this;
        for(var i in urls){
            var picPad = document.createElement('span');
            picPad.classList.add('picPad')
            picPad.style['margin-left']='5px';


            var pic = document.createElement('img');
            pic.classList.add('pic')
            pic.style['margin-left']='5px';
            pic.style['width']='50px';
            pic.style['cursor']='pointer';
            pic.src=urls[i]

            pic.onclick=function(){
                domUtils.imgPreview(this.src)
            }

            picPad.appendChild(pic)

            var close = document.createElement('span');
            close.innerHTML='X'
            close.classList.add('close')
            close.style['cursor']='pointer';
            if(container.data.mode=='show')
                close.style['display']='none';

            $(close).click(function(){
                var prev =  $(this).parent('.picPad').prev()
                if(prev.hasClass('swap'))
                    prev.remove()
                else{
                    var next =  $(this).parent('.picPad').next()
                    if(next.hasClass('swap'))
                        next.remove()
                }

                $(this).parent('.picPad').remove()

                container.data.count--;

                if(!multiply)
                    $(container).find('.picAlter').show()
            })

            picPad.appendChild(close)

            container.insertBefore(picPad,container.querySelector('.picAlter'))

            if(container.data.count > 0){
                var swap = document.createElement('swap');
                swap.classList.add('swap')
                swap.style['cursor']='pointer';
                swap.style['margin-left']='5px';
                swap.innerHTML='∞'
                if(container.data.mode=='show')
                    swap.style['display']='none';

                $(swap).click(function(){
                    giveup2.domUtils.swapLocation($(this).prev().get(0),$(this).next().get(0))
                })

                $(picPad).before(swap)
            }

            container.data.count++;
        }
    }
    return container;
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


domUtils.chooseFile = function (params){
    var inputId = 'giveup2-'+stringUtils.randomString(12);
    var input=document.createElement("input");
    input.type='file';
    input.id=inputId;
    input.name='file';
    input.style.display='none';
    input.onchange=function(){
        var file=this.files[0] // 获取input上传的图片数据;
        if(params.chooseEnd)
            params.chooseEnd(this)
        document.body.removeChild(input)
    }
    document.body.appendChild(input);
    input.click();
}

domUtils.cutImg = function (params){
    domUtils.chooseFile({chooseEnd:function(input){
        var file=input.files[0];
        if(!file.type || file.type.indexOf('image') != 0){
            throw '选择的文件不是图片格式';
        }else {
            var img = new Image();
            url = window.URL.createObjectURL(file) // 得到bolb对象路径，可当成普通的文件路径一样使用，赋值给src;

            domUtils.layer({
                init:function(layer){
                    layer.style.padding='30px 0';
                    layer.innerHTML="<div style='margin:auto;width:100%;text-align: center;margin-bottom:30px'><button style='width:100px' name='cancel'>取消</button><span style='width:30px;display: inline-block'></span><button style='width:100px' name='confirm'>确定</button></div><img name='targetImg' style='margin:30px auto;display:block;' src='"+url+"'>";

                    var xRadio = params.xRadio||1;
                    var yRadio = params.yRadio||1;

                    $(layer).find('[name=targetImg]').cropper({
                        aspectRatio: xRadio / yRadio,
                        viewMode:1,
                        background:false
                    });

                    $(layer).find('[name=cancel]').click(function(){
                        $(layer).remove();
                    })


                    $(layer).find('[name=confirm]').click(function(){
                        var cas=$(layer).find('[name=targetImg]').cropper('getCroppedCanvas');
                        if(params.complete)
                            params.complete({input:input,canvas:cas})
                        $(layer).remove();
                    })
                }
            })
        }
    }});
}