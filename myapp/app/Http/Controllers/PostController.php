<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function sendDataToApi() {
        $raw = file_get_contents('php://input'); 
        $data = json_decode($raw, true); 

        $latitude =  $data['latitude']; 
        $longitude = $data['longitude'];
        $range = $data['range'];

        $req_params = [
        'key' => '37ba3a7af598da51',
        'lat' => $latitude, 
        'lng' => $longitude, 
        'range' => $range,
        'format' => 'json', 
        ];
        $url = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?';
        $url .= http_build_query($req_params);
        $res = file_get_contents($url);
        echo json_encode($res);
    }
}
