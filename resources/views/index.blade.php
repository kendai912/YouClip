<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="{{ asset('/favicon_clip.ico') }}"  type='image/x-icon'>
  <link rel="manifest" href="{{ asset('/manifest.json') }}">
  <link rel="preconnect" href="https://youclip-storage.s3-ap-northeast-1.amazonaws.com" />
</head>
<body>
  <div id="app"></div>
  <script src="{{ asset('/js/app.js') }}" defer></script>
  <script type="application/ld+json" defer>
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": "https://youclip.jp"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "再生",
        "item": "https://youclip.jp/watch"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "まとめ作成",
        "item": "https://youclip.jp/youtube"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "マイページ",
        "item": "https://youclip.jp/mypage"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "ログイン",
        "item": "https://youclip.jp/login"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "マイページ",
        "item": "https://youclip.jp/mypage"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "新規登録",
        "item": "https://youclip.jp/register"
      }
    ]
  }
</script>
@isset ($watch_page)
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "{{$title}}",
      "description": "{{$description}}"",
      "thumbnailUrl": "{!!$image_url!!}",
      "uploadDate": "{{$upload_date}}",
      "contentUrl": "{!!$url!!}",
    }
    </script>
@endisset
</body>
</html>