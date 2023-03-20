<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    public function sendDataToApi(Request $request) {
        $latitude =  $request->get('latitude'); 
        $longitude = $request->get('longitude');
        $range = $request->get('range');
        $start = $request->get('start');
        $parking = $request->get('parking');
        $card = $request->get('card');

        $req_params = [
        'key' => '37ba3a7af598da51',
        'lat' => $latitude, 
        'lng' => $longitude, 
        'range' => $range,
        'start' => $start,
        'parking' => $parking,
        'card' => $card,
        'format' => 'json', 
        ];
        $url = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?';
        $url .= http_build_query($req_params);
        $res = file_get_contents($url);

        echo json_encode($res);
    }
}
