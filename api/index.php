<?php
	include '../classes/inc.php';
	require 'Slim/Slim.php';

	$marray = array();
	global $app;
	$app= new Slim();
	/*******************************************************************/ //Login, Signup And Logout
	$app->post('/users/login','login');
	$app->post('/users/signup','signup');
	$app->post('/users/logout','logout');

	/******************************************************************/ //Author Profile
	$app->get('/authors/:id/recipes','getAuthorRecipes');

	$app->delete('/recipes/:id/delete','deleteRecipe');

	//trait_exists
	$app->get('/test','test');

	$app->run();

	/*******************************************************************/ //Login And logout
	function login(){
		$pdo = getConnection();
		global $app;
		$request = $app->request();
		$reqdata = json_decode($request->getBody());

		try{
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
		}catch(PDOException $e){
			$marray['messsage'] = 'error';
			$marray['error'] = 'Code 9001: '.$e->getMessage();
		}
		return true;
	}; //Login

	function signup(){
			$pdo = getConnection();
			$marray = array();
			global $app;
			$request = $app->request();
			$reqdata = json_decode($request->getBody());
			try{
				//Check if account exists
				$ss = "SELECT id FROM users WHERE email=?";
				$stmt = $pdo->prepare($ss);
				$stmt->execute(array($reqdata->email));
				$row = $stmt->fetch(PDO::FETCH_ASSOC);
				if($stmt->rowCount() > 0){
					$marray['response'] = 'exists';
				}else{
					$ss = "INSERT INTO users (names,email,phone,company,cover,password) VALUES (?,?,?,?,?,?)";
					$stmt = $pdo->prepare($ss);
					$stmt->execute(array($reqdata->names,$reqdata->email,$reqdata->phone,$reqdata->company,$reqdata->cover,md5($reqdata->password)));
					$userid = $pdo->lastInsertId();

					$marray['response'] = 'success';
					$marray['username']	= $reqdata->names;
					$marray['user_id'] = $userid;
					$marray['cover'] = $reqdata->cover;

					$_SESSION['user_id'] = NULL;
					$_SESSION['username'] = NULL;
					$_SESSION['cover'] = NULL;

					unset($_SESSION['user_id']);
					unset($_SESSION['username']);
					unset($_SESSION['cover']);

					$_SESSION['user_id'] = $userid;
					$_SESSION['username']	= $reqdata->names;
					$_SESSION['cover'] = $reqdata->cover;

					include_once('../classes/sendemail.php');
					$signupEmail = new Sendemail;
					$signupEmail->signupEmail($reqdata->email,$reqdata->names);
				}
			}catch(PDOException $e){
				$marray['response'] = 'error';
				$marray['error'] = 'Code 9002: '.$e->getMessage();
			}
			echo json_encode($marray);
			return true;
	}

	function logout(){
		$_SESSION['user_id'] = NULL;
		$_SESSION['username'] = NULL;
		$_SESSION['cover'] = NULL;

		unset($_SESSION['user_id']);
		unset($_SESSION['username']);
		unset($_SESSION['cover']);
	};//Logout

	function getAuthorRecipes($id){
		$pdo = getConnection();
		$marray = array();
		try{
			$ss="SELECT id, course, name, cover, cuisine,FORMAT(preptime, 2) AS preptime, servings, serving_type, texture, tags, price, approval, thedate FROM recipe WHERE userid=?";
			$stmt = $pdo->prepare($ss);
			$stmt->execute(array($id));
			$resp = array();
			while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
				$resp[] = $row;
			}
			$marray['response']=$resp;
		}catch(PDOException $e){
			$marray['response']="error";
			$marray['error'] = 'Code 9003: '.$e->getMessage();
		}
		echo json_encode($marray);
		return true;
	};//getAuthorRecipes

	function deleteRecipe($id){
		$pdo = getConnection();
		$marray = array();
		try{
			$ss = "DELETE FROM recipe WHERE id=?";
			$stmt = $pdo->prepare($ss);
			$stmt->execute(array($id));
			$marray['response'] = 'success';
		}catch(PDOException $e){
			$marray['response'] = "error";
			$marray['error'] = 'Code 9004: '.$e->getMessage();
		}
		echo json_encode($marray);
		return true;
	};//deleteRecipe

	function test(){$pdo = getConnection();
		$marray = array();
		try{
			$ss="SELECT * FROM users";
			$stmt = $pdo->prepare($ss);
			$stmt->execute(array());
			$resp=array();
			while($row = $stmt->fetch(PDO::FETCH_OBJ)) {
				$resp[]=$row;
			}
			$marray['response']=$resp;
		}catch(PDOException $e){
			$marray['response']="error";
			$marray['error'] = 'Code 900: '.$e->getMessage();
		}
		echo json_encode($marray);
		return true;
	};//test


?>
