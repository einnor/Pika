$(document).ready(function(){
  // Set the username
  $('li.user-name span').html(getCookie('theuser'));
  $('div.box-v2-detail h4').html(getCookie('theuser'));
})
