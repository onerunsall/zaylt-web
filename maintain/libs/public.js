
function resCodeProcess(code,codeMsg) {
    debugger
    var win = window.parent !== window ? window.parent : window
    if (code == 20) {
        if(confirm(codeMsg)){
            win.location.href='/maintain/login.html'
        }
    }

}





