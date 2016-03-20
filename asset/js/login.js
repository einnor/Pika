$(document).ready(function(e){
  setCookie('theuser','GUEST',1); delete_cookie('theuser');
  setCookie('user_id','0',1); delete_cookie('user_id');
  setCookie('avatar','0',1); delete_cookie('avatar');

  $('form').submit(function (event) {
    event.preventDefault();
    event.stopPropagation();
    var fdata = {'email':$('#email').val(),'password':$('#password').val()};
    obj = JSON.stringify(fdata);
    var dataR = ajaxAPICall('POST',obj,'api/users/login','application/json');
    dataR.success(function(data){
      if(data.response == 'success'){
        $('.alert-success').show();
        $('.alert-danger').hide();
        $('.alert-warning').hide();
        setCookie('theuser',data.username,1);
        setCookie('avatar',data.avatar,1);
        setCookie('user_id',data.id,1);
        window.location = 'dashboard.html';
      }
      if(data.response == 'fail'){
        $('.alert-success').hide();
        $('.alert-danger').show();
        $('.alert-warning').hide();
      }
      if(data.response == 'error'){
        $('.alert-success').hide();
        $('.alert-danger').hide();
        $('.alert-warning').show();
      }
      return false;
    })
  });
})
