<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="{{ asset('/favicon_clip.ico') }}"  type='image/x-icon'>
  <link rel="manifest" href="{{ asset('/manifest.json') }}">
  <link rel="preconnect" href="https://youclip-storage.s3-ap-northeast-1.amazonaws.com" />
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "61qdzvn4mj");
</script>
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
        "name": "切り抜き作成",
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
      "description": "{{$description}}",
      "thumbnailUrl": "{!!$image_url!!}",
      "uploadDate": "{{$upload_date}}",
      "contentUrl": "{!!$url!!}",
    }
    </script>
@endisset
</body>
</html>