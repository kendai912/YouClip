<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="shortcut icon" href="/images/favicon.ico"/>
  <title>{{ config('app.name', 'Laravel') }}</title>
  <link rel="dns-prefetch" href="//fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
  <title>{{$title}}</title>
  <meta property="og:title" content="{{$title}}">
  <meta property="og:image" content="{{$image_url}}">
  <meta property="og:description" content="{{$description}}">
  <meta property="og:url" content="{{$url}}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="{{$site_name}}">
  <meta name="twitter:site" content="{{$url}}">
  <meta name="twitter:card" content="photo">
  <meta name="twitter:title" content="{{$title}}">
  <meta name="twitter:image" content="{{$image_url}}">
  <meta name="twitter:description" content="{{$description}}">

  <meta property="fb:app_id" content="{{$fb_app_id}}">
</head>
  <body>
  </body>
</html>