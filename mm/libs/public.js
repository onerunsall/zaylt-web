/**
 * Created by xinxin on 2018/12/14.
 */
function saveLoginStatus(data){
    $.cookie('login-token',data.token,{path:'/'});
    $.cookie('login-username',data.username,{path:'/'});
    $.cookie('login-realname',data.realname,{path:'/'});
    $.cookie('login-moduleIds',data.moduleIds,{path:'/'});
    $.cookie('login-email',data.email==null||data.email==undefined?'':data.email,{path:'/'});
    $.cookie('login-phone',data.phone,{path:'/'});
    $.cookie('login-role',data.role,{path:'/'});
    $.cookie('login-registerTime',data.registerTime,{path:'/'});
}

function clearLoginStatus(){
    $.removeCookie('login-token');
    $.removeCookie('login-username');
    $.removeCookie('login-realname');
    $.removeCookie('login-moduleIds');
    $.removeCookie('login-email');
    $.removeCookie('login-phone');
    $.removeCookie('login-role');
    $.removeCookie('login-registerTime');
}