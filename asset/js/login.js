$(document).ready(function(e){
  setCookie('theuser','GUEST',1); delete_cookie('theuser');
  setCookie('user_id','0',1); delete_cookie('user_id');

  $('form').submit(function (event) {
    event.preventDefault();
    event.stopPropagation();
    thisform = $(this)
    $(this).children('.mjeerror').hide();$(this).children('.mjenotactive').hide();$(this).children('.mjesuccess').hide();
    var fdata = $(this).serializeArray();
    fdata.push({name:'token',value:newtoken('LOGIN')});
    $.post('api/',fdata,function(data){
      //console.log("debug");
      if(data.response=="success"){
        console.log("success");
        thisform.children('.mjesuccess').show();
        var date = new Date();
        var minutes = 30;
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        //$.cookie("cookie", "value", { expires: date });
        setCookie('theuser',data.theuser, { expires:date });
        setCookie('user_id',data.user_id,{ expires:date });
        setCookie('user_role',data.user_role,{ expires:date });
        window.location='dashboard.html';
      }else{
        thisform.children('.mjefail').show();
        console.log("fail");
      }
    },'json')
    return false;
  });
})
