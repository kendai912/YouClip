<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <title>{{$title}} - {{ config('app.name') }}</title>

  <meta property="og:site_name" content="{{$site_name}}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{!!$url!!}}">
  <meta property="og:title" content="{{$title}}">
  <meta property="og:description" content="{{$description}}">
  <meta property="og:image" content="{{!!$image_url!!}}">
  <meta property="fb:app_id" content="{{$fb_app_id}}">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@YouClip2">
  <meta name="twitter:url" content="{{!!$url!!}}">
  <meta name="twitter:title" content="{{$title}}">
  <meta name="twitter:description" content="{{$description}}">
  <meta name="twitter:image" content="{{!!$image_url!!}}">

</head>
  <body>
  </body>
</html>