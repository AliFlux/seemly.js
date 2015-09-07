<!-- Template author: W3layouts -->
<!DOCTYPE HTML>
<html>
<head>
	<title>Demo Form</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link href="css/style.css" rel="stylesheet" type="text/css" media="all"/>
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.js"></script>
	<?php sleep(1); // Add a bit of a realistic delay ?>
</head>
<body>
	<h1>Demo Form</h1>
	<form method="post">
		<div class="login">
			 <div class="rib"> </div>
				<h2>Hmmm.... Let's see.</h2>
				<input type="text" value="" name="name" placeholder="What's your name?" />
				<div class="remember">
					<div class="send">
						<input type="submit" value="Continue">
					</div>
				  <div class="clear"> </div>
			</div>
		</div>
		<?php if(isset($_POST["name"])) { ?>
		<div class="login-bottom">
			<img src="images/c-tick.png" alt="">
			<h3>Great. Pleased to meet you, <?php echo htmlspecialchars($_POST["name"]); ?>!.</h3>
		</div>
		<?php } ?>
	</form>
</body>
</html>