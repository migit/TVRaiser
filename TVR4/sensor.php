<?php
$con = mysqli_connect('host_name', 'database_user', 'database_password','database_name');

$txtTitle = "Coffee is ready!";
$txtContent = "Coffee has been brewed at temprature: "; //+ $_POST["temp"]; 
$sql = "INSERT INTO `notification` (`id`, `title`, `content`) VALUES ('', '$txtTitle', '$txtContent')";
$rs = mysqli_query($con, $sql);
if($rs)
{
	echo "sensor data Inserted";
}
mysqli_close($con);


?>
