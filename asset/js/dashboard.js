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
})
