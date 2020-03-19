<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// 会員登録
Route::post('/register', 'Auth\RegisterController@register')->name('register');

// ログイン
Route::post('/login', 'Auth\LoginController@login')->name('login');

//ログインユーザー
Route::get('/user', function () {
    return Auth::user();
})->name('user');

// ログアウト
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');

//タグデータのロード
Route::get('/load/tagVideo', 'TagController@load');
//プレイリストデータのロード
Route::get('/load/playlist', 'PlaylistController@load');
//タグへのLikeデータのロード
Route::get("/load/tagLike", 'LikeController@loadTagLike');


//検索ワード候補取得
Route::post('/search/candidates', 'SearchController@searchCandidates');
//タグの検索結果取得
Route::post('/search/tag', 'SearchController@searchTag');
//プレイリストの検索結果取得
Route::post('/search/playlist', 'SearchController@searchPlaylist');
//検索レコードの保存
Route::post('/store/searchrecord', 'SearchController@storeSearchRecord');
//人気の検索ワードの取得
Route::get('/topSearchqueries', 'SearchController@getTopSearchqueries');
//検索履歴の取得
Route::get('/searchHistories', 'SearchController@getSearchHistories');

//動画のタグ一覧の取得
Route::get("/taglist/video", 'VideoController@getTagList');

//タグへのLike
Route::post("/toggleLike", 'LikeController@toggleLike');

//タグが保存されている既存プレイリストIDの取得
Route::get('/tag/getPlaylists/{tag}', 'TagController@getPlaylists');

//既存プレイリストへの追加
Route::post('/tag/addToPlaylists/{tag}', 'TagController@addToPlaylists');
//新規プレイリストの作成とタグの追加
Route::post('/playlist/create', 'PlaylistController@create');


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// //後でweb.phpに移す
// Route::post('/tag/update', 'TagController@update');
// Route::post('/tag/delete', 'TagController@delete');
