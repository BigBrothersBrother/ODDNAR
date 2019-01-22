<?php
	header('Access-Control-Allow-Origin: *')
?>

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Custom Cart Update</title>
</head>

<body>
<?php
	
	$cartid = $_GET['cartid'];
	$itemid = $_GET['itemid'];	
	$curl = curl_init();
	echo $_GET['cartid'];
	
	curl_setopt_array($curl, array(
	CURLOPT_URL => "https://api.bigcommerce.com/stores/8urkqds0ab/v3/carts/".$_GET["cartid"]."/items/".$_GET["itemid"]."",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "PUT",
	CURLOPT_POSTFIELDS => '{"line_item":{"variant_id": '.$_GET["variant_id"].',"product_id": '.$_GET["product_id"].',"quantity": '.$_GET["qty"].',"list_price": '.$_GET["price"].',"sale_price": '.$_GET["price"].'}}',
	CURLOPT_HTTPHEADER => array(
	  "Accept: application/json",
	  "Cache-Control: no-cache",
	  "Content-Type: application/json",
	  "Postman-Token: b2479adc-af63-32b2-375a-47fbc718ec88",
	  "X-Auth-Client: aj1oilbcemfkdpfv685htnhkm2lkz71",
	  "X-Auth-Token: 96jw41442fkt9mwi8w9mw48s0ttpjxj",
	  "dataType: json"
	),
	));
	
	$response = curl_exec($curl);
	$err = curl_error($curl);	
	curl_close($curl);
	
	if ($err) {
		echo "cURL Error #:" . $err;
	} else {
		echo $response;
	}	
?>
</body>
</html>
