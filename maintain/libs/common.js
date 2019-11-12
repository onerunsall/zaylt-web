var maintainCommon = {}

maintainCommon.resCodeProcess = function (code, codeMsg) {
    debugger
    if (code == 20) {
        if (confirm('现在去登录>>>')) {
            $(`<a href="/maintain/login.html"  >123</a>`)[0].click()
        }
    }

}


maintainCommon.newTab = function (title, url) {
    parent.$('#indexPad-tabPad').tabs('add', {
        title: title,
        closable: true,
        width: '100%',
        content: `<iframe src="${url}" style="width:100%;height:100%;border:none;"/>`,
        tools: [{
            iconCls: 'icon-mini-refresh',
            handler: function () {
                var current_tab = parent.$('#indexPad-tabPad').tabs('getSelected');
                parent.$('#indexPad-tabPad').tabs('update', {
                    tab: current_tab,
                    options: {
                        content: current_tab.panel('options', 'content'),
                    }
                });
            }
        }
        ]
    });
}


maintainCommon.uploadImage = function (inputDom, ook) {
    var r = prompt('已选的图片大小' + common.prettyFileSize(inputDom.files[0].size) + '，如需压缩，请输入质量1-9，取消则直接上传。', '8')
    var compressIs = false
    if (r != null) {
        r = parseInt(r);
        if (isNaN(r) || r < 1 || r > 9) {
            alert('输入有误')
            return;
        }
        compressIs = true
    }
    var file = inputDom.files[0];
    var fd = new FormData()
    fd.append('file', file);
    $.ajax({
        url: '/imgupload?' + $.param({ quality: r }),
        type: 'POST',
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        async: true,
        success: function (res) {
            if (res.codeMsg)
                alert(res.codeMsg)
            if (res.code != 0) {
                maintainCommon.resCodeProcess(res.code, res.codeMsg)
            } else {
                if (compressIs)
                    alert('压缩后文件大小' + common.prettyFileSize(inputDom.files[0].size))
                ook(res.data.url)
            }
        }
    })
}





