<?php

	$location = '../documents/';

	if(isset($_FILES["mfile"])){
		$ret = array();
		$error = $_FILES["mfile"]["error"];
		$fileName = $_FILES["mfile"]["name"];
		// if ($ImageSize>10000000){die(json_encode(array("jquery-upload-file-error"=>'You require an image with a size of NOT more that 10MB. Your Image is Larger');}
		$U_path=$location;

		if (!file_exists($U_path)) {
			@mkdir($U_path);
		}
		chmod( $U_path,0777);
		$uploadhere = $U_path.basename( $_FILES["mfile"]["name"] );
		$filename = basename( $_FILES["mfile"]["name"] );
		if (file_exists($uploadhere)) {
			$uploadhere=$U_path.date('ydmhis').$filename;
		}
		$ret['name'] = $uploadhere;
		if (!move_uploaded_file($_FILES["mfile"]["tmp_name"], $uploadhere)) {
			die(json_encode(array("jquery-upload-file-error"=>'Error Uploading the file. Please try again later')));
		}
		echo json_encode($ret);
	}
?>
