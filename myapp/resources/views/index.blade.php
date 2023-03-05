@extends('layouts.main')

@section('title', 'Index')

@section('content')
  <h1>現在地の近くのお店を表示</h1>
  <div class="top">
      <form>
        <label for="ranges"><h3>検索する範囲を選択</h3></label>
          <select id="ranges">
              <option value="1">300m</option>
              <option value="2">500m</option>
              <option value="3">1000m </option>
              <option value="4">2000m </option>
              <option value="5">3000m </option>
          </select>
      </form>
      <button type="button" class="btn btn-outline-secondary" id="btn">現在地を取得</button>
  </div>
@endsection