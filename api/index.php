<?php
	include '../classes/inc.php';
	require 'Slim/Slim.php';
	$marray=array();

	global $app;
	$app= new Slim();
	/*******************************************************************/ //Login And logout
	$app->post('/users/login','login');
	$app->post('/users/logout','logout');

	//trait_exists
	$app->get('/test','test');

	$app->run();

	/*******************************************************************/ //Login And logout
	function login(){
		$pdo = getConnection();
		global $app;
		$request = $app->request();
		$reqdata = json_decode($request->getBody());

		$ss = "SELECT id,names,state,cover FROM users WHERE email=? AND password=?";
		$stmt = $pdo->prepare($ss);
		$stmt->execute(array($reqdata->email,md5($reqdata->password)));
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		if ($stmt->rowCount() > 0){
			if ($row['state'] == 0){
				$marray['response'] = "deactivated";
				echo json_encode($marray);
				return false;
			}else{
				$marray['response']	= "success";
				$marray['username']	= $row['names'];
				$marray['user_id'] = $row['id'];
				$marray['cover'] = $row['cover'];

				$_SESSION['user_id'] = NULL;
				$_SESSION['username'] = NULL;
				$_SESSION['cover'] = NULL;

				unset($_SESSION['user_id']);
				unset($_SESSION['username']);
				unset($_SESSION['cover']);

				$_SESSION['user_id'] = $row['id'];
				$_SESSION['username']	= $row['names'];
				$_SESSION['cover'] = $row['cover'];

				echo json_encode($marray);
				return false;
			}
		}else{
			$marray['response']="fail";
			echo json_encode($marray);
			return false;
		}
		return true;
	}; //Login

	function logout(){
		$pdo = getConnection();
		global $app;
		$_SESSION['user_id'] = NULL;
		$_SESSION['username'] = NULL;
		$_SESSION['cover'] = NULL;

		unset($_SESSION['user_id']);
		unset($_SESSION['username']);
		unset($_SESSION['cover']);
	};//Logout

	function test(){$pdo = getConnection();
		try{
			$ss="SELECT * FROM kitchen";
			$stmt = $pdo->prepare($ss);$stmt->execute(array());$resp=array();
			while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
				$resp[]=$row;
			}
			$marray['response']=$resp;
		}catch(PDOException $e){$marray['response']="error";$marray['errorNumber']="";$marray['errorMessage']=$e->getMessage();}
		echo json_encode($marray);
		return true;
	};//test


?>
