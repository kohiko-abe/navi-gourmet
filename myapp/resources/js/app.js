import './bootstrap';
import '../css/app.css';

document.getElementById('get_position_btn').addEventListener("click", getPosition, false);

function getPosition() {
  const status = document.querySelector(".status");
  const coordinate = document.querySelector(".coordinate");
  let range = ranges.value

  if (navigator.geolocation) {
    status.textContent = "";
    coordinate.textContent = "";
    navigator.geolocation.getCurrentPosition( success, error);
  } else {
    status.textContent = "お使いのブラウザでは現在地を取得できません";
  }
  async function success(position) {
    status.textContent = "現在地を取得中";
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    coordinate.textContent = `[現在地] 緯度:${latitude} 経度:${longitude}`;
    status.textContent = "";

    let data = JSON.stringify({
      "latitude": latitude,
      "longitude": longitude,
      "range": range,
    });
    console.log(data);
    fetch('/index', {
      method: 'POST',
      header: { 
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
        'Content-Type': 'application/json' 
    },
      body: data
    })
    .then(response => response.json())
    .then(res => {
      //display(res);
      console.log(res);
    });

  }

  async function error(error) {
    var errorInfo = [
      "原因不明のエラーが発生しました…。" ,
      "位置情報の取得が許可されませんでした…。" ,
      "電波状況などで位置情報が取得できませんでした…。" ,
      "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
    ] ;
    status.textContent = errorInfo[ error.code ];
  }
}