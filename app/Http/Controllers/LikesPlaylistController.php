<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Playlist;
use App\User;
use App\LikesPlaylist;

class LikesPlaylistController extends Controller
{
    public function loadPlaylistLike()
    {
        //Like数とLike有無フラグを格納する配列を宣言
        $playlistLike = [];

        //全タグIDを取得
        $likes = LikesPlaylist::all();

        foreach ($likes as $like) {
            //プレイリストのlikes数を取得
            $likeData = $this->getLikeDataById($like->playlist_id);
            
            //ユーザーによるプレイリストへのlike有無フラグを判定
            $isLiked = $this->getIsLikedFlagById($like->playlist_id);

            //playlist_idをキーとした連想配列に格納
            $playlistLike[$like->playlist_id] = [
                'likedUsers' => $likeData['likedUsers'],
                'likeCount' => $likeData['likeCount'],
                'isLiked' => $isLiked
            ];
        }

        return response()->json(
            [
                'playlistLike' => $playlistLike
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    //Likeの件数を取得
    public function getLikeDataById($playlist_id)
    {
        $likeDataArray = LikesPlaylist::where('playlist_id', $playlist_id)->with('user')->get();
        $likeData = [];
        $likedUsers = [];

        $avatarNum = 0;
        foreach ($likeDataArray as $index => $likeData) {
            if ($avatarNum < 4 && $likeData->user->avatar) {
                $avatarNum++;
                $likedUsers[] = $likeData->user;
            }
        }

        $likeData['likedUsers'] = $likedUsers;
        $likeData['likeCount'] = $likeDataArray->count();

        return $likeData;
    }

    public function getIsLikedFlagById($playlist_id)
    {
        if (Auth::check()) {
            //ログイン済の場合の処理
            //ログインユーザーIDを取得
            $user_id = Auth::user()->id;

            //既にLike済みかチェック
            if (!$this->checkLiked($user_id, $playlist_id)) {
                //未だLikeしていない場合
                $isLiked = false;
            } else {
                //Like済みの場合
                $isLiked = true;
            }
        } else {
            //未ログインの場合の処理
            $isLiked = false;
        }

        return $isLiked;
    }

    //既にLike済みかチェック
    public function checkLiked($user_id, $playlist_id)
    {
        $like = LikesPlaylist::where('user_id', $user_id)->where('playlist_id', $playlist_id)->get();
        if ($like->isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    public function toggleLikePlaylist(Request $request)
    {
        //ログインユーザーIDを取得
        if (Auth::user()) {
            $user_id = Auth::user()->id;
                    
            //既にLike済みかチェック
            if (!$this->checkLiked($user_id, $request->playlist_id)) {
                //未だLikeしていない場合
                $this->store($user_id, $request->playlist_id);
                $data = "like stored";
            } else {
                //Like済みの場合
                $this->destroy($user_id, $request->playlist_id);
                $data = "like destroyed";
            }

            return response()->json(
                [
                    'data' => $data
                ],
                201,
                [],
                JSON_UNESCAPED_UNICODE
            );
        } else {
            return response()->json(
                [
                'error' => 'セッションが切れているので、もう一度ログインして下さい'
                ],
                401,
                [],
                JSON_UNESCAPED_UNICODE
            );
        }
    }

    public function store($user_id, $playlist_id)
    {
        $like = new LikesPlaylist;
        $like->user_id = $user_id;
        $like->playlist_id = $playlist_id;
        $like->save();
    }

    public function destroy($user_id, $playlist_id)
    {
        $like = LikesPlaylist::where('user_id', $user_id)->where('playlist_id', $playlist_id);
        $like->delete();
    }

    public function getIsLikedFlag(Request $request)
    {
        if (Auth::check()) {
            //ログイン済の場合の処理
            //ログインユーザーIDを取得
            $user_id = Auth::user()->id;

            //既にLike済みかチェック
            if (!$this->checkLiked($user_id, $request->playlist_id)) {
                //未だLikeしていない場合
                $data = false;
            } else {
                //Like済みの場合
                $data = true;
            }
        } else {
            //未ログインの場合の処理
            $data = false;
        }

        return response()->json(
            [
                'data' => $data
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }

    public function getLikeCount(Request $request)
    {
        //Likeの件数を取得
        $like = LikesPlaylist::where('playlist_id', $request->playlist_id)->get();
        $likeCount = $like->count();

        return response()->json(
            [
                'data' => $likeCount
            ],
            200,
            [],
            JSON_UNESCAPED_UNICODE
        );
    }
}
