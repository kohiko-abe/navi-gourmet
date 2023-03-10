<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>
    @yield('head')
  </head>
  <body>
    <div class="content">
      @yield('content')
    </div>
    <div class="footer">
      @yield('footer')
    </div>
  </body>
</html>