$(document).ready(function(e){
  $('.ttl').uploadFile({
    url:"classes/upload.php",
    fileName:"mfile",
    allowedTypes: "jpg,png,bmp,jpeg",
    showDelete:true,
    showDone:true,
    returnType:'json',
    showError:true,
    showProgress:true,
    showPreview:false,
    showStatusAfterSuccess:true,
    maxFileCount:1,
    previewHeight:150,
    onSuccess:function(files,data,xh,pd){
      uploadedfile = data.name.replace('documents/','');
      $('#cover').val(data.name);
      $('.mycover').html('<img class="img-responsive thumbnail" style="width:300px;" src="documents/'+data.name+'">');
      $('.ajax-upload-dragdrop').hide();

    },
    onError: function(files,status,errMsg,pd){
      attachment="Error_on_upload"; pd.done.show();
      pd.done.click(function () {
        pd.statusbar.hide("slow");
        pd.statusbar.remove();
      });
    },
  });// Upload File

  $('form').submit(function(event){
    event.preventDefault();
    event.stopPropagation();
    var myform = $(this);

    //Google Recaptcha. Check it is checked before submitting
    if(myform.find('.g-recaptch-response').val() == ''){
      $('.robot').removeClass('hidden');
      return false;
    }else{
      $('.sk-wave').removeClass('hidden');
      submitform( myform, function(data){
        $('.sk-wave').addClass('hidden');
        if(data.response == "success"){
          myform[0].reset();
          $('.alert-success').removeClass('hidden');
          $('.alert-danger').addClass('hidden');
          $('.alert-warning').addClass('hidden');
          setCookie('theuser',data.username,1);
          setCookie('cover',data.avatar,1);
          setCookie('user_id',data.user_id,1);
          window.location = 'dashboard.html';
        }if(data.response == "exists"){
          $('.alert-success').addClass('hidden');
          $('.alert-danger').addClass('hidden');
          $('.alert-warning').removeClass('hidden');
          return false;
        }else if(data.response == "error"){
          $('.alert-success').addClass('hidden');
          $('.alert-danger').removeClass('hidden');
          $('.alert-warning').addClass('hidden');
          console.log(data.error);
          return false;
        }
      });
    }
  }) //! Form Submit
})
