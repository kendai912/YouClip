<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('home');
});

Auth::routes();

//閲覧は未ログインでも可
Route::get('/home', 'HomeController@index')->name('home');
Route::post('/home/searchCandidates', 'HomeController@searchCandidates');
Route::get('/video/searchQuery={searchQuery}', 'HomeController@search');

Route::get('/video/play/video_id={video_id}&tag_id={tag_id}&playlist_id={playlist_id}', 'VideoController@show');

Route::get('/tag/getPlaylists/{tag}', 'TagController@getPlaylists');

Route::post('/like/getIsLikedFlag', 'LikeController@getIsLikedFlag');
Route::post('/like/getLikeCount', 'LikeController@getLikeCount');

Route::post('/playlist/index', 'PlaylistController@index');
Route::post('/playlist/getFirstTagVideoId', 'PlaylistController@getFirstTagVideoId');
Route::post('/playlist/getFirstTagVideoIds', 'PlaylistController@getFirstTagVideoIds');

//シーン登録やLike、プレイリスト作成はログイン必須
Route::group(['middleware' => 'auth:user'], function () {
    Route::get('/video/create', 'VideoController@create');
    Route::post('/video/store', 'VideoController@store');
    
    Route::post('/tag/store', 'TagController@store');
    Route::post('/tag/addToPlaylists/{tag}', 'TagController@addToPlaylists');
    
    Route::get('/playlist/show', 'PlaylistController@show');
    Route::post('/playlist/create', 'PlaylistController@create');

    Route::post('/like', 'LikeController@toggle');
    Route::get('/like/index', 'LikeController@index');
});

// admin認証不要
Route::group(['prefix' => 'admin'], function () {
    Route::get('/', function () {
        return redirect('/admin/home');
    });
    Route::get('login', 'Admin\LoginController@showLoginForm')->name('admin.login');
    Route::post('login', 'Admin\LoginController@login');
});

// adminログイン後
Route::group(['prefix' => 'admin', 'middleware' => 'auth:admin'], function () {
    Route::post('logout', 'Admin\LoginController@logout')->name('admin.logout');
    Route::get('home', 'Admin\HomeController@index')->name('admin.home');
});
