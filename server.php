<?php
$postdata = file_get_contents("php://input");
if (!empty($postdata)) {
    $data  = var_export($postdata, true);
    $data .=  "\n";
    error_log($data, "3", "/tmp/record.of.stopwatch.log");
    
    $response = array(
        "status" => "success"
    );
} else {
    $response = array(
        "status" => "fail"
    );
}
echo json_encode($response);
