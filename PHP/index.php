<?php
    // Sample Array
    $names = array('douglas', 'zezinho');
    
    // Encode to JSON
    $json = json_encode($names);
    
    // Set header to JSON type
    header('Content-Type: application/json');
    
    // Print JSON to cliente
    echo $json;
?>