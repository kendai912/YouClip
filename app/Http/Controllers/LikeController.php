<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Tag;
use App\User;
use App\Like;

class LikeController extends Controller
{
    public function index()
    {
        //ログインユーザーIDを取得
        $user_id = Auth::user()->id;

        $likedScenes = Like::where('user_id', $user_id)->get();
        foreach ($likedScenes as $likedScene) {
            $likes[] = $likedScene->tag()->join('videos', 'tags.video_id', '=', 'videos.id')->select('videos.id as video_id', 'videos.youtubeId', 'videos.url', 'videos.title', 'videos.thumbnail', 'videos.duration', 'videos.created_at as video_created_at', 'videos.updated_at as video_updated_at', 'tags.id as tag_id', 'tags', 'start', 'end')->get();
        }

        return view('like_index', compact('likes'));
    }

    //既にLike済みかチェック
    public function checkLiked($user_id, $tag_id)
    {
        $like = Like::where('user_id', $user_id)->where('tag_id', $tag_id)->get();
        if ($like->isEmpty()) {
            return false;
        } else {
            return true;
        }
    }

    public function toggle(Request $request)
    {
        //ログインユーザーIDを取得
        $user_id = Auth::user()->id;
                
        //既にLike済みかチェック
        if (!$this->checkLiked($user_id, $request->tag_id)) {
            //未だLikeしていない場合
            $this->store($user_id, $request->tag_id);
            $data = "like stored";
        } else {
            //Like済みの場合
            $this->destroy($user_id, $request->tag_id);
            $data = "like destroyed";
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

    public function store($user_id, $tag_id)
    {
        $like = new Like;
        $like->user_id = $user_id;
        $like->tag_id = $tag_id;
        $like->save();
    }

    public function destroy($user_id, $tag_id)
    {
        $like = Like::where('user_id', $user_id)->where('tag_id', $tag_id);
        $like->delete();
    }

    public function getIsLikedFlag(Request $request)
    {
        if (Auth::check()) {
            //ログイン済の場合の処理
            //ログインユーザーIDを取得
            $user_id = Auth::user()->id;

            //既にLike済みかチェック
            if (!$this->checkLiked($user_id, $request->tag_id)) {
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
        $like = Like::where('tag_id', $request->tag_id)->get();
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
