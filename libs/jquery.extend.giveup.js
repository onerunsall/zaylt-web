
$.prototype.giveup_attrs=function(attr){
    var ss = [];
    $(this).each(function(index,ele){
        ss.push($(ele).attr(attr))
    })
    return ss
}

$.prototype.giveup_exchangeDom=function(target){
    debugger
    if(!target||target.length == 0)
        return
   var s=$('<span></span>')
    s.insertAfter(this)

    var s1=$('<span></span>')
    s1.insertAfter(target)

    $(target).insertBefore(s)
    $(this).insertAfter(s1)

    s.remove()
    s1.remove()

}
