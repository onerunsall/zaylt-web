document.write("<link rel='stylesheet' href='css/xuxk.css'/><script language=javascript src='js/public.js'></script>");
jQuery.addTmpImg = function (idString) {
    var fd = new FormData(document.getElementById(idString));
    var result;
    $.ajax({
        url: '/mlt-defence-bg-merchant/image/upload/tmp.jact',
        type: 'POST',
        data: fd,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            //console.log('success回调函数...响应完成且成功');
            //console.log(typeof data.data.TMP_IMG);
            result = data.data.handle;
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return result;
};
jQuery.addTmpImgBatch = function (idString) {
    var fd = new FormData(document.getElementById(idString));
    var result;
    $.ajax({
        url: '/mlt-defence-bg-merchant/image/upload/batch/tmp.jact',
        type: 'POST',
        data: fd,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            //console.log('success回调函数...响应完成且成功');
            //console.log(typeof data.data.TMP_IMG);
            result = data.data.handles;
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return result;
};


jQuery.addTmpImgBlob = function (fileName, blob) {
    if (!blob)
        return null;
    var fd = new FormData();
    fd.append('file', blob, fileName);
    var result;
    $.ajax({
        url: '/mlt-defence-bg-merchant/image/upload/tmp.jact',
        type: 'POST',
        data: fd,
        async: false,
        contentType: false,
        processData: false,
        success: function (data) {

            //console.log('success回调函数...响应完成且成功');
            //console.log(typeof data.data.TMP_IMG);
            result = data.data.handle;
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return result;
};
var result;
jQuery.addTmpImgBlobBatch = function (blobs) {
    var fd = new FormData();
    for (var i = 0; i < blobs.length; i++) {
        //if(blobs[i].type=="jpg"){
        //    fd.append('file',blobs[i],'file'+i+'.jpg')
        //fd.append('file',blobs[i],'file'+i+'.jpg'||'file'+i+'.png')
        //}else if(type=='png'){
        fd.append('file', blobs[i], 'file' + i + '.png');
        //}
    }

    $.ajax({
        url: '/mlt-defence-bg-merchant/image/upload/batch/tmp.jact',
        type: 'POST',
        data: fd,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            //console.log('success回调函数...响应完成且成功');
            //console.log(typeof data.data.TMP_IMG);
            result = data.data.handle;
            console.log(result)
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return result;
};
jQuery.allCity = function () {
    var city;
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: '/sdhui-oam/master/cities/all.oam',
        success: function (data) {
            //console.log('success回调函数...响应完成且成功');
            //console.log(data);
            city = data.data.items;
            console.log(city);
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return city;
};
jQuery.searchUI = function () {
    $.ajax({
        type: 'POST',
        data: JSON.stringify({type: "tabbar"}),
        datatype: 'JSON',
        contentType: 'application/json',
        url: '/sdhui-oam/duis.oam',
        success: function (data) {
            //console.log('success回调函数...响应完成且成功');
            //console.log(data);
            $('tbody').remove();
            if (data.data != '') {
                for (var i = 0; i < data.data.items.length; i++) {
                    var str = '/sdhui-sei' + data.data.items[i].url;
                    var uiOrder = data.data.items[i].uiOrder;
                    var dataId = data.data.items[i].id;
                    var dataCode = data.data.items[i].code;
                    //console.log(str);
                    $("#ui_table").append("<tr>" +
                    "<td style='display:none;'>" + dataId + "</td>" +
                    "<td class='td'>" + uiOrder + "</td>" +
                    "<td class='td'>" + dataCode + "</td>" +
                    "<td class='td'><img src=" + str + "></td>" +
                    "<td class='td'><button type='button' class='btn btn-size btn-primary' data-toggle='modal' data-target='#modal_change_ui' value='change'>修改</button>" +
                    "<button type='button' class='btn btn-size btn-danger' value='delete'>删除</button></td>" +
                    "</tr>");
                }
            }
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
};
var result = '';
jQuery.addTmpImgYichacha = function (idString) {
    var fd = new FormData(document.getElementById(idString));
    $.ajax({
        url: '/fss/file/upload?path=yichaxun/oss/',
        type: 'POST',
        data: fd,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            //var m=data;
            result = JSON.parse(data).data.url;
            //var s = m.code
            //console.log(s)
            //result = data.data.url;
            //console.log(result)
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
};
var result;
jQuery.addTmpImgYichachaBatch = function (idString) {
    var fd = new FormData(document.getElementById(idString));

    $.ajax({
        url: '/fss/file/upload?path=yichaxun/oss/',
        type: 'POST',
        data: fd,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            result = data.data.url;
            console.log(result)
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return result;
};


var returnUrl;
function uploadImg(formId) {
    var img = new FormData(document.getElementById(formId));
    $.ajax({
        type: 'POST',
        data: img,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        url: '/fss/file/upload?path=yichaxun/oss/',
        success: function (data) {
            if (data.code == 0) {
                var returnUrl = data.data.url;
                console.log(returnUrl)

            }
        },
        error: function () {
        }
    })
    console.log(returnUrl)
    return returnUrl;
}


function uploadImgBatch(formId) {
    var img = new FormData(document.getElementById(formId));
    var returnUrl;
    $.ajax({
        type: 'POST',
        data: img,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        url: '/fss/file/upload?path=yichaxun/oss/',
        success: function (data) {
            if (data.code == 0) {
                //alert('upload success!');

                var returnUrl = data.data.url;

            }
        },
        error: function () {
        }
    })
    return returnUrl;
}

var result = '';
jQuery.uploadImgs = function (idString) {
    var fd = new FormData(document.getElementById(idString));
    $.ajax({
        url: 'http://passion.njshangka.com/oss/file/upload?path=easywin',
        type: 'POST',
        data: fd,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            //var m=data;
            //result=JSON.parse(data).data.url;
            //var s = m.code
            //console.log(s)
            result = data.data.url;
            console.log(result)

        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return result
};

var result = '';
jQuery.addFiles = function (idString) {
    var fd = new FormData(document.getElementById(idString));
    console.log(fd)
    $.ajax({
        url: 'http://oss.njshangka.com/file/upload?path=zasellaid/oss/',
        type: 'POST',
        data: fd,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            //var m=data;
            //result=JSON.parse(data).data.url;
            //var s = m.code
            //console.log(s)
            result = data.data.url;
            //console.log(result)
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return result
};

var result = '';
jQuery.uploadImgsBlobBatch = function (blobs) {
    var fd = new FormData()
    for (var i = 0; i < blobs.length; i++) {
        fd.append('file', blobs[i], 'file' + i + '.png')
    }
    var result;
    $.ajax({
        url: 'http://oss.njshangka.com/file/upload?path=zasellaid/oss/',
        type: 'POST',
        data: fd,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            //console.log('success回调函数...响应完成且成功');
            //console.log(typeof data.data.TMP_IMG);
            result = data.data.handles;
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return result;
};
//上传base64转码图片


//上传图片 ，不定url
var result = '';
jQuery.uploadImgUrl = function (idString, url) {
    var fd = new FormData(document.getElementById(idString));
    $.ajax({
        url: url,
        type: 'POST',
        data: fd,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {

            if (data.code == 0) {
                result = data.data.url;
            } else {
                error(data.codeMsg)
            }
            //var m=data;
            //result = JSON.parse(data).data.url;
            //var s = m.code
            //console.log(s)

            //console.log(result)
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return result;
};

var returnUrl
function uploadImgBatchUrl(idString, url) {
    var img = new FormData(document.getElementById(idString));
    var returnUrl;
    $.ajax({
        type: 'POST',
        data: img,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        url: url,
        success: function (data) {
            if (data.code == 0) {
                //alert('upload success!');

                 returnUrl = data.data.url;
                return returnUrl;
            }
        },
        error: function () {
        }
    })
    return returnUrl;
}
var urlId
function uploadfiles(bj_id,url,name,type,token){
    $.ajax({
        url:"/cszyyljk/xs/xsxm/bj/addfile",
        type:'post',
        async: false,
        cache: false,
        processData: false,
        data:'token='+token+"&bj_id="+bj_id+"&url="+url+"&type="+type+"&name="+name,
        success:function(res){
            if(res.code==0){
                urlId = res.data.id;
                return urlId;
            }else{
                alert(res.codeMsg)
            }
        }
    })
    return urlId;
}
var urlIdcddy
function uploadfilescddy(cddybg_id,url,name,type,token){
    if(url){
        $.ajax({
            url:"/cszyyljk/xs/xsxm/cddybg/addfile",
            type:'post',
            async: false,
            cache: false,
            processData: false,
            data:'token='+token+"&cddybg_id="+cddybg_id+"&url="+url+"&type="+type+"&name="+name,
            success:function(res){
                if(res.code==0){
                    urlIdcddy = res.data.id;
                    return urlIdcddy;
                }else{
                    alert(res.codeMsg)
                }
            }
        })
        return urlIdcddy;
    }

}
var urlIdhdgg
function uploadfileshdgg(hdgg_id,url,name,type,token){
   if(url){
       $.ajax({
           url:"/cszyyljk/xs/xsxm/hdgg/addfile",
           type:'post',
           async: false,
           cache: false,
           processData: false,
           data:'token='+token+"&hdgg_id="+hdgg_id	+"&url="+url+"&type="+type+"&name="+name,
           success:function(res){
               if(res.code==0){
                   urlIdhdgg = res.data.id;
                   return urlIdhdgg;
               }else{
                   alert(res.codeMsg)
               }
           }
       })
       return urlIdhdgg;
   }
}
var urlIdyqh
function uploadfilesyqh(yqh_id,url,name,type,token){
   if(url){
       $.ajax({
           url:"/cszyyljk/xs/xsxm/yqh/addfile",
           type:'post',
           async: false,
           cache: false,
           processData: false,
           data:'token='+token+"&yqh_id="+yqh_id+"&url="+url+"&type="+type+"&name="+name,
           success:function(res){
               if(res.code==0){
                   urlIdyqh = res.data.id;
                   return urlIdhdgg;
               }else{
                   alert(res.codeMsg)
               }
           }
       })
       return urlIdyqh;
   }
}

//有error的传图
var resulte = '';
jQuery.upUrl = function (idString, url) {
    var fd = new FormData(document.getElementById(idString));
    $.ajax({
        url: url,
        type: 'POST',
        data: fd,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            //error('上传中!')
            if (data.code == 0) {
                resulte = data.data.url;
                //error('上传完成！')
            } else {
                alert(data.codeMsg)
            }
        },
        error: function (xhr, msg, reasonString) {
            alert('请求错误，请稍后再试...');
            console.log('error回调函数...响应完成但存在问题');
            console.log(arguments);
        }
    });
    return resulte;
};