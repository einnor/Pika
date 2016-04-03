//if (getCookie('theuser')==='GUEST' ||  getCookie('theuser') ===''){ window.location.replace('login.html'); }
$(document).ready(function(){
  // Set the username
  $('li.user-name span').html(getCookie('theuser'));
  $('div.box-v2-detail h4').html(getCookie('theuser'));
  // Recipes
  // $('#datatables-example').DataTable();
  var url = 'api/authors/'.concat('11').concat('/recipes');
  var cols = [{ "data": "id"},{"data": "name"},{"data": "preptime"},{"data": "preptime"},{"data": "preptime"},{"data": "approval"},{"data": "thedate"}]
  var  oTable = datatable_init(url, cols, 'datatables-example');
  oTable.column( 0 ).visible( false );
  oTable.column( 6 ).visible( false );
  oTable.on( 'draw.dt', function () {
    $('tbody tr').each(function(){
      if($(this).find('td:eq(4)').html()=='0'){$(this).find('td:eq(4)').html('<i class="fa fa-exclamation-circle" style="color:#ff3333;margin-left:40%;" title="Unapproved"></i>')}
      if($(this).find('td:eq(4)').html()=='1'){$(this).find('td:eq(4)').html('<i class="fa fa-check-circle-o" style="color:#1D9D74;margin-left:40%;" title="Approved"></i>')}
    })
  });

  setSingleSelectable('datatables-example', oTable);
  loadDDM(oTable)// Drop Down Menu
  function loadDDM(oTable){
    $( ".ddm_loader" ).load( "partials/_ddm.html #recipe" ,function(){
      $(".ddm_loader").removeClass('hidden');
      var $contextMenu = $(".ddm_loader");
      $contextMenu.hide();
      $('body').not('.ddm_loader').on('click',function(){
        $contextMenu.hide();
      })
      console.log($('tbody'))
      $('#datatables-example').on("contextmenu","tr.selected", function(e) {
        $contextMenu.show();
        $contextMenu.css({ display: "block", left: e.pageX, top: e.pageY, "z-index":"999" })
        return false;
      });
      //View more details
      $('.ddm_loader').on("click", ".view", function() {
        window.open('recipe.html?recipe_id='.concat(oTable.rows('.selected').data()[0].id));
      }); //!DDM Click
      //Edit
      $('.ddm_loader').on("click", ".edit", function() {
        window.open('edit_recipe.html?recipe_id='.concat(oTable.rows('.selected').data()[0].id));
      }); //!DDM Click
      //Delete
      $('.ddm_loader').on("click", ".delete", function() {
        var dataR = ajaxAPICall('DELETE','','api/recipes/'.concat(oTable.rows('.selected').data()[0].id).concat('/delete'),'application/json');
        dataR.success(function(data){
          if(data.response == 'sucess'){
            // Show status
            console.log('success')
          }
          if(data.response == 'error'){
            //Show status
            console.log('error')
          }
          else{console.log(123)}
        })
      }); //!DDM Click
    });
  }

  //Add new recipe
  $('#newRecipe').on('click',function(ev){
    window.location.href = "new_recipe.html";
  })
})
