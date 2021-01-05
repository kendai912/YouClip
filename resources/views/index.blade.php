<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="YouClip(ユークリップ)はYouTube動画のまとめ作成ツールです。好きなPVのサビや、スポーツのハイライト、ハウツー動画の要点など、お気に入りのシーンを、まとめて残すことが出来ます。みんなのまとめを見ることも可能です。みんなで面白い/役に立つまとめ動画を作りましょう！">

  <meta property="og:site_name" content="YouClip">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://youclip.jp">
  <meta property="og:title" content="YouClip - YouTube動画のまとめ作成ツール">
  <meta property="og:description" content="YouClipはYouTube動画のまとめ作成ツールです。お気に入りのシーンをまとめて残すことが出来ます。みんなのまとめを見ることも可能です">
  <meta property="og:image" content="https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/facebook-youclip-logo.png">
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@YouClip2">
  <meta name="twitter:url" content="https://youclip.jp">
  <meta name="twitter:title" content="YouClip - YouTube動画のまとめ作成ツール">
  <meta name="twitter:description" content="YouClipはYouTube動画のまとめ作成ツールです。お気に入りのシーンをまとめて残すことが出来ます。みんなのまとめを見ることも可能です">
  <meta name="twitter:image" content="https://youclip-storage.s3-ap-northeast-1.amazonaws.com/logo/twitter-youclip-logo.png">

  <title>{{ config('app.name') }} - YouTube動画のまとめ作成ツール</title>

  <!-- Scripts -->
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script src="{{ asset('/js/app.js') }}" defer></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>

  <!-- favicon -->
  <link rel="shortcut icon" href="{{ asset('/favicon_clip.ico') }}"  type='image/x-icon'>

  <!-- Fonts -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather|Roboto:400">
  <link rel="stylesheet" href="https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css">

  <!-- fontawsom -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
  
  <!-- Styles -->
  <link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet" />
</head>
<body>
  <div id="app"></div>
</body>
</html>