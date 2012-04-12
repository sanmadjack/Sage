<?php


$folder = "/home/share/Images/";
$dir = opendir($folder);
$files = array();
while (($file = readdir($dir)) !== false) {
if(!is_file($folder.$file))
	continue;
	array_push($files,$file);
}
closedir($dir);

$i = rand(0,sizeof($files));
$file = $files[$i];


header('Content-Type:'.filetype($folder.$type));
header('Content-Length: ' . filesize($folder.$file));
readfile($folder.$file);



?>

