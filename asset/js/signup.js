$(document).ready(function(e){
  $('.ttl').uploadFile({
    url:"classes/upload.php", fileName:"mfile", allowedTypes: "doc,docx,pdf,jpg,png,bmp,jpeg",showDelete:false, showDone:false,
    returnType:'json', showError:true, showProgress:true, showPreview:false, showStatusAfterSuccess:true, maxFileCount:1,
    previewHeight:200,formData: {"cat":"CV"},
    onSuccess:function(files,data,xh,pd){
      uploadedfile = data.name.replace('documents/','');
      $('#avatar').val(data.name);
      $('.mypost').html('<img class="img-responsive thumbnail" style="width:300px;" src="documents/'+data.name+'">');
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
