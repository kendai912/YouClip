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
//ソーシャル認証へリダイレクトさせる
Route::get('/auth/{provider}', 'Auth\AuthController@redirectToProvider');
//ソーシャル認証後に処理
Route::get('/auth/{provider}/callback', 'Auth\AuthController@handleProviderCallback');


// 会員登録
Route::post('/register', 'Auth\RegisterController@register')->name('register');

// ログイン
Route::get('/save/urlintended', 'Auth\LoginController@saveUrlIntended');
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
Route::get('/load/myCreatedAndLikedTagVideo', 'TagController@loadMyCreatedAndLikedTagVideo');

//【レコメンド】プレイリスト一覧のロード
// Route::get('/index/playlistAndTagOfRecommend', 'PlaylistController@indexPlaylistAndTagPaginationOfRecommend');
//【新着】プレイリスト一覧のロード
Route::get('/index/playlistAndTagOfNew', 'PlaylistController@indexPlaylistAndTagPaginationOfNew');
//【VTuber】プレイリスト一覧のロード
Route::get('/index/playlistAndTagOfVTuber', 'PlaylistController@indexPlaylistAndTagPaginationOfVTuber');
//【Game】プレイリスト一覧のロード
Route::get('/index/playlistAndTagOfGame', 'PlaylistController@indexPlaylistAndTagPaginationOfGame');
//【Music】プレイリスト一覧のロード
Route::get('/index/playlistAndTagOfMusic', 'PlaylistController@indexPlaylistAndTagPaginationOfMusic');
//【Language】プレイリスト一覧のロード
Route::get('/index/playlistAndTagOfLanguage', 'PlaylistController@indexPlaylistAndTagPaginationOfLanguage');
// ID指定でのプレイリストおよびタグ・動画データの取得
Route::get('/get/playlistAndTagVideoData', 'PlaylistController@getPlaylistAndTagVideoDataById');
//作成したプレイリスト一覧を取得
Route::get('/get/myCreatedPlaylist', 'PlaylistController@getMyCreatedPlaylist');
//Likeまたは作成したプレイリスト一覧をロード
Route::get('/load/myCreatedAndLikedPlaylist', 'PlaylistController@loadMyCreatedAndLikedPlaylist');
//playlistのcategoryを取得
Route::get('/get/currentCategory', 'PlaylistController@getCurrentCategory');


//タグへのLikeデータのロード
Route::get("/load/tagLike", 'LikeController@loadTagLike');
//プレイリストへのLikeデータのロード
Route::get("/load/playlistLike", 'LikesPlaylistController@loadPlaylistLike');

//検索キーワード候補を取得
Route::post('/search/getSearchCandidates', 'SearchController@getSearchCandidates');
// //過去の検索履歴から検索ワード候補を取得
// Route::get('/search/getSearchHistoryCandidates', 'SearchController@getSearchHistoryCandidates');
// //人気の検索履歴から検索ワード候補を取得
// Route::get('/search/getTopSearchqueriesCandidates', 'SearchController@getTopSearchqueriesCandidates');
//タグの検索結果取得
Route::post('/search/tag', 'SearchController@searchTag');
//プレイリストの検索結果取得
Route::post('/search/playlist', 'SearchController@searchPlaylist');
//検索レコードの保存
Route::post('/store/searchrecord', 'SearchController@storeSearchRecord');
//人気の検索ワードの取得
Route::post('/topSearchqueries', 'SearchController@getTopSearchqueries');
//検索履歴の取得
Route::post('/searchHistories', 'SearchController@getSearchHistories');

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

Route::post('/tag/addComment', 'TagController@addTagComment');
//新規プレイリストの作成とタグの追加
Route::post('/playlist/create', 'PlaylistController@create');
//Get newly created playlist
Route::post('/playlist/getNewPlaylist', 'PlaylistController@getNewPlaylist');
//プレイリストの全体更新
Route::post('/playlist/update', 'PlaylistController@update');
//プレイリストのタイトルの更新
Route::post('/playlist/updateTitle', 'PlaylistController@updateTitle');
//プレイリストのプライバシー設定の更新
Route::post('/playlist/updatePrivacy', 'PlaylistController@updatePrivacy');
//プレイリストのシーン順序の更新
Route::post('/playlist/updateSceneOrder', 'PlaylistController@updateSceneOrder');
//プレイリストへのコメント追加
Route::post('/playlist/addComment', 'PlaylistController@addPlaylistComment');
//プレイリストのコメントへのライク
Route::post('/playlist/likeComment', 'PlaylistController@likeComment');
//プレイリストの削除
Route::post('/playlist/delete', 'PlaylistController@delete');
//Add Playlist Visit Count
Route::post("/addPlaylistVisitCount/{playlist_id}", 'PlaylistController@addVisitCount');
//load public playlist and its scenelist
Route::post('/load/publicPlaylistAndScenelist', 'PlaylistController@loadPublicPlaylistAndScenelist');
//refresh new playlist's preview
Route::post('/playlist/refreshNewPreview', 'PlaylistController@refreshNewPreview');

//シーン登録におけるyoutubeIdから既存のvideoIdの取得
Route::get('/youtube/getVideo', 'VideoController@getVideoByYoutubeId');
//シーン登録における動画IDから既存のタグの取得
Route::get('/youtube/getTag', 'TagController@getTagByVideoId');
//シーンタグの履歴取得
Route::get('/tag/histories', 'TagController@getTagHistories');
//シーン登録における動画・タグの保存
Route::post('/tag/storeSceneTags', 'TagController@storeSceneTags');
//シーン登録におけるサムネイルとプレビューの取得とS3への保存
Route::post('/tag/storeTagThumbAndPreview', 'TagController@storeTagThumbAndPreview');
//シーンタグの編集
Route::post('/tag/update', 'TagController@update');
//シーンタグの削除
Route::post('/tag/delete', 'TagController@delete');


//YT Search API
Route::post('/search/getYoutubeScrapingResults', 'SearchController@getYTScrapingResultList');
Route::post('/search/getYoutubeSearch', 'SearchController@getYTSearchList');
Route::post('/search/getYoutubeVideos', 'VideoController@getYTVideoList');
Route::post('/search/getYoutubeVideoCategories', 'VideoController@getYTVideoCategoryList');
Route::post('/search/getRecentVideos', 'VideoController@getYTRecentVideoList');


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// //後でweb.phpに移す
// Route::post('/tag/update', 'TagController@update');
// Route::post('/tag/delete', 'TagController@delete');
