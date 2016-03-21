<?php
class Sendemail{

	public function __construct(){}

	public function __destruct(){}

	public function signupEmail($email,$name) {
		$message = '<h3>Welcome To Pika</h3>';
		$message .= '<p>Hi, '.$name.', You have successfully created an account with Pika</p>';
		$message .= '<p>Log in to your <a href="http://pika.co.ke">account</a> now to start share your recipes.</p>';
		$Headers  = "MIME-Version: 1.0\n";
		$Headers .= "Content-type: text/html; charset=iso-8859-1\n";
		$Headers .= "From: pika <noreply@pika.co.ke>\n";
		$Headers .= "Reply-To: <support@pika.co.ke>\n\n";
		$Headers .= "X-Sender: <support@pika.co.ke>\n";
		$Headers .= "X-Mailer: PHP\n";
		$Headers .= "X-Priority: 1\n";
		$Headers .= "Return-Path: <support@pika.co.ke>\n";
		if(!mail($email, "Welcome to Pika", $message, $Headers)) { return false; }
		return true;
	}

}
?>
