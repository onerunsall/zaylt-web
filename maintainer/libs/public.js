
function resCodeProcess(code,codeMsg) {
    debugger
    var win = window.parent !== window ? window.parent : window

    if (code == 20) {
        alert(codeMsg)
        win.location.href=rootDis+'maintainer/login.html'
    }
    else if (code == 98) {

    } else
        alert(codeMsg)

}