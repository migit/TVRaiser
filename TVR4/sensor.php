<?php
$con = mysqli_connect('host_name', 'database_user', 'database_password','database_name');

$txtTitle = $_POST['txtTitle'];
$txtContent = $_POST['txtContent'];
$sql = "INSERT INTO `notification` (`id`, `title`, `content`) VALUES ('', '$txtTitle', '$txtContent')";

$rs = mysqli_query($con, $sql);

if($rs)
{
	echo "sensor data Inserted";
}

echo $rs;

?>
