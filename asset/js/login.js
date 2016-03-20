$(document).ready(function(e){
  setCookie('theuser','GUEST',1); delete_cookie('theuser');
  setCookie('user_id','0',1); delete_cookie('user_id');
  setCookie('cover','0',1); delete_cookie('cover');

  $('form').submit(function(event){
    event.preventDefault();
    event.stopPropagation();
    var fdata = {'email':$('#email').val(),'password':$('#password').val()};
    var obj = JSON.stringify(fdata);
    var dataR = ajaxAPICall('POST',obj,'api/users/login','application/json');
    dataR.success(function(data){
      if(data.response == 'success'){
        $('.alert-success').removeClass('hidden');
        $('.alert-danger').addClass('hidden');
        $('.alert-warning').addClass('hidden');
        setCookie('theuser',data.username,1);
        setCookie('cover',data.avatar,1);
        setCookie('user_id',data.user_id,1);
        window.location = 'dashboard.html';
      }
      if(data.response == 'fail'){
        $('.alert-success').addClass('hidden');
        $('.alert-danger').removeClass('hidden');
        $('.alert-warning').addClass('hidden');
      }
      if(data.response == 'inactive'){
        $('.alert-success').addClass('hidden');
        $('.alert-danger').addClass('hidden');
        $('.alert-warning').removeClass('hidden');
      }
    })
    return false;
  });
});
