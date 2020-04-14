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

//ID指定でのタグ・動画データの取得
Route::get('/get/tagAndVideoData', 'TagController@getTagAndVideoDataById');
//Likeまたは作成したタグデータのロード
Route::get('/load/myTagVideo', 'TagController@loadMyTag');

//プレイリスト一覧のロード
Route::get('/index/playlistAndTag', 'PlaylistController@indexPlaylistAndTagPagination');
// ID指定でのプレイリストおよびタグ・動画データの取得
Route::get('/get/playlistAndTagVideoData', 'PlaylistController@getPlaylistAndTagVideoDataById');
//作成したプレイリスト一覧を取得
Route::get('/get/myCreatedPlaylist', 'PlaylistController@getMyCreatedPlaylist');
//Likeまたは作成したプレイリスト一覧をロード
Route::get('/load/myCreatedAndLikedPlaylist', 'PlaylistController@loadMyCreatedAndLikedPlaylist');

//タグへのLikeデータのロード
Route::get("/load/tagLike", 'LikeController@loadTagLike');
//プレイリストへのLikeデータのロード
Route::get("/load/playlistLike", 'LikesPlaylistController@loadPlaylistLike');

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
//プレイリストへのLike
Route::post("/toggleLikePlaylist", 'LikesPlaylistController@toggleLikePlaylist');

//タグが保存されている既存プレイリストIDの取得
Route::get('/tag/getPlaylists/{tag}', 'TagController@getPlaylists');

//既存プレイリストへの追加
Route::post('/tag/addToPlaylists/{tag}', 'TagController@addToPlaylists');
//新規プレイリストの作成とタグの追加
Route::post('/playlist/create', 'PlaylistController@create');

//シーン登録におけるyoutubeIdから既存のvideoIdの取得
Route::get('/youtube/getVideo', 'VideoController@getVideoByYoutubeId');
//シーン登録における動画IDから既存のタグの取得
Route::get('/youtube/getTag', 'TagController@getTagByVideoId');
//シーンタグの履歴取得
Route::get('/tag/histories', 'TagController@getTagHistories');
//シーン登録における動画・タグの保存
Route::post('/tag/store', 'TagController@store');
//シーンタグの編集
Route::post('/tag/update', 'TagController@update');
//シーンタグの削除
Route::post('/tag/delete', 'TagController@delete');


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// //後でweb.phpに移す
// Route::post('/tag/update', 'TagController@update');
// Route::post('/tag/delete', 'TagController@delete');
