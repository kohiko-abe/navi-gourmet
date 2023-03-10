@extends('layouts.main')

@section('head')
  @vite(['resources/css/app.css', 'resources/js/app.js'])
  <meta name="csrf-token" content="{{ csrf_token() }}">
@endsection
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
      <button type="button" class="btn btn-outline-secondary" id="get_position_btn">現在地を取得</button>
  </div>
  <p class="coordinate"></p>
  <p class="status"></p>
@endsection