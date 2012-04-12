<!DOCTYPE html>
<html>
<head>
<title>Sage</title>
<link rel="stylesheet" type="text/css" href="sage.css" />
<script type="text/javascript" src="/jquery.js"></script>
<script type="text/javascript" src="animate.js"></script>
<script type="text/javascript" src="sage.js"></script>

</head>
<body>
<section class="welcome">
<header>
Welcome to Sage!
</header>
</section>

<nav id="nav">
<header>Hosted Content</header>
<?php
$hosted = Array();

if ($handle = opendir('/home')) {
	while(false !== ($entry = readdir($handle))) {
		switch($entry) {
			case ".":
			case "..":
				continue;	
			default:
				if(is_dir("/home/".$entry."/public_html")) {
					$hosted[$entry] = "~".$entry;
				}
				break;
		
		}
	}
	closedir($handle);
}
ksort($hosted, SORT_NATURAL | SORT_FLAG_CASE);

foreach($hosted as $key => $value) {
print "<a href=\"".$value."\">".$key."</a>\n";
}

?>
</nav>


<section class="status" id="status"> 
<header>
	Service Statuses
</header>

<?php
$service = Array();
$service["MySQL"] = Array("3306","phpmyadmin/");
$service["Apache"] = Array("80","/");
$service["SSH"] = Array("22","ssh://". $_SERVER["SERVER_NAME"]);
$service["Mediatomb"] = Array("49152","http://". $_SERVER["SERVER_NAME"].":49152");
$service["VSFTPD"] = Array("21","ftp://". $_SERVER["SERVER_NAME"]);
$service["Webmin"] = Array("10000","https://". $_SERVER["SERVER_NAME"].":10000");
$service["Jenkins"] = Array("8080",$_SERVER["SERVER_NAME"].":8080");

ksort($service, SORT_NATURAL | SORT_FLAG_CASE);
$string = "";
$state = 0;
foreach($service as $key => $value) {
	$output = Array();
	exec("nc -v -w 5 localhost ".$value[0]." < /dev/null",$output,$rv);
	$state += $rv;
	if($rv>0) {
		print "<li class=\"red\">";
	} else {
		print "<li class=\"green\">";
	}
	print "<a href=\"$value[1]\">".$key."</a></li>";
}

?>

</section>


<section class="picture">
<progress id="progress" value="42" max="100"></progress>

<figure>
<img src="rand_image.php" id="background_image" class="background" />
<figcaption>Image Information</figcaption>
</figure>

</section>

<footer class="copyright">
<details>
<summary>Sage is the property of Matthew Barbour</summary>
<p>Any non-authorized use should at least attempt to be really awesome</p>
</details>
</footer>

<section class="console" id="console">
<p class="success">This is a triumph</p>
<p class="error">This contains error output</p>
</section>

</body>
</html>