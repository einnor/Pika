function datatable_init(url, cols, tableid){
	var oTable=$('#'+tableid).DataTable({
		"destroy":true,
		"ajax": { "url":url,"dataSrc": "response","dataType":"json","type": "GET" },
		"aLengthMenu": [ [5,10,25,50, 100, 200, -1],[5,10,25, 50, 100, 200, "All"] ],
		"pageLength": 10, "paginate": true, "pagingType": "full_numbers",
		"processing": true,
		"paging":        	true,
		"dom": '<"H"BTfr>t<"F"lip>',
		"columns": cols,
		"select": true,
		order: [ 6, 'desc' ],
		"columnDefs": [

		],
		"initComplete": function(settings, json) {
			$('#'+tableid+'_processing').append(' <img src="img/loading.gif" />');
			$('.dataTables_wrapper div.dataTables_filter').addClass('pull-right');
			$('.dt-buttons btn-group').addClass('pull-left');
			$('.dataTables_info').css({'width':'180px','padding-top':'25px'}).addClass('pull-left');
			$('.dataTables_length').css({'width':'160px','padding-top':'20px'}).addClass('pull-left');
			$('.dataTables_paginate').css({'padding-top':'20px'}).addClass('pull-right');
		},

	})//End of DT
	return oTable;
}

function setSingleSelectable(tableid, oTable){
	$('#'+tableid).find('tbody').on( 'click', 'tr', function () {
		if ( $(this).hasClass('selected') ) {
    	$(this).removeClass('selected');
    }
    else {
    	oTable.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  });

  $('#button').click( function () {
  	oTable.row('.selected').remove().draw( false );
  });
}
