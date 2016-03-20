<?php
	if (!isset($_SESSION)) {
		session_start();
		if (!isset($_SESSION['username']) ){$_SESSION['username']='GUEST';}
		if (!isset($_SESSION['user_id']) ){$_SESSION['user_id']='1';}
	}

	function getConnection() {
		$dbhost="localhost";
		$dbuser="developer";
		$dbpass="dev!mje01";
		$dbname="pika";
		$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $dbh;
	}
	function getusername(){
		return $_SESSION['username'];
	}
	function getuserid(){
		return $_SESSION['user_id'];
	}
?>
