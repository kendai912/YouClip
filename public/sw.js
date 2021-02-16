// configuration
`use strict`;

const version = "1.0.0",
  CACHE = version + "::youclip",
  urlsToCache = ["/storage/logos/youclip_logo.png", "js/app.js"];

//************************************************
//InstallEvent
//************************************************
self.addEventListener("install", function (event) {
  // インストール処理
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

//************************************************
//FetchEvent
//************************************************
self.addEventListener("fetch", function (event) {
  event.respondWith(
    // ページにレスポンスを返す（キャッシュがあれば）
    //cacheStrageを参照
    caches.open(CACHE).then((cache) => {
      let url = event.request.url;

      //キャッシュファイルがあるかの確認
      return caches.match(event.request).then((response) => {
        // キャッシュがあったのでそのレスポンスを返す
        if (response) {
          //Cache
          return response;
        }

        //Network
        // 重要：リクエストを clone する。リクエストは Stream なので
        // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
        // 必要なので、リクエストは clone しないといけない
        let fetchRequest = event.request.clone();

        if (
          fetchRequest.cache === "only-if-cached" &&
          fetchRequest.mode !== "same-origin"
        )
          return;

        return fetch(fetchRequest).then((response) => {
          // Check if we received a valid response
          if (!response) {
            return response;
          }

          // 重要：レスポンスを clone する。レスポンスは Stream で
          // ブラウザ用とキャッシュ用の2回必要。なので clone して
          // 2つの Stream があるようにする
          let responseToCache = response.clone();

          caches.open(CACHE).then((cache) => {
            if (isImage(url) || isJs(url)) {
              cache.put(event.request, responseToCache);
            }
          });

          return response;
        });
      });
    })
  );
});

// is image URL?
let iExt = ["png", "jpg", "jpeg", "gif", "webp", "bmp"].map((f) => "." + f);
function isImage(url) {
  return iExt.reduce((ret, ext) => ret || url.endsWith(ext), false);
}

// is js URL?
let jExt = ["js"].map((f) => "." + f);
function isJs(url) {
  return jExt.reduce((ret, ext) => ret || url.endsWith(ext), false);
}

//************************************************
// ActivatedEvent
//************************************************
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keylist) => {
        return Promise.all(
          keylist
            .filter((key) => key !== CACHE)
            .map((key) => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});
