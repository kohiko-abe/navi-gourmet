import './bootstrap';
import '../css/app.css';

const status = document.querySelector(".status");
const coordinate = document.querySelector(".coordinate");
const result = document.querySelector(".result");

document.getElementById('get_position_btn').addEventListener("click", get_position, false);

function get_position(event) {
  const range = ranges.value;
  const start = event.target.value;
  let parking = 0;
  let card = 0;


  if (document.getElementById('parking').checked) {
    parking = 1;
  }

  if (document.getElementById('card').checked) {
    card = 1;
  }

  if (navigator.geolocation) {
    status.textContent = "";
    coordinate.textContent = "";
    result.textContent = "";
    status.textContent = "ロード中...";
    navigator.geolocation.getCurrentPosition( success, error);
  } else {
    status.textContent = "お使いのブラウザでは現在地を取得できません";
  }
  async function success(position) {
    status.textContent = "現在地を取得中";
    document.querySelector(".restaurant_cards").innerHTML = "";
    document.querySelector(".pages").innerHTML = "";
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    coordinate.textContent = `[現在地] 緯度:${latitude} 経度:${longitude}`;
    status.textContent = "";

    let data = JSON.stringify({
      "latitude": latitude,
      "longitude": longitude,
      "range": range,
      "start": start,
      "parking": parking,
      "card": card,
    });
    console.log(data);

    fetch('index', {
      method: 'POST',
      headers: { 
        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
        'Content-Type': 'application/json' 
    },
      body: data
    })
    .then(response => response.json())
    .then(res => {
      create_shop_card(res);
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


function create_shop_card(res) {
  let restaurants_data = JSON.parse(res);
  console.log(restaurants_data);
  let results_available = restaurants_data.results.results_available;
  if (results_available == 0) {
    result.textContent = `この条件では見つかりませんでした`
  } else {
    result.textContent = `${restaurants_data.results.results_available}軒見つかりました`;
  }
  const fragment = document.createDocumentFragment();
  const contents = document.getElementById("template");
  for (let i = 0; i < restaurants_data.results.results_returned; i++) {
    const clone = contents.content.cloneNode(true);
    console.log(clone);
    clone.querySelector(".name").textContent = `${restaurants_data.results.shop[i].name}`;
    clone.querySelector(".open").textContent = `営業時間：${restaurants_data.results.shop[i].open}`;
    clone.querySelector(".parking").textContent = `駐車場${restaurants_data.results.shop[i].parking}`;
    clone.querySelector(".credit_card").textContent = `カード${restaurants_data.results.shop[i].card}`
    fragment.appendChild(clone);
  }
  document.querySelector(".restaurant_cards").appendChild(fragment);

  if (results_available > 10) {
    const i = Math.floor(results_available / 10) + 1;
    for (let j = 0; j < i; j++) {
      const page = document.createElement("a");
      page.textContent = j + 1;
      page.dataset.page = j + 1;
      page.value = 10 * j + 1;
      console.log(page.value);
      page.addEventListener("click", get_position);
      fragment.appendChild(page);
    }
    document.querySelector(".pages").appendChild(fragment);
  }
}