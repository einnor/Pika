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
})
