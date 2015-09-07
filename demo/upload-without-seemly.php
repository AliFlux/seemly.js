<!-- Template author: W3layouts -->
<!DOCTYPE HTML>
<html>
<head>
	<title>Demo Form</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link href="css/style.css" rel="stylesheet" type="text/css" media="all"/>
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.js"></script>
	<?php sleep(2); // Add a bit of a realistic delay ?>
</head>
<body>
	<h1>Demo Upload Form</h1>
	<form method="post" enctype="multipart/form-data">
		<div class="login">
			 <div class="rib"> </div>
				<h2>Upload an image.</h2>
				<input type="file" value="" name="image" />
				<div class="remember">
					<div class="send">
						<input type="submit" value="Continue">
					</div>
					<div class="clear"> </div>
			</div>
		</div>
		<?php if(isset($_FILES["image"])) { ?>
		<div class="login-bottom">
			<?php
				$data = file_get_contents($_FILES['image']['tmp_name']);
				$base64 = 'data:' . $_FILES['image']['type'] . ';base64,' . base64_encode($data);
			?>
			<br/>
			<img class='image-preview' src="<?php echo $base64; ?>" alt="Your image" />
		</div>
		<?php } ?>
	</form>
</body>
</html>