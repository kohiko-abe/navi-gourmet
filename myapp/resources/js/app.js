import './bootstrap';
import '../css/app.css';

document.getElementById('get_position_btn').addEventListener("click", getPosition, false);

function getPosition() {
  const status = document.querySelector(".status");
  const position = document.querySelector(".position");
  let range = ranges.value

  if (navigator.geolocation) {
    status.textContent = "";
    position.textContent = "";
    navigator.geolocation.getCurrentPosition( success, error);
  } else {
    status.textContent = "お使いのブラウザでは現在地を取得できません";
  }
  async function success(position) {
    status.textContent = "現在地を取得中";
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    position.textContent = `[現在地] 緯度:${latitude} 経度:${longitude}`;
  }

  async function error(error) {
    var errorNo = error.code;
    var errorInfo = [
      "原因不明のエラーが発生しました…。" ,
      "位置情報の取得が許可されませんでした…。" ,
      "電波状況などで位置情報が取得できませんでした…。" ,
      "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
    ] ;
    status.textContent = errorInfo[ errorNo ];
  }
}