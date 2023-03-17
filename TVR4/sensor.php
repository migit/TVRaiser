<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

$con = mysqli_connect('db5012226121.hosting-data.io', 'dbu5695550', 'DFDGDSggddg98##_8','dbs10287705');

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